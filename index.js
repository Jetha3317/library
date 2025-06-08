// Function to load HTML components
async function includeHTML(id, file) {
    try {
        const response = await fetch(file);
        if (!response.ok) {
            throw new Error(`Failed to load ${file}: ${response.status} ${response.statusText}`);
        }
        const data = await response.text();
        const element = document.getElementById(id);
        if (element) {
            // Remove any existing content
            element.innerHTML = '';
            // Add the new content
            element.innerHTML = data;
            
            // Initialize Bootstrap components
            if (typeof bootstrap !== 'undefined') {
                // Initialize dropdowns
                const dropdowns = element.querySelectorAll('.dropdown-toggle');
                dropdowns.forEach(dropdown => {
                    new bootstrap.Dropdown(dropdown);
                });

                // Initialize navbar collapse
                const navbarCollapse = element.querySelector('.navbar-collapse');
                if (navbarCollapse) {
                    new bootstrap.Collapse(navbarCollapse, {
                        toggle: false
                    });
                }
            }

            // Initialize any custom components or event listeners
            if (id === 'header') {
                initializeHeader();
            } else if (id === 'mobile-header') {
                initializeMobileHeader();
            } else if (id === 'footer') {
                initializeFooter();
            }
        } else {
            console.warn(`Element with id "${id}" not found`);
        }
    } catch (error) {
        console.error(`Error loading ${file}:`, error);
        const element = document.getElementById(id);
        if (element) {
            element.innerHTML = `<div class="alert alert-danger">Error loading component: ${file}</div>`;
        }
    }
}

// Initialize header-specific functionality
function initializeHeader() {
    // Mobile menu toggle
    const navbarToggler = document.querySelector('.navbar-toggler');
    if (navbarToggler) {
        navbarToggler.addEventListener('click', () => {
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse) {
                navbarCollapse.classList.toggle('show');
            }
        });
    }

    // Handle dropdown hover on desktop
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', () => {
            if (window.innerWidth >= 992) { // Only on desktop
                const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                if (dropdownMenu) {
                    dropdownMenu.classList.add('show');
                }
            }
        });

        dropdown.addEventListener('mouseleave', () => {
            if (window.innerWidth >= 992) { // Only on desktop
                const dropdownMenu = dropdown.querySelector('.dropdown-menu');
                if (dropdownMenu) {
                    dropdownMenu.classList.remove('show');
                }
            }
        });
    });
}

// Initialize mobile header functionality
function initializeMobileHeader() {
    // Load mobile header JavaScript
    const script = document.createElement('script');
    script.src = 'mob-header.js';
    document.body.appendChild(script);
}

// Initialize footer-specific functionality
function initializeFooter() {
    // Add any footer-specific initialization here
    const socialLinks = document.querySelectorAll('.footer-social a');
    socialLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            // Add your social media link handling here
            console.log('Social link clicked:', link.href);
        });
    });
}

// Load components when the DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Load headers and footer in parallel
        await Promise.all([
            includeHTML('header', 'header.html'),
            includeHTML('mobile-header', 'mob-header.html'),
            includeHTML('footer', 'footer.html')
        ]);

        // Slideshow functionality
        const slides = document.querySelectorAll('.slide');
        let currentSlide = 0;
        const slideInterval = 5000; // Change slide every 5 seconds

        function nextSlide() {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }

        // Start the slideshow
        setInterval(nextSlide, slideInterval);
    } catch (error) {
        console.error('Error loading components:', error);
    }
});
