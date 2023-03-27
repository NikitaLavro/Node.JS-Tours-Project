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
