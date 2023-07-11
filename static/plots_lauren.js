// check to see the connection between plots_lauren.js and index.html
console.log("Test for connection -- good")

// build event listener
d3.select("#dropDown").on("change", buildCharts)

// create function for drop down menu
function buildCharts() {
    let userSelect = d3.select("#dropDown").property("value")

    // get data
    // d3.json("US_Chronic.json").then((data) => {
    d3.json("New_Chronic.json").then((data) => {
        data = JSON.parse(data)
        
        let states = data.map(function(state) {
            return state.LocationDesc;
        });
        console.log(states);

        let cardios = data.map(function(cardio) {
            return cardio.CardiovascularDisease;
        });
        console.log(cardios)

        let populations = data.map(function(p) {
            return p["Pop. 2020"];
        });
        console.log(populations)

        let diabetes = data.map(function(diabete) {
            return diabete.Diabetes;
        });
        console.log(diabetes)

        // create scatter plot
        let scattertrace = {
            x: populations,
            y: userSelect == "Diabetes" ? diabetes : cardios,
            mode: 'markers',
            type: 'scatter',
            text: states,
            marker: { 
                color: 'rgb(17, 157, 255)',
                size: 12,
                line: {
                    color: 'black',
                    width: 1
                } 
            }
        };

        let scatterdata = [ scattertrace ];

        let scatterlayout = {
            title:'Cardiovascular Disease vs Diabetes',
            xaxis: {title: 'Population'},
            yaxis: {title: 'Cases per 100,000'}
        };

        Plotly.newPlot('plot', scatterdata, scatterlayout);

    // data not available below this point
    
    });
};

buildCharts()