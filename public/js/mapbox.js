/* eslint-disable */

console.log('hello from the client');
const locations = JSON.parse(document.getElementById('map').dataset.locations);

console.log(locations);

mapboxgl.accessToken =
  'pk.eyJ1Ijoic291bHNoYXJkIiwiYSI6ImNsZnJicGc4ZDA0NmUzcnFmM2lsbnY5ajcifQ.D4X9luNDj4qV9XnZX3Ek5A';
const map = new mapboxgl.Map({
  container: 'map', // container ID
  style: 'mapbox://styles/soulshard/clfrcf9th011501pe6krhexfc', // style URL
  center: [-74.5, 40], // starting position [lng, lat]
});

const bounds = new mapboxgl.LngLatBounds();

locations.forEach((loc) => {
  //Crate marker
  const el = document.createElement('div');
  el.className = 'marker';

  //Add marker
  new mapboxgl.Marker({
    element: el,
    anchor: 'bottom',
  })
    .setLngLat(loc.coordinates)
    .addTo(map);

  // Extend map bounds to include current location
  bounds.extend(loc.coordinates);
});

map.fitBounds(bounds, {
  padding: {
    top: 200,
    bottom: 200,
    left: 100,
    right: 100,
  },
});
