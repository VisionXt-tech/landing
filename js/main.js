document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu handling
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    
    if (mobileMenuButton && mobileMenu && mobileMenuOverlay) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            mobileMenuOverlay.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });
        
        mobileMenuOverlay.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            document.body.classList.remove('no-scroll');
        });
        
        // Close mobile menu when clicking on a link
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                mobileMenuOverlay.classList.remove('active');
                document.body.classList.remove('no-scroll');
            });
        });
    }
    
    // Header scroll behavior
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize function called after all components are loaded
    window.initializeScripts = function() {
        console.log('All components loaded, initializing scripts...');
        
        // Animated counters for metrics (if they exist)
        const animatedNumbers = document.querySelectorAll('.animated-number');
        if (animatedNumbers.length > 0) {
            const animateValue = (obj, start, end, duration) => {
                let startTimestamp = null;
                const step = (timestamp) => {
                    if (!startTimestamp) startTimestamp = timestamp;
                    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
                    obj.innerHTML = Math.floor(progress * (end - start) + start);
                    if (progress < 1) {
                        window.requestAnimationFrame(step);
                    }
                };
                window.requestAnimationFrame(step);
            };
            
            const handleIntersect = (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const targetValue = parseInt(entry.target.getAttribute('data-target') || '100');
                        animateValue(entry.target, 0, targetValue, 1500);
                        observer.unobserve(entry.target);
                    }
                });
            };
            
            const observer = new IntersectionObserver(handleIntersect, {
                threshold: 0.5
            });
            
            animatedNumbers.forEach(counter => {
                observer.observe(counter);
            });
        }
    };
});
