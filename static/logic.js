// Create initial tile layers, a layerGroup for the mortaility rate and a layer control
// Create the base layers.
let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
})

let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

// Create a baseMaps object.
let baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
};

// Create an empty (new) leaflet layerGroup for mortality rate.
let cardiovascular = new L.LayerGroup();
let diabetes = new L.LayerGroup();

// Create an overlay object to hold our overlay.
let overlayMaps = {
    Cardiovascular: cardiovascular,
    Diabetes: diabetes
};

// Create our map, giving it the streetmap and mortality rate layers to display on load.
let myMap = L.map("map", {
    center: [
        37.09, -95.71
    ],
    zoom: 3.5,
    layers: [street, cardiovascular,diabetes]
});

// Create a layer control.
// Pass it our baseMaps and overlayMaps.
// Add the layer control to the map.
L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(myMap);

// Get mortality rate data from geojson
let queryUrl = "../data/geojson.geojson"

// Perform a d3.json AJAX request to the query URL/
d3.json(queryUrl).then(function (data) {

    data[0].features = data[0].features.filter(function (f) {

        return f.properties.stratificationcategory1 == "Overall"

    })
    var dataD = data[0].features.filter(function (f) {

        return f.properties.topic == "Diabetes"

    })
    data[0].features = data[0].features.filter(function (f) {

        return f.properties.topic == "Cardiovascular Disease"

    })
    console.log(data[0].features);
    //L.geoJSON(data[0]).addTo(cardiovascular);
    //L.geoJSON(data[0]).addTo(diabetes);

    // Create function for markerSize of cardiovascular
    function markerSize_cardiovascular(datavalue) {
        return datavalue * 0.07;
    }

    // Create function for markerSize of diabetes
    function markerSize_diabetes(datavalue) {
        return datavalue * 0.07;
    }

    // Create a function markerColor for cardiovascular
    function markerColor_cardiovascular(overall_cardiovascular) {
        return overall_cardiovascular > 300 ? '#d7191c' :
            overall_cardiovascular > 200 ? '#fdae61' :
                overall_cardiovascular > 100 ? '#ffffbf' :
                    overall_cardiovascular > 0 ? '#a6d96a' :
                        '#1a9641';

    }

     // Create a function markerColor for diabetes
     function markerColor_diabetes(overall_diabetes) {
        return overall_diabetes > 300 ? '#d7191c' :
        overall_diabetes > 200 ? '#fdae61' :
        overall_diabetes > 100 ? '#ffffbf' :
        overall_diabetes > 0 ? '#a6d96a' :
                        '#1a9641';

    }


    // Create a GeoJSON layer for cardiovascular using data
    function styleInfo(feature) {
        //console.log(feature.properties.datavalue);
        return {
            radius: markerSize_cardiovascular(feature.properties.datavalue),
            fillColor: markerColor_cardiovascular(feature.properties.datavalue),
            color: "black",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.7
        };
    }

    L.geoJSON(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
        },
        
        // Use styleInfo to define circleMarker style
        style: styleInfo,

        // Use onEachFeature to add a popup with location, time and magnitude and depth
        onEachFeature: function onEachFeature(feature, layer) {
            layer.bindPopup(`
    <h3>${feature.properties.locationdesc}</h3>
    <hr>
    <p>${feature.properties.question}</p>
    <p>${feature.properties.datavalue} ${feature.properties.datavalueunit}</p>
   
      `);
        }

    }).addTo(cardiovascular);




    
    // Create a GeoJSON layer for diabetes using data
    function styleInfo_diabetes(feature) {
        //console.log(feature.properties.datavalue);
        return {
            radius: markerSize_diabetes(feature.properties.datavalue),
            fillColor: markerColor_diabetes(feature.properties.datavalue),
            color: "black",
            weight: 1,
            opacity: 1,
            fillOpacity: 0.7
        };
    }

    L.geoJSON(dataD, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
        },
        
        // Use styleInfo to define circleMarker style
        style: styleInfo_diabetes,

        // Use onEachFeature to add a popup with location, time and magnitude and depth
        onEachFeature: function onEachFeature(feature, layer) {
            layer.bindPopup(`
    <h3>${feature.properties.locationdesc}</h3>
    <hr>
    <p>${feature.properties.question}</p>
    <p>${feature.properties.datavalue} ${feature.properties.datavalueunit}</p>
   
      `);
        }

    }).addTo(diabetes);

    // Add legend for cardiovascular
    let legend_cardiovascular = L.control({ position: 'bottomright' });
        //console.log(legend_cardiovascular);
    legend_cardiovascular.onAdd = function (map) {
        //console.log("lalalalalla");
        let div = L.DomUtil.create('div', 'info legend'),
            grades = [0, 100, 200, 300],
            labels = [];

        // loop through our density intervals and generate a label with a colored square for each interval
        div.innerHTML += 'Range <br>'
        for (let i = 0; i < grades.length; i++) {
            div.innerHTML +=
                '<i style="background:' + markerColor_cardiovascular(grades[i] + 1) + '"></i> ' +
                grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
        }

        return div;
    };
    
    legend_cardiovascular.addTo(myMap);
    


     // Add legend for diabetes
     let legend_diabetes = L.control({ position: 'bottomright' });

     legend_diabetes.onAdd = function (map) {
 
         let div = L.DomUtil.create('div', 'info legend diabetes'),
             grades = [0, 100, 200, 300],
             labels = [];
 
         // loop through our density intervals and generate a label with a colored square for each interval
         div.innerHTML += 'Range <br>'
         for (let i = 0; i < grades.length; i++) {
             div.innerHTML +=
                 '<i style="background:' + markerColor_diabetes(grades[i] + 1) + '"></i> ' +
                 grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
         }
 
         return div;
     };
 
     legend_diabetes.addTo(myMap);
    

    // Info control for cardiovascular
    let info_cardiovascular = L.control();

    info_cardiovascular.onAdd = function () {
        this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
        this.update();
        return this._div;
    };
    // method that we will use to update the control based on feature properties passed
    info_cardiovascular.update = function (props) {
        this._div.innerHTML = '<h4>Mortality Rate By Cardiovascular Of Each State in 2020 </h4>' +
            'Circle Radius is a function of DataValue' +
            '<br>' +
            'Circle color is a function of Range';
    };

    info_cardiovascular.addTo(myMap);

    

    // Info control for diabetes
    let info_diabetes = L.control();

    info_diabetes.onAdd = function () {
        this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
        this.update();
        return this._div;
    };
    // method that we will use to update the control based on feature properties passed
    info_diabetes.update = function (props) {
        this._div.innerHTML = '<h4>Mortality Rate By Diabetes Of Each State in 2020 </h4>' +
            'Circle Radius is a function of DataValue' +
            '<br>' +
            'Circle color is a function of Diabetes Range';
    };

    info_diabetes.addTo(myMap);

    // Listen for overlayadd event
    myMap.on('overlayadd', function (eventLayer) {
        if (eventLayer.name === 'Cardiovascular') {
            legend_cardiovascular.addTo(myMap);
            info_cardiovascular.addTo(myMap);
        } else if (eventLayer.name === 'Diabetes') {
            legend_diabetes.addTo(myMap);
            info_diabetes.addTo(myMap);
        }
    });

    // Listen for overlayremove event
    myMap.on('overlayremove', function (eventLayer) {
        if (eventLayer.name === 'Cardiovascular') {
            myMap.removeControl(legend_cardiovascular);
            myMap.removeControl(info_cardiovascular);
        } else if (eventLayer.name === 'Diabetes') {
            myMap.removeControl(legend_diabetes);
            myMap.removeControl(info_diabetes);
        }
    });
});