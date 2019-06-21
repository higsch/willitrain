<script>
	import { onDestroy } from 'svelte';
	import { position } from './stores.js';
	import RainGraph from './components/RainGraph.svelte';
	import Map from './components/Map.svelte';

	let width, height;

	position.useLocalStorage();
</script>

<svelte:head>
	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Assistant:200&display=swap" />
</svelte:head>

<svelte:window bind:innerWidth={width} bind:innerHeight={height} />
<svelte:body width={width} height={height} />

<div class="container">
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

<style>
	:global(html) {
		margin: 0;
		padding: 0;
		font-size: 18px !important;
	}

	@media (max-width: 1200px) {
  	:global(html) {
			font-size: 16px !important;
		}
	}

	@media (max-width: 767px) {
  	:global(html) {
			font-size: 11px !important;
		}
	}

	:global(body) {
		margin: 0;
		padding: 0;
	}

	.container {
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
	}

	.title {
		height: 10%;
		background-color: #73B6E6;
	}

	.title h1 {
		margin: auto 5px;
		text-align: center;
		color: #FFF;
		font-family: Assistant, sans-serif;
		font-size: 4rem;
	}

	.graph {
		height: 40%;
	}

	.banner {
		height: 40%;
		font-size: 2.5rem;
		align-items: center;
		text-align: center;
	}

	.map {
		height: 50%;
	}
</style>
