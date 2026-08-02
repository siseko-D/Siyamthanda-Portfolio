// Premium Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuButton = document.getElementById("mobile-menu-button");
    const mobileMenu = document.getElementById("mobile-menu");
    const closeMenu = document.getElementById("close-menu");
    const menuOverlay = document.getElementById("menu-overlay");
    const hamburgerPremium = document.querySelector(".hamburger-premium");

    // Check if elements exist
    if (!mobileMenuButton || !mobileMenu || !menuOverlay) {
        console.error("Mobile menu elements not found!");
        return;
    }

    console.log("Mobile menu elements loaded:", { mobileMenuButton, mobileMenu, menuOverlay });

    // Toggle mobile menu
    mobileMenuButton.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("Menu button clicked");
        toggleMobileMenu(true);
    });

    closeMenu.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        console.log("Close button clicked");
        toggleMobileMenu(false);
    });

    // Close menu when clicking overlay
    menuOverlay.addEventListener("click", (e) => {
        if (e.target === menuOverlay) {
            console.log("Overlay clicked");
            toggleMobileMenu(false);
        }
    });

    // Close menu when clicking ESC key
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && mobileMenu.classList.contains("active")) {
            console.log("ESC key pressed");
            toggleMobileMenu(false);
        }
    });

    // Function to toggle mobile menu
    function toggleMobileMenu(open) {
        console.log("Toggle menu called with open:", open);

        if (open) {
            // Open menu
            mobileMenu.classList.add("active");
            menuOverlay.classList.add("active");
            if (hamburgerPremium) hamburgerPremium.classList.add("active");
            document.body.classList.add("overflow-hidden");
            console.log("Menu opened");
        } else {
            // Close menu
            mobileMenu.classList.remove("active");
            menuOverlay.classList.remove("active");
            if (hamburgerPremium) hamburgerPremium.classList.remove("active");
            document.body.classList.remove("overflow-hidden");
            console.log("Menu closed");
        }
    }

    // Close menu when clicking nav links
    const navLinks = document.querySelectorAll(".nav-link-mobile");
    navLinks.forEach((link) => {
        link.addEventListener("click", () => {
            console.log("Nav link clicked");
            toggleMobileMenu(false);
        });
    });

    // Navbar scroll effect
    const header = document.getElementById("navbar-header");
    if (header) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 20) {
                header.classList.add("scrolled", "shadow-lg");
            } else {
                header.classList.remove("scrolled", "shadow-lg");
            }
        });
    }

    // Enhanced active link highlighting for mobile menu
    window.addEventListener("scroll", () => {
        const sections = document.querySelectorAll("section");
        const scrollPosition = window.scrollY + 100;

        // Remove active classes from all mobile links
        document.querySelectorAll(".nav-link-mobile").forEach((link) => {
            link.classList.remove("active");
        });

        sections.forEach((section) => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute("id");

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Update desktop nav links
                document.querySelectorAll(".nav-link").forEach((link) => {
                    link.classList.remove("text-[#87CEEB]", "font-bold");
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("text-[#87CEEB]", "font-bold");
                    }
                });

                // Update mobile nav links
                document.querySelectorAll(".nav-link-mobile").forEach((link) => {
                    if (link.getAttribute("href") === `#${sectionId}`) {
                        link.classList.add("active");
                    }
                });
            }
        });
    });

    // Add touch swipe to close menu on mobile
    let touchStartX = 0;
    let touchEndX = 0;

    if (mobileMenu) {
        mobileMenu.addEventListener("touchstart", (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        mobileMenu.addEventListener("touchend", (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;

        // If swipe right (close gesture)
        if (swipeDistance > swipeThreshold && mobileMenu.classList.contains("active")) {
            toggleMobileMenu(false);
        }
    }

    // Initialize menu state
    mobileMenu.style.visibility = "visible";
    console.log("Mobile menu initialized");
});