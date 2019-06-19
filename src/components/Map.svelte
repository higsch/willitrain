<script>
  import { onMount } from 'svelte';
  import L from 'leaflet';
  import { position } from '../stores.js';
  import { mapboxToken } from '../config.js';

  let map;
  let marker;

  const addMarkerToMap = (latlng) => {
    if (marker) {
      marker.setLatLng(latlng);
    } else {
      marker = L.marker(latlng).addTo(map);
    }
  };

  onMount(() => {
    map = L.map('map', {
      scrollWheelZoom: false
    });
    map.setView([59.376, 18.079], 10);

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: '',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: mapboxToken
    }).on('load', (e) => {
      if ($position) {
        addMarkerToMap($position);
      }
    }).addTo(map);

    map.on('click', (e) => {
      position.set(e.latlng);
      addMarkerToMap(e.latlng);
    });
  });
</script>

<style>
  #map {
    width: 100%;
    max-width: 100%;
    height: auto;
    margin: 0;
    padding: 0;
  }
</style>

<div id="map"></div>
