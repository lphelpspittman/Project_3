// check to see the connection between plots_lauren.js and index.html
console.log("Test for connection -- good")


// get data
d3.json("geojson.geojson").then(function(data) {
    console.log(data[0].features[0]);





    // data not available below this point
});
// function buildCharts(sample) {
//     console.log("testing buildCharts function");
//     d3.json(sample_data).then(function(data) {
//         console.log("This is sample data")
//         console.log(data);

//         // to build the bar chart need the samples object
//         let samples = data.samples
//         // view in console
//         console.log(samples);

//         // filter samples for the give sample (i.e. 940)
//         let sampleArray = samples.filter(sampleObject => sampleObject.id == sample);
//         // view sampleArray
//         console.log(sampleArray);

//         // unpack the object from within the array
//         let sampleResult = sampleArray[0];
//         console.log(sampleResult);

//         // create variables 
//         let sample_values = sampleResult.sample_values;
//         console.log("This is sample_values")
//         console.log(sample_values);

//         let otu_ids = sampleResult.otu_ids;
//         console.log("This is otu_ids")
//         console.log(otu_ids);

//         let otu_labels= sampleResult.otu_labels;
//         console.log("This is otu_labels")
//         console.log(otu_labels);

//         // build Bubblechart
//         // create trace
//         let traceBubble = {
//             x: otu_ids,
//             y: sample_values,
//             text: otu_labels,
//             mode: 'markers',
//             marker: {
//                 size: sample_values,
//                 color: otu_ids,
//                 colorscale: 'YlGnBu'
//             }
//         };

//         let dataBubble = [traceBubble];

//         let layoutBubble = {
//             title: "Bacteria in Sample",
//             showlegend: false,
//             xaxis: {title: "OTU ID"},
//             yaxix: {title: "Sample Values"},
//             hovermode: "closest",
            
//         }

//         // build bubble chart in <div id="bubble"></div>
//         Plotly.newPlot('bubble', dataBubble, layoutBubble);