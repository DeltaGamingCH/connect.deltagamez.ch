function highlightEffect() {
    const highlightButtons = document.querySelectorAll('.community-footer-join, .nav-item-button, .main-header-getstarted, .features-main-getstarted-button-item');
    
    highlightButtons.forEach((highlightButton) => {
        let cooldown = false;
        let hoverInterval;

        function activateEffect() {
            if (!cooldown) {
                highlightButton.classList.add('hover');
                cooldown = true;
                setTimeout(() => {
                    highlightButton.classList.remove('hover');
                    setTimeout(() => {
                        cooldown = false;
                        if (hoverInterval) {
                            activateEffect();
                        }
                    }, 2000);
                }, 500);
            }
        }

        highlightButton.addEventListener('mouseenter', () => {
            hoverInterval = setInterval(activateEffect); 
            activateEffect(); 
        });

        highlightButton.addEventListener('mouseleave', () => {
            clearInterval(hoverInterval);
            hoverInterval = null;
        });
    });
}

document.addEventListener('DOMContentLoaded', highlightEffect);
