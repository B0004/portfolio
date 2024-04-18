// This function will parse the HTML table and convert it into a JavaScript object
// where each entry is indexed by the move's name
function parseTableToNamedObjects() {
    // Get the table row elements from the DOM. Adjust the selector if necessary to target your specific table
    var rows = document.querySelectorAll("table tr");

    // Initialize an empty object to store each row's data, indexed by the move's name
    var tableData = {};

    // Loop through each row in the table except for the first one, which is the header
    for (var i = 1; i < rows.length; i++) {
        var cells = rows[i].cells;

        // Extract the move name for use as the key in the resulting object
        var moveName = cells[1].innerText.trim();

        // Create an object to store data for the current row, parsing the cell data as needed
        tableData[moveName] = {
            number: parseInt(cells[0].innerText.trim(), 10),
            type: cells[2].innerText.trim(),
            category: cells[3].innerText.trim(),
            pp: parseInt(cells[4].innerText.trim(), 10),
            power: parseInt(cells[5].innerText.trim(), 10),
            accuracy: cells[6].innerText.trim(),
            generation: cells[7].innerText.trim()
        };
    }

    // Return the object containing all rows' data indexed by move names
    return tableData;
}

// Call the function and assign the result to a variable or log it
var parsedTableData = parseTableToNamedObjects();
console.log(parsedTableData);
