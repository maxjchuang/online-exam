$(function () {
  var defaultSets = [
    {
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
    }
  ]
  var dataSets = []
  $.each(markData.datasets, function (index, value) {
    dataSets.push($.extend(defaultSets[index], value))
  })

  var ctx = document.getElementById("markChart");
  var markChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: markData.labels,
      datasets: dataSets
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });

})
