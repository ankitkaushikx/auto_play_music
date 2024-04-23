chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    chrome.tabs.sendMessage(tabs[0].id, message, function (response) {
      if (message.action === "startClicking" || message.action === "stopClicking") {
        // For start/stop clicking messages
        sendResponse(response); // Send back response received from content script
      } else if (message.text) {
        // For text messages
        sendResponse("clicked"); // Acknowledge receipt of message
      } else {
        sendResponse("Unhandled message"); // Handle any other message types
      }
    });
  });

  return true; // Indicates that sendResponse will be called asynchronously
});
