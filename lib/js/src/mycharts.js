let themeColors = {
  main: 'rgba(224,78, 57, 1)',
  borders: [
      'rgba(117,28,28,0.1)',
      'rgba(117,28,28,0.15)',
      'rgba(117,28,28,0.2)',
      'rgba(117,28,28,0.25)',
      'rgba(117,28,28,0.3)',
      'rgba(117,28,28,0.35)',
      'rgba(117,28,28,0.4)',
      'rgba(117,28,28,0.45)',
      'rgba(117,28,28,0.5)',
      'rgba(117,28,28,0.55)',
      'rgba(117,28,28,0.6)',
      'rgba(117,28,28,0.7)',
      'rgba(117,28,28,0.8)',
      'rgba(117,28,28,0.9)',
      'rgba(117,28,28,0.9)',
      'rgba(117,28,28,0.9)',
  ],
  backgrounds: [
    'rgba(224,78, 57, 0.4)',
    'rgba(224,78, 57, 0.45)',
    'rgba(224,78, 57, 0.5)',
    'rgba(224,78, 57, 0.55)',
    'rgba(224,78, 57, 0.6)',
    'rgba(224,78, 57, 0.65)',
    'rgba(224,78, 57, 0.7)',
    'rgba(224,78, 57, 0.75)',
    'rgba(224,78, 57, 0.80)',
    'rgba(224,78, 57, 0.85)',
    'rgba(224,78, 57, 0.88)',
    'rgba(224,78, 57, 0.92)',
    'rgba(224,78, 57, 0.95)',
    'rgba(224,78, 57, 0.98)',
  ],
  contrasts: [
    'rgba(224,78, 57, 0.8)',
    'rgba(78, 57, 224, 0.5)',
    'rgba(78, 57, 224, 0.2)',
    'rgba(57, 224, 78, 0.8)',
    'rgba(224,78, 57, 0.5)',
    'rgba(224,78, 57, 0.2)',
    'rgba(78, 57, 224, 0.8)',
    'rgba(57, 224, 78, 0.5)',
    'rgba(57, 224, 78, 0.2)',
  ],
};

function createCharts() {
  var ctx = document.getElementById("slide-1a").getContext('2d');
  var myChart = new Chart(ctx, {
      type: 'line',
      data: {
          labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Black"],
          datasets: [{
              label: '# of Votes',
              data: [12, 19, 3, 5, 2, 3],
              backgroundColor: themeColors.backgrounds,
              borderColor: themeColors.borders,
              borderWidth: 2
          }]
      },
      options: {
          scales: {
              yAxes: [{
                  ticks: {
                      beginAtZero:true
                  }
              }]
          }
      }
  });
}

createCharts();
