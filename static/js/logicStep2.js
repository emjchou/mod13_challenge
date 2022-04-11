// add console.log to check if code is working
console.log("working");



// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// create dart view tile layer for map option
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// create a base layer that holds both maps
let baseMaps = {
    "Streets": streets,
    "Satellite": satelliteStreets
}

// Create the map object with center, zoom level, and default layer.
let map = L.map('mapid', {
    center: [39.5, -98.5],
    zoom: 3, 
    layers: [streets]
});

// pass map layers to layer control and add layers control to map
L.control.layers(baseMaps).addTo(map);

// retrieve earthquake GeoJSON data
let url="https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";
function styleInfo(feature) {
    return {
        opacity: 1, 
        fillOpacity: 1,
        fillColor: "#ffae42",
        color: "#000000",
        radius: getRadius(),
        stroke: true,
        weight: 0.5
    };
}

function getRadius(magnitude) {
    if (magnitude === 0){
        return 1;
    }
    return magnitude*4;
}
d3.json(url).then(function(data){
    // create GeoJSON layer
    L.geoJSON(data,{
        pointToLayer: function(feature, latlng){
            console.log(data);
            return L.circleMarker(latlng);
        },
    style: styleInfo
    }).addTo(map);

    
})
