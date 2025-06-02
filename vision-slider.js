document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.vision-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let isAnimating = false;
    let autoSlideInterval;

    // Function to update slider
    function updateSlider(direction = 'next') {
        if (isAnimating) return;
        isAnimating = true;

        // Remove active class from all slides and dots
        slides.forEach(slide => {
            slide.style.transform = direction === 'next' ? 'translateX(-100%) scale(0.9)' : 'translateX(100%) scale(0.9)';
            slide.classList.remove('active');
        });
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current slide and dot
        slides[currentSlide].style.transform = 'translateX(0) scale(1)';
        slides[currentSlide].classList.add('active');
        dots[currentSlide].classList.add('active');

        // Add audio effect
        const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3');
        audio.volume = 0.2;
        audio.play().catch(e => console.log('Audio play failed:', e));

        // Add enhanced particle effects
        createParticles();
        createRippleEffect();

        // Reset animation flag after transition
        setTimeout(() => {
            isAnimating = false;
        }, 1200);
    }

    // Create particle effect
    function createParticles() {
        const content = document.querySelector('.vision-content');
        const colors = ['#3498db', '#2ecc71', '#e74c3c', '#f1c40f'];
        
        for (let i = 0; i < 30; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.animationDuration = (Math.random() * 2 + 1) + 's';
            particle.style.animationDelay = (Math.random() * 0.5) + 's';
            content.appendChild(particle);

            // Remove particle after animation
            setTimeout(() => {
                particle.remove();
            }, 3000);
        }
    }

    // Create ripple effect
    function createRippleEffect() {
        const content = document.querySelector('.vision-content');
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        content.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 1000);
    }

    // Next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider('next');
    }

    // Previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider('prev');
    }

    // Event listeners
    nextBtn.addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        nextSlide();
        startAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        prevSlide();
        startAutoSlide();
    });

    // Dot navigation
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            if (currentSlide === index) return;
            clearInterval(autoSlideInterval);
            currentSlide = index;
            updateSlider(index > currentSlide ? 'next' : 'prev');
            startAutoSlide();
        });
    });

    // Start auto slide
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 6000);
    }

    // Initialize slider
    updateSlider();
    startAutoSlide();

    // Pause auto slide on hover
    const slider = document.querySelector('.vision-slider');
    slider.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
    slider.addEventListener('mouseleave', startAutoSlide);

    // Add touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    slider.addEventListener('touchstart', e => {
        touchStartX = e.changedTouches[0].screenX;
    });

    slider.addEventListener('touchend', e => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left
            nextSlide();
        } else if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right
            prevSlide();
        }
    }
}); 