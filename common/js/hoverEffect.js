document.addEventListener('DOMContentLoaded', function () {
    const joinButtons = document.querySelectorAll('.community-footer-join');
    
    joinButtons.forEach((joinButton) => {
        let cooldown = false;
        let hoverInterval;

        function activateEffect() {
            if (!cooldown) {
                joinButton.classList.add('hover');
                cooldown = true;
                setTimeout(() => {
                    joinButton.classList.remove('hover');
                    setTimeout(() => {
                        cooldown = false;
                        if (hoverInterval) {
                            activateEffect();
                        }
                    }, 2000);
                }, 500);
            }
        }

        joinButton.addEventListener('mouseenter', () => {
            hoverInterval = setInterval(activateEffect); 
            activateEffect(); 
        });

        joinButton.addEventListener('mouseleave', () => {
            clearInterval(hoverInterval);
            hoverInterval = null;
        });
    });
});