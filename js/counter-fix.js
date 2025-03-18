// Script di correzione per i contatori
document.addEventListener('DOMContentLoaded', function() {
    // Funzione per inizializzare i contatori
    function initCounters() {
        const counters = document.querySelectorAll('.counter-value');
        
        if (!counters || counters.length === 0) {
            console.log('Nessun contatore trovato, riprovo tra 500ms');
            setTimeout(initCounters, 500);
            return;
        }
        
        console.log(`Inizializzazione di ${counters.length} contatori`);
        
        // Assicura che i contatori siano visibili
        counters.forEach(counter => {
            counter.style.display = 'inline-block';
            counter.style.visibility = 'visible';
            counter.style.opacity = '1';
            
            // Assegna id univoci ai contatori se non ne hanno
            if (!counter.id) {
                counter.id = 'counter-' + Math.random().toString(36).substr(2, 9);
            }
            
            // Imposta subito il valore corretto in caso di problemi con l'animazione
            const target = parseInt(counter.getAttribute('data-target'));
            if (isNaN(target)) {
                console.warn('Target non valido per il contatore', counter);
                return;
            }
            
            // Valore iniziale
            if (!counter.textContent || counter.textContent === '0') {
                counter.textContent = '0';
            }
        });
        
        // Implementazione animazione contatori
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counterElement = entry.target;
                    const target = parseInt(counterElement.getAttribute('data-target'));
                    
                    if (isNaN(target)) {
                        console.warn('Target non valido per il contatore', counterElement);
                        return;
                    }
                    
                    // Verifica se l'animazione è già in corso o è stata completata
                    if (counterElement.dataset.animated === 'true') {
                        return;
                    }
                    
                    // Marca come in fase di animazione
                    counterElement.dataset.animated = 'true';
                    
                    let currentCount = 0;
                    const duration = 1500; // 1.5 secondi
                    const frameDuration = 1000/30; // 30fps per fluidità sufficiente
                    const totalFrames = Math.round(duration / frameDuration);
                    const increment = target / totalFrames;
                    
                    const animateCounter = () => {
                        currentCount += increment;
                        if (currentCount >= target) {
                            counterElement.textContent = target;
                        } else {
                            counterElement.textContent = Math.floor(currentCount);
                            requestAnimationFrame(animateCounter);
                        }
                    };
                    
                    requestAnimationFrame(animateCounter);
                    
                    // Rimuovi l'observer una volta attivato
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5, rootMargin: '0px 0px -100px 0px' });
        
        // Osserva tutti i contatori
        counters.forEach(counter => {
            observer.observe(counter);
        });
    }
    
    // Funzione per impostare valori statici ai contatori
    function setStaticCounterValues() {
        const counterValues = {
            'Miliardi': 134,
            'Tempo risparmiato': 75,
            'Crescita e-commerce': 14
        };
        
        document.querySelectorAll('.counter-value').forEach(counter => {
            // Assicura che il contatore sia visibile
            counter.style.display = 'inline-block';
            counter.style.visibility = 'visible';
            counter.style.opacity = '1';
            
            // Cerca il contatore nel contenitore
            const parent = counter.closest('.stat-box');
            if (!parent) return;
            
            // Cerca il testo nell'elemento più vicino (h3 o p)
            const textElement = parent.querySelector('h3, p, .text-lg');
            if (!textElement) return;
            
            const textContent = textElement.textContent.trim().toLowerCase();
            
            // Trova il valore appropriato basato sul testo
            for (const [key, value] of Object.entries(counterValues)) {
                if (textContent.includes(key.toLowerCase())) {
                    counter.textContent = value;
                    counter.setAttribute('data-target', value);
                    console.log(`Contatore impostato: ${key} = ${value}`);
                    break;
                }
            }
            
            // Imposta un valore di fallback se non è stato trovato nessun match
            if (!counter.getAttribute('data-target')) {
                const fallbackValue = parseInt(counter.textContent) || 100;
                counter.setAttribute('data-target', fallbackValue);
                counter.textContent = fallbackValue;
                console.log(`Contatore impostato con fallback: ${fallbackValue}`);
            }
        });
    }
    
    // Inizializza subito
    setStaticCounterValues();
    initCounters();
    
    // Reinizializza dopo un breve ritardo per assicurare il caricamento completo
    setTimeout(setStaticCounterValues, 1000);
    setTimeout(initCounters, 1000);
    
    // Intercetta il caricamento dinamico dei contenuti
    const originalFetch = window.fetch;
    window.fetch = function() {
        return originalFetch.apply(this, arguments)
            .then(response => {
                setTimeout(setStaticCounterValues, 500);
                setTimeout(initCounters, 500);
                return response;
            })
            .catch(error => {
                throw error;
            });
    };
    
    // Monitora anche le modifiche al DOM per rilevare quando vengono aggiunti nuovi contatori
    const observer = new MutationObserver(mutations => {
        let hasNewCounters = false;
        
        mutations.forEach(mutation => {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1) { // ELEMENT_NODE
                        if (node.classList && node.classList.contains('counter-value')) {
                            hasNewCounters = true;
                        } else if (node.querySelectorAll) {
                            const counters = node.querySelectorAll('.counter-value');
                            if (counters.length > 0) hasNewCounters = true;
                        }
                    }
                });
            }
        });
        
        if (hasNewCounters) {
            console.log('Nuovi contatori rilevati, inizializzo');
            setTimeout(setStaticCounterValues, 100);
            setTimeout(initCounters, 100);
        }
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
});