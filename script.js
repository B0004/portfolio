function showTime() {
    var date = new Date(); // Get the current date and time
    var time = date.toLocaleTimeString(); // Convert time to a human-readable string
    
    document.getElementById('current-time').innerText = time; // Display the time in the timeDisplay element
    setTimeout(showTime, 1000); // Update the time every second
    
}



// function checkHour(){
//     var date = new Date(); // Get the current date and time
//     var hours = date.getHours(); // Get the current hour in 24-hour format
    
//     if (hours == 17) { // 17 is 5 PM in 24-hour format
//         // Apply daytime colors
//         console.log(hours, 'day');
//         document.documentElement.style.setProperty('--t1', '#2D2D2D');
//         document.documentElement.style.setProperty('--t2', '#1F86D1');
//         document.documentElement.style.setProperty('--b1', '#C3EAFF');
//         document.documentElement.style.setProperty('--b2', '#F0FAFF');
//         document.querySelector('label:has(input[type="radio"]:checked)::before').style.backgroundImage = "url('assets/black_triangle.svg')";
        
//     } else {
//         console.log(hours, 'night');
//         // Apply evening colors
//         document.documentElement.style.setProperty('--t1', '#F4E7A3');
//         document.documentElement.style.setProperty('--t2', '#F4E7A3');
//         document.documentElement.style.setProperty('--b1', '#473591');
//         document.documentElement.style.setProperty('--b2', '#1F86D1');
//     }
//     setTimeout(checkHour, 60000); // Update the hour every min
// }

showTime(); // Initial call to start the function
// checkHour();

var docWidth = document.documentElement.offsetWidth;

[].forEach.call(
  document.querySelectorAll('*'),
  function(el) {
    if (el.offsetWidth > docWidth) {
      console.log(el);
    }
  }
);