document.addEventListener('DOMContentLoaded', () => {

    // --- Preloader ---
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        preloader.classList.add('hidden');
    });

    // --- Mobile Menu ---
    const menuBtn = document.getElementById("menu-btn");
    const mobileMenu = document.getElementById("mobile-menu");
    const mobileMenuLinks = mobileMenu.querySelectorAll("a");

    const toggleMenu = () => {
        const isHidden = mobileMenu.classList.contains("hidden");
        const icon = menuBtn.querySelector("i");

        if (isHidden) {
            mobileMenu.classList.remove("hidden");
            setTimeout(() => {
                mobileMenu.classList.add("open");
            }, 10); // Small delay to allow transition
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
            menuBtn.setAttribute('aria-expanded', 'true');
        } else {
            mobileMenu.classList.remove("open");
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
            menuBtn.setAttribute('aria-expanded', 'false');
            // Wait for transition to finish before hiding
            setTimeout(() => {
                mobileMenu.classList.add("hidden");
            }, 500);
        }
    };

    menuBtn.addEventListener("click", toggleMenu);

    // Close menu when a link is clicked
    mobileMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (mobileMenu.classList.contains('open')) {
                toggleMenu();
            }
        });
    });

    // --- Active Navigation Highlighting ---
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll("nav a");

    const activateLink = (id) => {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
                link.classList.add('active');
            }
        });
    };

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                activateLink(entry.target.id);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // --- Fade-in on Scroll ---
    const fadeInElements = document.querySelectorAll('section, footer > div');
    fadeInElements.forEach(el => el.classList.add('fade-in-element'));

    const fadeInObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    fadeInElements.forEach(element => {
        fadeInObserver.observe(element);
    });

    // --- Back to Top Button ---
    const backToTopButton = document.getElementById("back-to-top");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            backToTopButton.classList.remove("hidden");
            backToTopButton.classList.add("flex");
        } else {
            backToTopButton.classList.add("hidden");
            backToTopButton.classList.remove("flex");
        }
    });

    backToTopButton.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
});