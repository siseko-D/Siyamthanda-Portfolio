// Footer scroll‑trigger animation
document.addEventListener('DOMContentLoaded', function () {
    const footer = document.getElementById('footer');
    if (footer) {
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    footer.classList.add('visible');
                }
            });
        }, {
            threshold: 0.15
        });
        observer.observe(footer);
    }
});