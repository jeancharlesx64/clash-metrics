let playerWins = Number(document.querySelector('#playerWins').value);
let playerLosses = Number(document.querySelector('#playerLosses').value);
let playerFunMode = Number(document.querySelector('#playerFunMode').value);

let commonCount = Number(document.querySelector('#commonCount').value);
let rareCount = Number(document.querySelector('#rareCount').value);
let epicCount = Number(document.querySelector('#epicCount').value);
let legendaryCount = Number(document.querySelector('#legendaryCount').value);
let championCount = Number(document.querySelector('#championCount').value);
let notFoundCount = Number(document.querySelector('#notFoundCount').value);

const ctx = document.getElementById('radarChart');
new Chart(ctx, {
    type: 'radar',
    data: {
        /* eslint-disable */
        labels: ['Vitórias', 'Derrotas', 'Modo Diversão'],
        datasets: [{
            labels: ['Vitórias', 'Derrotas', 'Modo Diversão'],
            /* jshint ignore:start */
            data: [
                playerWins,
                playerLosses,
                playerFunMode
            
            ],
            /* jshint ignore:end */
            borderWidth: 2,
            borderColor: '#0b4cff',
            backgroundColor: '#0b4cff4b',
            pointBackgroundColor: '#0b4cff',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgba(255, 99, 132, 1)'
        }]
    },
    /* eslint-enable */
    options: {
        scales: {
            r: {
                min: 0,
                ticks: {
                    display: false // remove os números das linhas radiais
                },
                maxTicksLimit: 5, // limita o número máximo de ticks
                stepSize: 20 // ajusta o espaçamento entre as linhas radiais
            }
        },
        plugins: {
            title: {
                display: false,
                position: 'top',
                text: 'Avaliação de batalhas'
            },
            legend: {
                display: false,
                position: 'bottom',
                labels: {
                    font: {
                        size: 12
                    }
                }
            },
            tooltips: {
                enabled: true
            }
        }
    }
});                      


    const ctx2 = document.getElementById('graficoDeBarras').getContext('2d');

    const data2 = {
    labels: ['Comuns', 'Raras', 'Épicas', 'Lendárias', 'Campeões', 'N/A'],
    label: {
        display: false
    },
    datasets: [{
        data: [
            commonCount,
            rareCount,
            epicCount,
            legendaryCount,
            championCount,
            notFoundCount
        ], 
        backgroundColor: [ // Array de cores para cada barra
        '#70C0DC', // Cor para a primeira barra
        '#E4A432', // Cor para a segunda barra
        '#D855DC', // Cor para a terceira barra
        '#A0A0A0', // Cor para a quarta barra
        '#ffa600', // Cor para a quinta barra
        '#D7D8F0'
        ],
        borderColor: [ // Bordas das barras (opcional)
        '#70C0DC',
        '#E4A432',
        '#D855DC',
        '#A0A0A0',
        '#ffa600',
        '#D7D8F0'
        ],
        borderWidth: 1 ,

    }]
    };

    const options2 = {
        scales: {
            x: {
            display: 'auto', // Exibe os rótulos das barras como indicadores
            beginAtZero: true
            },
            y: {
            beginAtZero: true 
            }
        },
        plugins: {
        legend: {
            display: false
        }
        }
    };

    const graficoDeBarras = new Chart(ctx2, {
    type: 'bar', 
    data: data2, 
    options: options2
    });