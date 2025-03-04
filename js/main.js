document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu handling
    const mobileMenuButton = document.getElementById('mobileMenuButton');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
    
    if (mobileMenuButton && mobileMenu && mobileMenuOverlay) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            mobileMenuOverlay.classList.toggle('active');
            document.body.classList.toggle('overflow-hidden');
            
            // Update button icon
            const menuIcon = this.querySelector('.material-icons');
            if (menuIcon) {
                menuIcon.textContent = mobileMenu.classList.contains('active') ? 'close' : 'menu';
            }
        });
        
        mobileMenuOverlay.addEventListener('click', function() {
            mobileMenu.classList.remove('active');
            mobileMenuOverlay.classList.remove('active');
            document.body.classList.remove('overflow-hidden');
            
            // Update button icon
            const menuIcon = mobileMenuButton.querySelector('.material-icons');
            if (menuIcon) {
                menuIcon.textContent = 'menu';
            }
        });
        
        // Close mobile menu when clicking on a link
        const mobileMenuLinks = mobileMenu.querySelectorAll('a');
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.remove('active');
                mobileMenuOverlay.classList.remove('active');
                document.body.classList.remove('overflow-hidden');
                
                // Update button icon
                const menuIcon = mobileMenuButton.querySelector('.material-icons');
                if (menuIcon) {
                    menuIcon.textContent = 'menu';
                }
            });
        });
    }
    
    // Header scroll behavior
    const header = document.querySelector('header');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.classList.add('scrolled', 'bg-white', 'shadow-md');
                header.classList.remove('py-4');
                header.classList.add('py-2');
            } else {
                header.classList.remove('scrolled', 'bg-white', 'shadow-md');
                header.classList.add('py-4');
                header.classList.remove('py-2');
            }
            
            // Update scroll progress indicator
            if (scrollIndicator) {
                const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
                const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                const scrolled = (winScroll / height) * 100;
                scrollIndicator.style.width = scrolled + "%";
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
                // If GSAP is available, use it for smooth scrolling
                if (typeof gsap !== 'undefined' && typeof ScrollToPlugin !== 'undefined') {
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: {
                            y: targetElement.offsetTop - 80,
                            offsetY: 80
                        },
                        ease: "power3.inOut"
                    });
                } else {
                    // Fallback to native smooth scrolling
                    window.scrollTo({
                        top: targetElement.offsetTop - 80, // Adjust for header height
                        behavior: 'smooth'
                    });
                }
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
        }
    }
    
    // Fix per le intestazioni delle sezioni
    function ensureSectionHeadersVisibility() {
        // Fix specifico per l'intestazione della sezione clientela
        const customerHeader = document.querySelector('#customers .text-center.mb-16');
        if (customerHeader) {
            customerHeader.style.display = 'block';
            customerHeader.style.visibility = 'visible';
            customerHeader.style.opacity = '1';
            
            const headerElements = customerHeader.querySelectorAll('h2, p, span');
            headerElements.forEach(el => {
                el.style.display = 'block';
                el.style.visibility = 'visible';
                el.style.opacity = '1';
            });
        }
        
        // Fix generale per tutte le intestazioni di sezione
        document.querySelectorAll('section > .container > .text-center').forEach(header => {
            header.style.display = 'block';
            header.style.visibility = 'visible';
            header.style.opacity = '1';
            
            const elements = header.querySelectorAll('h2, h3, p, span');
            elements.forEach(el => {
                el.style.display = 'block';
                el.style.visibility = 'visible';
                el.style.opacity = '1';
            });
        });
    }
    
    // Chiamalo subito
    ensureHeroImageVisibility();
    
    // E poi più volte per essere sicuri
    setTimeout(ensureHeroImageVisibility, 100);
    setTimeout(ensureHeroImageVisibility, 500);
    setTimeout(ensureHeroImageVisibility, 1000);
    
    // Applica fix per le intestazioni delle sezioni dopo un breve ritardo
    setTimeout(ensureSectionHeadersVisibility, 300);
    setTimeout(ensureSectionHeadersVisibility, 1000);
    setTimeout(ensureSectionHeadersVisibility, 2000);
    
    // Initialize function called after all components are loaded
    window.initializeScripts = function() {
        console.log('All components loaded, initializing scripts...');
        
        // Assicuriamoci che l'immagine hero sia visibile
        ensureHeroImageVisibility();
        
        // Assicuriamoci che le intestazioni delle sezioni siano visibili
        ensureSectionHeadersVisibility();
        
        // Preparazione degli elementi per le animazioni AOS
        prepareAnimations();
        
        // Ri-inizializza AOS per assicurarsi che tutte le animazioni siano catturate dopo il caricamento dei componenti
        setTimeout(() => {
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
                
                // Dopo il refresh di AOS, riapplica i fix
                ensureHeroImageVisibility();
                ensureSectionHeadersVisibility();
            }
        }, 100);
        
        // Animated counters for metrics (if they exist)
        initCounters();
        
        // Inizializza gli effetti di paralasse
        initParallaxEffects();
        
        // Abilita le animazioni in sequenza
        initSequentialAnimations();
        
        // Inizializza le animazioni al caricamento della pagina con GSAP
        initLoadingAnimations();
        
        // Inizializza tilt effect on cards
        initTiltEffect();
        
        // Inizializza reveal per le immagini
        initImageReveal();
        
        // Inizializza gli slider Swiper se disponibili
        initSwiperSliders();
        
        // Inizializza le tabs se presenti
        initTabs();
    };
    
    // Funzione per le animazioni dei contatori
    function initCounters() {
        const animatedNumbers = document.querySelectorAll('.animated-number');
        if (animatedNumbers.length > 0) {
            const handleIntersect = (entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const targetValue = parseInt(entry.target.getAttribute('data-target') || '100');
                        let startValue = 0;
                        const duration = 2000; // 2 secondi
                        const increment = targetValue / (duration / 16); // Incremento per frame a 60fps
                        
                        const updateCounter = () => {
                            startValue += increment;
                            if (startValue < targetValue) {
                                entry.target.textContent = Math.floor(startValue);
                                requestAnimationFrame(updateCounter);
                            } else {
                                entry.target.textContent = targetValue;
                            }
                        };
                        
                        requestAnimationFrame(updateCounter);
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
            element.setAttribute('data-aos-once', 'false');
        });
        
        // Paragrafi dopo i titoli
        document.querySelectorAll('section h2 + p:not([data-aos])').forEach(element => {
            element.setAttribute('data-aos', 'fade-up');
            element.setAttribute('data-aos-delay', '100');
            element.setAttribute('data-aos-once', 'false');
        });
        
        // Card e contenitori
        document.querySelectorAll('.card:not([data-aos]), .pain-point-card:not([data-aos]), .adopter-profile:not([data-aos]), .metric-card:not([data-aos]), .revenue-card:not([data-aos])').forEach((element, index) => {
            element.setAttribute('data-aos', 'fade-up');
            element.setAttribute('data-aos-delay', `${index * 100}`);
            element.setAttribute('data-aos-once', 'false');
        });
        
        // Immagini (tranne hero image)
        document.querySelectorAll('img:not([data-aos]):not(#hero-image)').forEach(element => {
            // Non applicare alle immagini dentro header o altri componenti di navigazione
            if (!element.closest('header') && !element.closest('nav') && !element.closest('footer')) {
                element.setAttribute('data-aos', 'fade-up');
                element.setAttribute('data-aos-duration', '1000');
                element.setAttribute('data-aos-once', 'false');
            }
        });
        
        // Bottoni primari
        document.querySelectorAll('.btn-primary:not([data-aos])').forEach(element => {
            element.setAttribute('data-aos', 'fade-up');
            element.setAttribute('data-aos-delay', '200');
            element.setAttribute('data-aos-once', 'false');
        });
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
                item.setAttribute('data-aos-once', 'false');
            });
        });
    }
    
    // Inizializza le animazioni al caricamento della pagina con GSAP
    function initLoadingAnimations() {
        if (typeof gsap !== 'undefined') {
            // Hero section animations
            const heroTitle = document.querySelector('.hero-section h1');
            const heroSubtitle = document.querySelector('.hero-section .text-xs');
            const heroParagraph = document.querySelector('.hero-section p');
            const heroButtons = document.querySelectorAll('.hero-section a.btn-primary, .hero-section a.btn-secondary');
            const heroImage = document.querySelector('.hero-section #hero-image');
            
            const heroTimeline = gsap.timeline({
                defaults: { 
                    duration: 1,
                    ease: 'power3.out'
                }
            });
            
            if (heroTitle) {
                heroTimeline.from(heroTitle, { 
                    y: 50, 
                    opacity: 0 
                });
            }
            
            if (heroSubtitle) {
                heroTimeline.from(heroSubtitle, { 
                    y: 20, 
                    opacity: 0 
                }, "-=0.7");
            }
            
            if (heroParagraph) {
                heroTimeline.from(heroParagraph, { 
                    y: 20, 
                    opacity: 0 
                }, "-=0.7");
            }
            
            if (heroButtons.length) {
                heroTimeline.from(heroButtons, { 
                    y: 20, 
                    opacity: 0,
                    stagger: 0.2
                }, "-=0.5");
            }
            
            if (heroImage) {
                heroTimeline.from(heroImage.parentElement, { 
                    scale: 0.8,
                    opacity: 0
                }, "-=0.8");
            }
            
            // Morphing blobs animation
            gsap.to('.morphing-blob', {
                x: '+=20',
                y: '+=10',
                duration: 20,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
            });
        }
    }
    
    // Funzione per inizializzare l'effetto tilt su card
    function initTiltEffect() {
        const tiltElements = document.querySelectorAll('.tilt-element');
        
        tiltElements.forEach(element => {
            element.addEventListener('mousemove', function(e) {
                const rect = this.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                
                const tiltX = (y - centerY) / 10;
                const tiltY = (centerX - x) / 10;
                
                this.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
            });
            
            element.addEventListener('mouseleave', function() {
                this.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
            });
        });
    }
    
    // Funzione per inizializzare l'effetto reveal sulle immagini
    function initImageReveal() {
        const imageRevealElements = document.querySelectorAll('.image-reveal');
        
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('revealed');
                    }, 100);
                    
                    observer.unobserve(entry.target);
                }
            });
        }, { 
            threshold: 0.3 
        });
        
        imageRevealElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // Funzione per inizializzare gli slider Swiper
    function initSwiperSliders() {
        if (typeof Swiper !== 'undefined') {
            document.querySelectorAll('.swiper').forEach(slider => {
                // Se c'è già un'istanza di Swiper, non reinizializzare
                if (slider.swiper) return;
                
                // Configurazione per slider
                new Swiper(slider, {
                    slidesPerView: 1,
                    spaceBetween: 20,
                    centeredSlides: true,
                    loop: false,
                    pagination: {
                        el: slider.querySelector('.swiper-pagination'),
                        clickable: true
                    },
                    navigation: {
                        nextEl: slider.querySelector('.swiper-button-next'),
                        prevEl: slider.querySelector('.swiper-button-prev')
                    },
                    grabCursor: true,
                    effect: 'slide',
                    speed: 500,
                    breakpoints: {
                        // when window width is >= 640px
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20
                        },
                        // when window width is >= 768px
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 30
                        },
                        // when window width is >= 1024px
                        1024: {
                            slidesPerView: 3,
                            spaceBetween: 30
                        }
                    }
                });
            });
        }
    }
    
    // Funzione per inizializzare le tabs
    function initTabs() {
        const tabButtons = document.querySelectorAll('.tab-button');
        const tabPanes = document.querySelectorAll('.tab-pane');
        
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                const targetTab = this.getAttribute('data-tab');
                
                // Rimuovi la classe active da tutti i bottoni
                tabButtons.forEach(btn => btn.classList.remove('active'));
                
                // Aggiungi la classe active al bottone cliccato
                this.classList.add('active');
                
                // Nascondi tutti i tab panes
                tabPanes.forEach(pane => {
                    pane.classList.add('hidden');
                    pane.classList.remove('active');
                });
                
                // Mostra il tab pane target
                const targetPane = document.getElementById(targetTab);
                if (targetPane) {
                    targetPane.classList.remove('hidden');
                    targetPane.classList.add('active');
                    
                    // Reinitialize Swiper if exists in this tab
                    if (typeof Swiper !== 'undefined') {
                        const swipers = targetPane.querySelectorAll('.swiper');
                        swipers.forEach(slider => {
                            if (slider.swiper) {
                                slider.swiper.update();
                            } else {
                                // Initialize new Swiper if not already initialized
                                initSwiperSliders();
                            }
                        });
                    }
                }
            });
        });
    }
    
    // Gestione di eventuali problemi con AOS
    window.addEventListener('load', function() {
        // Controlla e ripara l'immagine hero
        ensureHeroImageVisibility();
        
        // Controlla e ripara le intestazioni delle sezioni
        ensureSectionHeadersVisibility();
        
        // Back to Top Button Logic
        const backToTopButton = document.getElementById('backToTop');
        if (backToTopButton) {
            window.addEventListener('scroll', function() {
                if (window.scrollY > 300) {
                    backToTopButton.classList.remove('opacity-0', 'invisible');
                    backToTopButton.classList.add('opacity-100', 'visible');
                } else {
                    backToTopButton.classList.add('opacity-0', 'invisible');
                    backToTopButton.classList.remove('opacity-100', 'visible');
                }
            });
            
            backToTopButton.addEventListener('click', function() {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    });
    
    // Handle mousemove for subtle parallax effects
    document.addEventListener('mousemove', function(e) {
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        document.querySelectorAll('.mouse-parallax').forEach(element => {
            const speed = parseFloat(element.getAttribute('data-speed') || '1');
            element.style.transform = `translate(${mouseX * 30 * speed}px, ${mouseY * 30 * speed}px)`;
        });
    });
});
