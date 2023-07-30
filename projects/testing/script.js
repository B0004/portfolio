const graph_labels = [
  'HP',
  'Attack',
  'Defense',
  'Speed',
  'Sp.Def',
  'Sp.Atk',
]

let ctx = document.getElementById("pawniard-zu-swords-dance");

let graph_base = [100, 100, 100, 100, 100, 100];

let graph_build = [100, 100, 100, 100, 100, 100];

let stat_data = {
  labels: graph_labels,
  datasets: [{
  label: 'base stats',
  data: graph_base,
  fill: true,
  backgroundColor: 'rgba(255, 99, 132, 0.2)',
  borderColor: 'rgb(255, 99, 132)',
  pointBackgroundColor: 'rgb(255, 99, 132)',
  pointBorderColor: '#fff',
  pointHoverBackgroundColor: '#fff',
  pointHoverBorderColor: 'rgb(255, 99, 132)'
  }, {
  label: 'set stats',
  data: graph_build,
  fill: true,
  backgroundColor: 'rgba(54, 162, 235, 0.2)',
  borderColor: 'rgb(54, 162, 235)',
  pointBackgroundColor: 'rgb(54, 162, 235)',
  pointBorderColor: '#fff',
  pointHoverBackgroundColor: '#fff',
  pointHoverBorderColor: 'rgb(54, 162, 235)'
  }]
};

let config = {
  type: 'radar',
  data: stat_data,
  options: {
  elements: {
      line: {
      borderWidth: 3
      }
  },
  scales: {
      r: {
          angleLines: {
              display: true
          },
          beginAtZero: true,
          max: 400,
          min: 0,
          ticks: {
              stepSize: 100
          }
      }
  }
  }
};

new Chart(ctx, config);
new Chart(document.getElementById("pawniard-lc-offensive"), config);