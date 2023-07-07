// check to see the connection between plots_lauren.js and index.html
console.log("Test for connection -- good")


// get data
d3.json("US_Chronic.json").then((data) => {
    console.log(data);
    
    
    let states = data.map(function(state) {
        return state.LocationDesc;
    });
    console.log(states);

    let cardios = data.map(function(cardio) {
        return cardio.CardiovascularDisease;
    });
    console.log(cardios)

    let diabetes = data.map(function(diabete) {
        return diabete.Diabetes;
    });
    console.log(diabetes)

    // create scatter plot
    let scattertrace = {
        x: cardios,
        y: diabetes,
        mode: 'markers',
        type: 'scatter',
        text: states,
        marker: { size: 12 }
    };

    let scatterdata = [ scattertrace ];

    let scatterlayout = {
        title:'Cardio vs Diabetes'
    };

    Plotly.newPlot('plot', scatterdata, scatterlayout);



    // data not available below this point
});