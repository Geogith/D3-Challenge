// Create a map object
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5
});

// Add a tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

// Loop through the states array and create one marker for each state, bind a popup containing its healthcare low and poverty % add it to the map

states.forEach(function(states){
  L.marker(states.location)
    .bindPopup(`<h1>${state.name}</h1> <hr> <h3>healthcareLow: ${state.healtcareLow} </h3>`)
    .addTo(myMap);
})

// _________________________________________________________________________________Another possible solution (17.2.3 Stu_Markers)------------------



// // Grab the data with d3
// d3.json(url).then(function (response) {

//   // Create a new marker cluster group
//   var markers = L.markerClusterGroup();

//   // Loop through data
//     response.forEach(function (data) {
//       var location = data.location;

//       // Check for location property
//       if (location) {
//         // Add a new marker to the cluster group and bind a pop-up
//         markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
//           .bindPopup(data.descriptor));
//       }

//     });

//   // Add our marker cluster layer to the map
//   myMap.addLayer(markers);
//   // markers.addTo(myMap); <- This also works. 

// });