// Revenue Chart Initialization
document.addEventListener('DOMContentLoaded', function() {
    // Aggiungiamo Chart.js dinamicamente se non è già caricato
    if (typeof Chart === 'undefined') {
        const chartScript = document.createElement('script');
        chartScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/3.9.1/chart.min.js';
        chartScript.onload = initRevenueChart;
        document.head.appendChild(chartScript);
    } else {
        // Se Chart.js è già caricato, inizializziamo direttamente il grafico
        setTimeout(initRevenueChart, 1000);
    }
});

// Funzione per inizializzare il grafico dei ricavi
function initRevenueChart() {
    // Verifichiamo che il canvas esista nella pagina
    const chartCanvas = document.getElementById('ricaviChart');
    if (chartCanvas) {
        // Dati per il grafico
        const dati = {
            labels: ['Commissioni', 'Abbonamenti', 'Pubblicità'],
            datasets: [{
                data: [50, 30, 20],
                backgroundColor: [
                    '#FF7A3D', // Primary - Arancione per Commissioni
                    '#4ECDC4', // Secondary - Verde acqua per Abbonamenti
                    '#F7B801'  // Accent - Giallo per Pubblicità
                ],
                borderColor: 'white',
                borderWidth: 2
            }]
        };

        // Configurazione del grafico
        const config = {
            type: 'doughnut',
            data: dati,
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: {
                                family: 'Poppins, sans-serif',
                                size: 14
                            },
                            padding: 20
                        }
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                return `${context.label}: ${context.raw}%`;
                            }
                        },
                        bodyFont: {
                            family: 'Poppins, sans-serif',
                            size: 14
                        },
                        titleFont: {
                            family: 'Poppins, sans-serif',
                            size: 16,
                            weight: 'bold'
                        },
                        padding: 12,
                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                        titleColor: '#2F4858',
                        bodyColor: '#2F4858',
                        borderColor: '#e2e8f0',
                        borderWidth: 1,
                        displayColors: true,
                        boxWidth: 12,
                        boxHeight: 12,
                        boxPadding: 3
                    }
                },
                cutout: '60%',
                animation: {
                    animateScale: true,
                    animateRotate: true,
                    duration: 1500,
                    easing: 'easeOutQuart'
                }
            }
        };

        // Verifichiamo se già esiste un'istanza del grafico e la distruggiamo
        const existingChart = Chart.getChart(chartCanvas);
        if (existingChart) {
            existingChart.destroy();
        }

        // Creazione del grafico
        new Chart(chartCanvas, config);
        
        console.log('Revenue chart initialized');
    } else {
        console.warn('Revenue chart canvas not found');
    }
}

// Riprova a inizializzare il grafico quando viene caricato il componente business
window.addEventListener('componentLoaded', function(e) {
    if (e.detail.id === 'business-container') {
        // Attendiamo che il DOM sia stato aggiornato
        setTimeout(function() {
            initRevenueChart();
        }, 500);
    }
});

// Riprova anche al ridimensionamento della finestra per garantire che il grafico sia sempre visualizzato correttamente
window.addEventListener('resize', function() {
    setTimeout(function() {
        initRevenueChart();
    }, 500);
});
