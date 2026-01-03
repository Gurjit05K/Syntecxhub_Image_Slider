document.addEventListener('DOMContentLoaded', function() {
    // Slider elements
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const indicators = document.querySelectorAll('.indicator');
    const playPauseBtn = document.getElementById('play-pause');
    const stopBtn = document.getElementById('stop');
    
    // Slider state
    let currentSlide = 0;
    let isPlaying = true;
    let slideInterval;
    const slideDuration = 4000; // 4 seconds per slide
    
    // Initialize the slider
    function initSlider() {
        updateSlider();
        startAutoPlay();
        
        // Add event listeners for navigation buttons
        prevBtn.addEventListener('click', showPrevSlide);
        nextBtn.addEventListener('click', showNextSlide);
        
        // Add event listeners for indicators
        indicators.forEach(indicator => {
            indicator.addEventListener('click', function() {
                const slideIndex = parseInt(this.getAttribute('data-slide'));
                goToSlide(slideIndex);
            });
        });
        
        // Add event listeners for control buttons
        playPauseBtn.addEventListener('click', togglePlayPause);
        stopBtn.addEventListener('click', stopAutoPlay);
        
        // Add touch events for mobile swipe
        let touchStartX = 0;
        let touchEndX = 0;
        
        const sliderContainer = document.querySelector('.slider-container');
        
        sliderContainer.addEventListener('touchstart', function(e) {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        sliderContainer.addEventListener('touchend', function(e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
    }
    
    // Show the next slide
    function showNextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlider();
        resetAutoPlay();
    }
    
    // Show the previous slide
    function showPrevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlider();
        resetAutoPlay();
    }
    
    // Go to a specific slide
    function goToSlide(slideIndex) {
        currentSlide = slideIndex;
        updateSlider();
        resetAutoPlay();
    }
    
    // Update slider display
    function updateSlider() {
        // Remove active class from all slides and indicators
        slides.forEach(slide => slide.classList.remove('active'));
        indicators.forEach(indicator => indicator.classList.remove('active'));
        
        // Add active class to current slide and indicator
        slides[currentSlide].classList.add('active');
        indicators[currentSlide].classList.add('active');
    }
    
    // Auto-play functions
    function startAutoPlay() {
        slideInterval = setInterval(showNextSlide, slideDuration);
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        isPlaying = true;
    }
    
    function stopAutoPlay() {
        clearInterval(slideInterval);
        playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        isPlaying = false;
    }
    
    function togglePlayPause() {
        if (isPlaying) {
            clearInterval(slideInterval);
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        } else {
            startAutoPlay();
        }
        isPlaying = !isPlaying;
    }
    
    function resetAutoPlay() {
        if (isPlaying) {
            clearInterval(slideInterval);
            startAutoPlay();
        }
    }
    
    // Handle swipe on mobile
    function handleSwipe() {
        const swipeThreshold = 50; // Minimum distance for a swipe
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - next slide
            showNextSlide();
        }
        
        if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - previous slide
            showPrevSlide();
        }
    }
    
    // Initialize the slider when the page loads
    initSlider();
    
    // Pause auto-play when user hovers over slider
    const slider = document.querySelector('.slider-container');
    slider.addEventListener('mouseenter', () => {
        if (isPlaying) {
            clearInterval(slideInterval);
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });
    
    slider.addEventListener('mouseleave', () => {
        if (isPlaying) {
            startAutoPlay();
        }
    });
});