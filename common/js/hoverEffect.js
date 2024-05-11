let link = document.getElementById('custom-link');

// Add event listener for mouseover event
link.addEventListener('mouseover', function() {
    // Change the color to red on mouseover
    link.style.color = 'red';
});

// Add event listener for mouseout event
link.addEventListener('mouseout', function() {
    // Change the color back to the default color on mouse release
    link.style.color = ''; // Reset to default color
});