var targetElements = document.querySelectorAll('#contents > ytmusic-responsive-list-item-renderer:nth-child(n) > div.flex-columns.style-scope.ytmusic-responsive-list-item-renderer > div.title-column.style-scope.ytmusic-responsive-list-item-renderer > yt-formatted-string');

for (var i = 0; i < targetElements.length; i++) {
  console.log(i);
  //(function (index) {
    var title_name = targetElements[i];
    var title_link = title_name.firstChild.getAttribute("href");
    console.log(title_name.textContent);

    // Create a new div element
    var rating = document.createElement('div');

    // Create Dropdown
    var dropdown = document.createElement("select");
    dropdown.style.backgroundColor = "#0c0f30";
    dropdown.classList.add("rating_dropdown");
    dropdown.id = title_link

    // Create the options for the dropdown
    var options = [
      { label: "_", color: "white", fontWeight: "bold" },
      { label: "S", color: "#ffb3b3", fontWeight: "bold" },
      { label: "A", color: "#ffdeb3", fontWeight: "bold" },
      { label: "B", color: "#fffeb3", fontWeight: "bold" },
      { label: "C", color: "#b5ffb3", fontWeight: "bold" },
      { label: "F", color: "#b3f6ff", fontWeight: "bold" }
    ];

    for (var j = 0; j < options.length; j++) {
      var option = document.createElement("option");
      option.value = options[j].label;
      option.text = options[j].label;
      option.style.color = options[j].color;
      option.style.fontWeight = options[j].fontWeight;
      dropdown.appendChild(option);
    }

    // Retrieve the stored value for this dropdown
    var storedValue = localStorage.getItem(title_link);
    if (storedValue !== null) {
      dropdown.value = storedValue;
      applyStyle(dropdown);
    }

    // Insert the new div element after the target element
    rating.appendChild(dropdown);
    title_name.parentNode.insertBefore(rating, title_name.nextSibling);

    // Additional CSS rules
    dropdown.style.color = "#fff"; // Set the text color of the dropdown
    dropdown.style.padding = "2px"; // Adjust padding if necessary
    dropdown.style.border = "none"; // Remove the border if necessary

    // Apply custom style to mimic the selected option
    dropdown.addEventListener("change", function () {
      applyStyle(this);

      // Store the selected value in local storage
      localStorage.setItem(this.id, this.value);
    });

    // Apply initial style when the page loads
    applyStyle(dropdown);
  //})(i);
}

function applyStyle(dropdown) {
  var selectedOption = dropdown.options[dropdown.selectedIndex];
  dropdown.style.color = selectedOption.style.color;
  dropdown.style.fontWeight = selectedOption.style.fontWeight;
}

