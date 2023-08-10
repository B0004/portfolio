
//on page load, grab theme from html class, if 0, it's light, if 1, it's dark
var is_dark = false;
if (document.documentElement.classList.length > 0){
    is_dark = true;
    document.getElementById("darkmode-toggle").click();
}


// const darkObserver = new MutationObserver(entries => {
//     //check for pokemon selection box, if can find box, fill table
//     get_set();
// })

// mutationObserver.observe(document.documentElement, {childList: true, subtree: true})

// localStorage.setItem('key', 'value');
