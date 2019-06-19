<script>
  import { onMount } from 'svelte';
  import L from 'leaflet';
  import { position } from '../stores.js';
  import { mapboxToken } from '../config.js';

  let map;
  let marker;

  onMount(() => {
    map = L.map('map').setView([59.376, 18.079], 10);

    map.scrollWheelZoom.disable();
    
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: '',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: mapboxToken
    }).addTo(map);

    map.on('click', onMapClick);
  });
  
  const onMapClick = (e) => {
    addMarkerToMap(e.latlng);
  }

  const addMarkerToMap = (latlng) => {
    if (marker) {
      marker.setLatLng(latlng);
    } else {
      marker = L.marker(latlng).addTo(map);
    }
    position.set(latlng);
  }
</script>

<style>
  #map {
    width: 100%;
    max-width: 100%;
    height: 580px;
    margin: 0;
    padding: 0;
  }
</style>

<div id="map"></div>
