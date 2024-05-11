let link = document.getElementById('custom-link');

link.addEventListener('mouseover', function() {
    link.style.color = 'red';
});


link.addEventListener('mouseout', function() {

    link.style.color = '';
});

console.log("loaded");