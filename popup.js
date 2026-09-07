// popup.js
// Runs when the popup opens. Sends a "toggle" message to the content script
// on the active tab, and updates the button/status text to reflect state.

const toggleBtn = document.getElementById("toggleBtn");
const statusEl = document.getElementById("status");

function setButtonState(isActive) {
  if (isActive) {
    toggleBtn.textContent = "Remove Highlights";
    toggleBtn.classList.add("active");
    statusEl.textContent = "Highlighting is on";
  } else {
    toggleBtn.textContent = "Highlight Links";
    toggleBtn.classList.remove("active");
    statusEl.textContent = "Highlighting is off";
  }
}

async function getActiveTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
}

// On popup open, ask the content script for the current state so the
// button reflects reality even if the popup was closed and reopened.
(async () => {
  try {
    const tab = await getActiveTab();
    const response = await chrome.tabs.sendMessage(tab.id, { type: "GET_STATE" });
    setButtonState(response?.isActive ?? false);
  } catch (err) {
    // Content script may not be injected yet (e.g. chrome:// pages) — ignore.
    statusEl.textContent = "Not available on this page";
    toggleBtn.disabled = true;
  }
})();

toggleBtn.addEventListener("click", async () => {
  try {
    const tab = await getActiveTab();
    const response = await chrome.tabs.sendMessage(tab.id, { type: "TOGGLE_HIGHLIGHT" });
    setButtonState(response?.isActive ?? false);
  } catch (err) {
    statusEl.textContent = "Could not toggle on this page";
  }
});
