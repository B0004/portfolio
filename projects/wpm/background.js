let timer = false;
let startTime;

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.command === "startTimer") {
        startTime = new Date().getTime();
        timer = true;
    } else if (request.command === "stopTimer") {
        let endTime = new Date().getTime();
        let timeTaken = (endTime - startTime) / 1000;
        timer = false;
        chrome.tabs.executeScript({
            code: 'window.getSelection().toString();'
        }, function(selection) {
            let wordCount = selection[0].split(/\s+/).length;
            let wpm = (wordCount / timeTaken) * 60;
            sendResponse({ time: timeTaken, wpm: wpm });
        });
        return true; // Indicates asynchronous response.
    }
});
