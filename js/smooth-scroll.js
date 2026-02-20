
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
            }
        });
    },
    { threshold: 0.1 }
);

document.querySelectorAll(".card-animation").forEach((box) => {
    observer.observe(box);
});

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
            `;
document.head.appendChild(style);