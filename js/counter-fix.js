// Script di correzione per i contatori
document.addEventListener('DOMContentLoaded', function() {
    // Funzione per inizializzare i contatori
    function initCounters() {
        const counters = document.querySelectorAll('.counter-value');
        
        // Assicura che i contatori siano visibili
        counters.forEach(counter => {
            counter.style.display = 'inline-block';
            counter.style.visibility = 'visible';
            counter.style.opacity = '1';
            
            // Imposta subito il valore corretto in caso di problemi con l'animazione
            const target = parseInt(counter.getAttribute('data-target'));
            if (!counter.textContent || counter.textContent === '0') {
                counter.textContent = target;
            }
        });
        
        // Implementazione animazione contatori
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = parseInt(entry.target.getAttribute('data-target'));
                    const counterElement = entry.target;
                    
                    // Inizia da 0
                    counterElement.textContent = "0";
                    
                    // Calcola l'incremento e la durata
                    const duration = 2000; // 2 secondi
                    const frameDuration = 1000/60; // 60fps
                    const totalFrames = Math.round(duration / frameDuration);
                    const increment = target / totalFrames;
                    
                    // Anima il contatore
                    let currentCount = 0;
                    const timer = setInterval(() => {
                        currentCount += increment;
                        if (currentCount >= target) {
                            counterElement.textContent = target;
                            clearInterval(timer);
                        } else {
                            counterElement.textContent = Math.floor(currentCount);
                        }
                    }, frameDuration);
                    
                    // Rimuovi l'observer una volta attivato
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 }); // Ridotto il threshold per attivare prima l'animazione
        
        // Osserva tutti i contatori
        counters.forEach(counter => {
            observer.observe(counter);
        });
    }
    
    // Inizializza subito
    initCounters();
    
    // Reinizializza dopo un breve ritardo per assicurare il caricamento completo
    setTimeout(initCounters, 500);
    setTimeout(initCounters, 1000);
    setTimeout(initCounters, 2000);
    
    // Reinizializza alla rilevazione del caricamento della sezione problema
    window.addEventListener('componentLoaded', function(e) {
        if (e.detail.id === 'problem-container') {
            setTimeout(initCounters, 100);
            setTimeout(initCounters, 500);
        }
    });
    
    // Forza i valori corretti se i contatori sono ancora a zero dopo 3 secondi
    setTimeout(function() {
        const counters = document.querySelectorAll('.counter-value');
        counters.forEach(counter => {
            if (counter.textContent === '0') {
                const target = parseInt(counter.getAttribute('data-target'));
                counter.textContent = target;
            }
        });
    }, 3000);
});

// Funzione per preimpostare i contatori con valori corretti
function presetCounters() {
    const counterValues = {
        'Miliardi €': 134,
        'Percento (Tempo risparmiato)': 75,
        'Percento (Crescita e-commerce)': 14
    };
    
    // Trova e imposta i contatori basandosi sul testo vicino
    document.querySelectorAll('.counter-value').forEach(counter => {
        const parent = counter.closest('div');
        if (!parent) return;
        
        const labelElement = parent.querySelector('.text-lg');
        if (!labelElement) return;
        
        const label = labelElement.textContent.trim();
        
        // Abbina il label al valore corretto
        for (const [key, value] of Object.entries(counterValues)) {
            if (label.includes(key.split(' ')[0])) {
                counter.textContent = value;
                counter.setAttribute('data-target', value);
                break;
            }
        }
    });
}

// Esegui al caricamento della pagina e dopo carimento componenti
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', presetCounters);
} else {
    presetCounters();
}
