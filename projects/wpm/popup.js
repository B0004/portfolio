let isTiming = false;
let startTime;

document.getElementById('toggleTimer').addEventListener('click', function() {
    if (!isTiming) {
        chrome.runtime.sendMessage({ command: "startTimer" });
        isTiming = true;
        this.textContent = 'Stop Timer';
    } else {
        chrome.runtime.sendMessage({ command: "stopTimer" }, function(response) {
            document.getElementById('results').textContent = `Time: ${response.time} seconds, WPM: ${response.wpm}`;
        });
        isTiming = false;
        this.textContent = 'Start Timer';
    }
});
