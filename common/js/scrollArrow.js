document.addEventListener('DOMContentLoaded', function() {
    const item = document.querySelector('.header-footer-scroll');
    const container = document.querySelector('.main-header');

    item.addEventListener('click', function() {
        container.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
});