document.addEventListener('DOMContentLoaded', function() {
    const item = document.querySelector('.header-footer-scroll');
    const container = document.querySelector('.container');

    item.addEventListener('click', function() {
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});