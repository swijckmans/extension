console.log("Prompt page loaded");
document.addEventListener("readystatechange", ()=>{
    if (document.readyState !== "complete") return;
    let lastKey = "";
    let lastPrompt = "";
    chrome.storage.sync.get([
        "cside_oai_key",
        "cside_prompt"
    ], (results)=>{
        console.log(results);
        lastKey = results.cside_oai_key ?? "";
        lastPrompt = results.cside_prompt ?? "";
        console.log("Loaded", lastKey, lastPrompt);
        const keyInput = document.getElementById("cside-openai-key");
        const promptInput = document.getElementById("cside-openai-prompt");
        // Place into fields
        keyInput.value = lastKey;
        promptInput.value = lastPrompt;
        // Now loaded, register the event listeners
        document.getElementById("cside-openai-save").addEventListener("click", ()=>{
            lastKey = keyInput.value;
            lastPrompt = promptInput.value;
            console.log("Updating to", lastKey, lastPrompt);
            chrome.storage.sync.set({
                cside_oai_key: lastKey,
                cside_prompt: lastPrompt
            }, ()=>{
                console.log("Saved");
                alert("Saved!");
            });
        });
    });
});

//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJtYXBwaW5ncyI6IkFBQUEsUUFBUSxHQUFHLENBQUM7QUFFWixTQUFTLGdCQUFnQixDQUFDLG9CQUFvQjtJQUM1QyxJQUFJLFNBQVMsVUFBVSxLQUFLLFlBQzFCO0lBR0YsSUFBSSxVQUFVO0lBQ2QsSUFBSSxhQUFhO0lBQ2pCLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUM7UUFBQztRQUFpQjtLQUFlLEVBQUUsQ0FBQztRQUMxRCxRQUFRLEdBQUcsQ0FBQztRQUNaLFVBQVUsUUFBUSxhQUFhLElBQUk7UUFDbkMsYUFBYSxRQUFRLFlBQVksSUFBSTtRQUVyQyxRQUFRLEdBQUcsQ0FBQyxVQUFVLFNBQVM7UUFDL0IsTUFBTSxXQUFXLFNBQVMsY0FBYyxDQUN0QztRQUVGLE1BQU0sY0FBYyxTQUFTLGNBQWMsQ0FDekM7UUFHRixvQkFBb0I7UUFDcEIsU0FBUyxLQUFLLEdBQUc7UUFDakIsWUFBWSxLQUFLLEdBQUc7UUFFcEIsMkNBQTJDO1FBQzNDLFNBQ0csY0FBYyxDQUFDLHFCQUNmLGdCQUFnQixDQUFDLFNBQVM7WUFDekIsVUFBVSxTQUFTLEtBQUs7WUFDeEIsYUFBYSxZQUFZLEtBQUs7WUFDOUIsUUFBUSxHQUFHLENBQUMsZUFBZSxTQUFTO1lBRXBDLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQ3JCO2dCQUNFLGVBQWU7Z0JBQ2YsY0FBYztZQUNoQixHQUNBO2dCQUNFLFFBQVEsR0FBRyxDQUFDO2dCQUNaLE1BQU07WUFDUjtRQUVKO0lBQ0o7QUFDRiIsInNvdXJjZXMiOlsiYXBwcy9tYXJrZXRpbmctY2hyb21lLWV4dC9zcmMvcHJvbXB0LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnNvbGUubG9nKFwiUHJvbXB0IHBhZ2UgbG9hZGVkXCIpO1xuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwicmVhZHlzdGF0ZWNoYW5nZVwiLCAoKSA9PiB7XG4gIGlmIChkb2N1bWVudC5yZWFkeVN0YXRlICE9PSBcImNvbXBsZXRlXCIpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgbGFzdEtleSA9IFwiXCI7XG4gIGxldCBsYXN0UHJvbXB0ID0gXCJcIjtcbiAgY2hyb21lLnN0b3JhZ2Uuc3luYy5nZXQoW1wiY3NpZGVfb2FpX2tleVwiLCBcImNzaWRlX3Byb21wdFwiXSwgKHJlc3VsdHMpID0+IHtcbiAgICBjb25zb2xlLmxvZyhyZXN1bHRzKTtcbiAgICBsYXN0S2V5ID0gcmVzdWx0cy5jc2lkZV9vYWlfa2V5ID8/IFwiXCI7XG4gICAgbGFzdFByb21wdCA9IHJlc3VsdHMuY3NpZGVfcHJvbXB0ID8/IFwiXCI7XG5cbiAgICBjb25zb2xlLmxvZyhcIkxvYWRlZFwiLCBsYXN0S2V5LCBsYXN0UHJvbXB0KTtcbiAgICBjb25zdCBrZXlJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFxuICAgICAgXCJjc2lkZS1vcGVuYWkta2V5XCJcbiAgICApIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgY29uc3QgcHJvbXB0SW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcbiAgICAgIFwiY3NpZGUtb3BlbmFpLXByb21wdFwiXG4gICAgKSBhcyBIVE1MVGV4dEFyZWFFbGVtZW50O1xuXG4gICAgLy8gUGxhY2UgaW50byBmaWVsZHNcbiAgICBrZXlJbnB1dC52YWx1ZSA9IGxhc3RLZXk7XG4gICAgcHJvbXB0SW5wdXQudmFsdWUgPSBsYXN0UHJvbXB0O1xuXG4gICAgLy8gTm93IGxvYWRlZCwgcmVnaXN0ZXIgdGhlIGV2ZW50IGxpc3RlbmVyc1xuICAgIGRvY3VtZW50XG4gICAgICAuZ2V0RWxlbWVudEJ5SWQoXCJjc2lkZS1vcGVuYWktc2F2ZVwiKSFcbiAgICAgIC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgICBsYXN0S2V5ID0ga2V5SW5wdXQudmFsdWU7XG4gICAgICAgIGxhc3RQcm9tcHQgPSBwcm9tcHRJbnB1dC52YWx1ZTtcbiAgICAgICAgY29uc29sZS5sb2coXCJVcGRhdGluZyB0b1wiLCBsYXN0S2V5LCBsYXN0UHJvbXB0KTtcblxuICAgICAgICBjaHJvbWUuc3RvcmFnZS5zeW5jLnNldChcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjc2lkZV9vYWlfa2V5OiBsYXN0S2V5LFxuICAgICAgICAgICAgY3NpZGVfcHJvbXB0OiBsYXN0UHJvbXB0LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coXCJTYXZlZFwiKTtcbiAgICAgICAgICAgIGFsZXJ0KFwiU2F2ZWQhXCIpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwidmVyc2lvbiI6MywiZmlsZSI6InByb21wdC5iZGFiNjg1Yi5qcy5tYXAifQ==
