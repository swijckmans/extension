import { Messages } from "./types";

console.log("cside Background script running...");

const siteStorage = new Map<string, Set<string>>();
const pageStorage = new Map<string, Set<string>>();

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    if (
      details.type !== "script" ||
      details.method !== "GET" ||
      details.tabId === -1
    ) {
      return;
    }

    void new Promise<void>(async (resolve) => {
      const tab = await new Promise<chrome.tabs.Tab>((resolve) =>
        chrome.tabs.get(details.tabId, resolve)
      );

      if (!tab.url) {
        return;
      }

      const { hostname, pathname } = new URL(tab.url);
      if (hostname === new URL(details.url).hostname) {
        return; // This site.
      }

      const host = siteStorage.get(hostname) || new Set<string>();
      host.add(details.url);
      siteStorage.set(hostname, host);

      const hostPathCombo = `${hostname}${pathname}`;
      const page = pageStorage.get(hostPathCombo) || new Set<string>();
      page.add(details.url);
      pageStorage.set(hostPathCombo, page);

      resolve();
    });
  },
  {
    urls: ["<all_urls>"],
  },
  ["blocking"]
);

chrome.runtime.onMessage.addListener(
  (message: Messages, sender, sendResponse) => {
    if (message.type === "request-data") {
      const { url } = message.payload;
      const { hostname, pathname } = new URL(url);

      console.log("getting data for", hostname, pathname);

      const host = siteStorage.get(hostname) || new Set<string>();
      const page =
        pageStorage.get(`${hostname}${pathname}`) || new Set<string>();

      sendResponse({
        siteData: Array.from(host),
        pageData: Array.from(page),
      });
    }
  }
);
