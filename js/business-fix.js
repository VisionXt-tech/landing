// Script per forzare la visibilità dei contenuti nella sezione business
document.addEventListener('DOMContentLoaded', function() {
    // Funzione per assicurare la visibilità dei contenuti nella sezione business
    function fixBusinessSection() {
        console.log("Business section fix running...");
        
        // Flussi di Ricavo Multi-Canale
        const revenueCards = document.querySelectorAll('#business .revenue-card');
        if (revenueCards.length > 0) {
            console.log("Found revenue cards:", revenueCards.length);
            revenueCards.forEach((card, index) => {
                card.style.display = 'block';
                card.style.visibility = 'visible';
                card.style.opacity = '1';
                card.style.position = 'relative';
                card.style.zIndex = '10';
                
                // Rimuovi attributi AOS che potrebbero interferire
                card.removeAttribute('data-aos');
                card.removeAttribute('data-aos-delay');
                card.removeAttribute('data-aos-duration');
                
                // Assicura che tutti i contenuti all'interno della card siano visibili
                const elements = card.querySelectorAll('*');
                elements.forEach(el => {
                    el.style.display = '';
                    el.style.visibility = 'visible';
                    el.style.opacity = '1';
                    
                    // Rimuovi attributi AOS che potrebbero interferire
                    el.removeAttribute('data-aos');
                    el.removeAttribute('data-aos-delay');
                    el.removeAttribute('data-aos-duration');
                });
            });
        }
        
        // Metriche Chiave e Obiettivi
        const metricCards = document.querySelectorAll('#business .metric-card');
        if (metricCards.length > 0) {
            console.log("Found metric cards:", metricCards.length);
            metricCards.forEach((card, index) => {
                card.style.display = 'block';
                card.style.visibility = 'visible';
                card.style.opacity = '1';
                card.style.position = 'relative';
                card.style.zIndex = '10';
                
                // Rimuovi attributi AOS che potrebbero interferire
                card.removeAttribute('data-aos');
                card.removeAttribute('data-aos-delay');
                card.removeAttribute('data-aos-duration');
                
                // Assicura che tutti i contenuti all'interno della card siano visibili
                const elements = card.querySelectorAll('*');
                elements.forEach(el => {
                    el.style.display = '';
                    el.style.visibility = 'visible';
                    el.style.opacity = '1';
                    
                    // Rimuovi attributi AOS che potrebbero interferire
                    el.removeAttribute('data-aos');
                    el.removeAttribute('data-aos-delay');
                    el.removeAttribute('data-aos-duration');
                });
            });
        }
        
        // Titoli di sezione
        const businessSectionTitles = document.querySelectorAll('#business h3');
        if (businessSectionTitles.length > 0) {
            console.log("Found business section titles:", businessSectionTitles.length);
            businessSectionTitles.forEach(title => {
                title.style.display = 'block';
                title.style.visibility = 'visible';
                title.style.opacity = '1';
                title.style.position = 'relative';
                title.style.zIndex = '10';
                
                // Rimuovi attributi AOS che potrebbero interferire
                title.removeAttribute('data-aos');
                title.removeAttribute('data-aos-delay');
                title.removeAttribute('data-aos-duration');
            });
        }
        
        // Rimuovi style overflow: hidden se presente
        const businessSection = document.getElementById('business');
        if (businessSection) {
            businessSection.style.overflow = 'visible';
            
            // Forza display standard per tutti i contenuti
            const containers = businessSection.querySelectorAll('.container, .grid');
            containers.forEach(container => {
                container.style.display = 'block';
                container.style.visibility = 'visible';
                container.style.opacity = '1';
                container.style.overflow = 'visible';
            });
        }
    }
    
    // Esegui immediatamente
    setTimeout(fixBusinessSection, 100);
    
    // Esegui anche dopo che il contenuto è stato caricato
    setTimeout(fixBusinessSection, 500);
    setTimeout(fixBusinessSection, 1000);
    setTimeout(fixBusinessSection, 2000);
    
    // Aggiungi un listener per eventi di caricamento del componente
    window.addEventListener('componentLoaded', function(e) {
        if (e.detail && e.detail.id === 'business-container') {
            console.log('Business component loaded, fixing visibility...');
            setTimeout(fixBusinessSection, 100);
            setTimeout(fixBusinessSection, 500);
        }
    });
    
    // Aggiungi al window.onload per assicurarsi che venga eseguito anche dopo che tutto è caricato
    window.addEventListener('load', function() {
        console.log('Window loaded, fixing business section...');
        setTimeout(fixBusinessSection, 100);
        setTimeout(fixBusinessSection, 500);
    });
});
