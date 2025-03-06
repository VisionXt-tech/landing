// File che si occupa dell'inizializzazione del grafico dei ricavi nella sezione business
document.addEventListener('DOMContentLoaded', function() {
    // Verifica se il business component è già caricato
    if (document.getElementById('business')) {
        initRevenueChart();
    }
    
    // Ascolta l'evento che indica che il componente business è stato caricato
    document.addEventListener('componentLoaded', function(e) {
        if (e.detail && e.detail.id === 'business-container') {
            setTimeout(initRevenueChart, 500);  // Leggero ritardo per assicurarsi che il DOM sia aggiornato
        }
    });
    
    // Inizializza il grafico
    function initRevenueChart() {
        // Verifica che il canvas sia disponibile
        const canvas = document.getElementById('ricaviChart');
        if (!canvas) {
            return; // Canvas non ancora disponibile, probabilmente sarà verificato in un evento successivo
        }
        
        // Verifica che Chart.js sia disponibile
        if (typeof Chart === 'undefined') {
            return; // Chart.js non disponibile, sarà caricato altrove
        }
        
        try {
            // Verifica se esiste già un grafico sul canvas e lo distrugge
            const existingChart = Chart.getChart(canvas);
            if (existingChart) {
                existingChart.destroy();
            }
            
            // Crea il grafico
            new Chart(canvas, {
                type: 'doughnut',
                data: {
                    labels: ['Commissioni', 'Abbonamenti', 'Pubblicità'],
                    datasets: [{
                        data: [50, 30, 20],
                        backgroundColor: ['#FF7A3D', '#4ECDC4', '#F7B801'],
                        borderWidth: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    cutout: '70%',
                    plugins: {
                        legend: {
                            display: false  // Nascondi la legenda poiché abbiamo la nostra personalizzata
                        }
                    }
                }
            });
        } catch (error) {
            console.error('Errore durante l\'inizializzazione del grafico:', error);
        }
    }
    
    // Riprova ad inizializzare il grafico al caricamento completo della pagina
    window.addEventListener('load', function() {
        setTimeout(initRevenueChart, 1000);
    });
});
