console.log("Prompt page loaded");

document.addEventListener("readystatechange", () => {
  if (document.readyState !== "complete") {
    return;
  }

  let lastKey = "";
  let lastPrompt = "";
  chrome.storage.sync.get(["cside_oai_key", "cside_prompt"], (results) => {
    console.log(results);
    lastKey = results.cside_oai_key ?? "";
    lastPrompt = results.cside_prompt ?? "";

    console.log("Loaded", lastKey, lastPrompt);
    const keyInput = document.getElementById(
      "cside-openai-key"
    ) as HTMLInputElement;
    const promptInput = document.getElementById(
      "cside-openai-prompt"
    ) as HTMLTextAreaElement;

    // Place into fields
    keyInput.value = lastKey;
    promptInput.value = lastPrompt;

    // Now loaded, register the event listeners
    document
      .getElementById("cside-openai-save")!
      .addEventListener("click", () => {
        lastKey = keyInput.value;
        lastPrompt = promptInput.value;
        console.log("Updating to", lastKey, lastPrompt);

        chrome.storage.sync.set(
          {
            cside_oai_key: lastKey,
            cside_prompt: lastPrompt,
          },
          () => {
            console.log("Saved");
            alert("Saved!");
          }
        );
      });
  });
});
