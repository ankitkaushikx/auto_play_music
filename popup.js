document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("startButton");
  const stopButton = document.getElementById("stopButton");
  let intervalId; // Define intervalId outside of event listeners

  startButton.addEventListener("click", function () {
    var intervalStart = parseInt(document.getElementById("interval-start-input").value);
    var intervalEnd = parseInt(document.getElementById("interval-end-input").value);
    var interval = getRandomNumber(intervalStart, intervalEnd);
    document.querySelector("#intervalSpan").textContent = interval / 1000 + " s";
    var selectedOption = document.querySelector('input[name="option"]:checked');
    var selector = "";
    var selectorType = "";
    switch (
      selectedOption.value // Compare selectedOption.value
    ) {
      case "appleMusic":
        selector = "next";
        selectorType = "class";
        break;
      case "spotify":
        selector = "mnipjT4SLDMgwiDCEnRC";
        selectorType = "class";
        break;
      case "jioSavan":
        selector = "player_next";
        selectorType = "id";
        break;
      case "wynk":
        selector = "playerNext";
        selectorType = "dataset";
        break; // Add break statement
      case "youtubeMusic":
        selector = "next-button";
        selectorType = "class";
        break;
      case "deezer":
        selector = "next_track_button";
        selectorType = "dataset";
        break;
      default: // Add default case
        console.error("Invalid option selected");
        return;
    }
    console.log(selector, selectorType);
    chrome.runtime.sendMessage(
      {
        action: "startClicking",
        selector: selector,
        type: selectorType,
        interval: interval / 1000,
        website: selectedOption.value,
      },
      function (response) {
        console.log(response);
      }
    );
  });

  stopButton.addEventListener("click", function () {
    chrome.runtime.sendMessage({ action: "stopClicking", intervalId: intervalId }, function (response) {
      console.log(response);
    });
  });

  // RANDOM NUMBER GENERATOR
  function getRandomNumber(min, max) {
    // Generate a random integer between min (inclusive) and max (inclusive)
    return (Math.floor(Math.random() * (max - min + 1)) + min) * 1000;
  }
});
