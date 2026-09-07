// content.js
// Injected into every page. Listens for messages from popup.js and
// toggles a highlight class on every <a> element on the page.

const HIGHLIGHT_CLASS = "__highlight-links-extension__";
const STYLE_ID = "__highlight-links-extension-style__";

let isActive = false;

function injectStyleOnce() {
  if (document.getElementById(STYLE_ID)) return;

  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = `
    .${HIGHLIGHT_CLASS} {
      background-color: #ffe066 !important;
      outline: 2px solid #f5b400 !important;
      border-radius: 2px !important;
      transition: background-color 0.15s ease, outline 0.15s ease;
    }
  `;
  document.head.appendChild(style);
}

function highlightAllLinks() {
  injectStyleOnce();
  document.querySelectorAll("a").forEach((link) => {
    link.classList.add(HIGHLIGHT_CLASS);
  });
}

function removeAllHighlights() {
  document.querySelectorAll(`a.${HIGHLIGHT_CLASS}`).forEach((link) => {
    link.classList.remove(HIGHLIGHT_CLASS);
  });
}

// Watch for dynamically added links (e.g. infinite scroll, SPA navigation)
// so newly inserted <a> tags get highlighted too while active.
const observer = new MutationObserver(() => {
  if (isActive) {
    highlightAllLinks();
  }
});

observer.observe(document.documentElement, { childList: true, subtree: true });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "TOGGLE_HIGHLIGHT") {
    isActive = !isActive;
    if (isActive) {
      highlightAllLinks();
    } else {
      removeAllHighlights();
    }
    sendResponse({ isActive });
  }

  if (message.type === "GET_STATE") {
    sendResponse({ isActive });
  }

  return true; // keep the message channel open for async sendResponse
});
