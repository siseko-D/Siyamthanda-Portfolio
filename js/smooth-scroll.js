// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});

// Simple animation for section elements when they come into view
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("animate-fadeIn");
                
                // Special handling for projects section to trigger tab animations
                if (entry.target.id === 'projects') {
                    entry.target.classList.add('visible');
                }
            }
        });
    },
    { threshold: 0.1 }
);

// Observe card animations
document.querySelectorAll(".card-animation").forEach((box) => {
    observer.observe(box);
});

// Observe about section animations
document.querySelectorAll(".about-image-animate, .about-content-left, .about-content-right, .about-quote-animate").forEach((element) => {
    observer.observe(element);
});

// Observe contact section animations
document.querySelectorAll(".contact-info-animate, .contact-form-animate").forEach((element) => {
    observer.observe(element);
});

// Observe projects section for tab animations
const projectsSection = document.getElementById('projects');
if (projectsSection) {
    observer.observe(projectsSection);
}

// Add CSS for fadeIn animation
const style = document.createElement("style");
style.textContent = `
                .animate-fadeIn {
                    animation: fadeIn 1s ease-in-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(20px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                /* Ensure projects section doesn't have conflicting animation */
                #projects.animate-fadeIn {
                    animation: none;
                }
            `;
document.head.appendChild(style);