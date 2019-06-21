<script>
  import { onMount } from 'svelte';
  import L from 'leaflet';
  import { position } from '../stores.js';
  import { mapboxToken } from '../config.js';

  let map;
  let marker;
  export let startCoordinates = [59.376, 18.079];
  export let zoomLevel = 9;

  const addMarkerToMap = (latlng) => {
    if (marker) {
      marker.setLatLng(latlng);
    } else {
      marker = L.marker(latlng).addTo(map);
    }
  };

  onMount(() => {
		map = L.map('map', {
      scrollWheelZoom: true,
      center: startCoordinates,
      zoom: zoomLevel
    });

    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: '',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: mapboxToken
    }).once('load', (e) => {
      if ($position) {
        map.setView($position, zoomLevel);
        addMarkerToMap($position);
      }
    }).addTo(map);

    map.on('click', (e) => {
      position.set(e.latlng);
      addMarkerToMap(e.latlng);
    });

		return () => {
			map.remove();
		};
  });
</script>

<svelte:head>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.5.1/dist/leaflet.css"
  			integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
  			crossorigin="" />
</svelte:head>

<div id="map"></div>

<style>
  #map {
    width: 100%;
    max-width: 100%;
    height: auto;
    margin: 0;
    padding: 0;
  }
</style>
