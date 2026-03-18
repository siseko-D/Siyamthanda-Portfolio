// Project Filter Functionality
document.addEventListener('DOMContentLoaded', function() {
    initProjectFilters();
});

function initProjectFilters() {
    const categoryTabs = document.querySelectorAll('.category-tab');
    const projectCards = document.querySelectorAll('.project-card');
    const projectsGrid = document.getElementById('projects-grid');
    
    if (!categoryTabs.length || !projectCards.length) return;
    
    // Set initial active state (show all)
    document.querySelector('.category-tab[data-category="all"]').classList.add('active');
    
    // Add click handlers to each tab
    categoryTabs.forEach(tab => {
        tab.addEventListener('click', function(e) {
            e.preventDefault();
            
            const category = this.getAttribute('data-category');
            
            // Update active tab
            categoryTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            filterProjects(category);
        });
    });
    
    function filterProjects(category) {
        let visibleCount = 0;
        
        projectCards.forEach(card => {
            const cardCategories = card.getAttribute('data-categories').split(' ');
            
            if (category === 'all' || cardCategories.includes(category)) {
                // Show card
                card.style.display = 'flex';
                setTimeout(() => {
                    card.classList.remove('fade-out');
                }, 50);
                visibleCount++;
            } else {
                // Hide card
                card.classList.add('fade-out');
                setTimeout(() => {
                    if (card.classList.contains('fade-out')) {
                        card.style.display = 'none';
                    }
                }, 500);
            }
        });
        
        // Handle empty state
        handleEmptyState(category, visibleCount);
    }
    
    function handleEmptyState(category, visibleCount) {
        // Remove existing empty state
        const existingEmpty = document.querySelector('.empty-category');
        if (existingEmpty) {
            existingEmpty.remove();
        }
        
        // If no projects visible and not "all" category, show empty state
        if (visibleCount === 0 && category !== 'all') {
            const emptyState = createEmptyState(category);
            projectsGrid.appendChild(emptyState);
        }
    }
    
    function createEmptyState(category) {
        const categoryNames = {
            'angular': 'Angular',
            'csharp': 'C# .NET',
            'react': 'React',
            'python': 'Python',
            'html-css-js': 'HTML, CSS & JavaScript',
            'figma': 'Figma Prototypes'
        };
        
        const div = document.createElement('div');
        div.className = 'empty-category';
        div.innerHTML = `
            <div class="empty-category-icon">🚀</div>
            <h3>${categoryNames[category] || category} Projects Coming Soon</h3>
            <p>I'm currently working on exciting ${categoryNames[category] || category} projects.</p>
            <p style="margin-top: 20px; font-size: 0.9rem; color: #87CEEB;">Check back soon for updates!</p>
        `;
        return div;
    }
}