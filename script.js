    function showTime() {
        var date = new Date(); // Get the current date and time
        var options = { hour: '2-digit', minute: '2-digit' }; // Options to get hours and minutes only
        var time = date.toLocaleTimeString([], options); // Convert time to a human-readable string without seconds
        
        document.getElementById('current-time').innerText = time; // Display the time in the timeDisplay element
        setTimeout(showTime, 1000); // Update the time every second
        
    }
    showTime(); // Initial call to start the function
    // checkHour();

    function updateGreeting() {
        var date = new Date(); // Get the current date and time
        var hour = date.getHours(); // Get the current hour
        var greeting;
        
        if (hour >= 5 && hour < 12) {
            greeting = "Good morning, I'm";
        } else if (hour >= 12 && hour < 18) {
            greeting = "Good afternoon, I'm";
        } else {
            greeting = "Good evening, I'm";
        }
    
        document.querySelector('#landing .not-dog-container p').innerText = greeting; // Update the greeting
        setTimeout(updateGreeting, 60000); // Update the greeting every minute
    }
    updateGreeting(); 

// Select all radio buttons with name 'project-type-input'
    // Get references to the radio buttons and project containers
    const radioButtons = document.querySelectorAll('input[name="project-type-input"]');
    const projectContainers = document.querySelectorAll('.project-container');

    // Function to hide all project containers
    function hideAllContainers() {
        projectContainers.forEach(container => {
            container.style.display = 'none';
        });
    }

    // Function to show the selected project container
    function showSelectedContainer() {
        const selectedButton = document.querySelector('input[name="project-type-input"]:checked');
        const selectedContainer = document.getElementById(selectedButton.value);
        if (selectedContainer) {
            selectedContainer.style.display = 'flex';
        }
    }

    // Initial setup: hide all containers and show the one corresponding to the checked radio button
    hideAllContainers();
    showSelectedContainer();

    // Add change event listener to each radio button
    radioButtons.forEach(radio => {
        radio.addEventListener('change', () => {
            hideAllContainers();
            showSelectedContainer();
        });
    });

