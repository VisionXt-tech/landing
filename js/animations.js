document.addEventListener('DOMContentLoaded', function() {
    // Inizializza solo quando tutti i componenti sono caricati
    window.addEventListener('load', function() {
        // Assicurati che GSAP sia caricato
        if (typeof gsap !== 'undefined') {
            // Animazioni per la Hero Section
            initHeroAnimations();
            
            // Animazioni per le sezioni
            initSectionAnimations();
            
            // Inizializza animazioni per i contatori
            initCountersAnimation();
            
            // Inizializza effetti di scroll
            initScrollEffects();
            
            // Assicurati che le decorazioni di sfondo siano presenti
            addBackgroundDecorations();
            
            // Aggiungi divider tra le sezioni
            addSectionDividers();
            
            // Inizializza hover effects personalizzati
            initCustomHoverEffects();
            
            console.log('Animations initialized');
        }
    });
    
    // Animazioni per la Hero Section 
    function initHeroAnimations() {
        const heroSection = document.querySelector('.hero-section');
        if (!heroSection) return;
        
        // Aggiungi blur blob in background se non esistono già
        if (!document.querySelector('.hero-section .morphing-blob')) {
            const blob1 = document.createElement('div');
            blob1.className = 'morphing-blob';
            blob1.style.width = '600px';
            blob1.style.height = '600px';
            blob1.style.top = '-100px';
            blob1.style.right = '-150px';
            blob1.style.zIndex = '0';
            
            const blob2 = document.createElement('div');
            blob2.className = 'morphing-blob';
            blob2.style.width = '400px';
            blob2.style.height = '400px';
            blob2.style.left = '-100px';
            blob2.style.bottom = '-100px';
            blob2.style.zIndex = '0';
            
            heroSection.insertBefore(blob1, heroSection.firstChild);
            heroSection.insertBefore(blob2, heroSection.firstChild);
        }
        
        // Animazione per il titolo della hero con GSAP
        const heroTitle = heroSection.querySelector('h1');
        const heroParagraph = heroSection.querySelector('p');
        const heroButtons = heroSection.querySelectorAll('a.btn-primary, a.btn-secondary');
        const heroImage = heroSection.querySelector('#hero-image');
        
        if (heroTitle) {
            gsap.from(heroTitle, {
                opacity: 0,
                y: 30,
                duration: 1,
                ease: "power3.out"
            });
        }
        
        if (heroParagraph) {
            gsap.from(heroParagraph, {
                opacity: 0,
                y: 30,
                duration: 1,
                delay: 0.3,
                ease: "power3.out"
            });
        }
        
        if (heroButtons.length) {
            gsap.from(heroButtons, {
                opacity: 0,
                y: 30,
                duration: 1,
                delay: 0.5,
                stagger: 0.2,
                ease: "power3.out"
            });
        }
        
        if (heroImage) {
            gsap.from(heroImage, {
                opacity: 0,
                scale: 0.8,
                duration: 1.2,
                delay: 0.2,
                ease: "back.out(1.7)"
            });
            
            // Aggiungi classe per animazione di fluttuazione costante
            heroImage.classList.add('floating');
        }
    }
    
    // Animazioni per le diverse sezioni
    function initSectionAnimations() {
        // Sezione Problem
        const problemSection = document.querySelector('#problem');
        if (problemSection) {
            // Aggiungi classe per sfondo pattern
            problemSection.classList.add('bg-dots');
            
            // Aggiungi animazioni per le card
            const problemCards = problemSection.querySelectorAll('.pain-point-card');
            
            if (problemCards.length) {
                gsap.from(problemCards, {
                    scrollTrigger: {
                        trigger: problemSection,
                        start: "top 70%"
                    },
                    opacity: 0,
                    y: 50,
                    stagger: 0.2,
                    duration: 0.8,
                    ease: "power2.out"
                });
            }
        }
        
        // Sezione Solution
        const solutionSection = document.querySelector('#solution');
        if (solutionSection) {
            // Aggiungi classe per sfondo pattern
            solutionSection.classList.add('bg-grid');
            
            // Aggiungi effetto tilt per immagini o card nella sezione solution
            const solutionImages = solutionSection.querySelectorAll('img:not(.logo)');
            solutionImages.forEach(img => {
                img.classList.add('tilt-element');
            });
        }
        
        // Sezione Customers
        const customersSection = document.querySelector('#customers');
        if (customersSection) {
            // Converti liste statiche in slider se appropriato
            convertToSlider(customersSection);
        }
        
        // Sezione Advantages
        const advantagesSection = document.querySelector('#advantages');
        if (advantagesSection) {
            advantagesSection.classList.add('bg-lines');
            
            // Stagger animation per elementi vantaggi
            const advantageItems = advantagesSection.querySelectorAll('.advantage-item');
            if (advantageItems.length) {
                gsap.from(advantageItems, {
                    scrollTrigger: {
                        trigger: advantagesSection,
                        start: "top 70%"
                    },
                    opacity: 0,
                    x: -50,
                    stagger: 0.15,
                    duration: 0.8,
                    ease: "power2.out"
                });
            }
        }
        
        // Sezione Business
        const businessSection = document.querySelector('#business');
        if (businessSection) {
            // Aggiunge effetto glass morphism alle card
            businessSection.querySelectorAll('.revenue-card, .metric-card').forEach(card => {
                card.classList.add('glass-panel');
            });
        }
    }
    
    // Funzione per convertire liste in slider
    function convertToSlider(section) {
        const cardsContainer = section.querySelector('.grid');
        if (!cardsContainer || cardsContainer.classList.contains('swiper')) return;
        
        // Controlla se ci sono almeno 3 card
        const cards = cardsContainer.querySelectorAll('.adopter-profile, .col, .early-adopter-card');
        if (cards.length >= 3 && window.innerWidth < 1024) {
            // Creiamo la struttura Swiper
            const swiperContainer = document.createElement('div');
            swiperContainer.className = 'swiper';
            const swiperWrapper = document.createElement('div');
            swiperWrapper.className = 'swiper-wrapper';
            
            // Aggiungiamo ogni card come slide
            cards.forEach(card => {
                const slide = document.createElement('div');
                slide.className = 'swiper-slide';
                slide.appendChild(card.cloneNode(true));
                swiperWrapper.appendChild(slide);
            });
            
            swiperContainer.appendChild(swiperWrapper);
            
            // Aggiungiamo paginazione e navigazione
            const pagination = document.createElement('div');
            pagination.className = 'swiper-pagination';
            
            const buttonNext = document.createElement('div');
            buttonNext.className = 'swiper-button-next';
            
            const buttonPrev = document.createElement('div');
            buttonPrev.className = 'swiper-button-prev';
            
            swiperContainer.appendChild(pagination);
            swiperContainer.appendChild(buttonNext);
            swiperContainer.appendChild(buttonPrev);
            
            // Sostituiamo il container originale
            cardsContainer.parentNode.replaceChild(swiperContainer, cardsContainer);
            
            // Inizializziamo lo Swiper
            if (typeof Swiper !== 'undefined') {
                new Swiper(swiperContainer, {
                    slidesPerView: 'auto',
                    centeredSlides: true,
                    spaceBetween: 30,
                    pagination: {
                        el: pagination,
                        clickable: true
                    },
                    navigation: {
                        nextEl: buttonNext,
                        prevEl: buttonPrev
                    },
                    breakpoints: {
                        640: {
                            slidesPerView: 1,
                        },
                        768: {
                            slidesPerView: 2,
                        }
                    }
                });
            }
        }
    }
    
    // Animazioni per i contatori
    function initCountersAnimation() {
        const counters = document.querySelectorAll('.animated-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target') || '0');
            
            // Crea Intersection Observer per iniziare l'animazione quando il contatore è visibile
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Animazione di conteggio
                        let start = 0;
                        const duration = 2000; // 2 secondi
                        const startTime = performance.now();
                        
                        function updateCounter(currentTime) {
                            const elapsed = currentTime - startTime;
                            const progress = Math.min(elapsed / duration, 1);
                            
                            const currentCount = Math.floor(progress * target);
                            counter.textContent = currentCount.toLocaleString();
                            
                            if (progress < 1) {
                                requestAnimationFrame(updateCounter);
                            } else {
                                counter.textContent = target.toLocaleString();
                            }
                        }
                        
                        requestAnimationFrame(updateCounter);
                        
                        // Smetti di osservare dopo che l'animazione è iniziata
                        observer.unobserve(counter);
                    }
                });
            }, { threshold: 0.5 });
            
            observer.observe(counter);
        });
    }
    
    // Effetti di scroll
    function initScrollEffects() {
        // Evidenzia la voce di menu attiva in base allo scroll
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        window.addEventListener('scroll', () => {
            let current = '';
            
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (window.scrollY >= (sectionTop - 200)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        });
        
        // Effetto parallasse per immagini di sfondo
        window.addEventListener('scroll', () => {
            const scrollY = window.scrollY;
            
            document.querySelectorAll('.parallax-bg').forEach(bg => {
                const speed = parseFloat(bg.getAttribute('data-speed') || '0.2');
                bg.style.transform = `translateY(${scrollY * speed}px)`;
            });
        });
    }
    
    // Aggiunta di decorazioni di sfondo alle sezioni
    function addBackgroundDecorations() {
        const sections = document.querySelectorAll('section[id]:not(.hero-section)');
        
        sections.forEach(section => {
            // Aggiungi solo se non ci sono già decorazioni
            if (!section.querySelector('.shape-blob') && !section.querySelector('.shape-circle')) {
                // Crea e aggiungi elementi decorativi casuali
                const decorationType = Math.floor(Math.random() * 3); // 0, 1, 2
                
                switch (decorationType) {
                    case 0: // Blob
                        const blob = document.createElement('div');
                        blob.className = 'shape-blob';
                        blob.style.width = `${Math.random() * 200 + 200}px`;
                        blob.style.height = `${Math.random() * 200 + 200}px`;
                        blob.style.left = `${Math.random() * 50 - 25}%`;
                        blob.style.top = `${Math.random() * 80}%`;
                        section.appendChild(blob);
                        break;
                        
                    case 1: // Circles
                        for (let i = 0; i < 3; i++) {
                            const circle = document.createElement('div');
                            circle.className = 'shape-circle';
                            circle.style.width = `${Math.random() * 40 + 20}px`;
                            circle.style.height = circle.style.width;
                            circle.style.right = `${Math.random() * 40}%`;
                            circle.style.top = `${Math.random() * 80}%`;
                            circle.style.opacity = `${Math.random() * 0.3 + 0.1}`;
                            section.appendChild(circle);
                        }
                        break;
                        
                    case 2: // Squares
                        for (let i = 0; i < 4; i++) {
                            const square = document.createElement('div');
                            square.className = 'shape-square';
                            square.style.width = `${Math.random() * 50 + 30}px`;
                            square.style.height = square.style.width;
                            square.style.left = `${Math.random() * 80}%`;
                            square.style.bottom = `${Math.random() * 80}%`;
                            square.style.opacity = `${Math.random() * 0.3 + 0.1}`;
                            square.style.transform = `rotate(${Math.random() * 45}deg)`;
                            section.appendChild(square);
                        }
                        break;
                }
            }
        });
    }
    
    // Aggiunta di divisori tra le sezioni
    function addSectionDividers() {
        const sections = document.querySelectorAll('section[id]:not(:last-child)');
        
        sections.forEach((section, index) => {
            // Skip if there's already a divider
            if (section.querySelector('.wave-divider') || section.querySelector('.zigzag-divider')) return;
            
            // Alternate between wave and zigzag dividers
            if (index % 2 === 0) {
                // Add wave divider
                const waveDivider = document.createElement('div');
                waveDivider.className = 'wave-divider';
                waveDivider.innerHTML = `
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" class="shape-fill" fill="${section.classList.contains('bg-light') ? '#FF7A3D' : '#ffffff'}"></path>
                        <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" class="shape-fill" fill="${section.classList.contains('bg-light') ? '#FF7A3D' : '#ffffff'}"></path>
                        <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" class="shape-fill" fill="${section.classList.contains('bg-light') ? '#FF7A3D' : '#ffffff'}"></path>
                    </svg>
                `;
                section.style.position = 'relative';
                section.appendChild(waveDivider);
            } else {
                // Add zigzag divider
                const zigzagDivider = document.createElement('div');
                zigzagDivider.className = 'zigzag-divider';
                zigzagDivider.innerHTML = `
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M0,0V7.23C0,65.52,268.63,112.77,600,112.77S1200,65.52,1200,7.23V0Z" class="shape-fill" fill="${section.classList.contains('bg-light') ? '#FF7A3D' : '#ffffff'}"></path>
                    </svg>
                `;
                section.style.position = 'relative';
                section.appendChild(zigzagDivider);
            }
        });
    }
    
    // Inizializza effetti hover personalizzati
    function initCustomHoverEffects() {
        // Aggiungi effetto shine a elementi principali
        document.querySelectorAll('.btn-primary').forEach(button => {
            button.classList.add('shine');
        });
        
        // Aggiungi effetto pulse a call to action principali
        document.querySelectorAll('.cta-button, [data-cta="true"]').forEach(cta => {
            cta.classList.add('pulse');
        });
        
        // Aggiungi effetto scale-hover a card e immagini
        document.querySelectorAll('.card:not(.tilt-element), .metric-card, .revenue-card, .pain-point-card').forEach(card => {
            card.classList.add('scale-hover');
        });
    }
});
