// Skills Carousel - Fade In Directly to Final State
document.addEventListener('DOMContentLoaded', function() {
    initCarousel('technical-skills-carousel', 'technical-skills-track');
    initCarousel('soft-skills-carousel', 'soft-skills-track');
});

function initCarousel(containerId, trackId) {
    const container = document.getElementById(containerId);
    const track = document.getElementById(trackId);
    
    if (!container || !track) return;
    
    const leftArrow = container.querySelector('.carousel-arrow.left');
    const rightArrow = container.querySelector('.carousel-arrow.right');
    const cards = Array.from(track.children);
    
    if (cards.length === 0) return;
    
    let currentIndex = 2; // Start with third card as center (adjust based on your card count)
    const totalCards = cards.length;
    
    // STEP 1: START INVISIBLE (but already in carousel formation)
    track.style.position = 'relative';
    track.style.height = '350px';
    track.style.opacity = '0';
    track.style.transition = 'opacity 1.2s cubic-bezier(0.4, 0, 0.2, 1)';
    
    // Position all cards in their FINAL CAROUSEL POSITIONS immediately
    cards.forEach((card, index) => {
        card.style.position = 'absolute';
        card.style.left = '50%';
        card.style.top = '50%';
        card.style.width = '260px';
        card.style.transition = 'all 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)';
        card.style.margin = '0';
        
        // Set initial positions based on index
        if (index === currentIndex) {
            // CENTER
            card.style.transform = 'translate(-50%, -50%) scale(1)';
            card.style.opacity = '1';
            card.style.zIndex = '10';
            card.style.filter = 'blur(0)';
            card.style.visibility = 'visible';
        }
        else if (index === currentIndex - 1 || (currentIndex === 0 && index === totalCards - 1)) {
            // LEFT SIDE (previous)
            card.style.transform = 'translate(calc(-50% - 140px), -50%) scale(0.85)';
            card.style.opacity = '0.7';
            card.style.zIndex = '5';
            card.style.filter = 'blur(1px)';
            card.style.visibility = 'visible';
        }
        else if (index === currentIndex + 1 || (currentIndex === totalCards - 1 && index === 0)) {
            // RIGHT SIDE (next)
            card.style.transform = 'translate(calc(-50% + 140px), -50%) scale(0.85)';
            card.style.opacity = '0.7';
            card.style.zIndex = '5';
            card.style.filter = 'blur(1px)';
            card.style.visibility = 'visible';
        }
        else {
            // HIDDEN
            card.style.opacity = '0';
            card.style.visibility = 'hidden';
        }
    });
    
    // STEP 2: FADE IN WHEN VISIBLE
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // GENTLY FADE IN THE ENTIRE CAROUSEL
                setTimeout(() => {
                    track.style.opacity = '1';
                    
                    // Slightly delay arrows for extra smoothness
                    setTimeout(() => {
                        leftArrow.classList.add('visible');
                        rightArrow.classList.add('visible');
                    }, 400);
                }, 200);
                
                observer.unobserve(container);
            }
        });
    }, { threshold: 0.2 });
    
    observer.observe(container);
    
    // STEP 3: CAROUSEL NAVIGATION
    leftArrow.addEventListener('click', (e) => {
        e.preventDefault();
        currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        updateCarousel();
    });
    
    rightArrow.addEventListener('click', (e) => {
        e.preventDefault();
        currentIndex = (currentIndex + 1) % totalCards;
        updateCarousel();
    });
    
    function updateCarousel() {
        cards.forEach((card, index) => {
            if (index === currentIndex) {
                // CENTER
                card.style.transform = 'translate(-50%, -50%) scale(1)';
                card.style.opacity = '1';
                card.style.zIndex = '10';
                card.style.filter = 'blur(0)';
                card.style.visibility = 'visible';
            }
            else if (index === currentIndex - 1 || (currentIndex === 0 && index === totalCards - 1)) {
                // LEFT SIDE
                card.style.transform = 'translate(calc(-50% - 140px), -50%) scale(0.85)';
                card.style.opacity = '0.7';
                card.style.zIndex = '5';
                card.style.filter = 'blur(1px)';
                card.style.visibility = 'visible';
            }
            else if (index === currentIndex + 1 || (currentIndex === totalCards - 1 && index === 0)) {
                // RIGHT SIDE
                card.style.transform = 'translate(calc(-50% + 140px), -50%) scale(0.85)';
                card.style.opacity = '0.7';
                card.style.zIndex = '5';
                card.style.filter = 'blur(1px)';
                card.style.visibility = 'visible';
            }
            else {
                // HIDDEN
                card.style.opacity = '0';
                card.style.visibility = 'hidden';
            }
        });
    }
}