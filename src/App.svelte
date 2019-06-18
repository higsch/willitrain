<script>
	import RainGraph from './components/RainGraph.svelte';
	import Map from './components/Map.svelte';
</script>

<style>
	:global(body) {
		width: 100%;
		padding: 0;
	}

	h1 {
		margin-bottom: 0;
		text-align: center;
		color: #638ce2;
	}

	h2 {
		font-size: 1.4em;
		text-align: center;
		color: #638ce2;
	}
</style>

<svelte:head>
	<title>Will It Rain – Sweden Edition</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
				integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u"
				crossorigin="anonymous">
	<link rel="stylesheet" href="https://unpkg.com/leaflet@1.5.1/dist/leaflet.css"
  			integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
  			crossorigin="" />
</svelte:head>

<div class="container-fluid">
	<div class="row">
		<h1>Will It Rain?</h1>
		<h2>Sweden Edition</h2>
	</div>
	<div class="row">
		<RainGraph/>
	</div>
	<div class="row">
		<Map/>
	</div>
</div>

