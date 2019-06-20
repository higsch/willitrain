<script>
	import { onDestroy } from 'svelte';
	import RainGraph from './components/RainGraph.svelte';
	import Map from './components/Map.svelte';
	import { position, useLocalStorage } from './stores.js';

	// enable local storage for position
	const ls = useLocalStorage(position, 'position');

	const windowResizeHandler = (e) => {
		document.body.height = window.innerHeight;
	};
	windowResizeHandler();

	onDestroy(ls);
</script>

<style>
	:global(html, body) {
		width: 100%;
		margin: 0;
		padding: 0;
	}

	.container-fluid {
		display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
    justify-content: flex-start;
    align-items: stretch;
    align-content: stretch;
		height: 100%;
	}

	.row {
		display: flex;
		justify-content: center;
		min-height: 5rem;
	}

	.title {
		background-color: #73B6E6;
	}

	.title h1 {
		margin: 5px;
		text-align: center;
		color: #FFF;
		font-family: Assistant, sans-serif;
		font-weight: bold;
	}

	.graph {
		height: 30%;
	}

	.banner {
		height: 30%;
		font-size: 2.5rem;
		align-items: center;
		text-align: center;
	}

	.map {
		height: 100%;
	}
</style>

<svelte:window on:resize={windowResizeHandler}/>

<svelte:head>
	<title>Will It Rain – Sweden Edition</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
				integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
				crossorigin="anonymous">
	<link rel="stylesheet" href="https://unpkg.com/leaflet@1.5.1/dist/leaflet.css"
  			integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
  			crossorigin="" />
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Assistant:200&display=swap" />
</svelte:head>

<div class="container-fluid">
	<div class="row title">
		<h1>Will It Rain 🌧</h1>
	</div>
	{#if $position}
		<div class="row graph">
			<RainGraph class="rain-graph" />
		</div>
	{:else}
		<div class="row banner">
			<p>Click on the map and get wet!</p>
		</div>
	{/if}
	<div class="row map">
		<Map />
	</div>
</div>

