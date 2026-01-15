// Background service worker for the extension

// Listen for extension installation
chrome.runtime.onInstalled.addListener(() => {
  console.log('Schema Markup Auditor installed');
});

// Handle messages from popup or content scripts
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'analyzeSchema') {
    // This can be extended for background processing if needed
    sendResponse({ success: true });
  }
  return true;
});
