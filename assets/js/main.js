document.addEventListener('DOMContentLoaded', () => {
    // Dashboard Hamburger Toggle - RUN EARLY
    const dashboardHamburger = document.getElementById('dashboard-hamburger');
    const dashboardSidebar = document.querySelector('.sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');

    if (dashboardHamburger) {
        const sidebarClose = document.getElementById('sidebar-close');

        dashboardHamburger.addEventListener('click', (e) => {
            e.stopPropagation();
            dashboardSidebar.classList.toggle('active');
            sidebarOverlay.classList.toggle('active');
        });

        const closeSidebar = () => {
            dashboardSidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
        };

        if (sidebarClose) {
            sidebarClose.addEventListener('click', closeSidebar);
        }

        sidebarOverlay.addEventListener('click', closeSidebar);
    }

    // Dashboard Tabs Switching
    const dashboardSidebarLinks = document.querySelectorAll('.sidebar ul li a[data-section]');
    const dashboardSections = document.querySelectorAll('.dashboard-content');

    if (dashboardSidebarLinks.length > 0) {
        dashboardSidebarLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSectionId = link.getAttribute('data-section');

                // Update active link
                dashboardSidebarLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');

                // Show target section
                dashboardSections.forEach(section => {
                    section.classList.remove('active');
                    if (section.id === targetSectionId) {
                        section.classList.add('active');
                    }
                });

                // Update URL hash without jumping
                history.pushState(null, null, `#${targetSectionId}`);
                
                // Close sidebar on mobile after selection
                if (window.innerWidth <= 992) {
                    dashboardSidebar.classList.remove('active');
                    sidebarOverlay.classList.remove('active');
                }
            });
        });

        // Handle initial hash in URL
        const currentHash = window.location.hash.substring(1);
        if (currentHash) {
            const initialLink = document.querySelector(`.sidebar ul li a[data-section="${currentHash}"]`);
            if (initialLink) {
                initialLink.click();
            }
        }
    }

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (themeToggle) updateThemeIcon(currentTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            let newTheme = theme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        if (!themeToggle) return;
        themeToggle.innerHTML = theme === 'light' ? '🌙' : '☀️';
    }

    // RTL Toggle
    const rtlToggles = document.querySelectorAll('#rtl-toggle, #rtl-toggle-mobile');
    let isRTL = localStorage.getItem('rtl') === 'true';
    
    if (isRTL) {
        document.documentElement.setAttribute('dir', 'rtl');
    }

    rtlToggles.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            isRTL = !isRTL;
            document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
            localStorage.setItem('rtl', isRTL);
        });
    });

    // Mobile Menu (Main Site)
    const hamburger = document.getElementById('hamburger');
    const nav = document.querySelector('nav');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }

    // Scroll Animations
    const observerOptions = { threshold: 0.2 };
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const animationClass = entry.target.dataset.animation;
                entry.target.classList.add(animationClass);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate').forEach(el => observer.observe(el));

    // Header Scroll Effect
    window.addEventListener('scroll', () => {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 50) {
                header.style.padding = '10px 0';
                header.style.background = 'var(--header-bg)';
            } else {
                header.style.padding = '0';
            }
        }
    });

    // Password Toggle
    document.querySelectorAll('.toggle-password').forEach(btn => {
        btn.addEventListener('click', function() {
            const passwordField = document.querySelector(this.getAttribute('data-target'));
            const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
            passwordField.setAttribute('type', type);
            this.textContent = type === 'password' ? '👁️' : '🙈';
        });
    });

    // Back to Top
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) backToTop.classList.add('visible');
            else backToTop.classList.remove('visible');
        });
        backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    }
});
