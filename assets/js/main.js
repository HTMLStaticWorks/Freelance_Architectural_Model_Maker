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
                
                // Scroll to top on section change
                window.scrollTo({ top: 0, behavior: 'auto' });

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
        const header = document.querySelector('#main-header');
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

    // ==========================================
    // SERVICES PAGE TABS
    // ==========================================
    const pricingTabBtns = document.querySelectorAll('.pricing-tab-btn');
    const pricingPanes = document.querySelectorAll('.pricing-pane');

    if (pricingTabBtns.length > 0) {
        pricingTabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetCategory = btn.getAttribute('data-category');
                
                // Toggle active button
                pricingTabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // Toggle active pane
                pricingPanes.forEach(pane => {
                    pane.classList.remove('active');
                    if (pane.id === `pane-${targetCategory}`) {
                        pane.classList.add('active');
                    }
                });
            });
        });
    }

    // ==========================================
    // PROJECT COST ESTIMATOR CALCULATOR
    // ==========================================
    const calcCategory = document.getElementById('calc-category');
    const calcSizes = document.getElementsByName('calc-size');
    const calcDetails = document.getElementsByName('calc-detail');
    const addonLighting = document.getElementById('addon-lighting');
    const addonCover = document.getElementById('addon-cover');
    const addonCase = document.getElementById('addon-case');
    const ctaBtn = document.getElementById('calc-cta-btn');

    // UI Elements
    const resultBaseCost = document.getElementById('result-base-cost');
    const resultAddonsCost = document.getElementById('result-addons-cost');
    const resultTotalCost = document.getElementById('result-total-cost');
    const resultLeadTime = document.getElementById('result-lead-time');

    if (calcCategory && resultTotalCost) {
        // Pricing constants
        const pricingData = {
            categories: {
                concept: { base: 800, lead: 1.5, name: "Concept & Competition" },
                interior: { base: 1800, lead: 3, name: "Interior Detail" },
                residential: { base: 2200, lead: 3, name: "Residential" },
                commercial: { base: 3500, lead: 4, name: "Commercial" },
                urban: { base: 4500, lead: 6, name: "Urban Planning" }
            },
            sizes: {
                small: { mult: 1.0, name: "Small (up to 40x40cm)" },
                medium: { mult: 1.5, name: "Medium (up to 70x70cm)" },
                large: { mult: 2.2, name: "Large (100x100cm+)" }
            },
            details: {
                concept: { mult: 1.0, name: "Concept Massing" },
                standard: { mult: 1.4, name: "Detailed Presentation" },
                premium: { mult: 1.9, name: "Hyper-Realistic" }
            },
            addons: {
                lighting: { small: 600, medium: 1000, large: 1600, name: "Integrated LED Lighting" },
                cover: { small: 350, medium: 550, large: 800, name: "Bespoke Acrylic Dust Cover" },
                case: { small: 450, medium: 650, large: 900, name: "Heavy-duty Flight Case" }
            }
        };

        function formatCurrency(val) {
            return '$' + Math.round(val).toLocaleString();
        }

        function calculateEstimate() {
            // Get inputs
            const categoryVal = calcCategory.value;
            
            let sizeVal = 'medium';
            for (let i = 0; i < calcSizes.length; i++) {
                if (calcSizes[i].checked) {
                    sizeVal = calcSizes[i].value;
                    break;
                }
            }

            let detailVal = 'standard';
            for (let i = 0; i < calcDetails.length; i++) {
                if (calcDetails[i].checked) {
                    detailVal = calcDetails[i].value;
                    break;
                }
            }

            const hasLighting = addonLighting.checked;
            const hasCover = addonCover.checked;
            const hasCase = addonCase.checked;

            // Fetch pricing data elements
            const catData = pricingData.categories[categoryVal];
            const sizeData = pricingData.sizes[sizeVal];
            const detData = pricingData.details[detailVal];

            // Perform calculations
            const baseMin = catData.base * sizeData.mult * detData.mult;
            const baseMax = baseMin * 1.25;

            let addonsTotal = 0;
            let activeAddons = [];
            if (hasLighting) {
                addonsTotal += pricingData.addons.lighting[sizeVal];
                activeAddons.push(pricingData.addons.lighting.name);
            }
            if (hasCover) {
                addonsTotal += pricingData.addons.cover[sizeVal];
                activeAddons.push(pricingData.addons.cover.name);
            }
            if (hasCase) {
                addonsTotal += pricingData.addons.case[sizeVal];
                activeAddons.push(pricingData.addons.case.name);
            }

            const totalMin = baseMin + addonsTotal;
            const totalMax = baseMax + addonsTotal;

            // Lead time
            const baseLead = catData.lead * sizeData.mult;
            const leadMin = Math.max(1, Math.round(baseLead * 0.8));
            const leadMax = Math.round(baseLead * 1.3);

            // Update UI text
            resultBaseCost.textContent = `${formatCurrency(baseMin)} - ${formatCurrency(baseMax)}`;
            resultAddonsCost.textContent = formatCurrency(addonsTotal);
            resultTotalCost.textContent = `${formatCurrency(totalMin)} - ${formatCurrency(totalMax)}`;
            
            if (leadMin === leadMax) {
                resultLeadTime.textContent = `${leadMin} Week${leadMin > 1 ? 's' : ''}`;
            } else {
                resultLeadTime.textContent = `${leadMin} - ${leadMax} Weeks`;
            }

            // Build dynamic Contact URL query string
            const specText = `Hello, I'd like to request a quote for the following architectural model:
- Category: ${catData.name}
- Size/Scale: ${sizeData.name}
- Detail Level: ${detData.name}
${activeAddons.length > 0 ? `- Add-ons: ${activeAddons.join(', ')}\n` : ''}- Estimated Budget Range: ${formatCurrency(totalMin)} - ${formatCurrency(totalMax)}
- Estimated Lead Time: ${leadMin}-${leadMax} Weeks

Please let me know your availability to discuss this commission.`;

            const queryParams = new URLSearchParams();
            queryParams.append('calc', 'true');
            queryParams.append('type', catData.name);
            queryParams.append('spec', specText);

            if (ctaBtn) {
                ctaBtn.href = `contact.html?${queryParams.toString()}`;
            }
        }

        // Add event listeners to all controls
        calcCategory.addEventListener('change', calculateEstimate);
        calcSizes.forEach(el => el.addEventListener('change', calculateEstimate));
        calcDetails.forEach(el => el.addEventListener('change', calculateEstimate));
        addonLighting.addEventListener('change', calculateEstimate);
        addonCover.addEventListener('change', calculateEstimate);
        addonCase.addEventListener('change', calculateEstimate);

        // Run initial calculation on load
        calculateEstimate();
    }

    // ==========================================
    // CONTACT FORM PRE-FILL FROM CALCULATOR
    // ==========================================
    const contactProjectType = document.getElementById('contact-project-type');
    const contactMessage = document.getElementById('contact-message');

    if (contactProjectType && contactMessage) {
        const urlParams = new URLSearchParams(window.location.search);
        const isFromCalc = urlParams.get('calc');
        const projectType = urlParams.get('type');
        const projectSpec = urlParams.get('spec');

        if (isFromCalc === 'true') {
            // Select the project type dropdown value
            if (projectType) {
                // Find matching option in contact page dropdown
                for (let i = 0; i < contactProjectType.options.length; i++) {
                    if (contactProjectType.options[i].value === projectType) {
                        contactProjectType.selectedIndex = i;
                        break;
                    }
                }
            }

            // Fill message textarea
            if (projectSpec) {
                contactMessage.value = projectSpec;
            }
        }
    }
});
