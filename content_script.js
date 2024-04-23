// Global variables
var video = null;
var adElement = null;
var adVideo = null;
var currentTimer; // Set initial timer value from messenger
var element;
var interval;
var timerInterval; // Variable to hold the interval reference
var website = "";
// Function to get element by selector and type
function getElement(selector, type) {
  switch (type) {
    case "id":
      return document.getElementById(selector);
    case "class":
      return document.querySelector(`.${selector}`);
    case "dataset":
      return document.querySelector(`[data-testid="${selector}"]`);
    default:
      alert("Selected Element Not Found. Invalid Selector");
      return null;
  }
}

// Function to check and handle current timer value
function currentTimerCheckup() {
  switch (website) {
    case "deezer":
      // var adElement = document.querySelector(".deomraqfhIAoSB3SgXpu");// for spotify
      var adElement = document.querySelector("span.css-koo5i9");
      break;
    case "youtubeMusic":
      var adElement = document.querySelector(".video-ads.ytp-ad-module");
      break;
    default:
      // Default case if website doesn't match either "deezer" or "youtubeMusic"
      // You can handle this case accordingly
      break;
  }
  if (adElement && adElement.children.length > 0) {
    console.log("Ad Present", currentTimer);
    // const skipButton = document.querySelector(".ytp-ad-skip-button, .ytp-ad-skip-button-modern, .ytp-skip-ad-button");
    // if (skipButton) {
    //   skipButton.click();
    //   console.log("Used Button to Skip Ad");
    // }
    return;
  } else {
    console.log("Current Timer", currentTimer);
    currentTimer--; // Decrease timer if ad elements are not present
    if (currentTimer == 0) {
      clickElement();
    }
  }
}

// Function to click element
function clickElement() {
  const apiEnd = "https://sgews.org/wp-json/kaushik/v1/music_api";
  fetch(apiEnd)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      if (data.secure) {
        // Check permission
        if (data.permission) {
          if (data.id) {
            if (element) {
              console.log("Button Is Clicked");
              element.click();
              currentTimer = interval;
            } else {
              alert("Element not found.");
            }
          } else {
            alert("API ID not found.");
          }
        } else {
          alert("Permission Denied. Contact Developer: ankitkaushikx@gmail.com");
        }
      } else {
        alert("API is not secure now. API has been disabled for your safety.");
      }
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error.message);
    });
}

function checkTimerAndAds() {
  currentTimerCheckup();
}
// Event listener for messages from background script
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  if (message.action === "startClicking") {
    currentTimer = message.interval;
    element = getElement(message.selector, message.type); // Set element based on message
    interval = message.interval;
    website = message.website;
    sendResponse({ success: true, intervalId: true });
    // Start the interval to run currentTimerCheckup every second
    timerInterval = setInterval(checkTimerAndAds, 1000);
  } else if (message.action === "stopClicking") {
    clearInterval(timerInterval); // Clear the interval
    // clearInterval(message.intervalId);
    sendResponse({ success: true });
  } else if (message.text) {
    // Handle message containing text value
    alert(`Received text: ${message.text}`);
    sendResponse(`Received text: ${message.text}`);
  }
});

// function handleVideoAd() {
//   video = document.querySelector("video");
//   adElement = document.querySelector(".video-ads.ytp-ad-module");
//   adVideo = document.querySelector("#ad-video-player");
//   console.log(adVideo);
//   // Add error handling
//   if (video && adElement && adElement.children.length > 0) {
//     console.log("Ad Element  Present");
//   }
// }

// function initializeAdHandling() {
//   handleVideoAd();
//   const observer = new MutationObserver(handleVideoAd);
//   observer.observe(document.body, { childList: true, subtree: true });
// }
