// Function to initialize mobile menu
function initializeMobileMenu() {
    console.log('Initializing Mobile Menu');
    
    // Get the menu elements
    const menuButton = document.querySelector('.mobile-menu-toggle');
    console.log('Menu Button Element:', menuButton);

    // Get mobile menu using the closest parent approach
    const mobileMenu = menuButton ? menuButton.closest('.mobile-nav-container').querySelector('.mobile-menu') : null;
    console.log('Mobile Menu Element:', mobileMenu);

    const navItems = document.querySelectorAll('.mobile-nav-item > a');
    console.log('Nav Items Found:', navItems.length);

    // Function to toggle menu
    function toggleMenu() {
        console.log('Toggle Menu Function Called');
        console.log('Current Menu Button Classes:', menuButton.classList.toString());
        console.log('Current Mobile Menu Classes:', mobileMenu.classList.toString());

        menuButton.classList.toggle('active');
        mobileMenu.classList.toggle('active');

        console.log('After Toggle - Menu Button Classes:', menuButton.classList.toString());
        console.log('After Toggle - Mobile Menu Classes:', mobileMenu.classList.toString());
    }

    // Add click event to menu button
    if (menuButton) {
        console.log('Adding click event listener to menu button');
        menuButton.addEventListener('click', function(e) {
            console.log('Menu Button Clicked');
            e.preventDefault();
            e.stopPropagation();
            toggleMenu();
        });
    } else {
        console.error('Menu Button not found in the DOM');
    }

    // Handle submenu toggles
    navItems.forEach((item, index) => {
        if (item.nextElementSibling && item.nextElementSibling.classList.contains('mobile-submenu')) {
            console.log(`Adding click event to submenu item ${index + 1}`);
            item.addEventListener('click', function(e) {
                console.log(`Submenu item ${index + 1} clicked`);
                e.preventDefault();
                e.stopPropagation();
                this.nextElementSibling.classList.toggle('active');
            });
        }
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
        if (mobileMenu && mobileMenu.classList.contains('active') && !e.target.closest('.mobile-nav')) {
            console.log('Click outside detected - closing menu');
            toggleMenu();
        }
    });

    // Close menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && mobileMenu && mobileMenu.classList.contains('active')) {
            console.log('Window resized to desktop width - closing menu');
            toggleMenu();
        }
    });
}

// Wait for the mobile header to be loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Waiting for mobile header');
    
    // Check if mobile header is already loaded
    const mobileHeader = document.getElementById('mobile-header');
    if (mobileHeader && mobileHeader.innerHTML.trim() !== '') {
        console.log('Mobile header already loaded, initializing menu');
        initializeMobileMenu();
    } else {
        // Wait for the header to be loaded
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                    console.log('Mobile header loaded, initializing menu');
                    initializeMobileMenu();
                    observer.disconnect();
                }
            });
        });

        observer.observe(mobileHeader, { childList: true });
    }
}); 