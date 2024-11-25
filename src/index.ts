import type { RequestDataMessage } from "./types";
import promptPage from "./prompt.html";

console.log(`c/side marketing chrome extension ${Date.now()}`);

let siteData: string[] = [];
// let pageData: string[] = [];
let lastUrl: string = "";

// Get the currently open tab
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  const tab = tabs[0];
  if (!tab || !tab.url) {
    return;
  }

  lastUrl = tab.url;

  // Send a message to the background script to request the current page / site's data
  chrome.runtime.sendMessage(
    {
      type: "request-data",
      payload: {
        url: tab.url,
      },
    },
    (response: RequestDataMessage["response"]) => {
      console.log(response);
      siteData = response.siteData;
      // pageData = response.pageData;
      document.getElementById("cside-on-this-page-counter")!.textContent =
        response.pageData.length.toString() + " new";
      document.getElementById("cside-on-this-site-counter")!.textContent =
        response.siteData.length.toString();
    }
  );
});

function downloadText(text: string, filename: string): void {
  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
}

document.addEventListener("readystatechange", () => {
  if (document.readyState !== "complete") {
    return;
  }

  document.getElementById("cside-export-csv")!.addEventListener("click", () => {
    const { hostname, pathname } = new URL(lastUrl);

    const sortedUrls = [...siteData].sort((a, b) => a.localeCompare(b));

    let content = `"Site Hostname","Script URL"\n`;

    for (const url of sortedUrls) {
      content += `"${hostname}","${url}"\n`;
    }

    downloadText(content, `scripts-${hostname}-${Date.now()}.csv`);
  });

  document.getElementById("cside-run-prompt")!.addEventListener("click", () => {
    chrome.storage.sync.get(["cside_oai_key", "cside_prompt"], (results) => {
      if (!results.cside_oai_key) {
        alert("Please set your OpenAI key in the extension options.");
        return;
      }

      const key = results.cside_oai_key as string;

      if (!results.cside_prompt) {
        alert("Please set your prompt in the extension options.");
        return;
      }

      const prompt = results.cside_prompt as string;

      document.getElementById("cside-run-prompt")!.innerText = "Running...";

      // Process prompt, replace in the variables
      const processedPrompt = prompt
        .replace(new RegExp("\\$SITE_HOSTNAME", "g"), new URL(lastUrl).hostname)
        .replace(new RegExp("\\$SCRIPT_DATA"), JSON.stringify(siteData));

      console.log(processedPrompt);

      fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
          model: "gpt-4-turbo",
          messages: [
            {
              role: "system",
              content:
                "You are a professional cold email copywriter. When you send a response, it can contain nothing but the email content. No extra messages to the human, simply the content.",
            },
            {
              role: "user",
              content: processedPrompt,
            },
          ],
        }),
      }).then(async (res) => {
        document.getElementById("cside-run-prompt")!.innerText = "Run Prompt";

        const data = await res.json();
        console.log(data);

        const message = data.choices[0]?.message?.content ?? "No response";

        // Copy to clipboard
        navigator.clipboard.writeText(message).then(() => {
          alert("Response copied to clipboard!");
        });
      });
    });
  });

  document
    .getElementById("cside-edit-prompt")!
    .addEventListener("click", () => {
      console.log(promptPage);
      chrome.tabs.create({
        url: promptPage,
      });
    });
});
