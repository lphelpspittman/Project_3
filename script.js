// Load the JSON data
fetch('cdi.project3.json')
  .then(response => response.json())
  .then(data => {
    // Extract the required data for the charts
    const states = data.map(entry => entry.State);
    const cvdFemale = data.map(entry => entry['CVD-Female']);
    const cvdMale = data.map(entry => entry['CVD-Male']);
    const diaFemale = data.map(entry => entry['DIA-Female']);
    const diaMale = data.map(entry => entry['DIA-Male']);

    // Create the initial chart based on Cardiovascular Disease data
    createChart(states, cvdFemale, cvdMale);

    // Toggle between Cardiovascular Disease and Diabetes charts
    const toggleBtn = document.getElementById('toggle-btn');
    toggleBtn.addEventListener('click', () => {
      const currentChartType = toggleBtn.dataset.chartType;
      if (currentChartType === 'cvd') {
        createChart(states, diaFemale, diaMale, 'Diabetes');
        toggleBtn.dataset.chartType = 'dia';
        toggleBtn.textContent = 'Toggle to Cardiovascular Disease data';
      } else {
        createChart(states, cvdFemale, cvdMale, 'Cardiovascular Disease');
        toggleBtn.dataset.chartType = 'cvd';
        toggleBtn.textContent = 'Toggle to Diabetes data';
      }
    });
  })
  .catch(error => console.error(error));

// Function to create the bar chart
function createChart(xData, yData1, yData2, yAxisLabel) {
  const trace1 = {
    x: xData,
    y: yData1,
    name: `${yAxisLabel}-Female`,
    type: 'bar'
  };

  const trace2 = {
    x: xData,
    y: yData2,
    name: `${yAxisLabel}-Male`,
    type: 'bar'
  };

  const layout = {
    barmode: 'group',
    title: `Mortality from ${yAxisLabel} in 2020`,
    xaxis: {
      title: 'State'
    },
    yaxis: {
      title: 'cases per 100,000'
    }
  };

  const data = [trace1, trace2];
  Plotly.newPlot('chart', data, layout);
}
