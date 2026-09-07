# Highlight All Links

A simple Chrome/Edge browser extension that highlights every link (`<a>` tag)
on the current page with a single click. Click again to remove the
highlights. No dependencies, no build step — plain HTML, CSS, and JavaScript
using the Manifest V3 WebExtensions API.

## Features

- ✅ Click the extension icon to toggle highlighting on/off
- ✅ Highlights persist correctly per-tab and reflect the right state when you reopen the popup
- ✅ Automatically highlights new links added dynamically to the page (infinite scroll, SPAs, etc.)
- ✅ Lightweight — no frameworks, no build tools, no external libraries

## How it works

- **`manifest.json`** — Manifest V3 config declaring permissions and the popup/content script
- **`popup.html` / `popup.js`** — the small UI that appears when you click the extension icon; sends toggle messages to the page
- **`content.js`** — runs on the actual webpage; listens for messages and adds/removes a highlight CSS class on every `<a>` element
- **`icons/`** — extension icons (16px, 48px, 128px)

When you click the popup button, it sends a message to `content.js` running
on the page, which toggles a highlight style (yellow background + orange
outline) on every link. A `MutationObserver` also watches for new links
added to the page after the initial highlight, so dynamically loaded content
gets highlighted too while the toggle is on.

## Installation (load unpacked, for development/testing)

**Chrome / Edge / Brave:**

1. Go to `chrome://extensions` (or `edge://extensions`).
2. Enable **Developer mode** (top-right toggle).
3. Click **Load unpacked**.
4. Select the `highlight-links-extension` folder.
5. The extension icon should now appear in your toolbar.

## Usage

1. Navigate to any webpage.
2. Click the extension icon in your browser toolbar.
3. Click **"Highlight Links"** — every link on the page gets highlighted.
4. Click **"Remove Highlights"** to turn it off.

## Limitations

- Won't work on internal browser pages (`chrome://...`, the Chrome Web Store, etc.) — this is a browser security restriction on all extensions, not a bug.
- Highlighting resets if you reload or navigate to a new page (by design — the toggle is meant to be per-page-view, not persistent across navigation).