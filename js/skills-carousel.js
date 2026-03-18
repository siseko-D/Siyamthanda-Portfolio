// Skills Carousel for Technical & Soft Skills
document.addEventListener('DOMContentLoaded', function() {
    initSkillsCarousel('technical-skills-carousel', 'technical-skills-track');
    initSkillsCarousel('soft-skills-carousel', 'soft-skills-track');
});

function initSkillsCarousel(containerId, trackId) {
    const container = document.getElementById(containerId);
    const track = document.getElementById(trackId);
    
    if (!container || !track) {
        console.error(`Carousel elements not found: ${containerId}, ${trackId}`);
        return;
    }
    
    const leftArrow = container.querySelector('.carousel-arrow.left');
    const rightArrow = container.querySelector('.carousel-arrow.right');
    const cards = Array.from(track.children);
    
    if (cards.length === 0) {
        console.error('No cards found in carousel');
        return;
    }
    
    console.log(`Initializing carousel: ${containerId} with ${cards.length} cards`);
    
    let currentIndex = 0;
    const totalCards = cards.length;
    
    // Initial setup
    updateCarousel();
    
    // Event listeners for arrows
    if (leftArrow) {
        leftArrow.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Left arrow clicked');
            currentIndex = (currentIndex - 1 + totalCards) % totalCards;
            updateCarousel();
        });
    }
    
    if (rightArrow) {
        rightArrow.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Right arrow clicked');
            currentIndex = (currentIndex + 1) % totalCards;
            updateCarousel();
        });
    }
    
    function updateCarousel() {
        console.log(`Updating carousel to index: ${currentIndex}`);
        
        // Remove all classes first
        cards.forEach(card => {
            card.classList.remove('center', 'left', 'right', 'hidden');
        });
        
        // Calculate indices
        const prevIndex = (currentIndex - 1 + totalCards) % totalCards;
        const nextIndex = (currentIndex + 1) % totalCards;
        
        // Apply classes
        cards[prevIndex].classList.add('left');
        cards[currentIndex].classList.add('center');
        cards[nextIndex].classList.add('right');
        
        // Hide all other cards
        cards.forEach((card, index) => {
            if (index !== prevIndex && index !== currentIndex && index !== nextIndex) {
                card.classList.add('hidden');
            }
        });
    }
    
    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    
    container.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });
    
    container.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, { passive: true });
    
    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                // Swipe right - go to previous
                currentIndex = (currentIndex - 1 + totalCards) % totalCards;
            } else {
                // Swipe left - go to next
                currentIndex = (currentIndex + 1) % totalCards;
            }
            updateCarousel();
        }
    }
    
    // Reset carousel on window resize
    window.addEventListener('resize', function() {
        // Force reflow to ensure positions update
        updateCarousel();
    });
}