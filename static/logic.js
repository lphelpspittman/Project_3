// Create initial tile layers, a layerGroup for the earthquakes and a layer control
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

// Create an empty (new) leaflet layerGroup for earthquakes.
let cardiovascular = new L.LayerGroup();
let diabetes = new L.LayerGroup();

// Create an overlay object to hold our overlay.
let overlayMaps = {
    Cardiovascular: cardiovascular,
    Diabetes: diabetes
};

// Create our map, giving it the streetmap and earthquakes layers to display on load.
let myMap = L.map("map", {
    center: [
        37.09, -95.71
    ],
    zoom: 4.5,
    layers: [street, cardiovascular]
});

// Create a layer control.
// Pass it our baseMaps and overlayMaps.
// Add the layer control to the map.
L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(myMap);

// Get earthquake data from USGS
let queryUrl = "data/geojson.geojson"

// Perform a d3.json AJAX request to the query URL/
d3.json(queryUrl).then(function (data) {
    //console.log(data)
    data[0].features=data[0].features.filter(function(f){
      
        return f.properties.stratificationcategory1== "Overall"

    })
    L.geoJSON(data[0]).addTo(cardiovascular)
    L.geoJSON(data[0]).addTo(diabetes)
});
