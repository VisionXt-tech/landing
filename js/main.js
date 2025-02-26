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
    
    // Fix per l'immagine hero
    function ensureHeroImageVisibility() {
        const heroImage = document.getElementById('hero-image');
        if (heroImage) {
            // Aggiungi stili inline per garantire la visibilità
            heroImage.style.display = 'block';
            heroImage.style.visibility = 'visible';
            heroImage.style.opacity = '1';
            
            // Rimuovi qualsiasi attributo AOS che potrebbe causare problemi
            heroImage.removeAttribute('data-aos');
            heroImage.removeAttribute('data-aos-delay');
            heroImage.removeAttribute('data-aos-duration');
            
            // Rimuovi classi che potrebbero interferire
            heroImage.classList.remove('aos-animate', 'aos-init');
            
            console.log('Hero image visibility enforced');
        }
    }
    
    // Chiamalo subito
    ensureHeroImageVisibility();
    
    // E poi più volte per essere sicuri
    setTimeout(ensureHeroImageVisibility, 100);
    setTimeout(ensureHeroImageVisibility, 500);
    setTimeout(ensureHeroImageVisibility, 1000);
    
    // Initialize function called after all components are loaded
    window.initializeScripts = function() {
        console.log('All components loaded, initializing scripts...');
        
        // Assicuriamoci che l'immagine hero sia visibile
        ensureHeroImageVisibility();
        
        // Preparazione degli elementi per le animazioni AOS
        prepareAnimations();
        
        // Ri-inizializza AOS per assicurarsi che tutte le animazioni siano catturate dopo il caricamento dei componenti
        setTimeout(() => {
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
                
                // Dopo il refresh di AOS, riapplica il fix per l'immagine hero
                ensureHeroImageVisibility();
            }
        }, 100);
        
        // Animated counters for metrics (if they exist)
        initCounters();
        
        // Inizializza gli effetti di paralasse
        initParallaxEffects();
        
        // Abilita le animazioni in sequenza
        initSequentialAnimations();
    };
    
    // Funzione per le animazioni dei contatori
    function initCounters() {
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
    }
    
    // Funzione per preparare gli elementi per le animazioni
    function prepareAnimations() {
        // Aggiungi attributi data-aos agli elementi che non ne hanno già uno
        
        // Titoli di sezione
        document.querySelectorAll('section h2:not([data-aos])').forEach(element => {
            element.setAttribute('data-aos', 'fade-up');
        });
        
        // Paragrafi dopo i titoli
        document.querySelectorAll('section h2 + p:not([data-aos])').forEach(element => {
            element.setAttribute('data-aos', 'fade-up');
            element.setAttribute('data-aos-delay', '100');
        });
        
        // Card e contenitori
        document.querySelectorAll('.card:not([data-aos]), .pain-point-card:not([data-aos]), .adopter-profile:not([data-aos]), .metric-card:not([data-aos]), .revenue-card:not([data-aos])').forEach((element, index) => {
            element.setAttribute('data-aos', 'fade-up');
            element.setAttribute('data-aos-delay', `${index * 100}`);
        });
        
        // Immagini (tranne hero image)
        document.querySelectorAll('img:not([data-aos]):not(#hero-image)').forEach(element => {
            // Non applicare alle immagini dentro header o altri componenti di navigazione
            if (!element.closest('header') && !element.closest('nav') && !element.closest('footer')) {
                element.setAttribute('data-aos', 'fade-up');
                element.setAttribute('data-aos-duration', '1000');
            }
        });
        
        // Bottoni primari
        document.querySelectorAll('.btn-primary:not([data-aos])').forEach(element => {
            element.setAttribute('data-aos', 'fade-up');
            element.setAttribute('data-aos-delay', '200');
        });
        
        // Elementi sezioni Hero
        const heroLeftContent = document.querySelector('#hero-container .md\\:w-1\\/2:first-child');
        
        if (heroLeftContent) {
            heroLeftContent.setAttribute('data-aos', 'fade-right');
            heroLeftContent.setAttribute('data-aos-duration', '1000');
        }
    }
    
    // Funzione per inizializzare effetti di parallasse allo scorrimento
    function initParallaxEffects() {
        // Inizializza solo se non siamo su mobile
        if (window.innerWidth > 768) {
            window.addEventListener('scroll', function() {
                const scrollPosition = window.scrollY;
                
                // Effetto parallax sulle immagini specifiche
                document.querySelectorAll('.parallax-element').forEach(element => {
                    const speed = element.getAttribute('data-parallax-speed') || 0.2;
                    element.style.transform = `translateY(${scrollPosition * speed}px)`;
                });
                
                // Effetto rotazione su elementi decorativi
                document.querySelectorAll('.rotate-on-scroll').forEach(element => {
                    const speed = element.getAttribute('data-rotate-speed') || 0.02;
                    element.style.transform = `rotate(${scrollPosition * speed}deg)`;
                });
                
                // Effetto di scala su elementi in primo piano
                document.querySelectorAll('.scale-on-scroll').forEach(element => {
                    const scale = 1 + (scrollPosition * 0.0002);
                    element.style.transform = `scale(${Math.min(Math.max(scale, 0.95), 1.05)})`;
                });
                
                // Assicurati che l'immagine hero rimanga visibile
                ensureHeroImageVisibility();
            });
        }
    }
    
    // Funzione per inizializzare animazioni in sequenza
    function initSequentialAnimations() {
        document.querySelectorAll('[data-sequence-parent]').forEach(container => {
            const items = container.querySelectorAll('[data-sequence-item]');
            const baseDelay = parseInt(container.getAttribute('data-sequence-delay') || '100');
            
            items.forEach((item, index) => {
                item.setAttribute('data-aos', 'fade-up');
                item.setAttribute('data-aos-delay', `${baseDelay * index}`);
            });
        });
    }
    
    // Gestione di eventuali problemi con AOS
    window.addEventListener('load', function() {
        // Controlla e ripara l'immagine hero
        ensureHeroImageVisibility();
    });
});
