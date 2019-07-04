<script>
  import { scaleTime, 
           scaleLinear, 
           timeFormat, 
           line,
           curveBasis } from 'd3'
  import { position } from '../stores.js';
  import SMHI from '../smhi.js';

  let data;
  let width, height;
  const margin = {
    top: 10,
    right: 12,
    bottom: 30,
    left: 12
  };

  const fetchNewData = async (latlng) => {
    const prediction = await SMHI.fetchPrediction(latlng);
    const data_raw = SMHI.extractRain(prediction);
    data = [{
        datetime: data_raw[0].datetime,
        value: 0
      },
      ...data_raw,
      {
        datetime: data_raw.slice(-1)[0].datetime,
        value: 0
      }];
  };

  const formatTick = (tick) => {
		return((Number(tick) % 3 !== 0) && (width < 980) ? '' : tick);
	}

  $: fetchNewData($position);

  let minDate, maxDate, xScale, yScale, xTicks, path, sum;
  $: if (data) {
      minDate = data[0].datetime;
      maxDate = data[data.length - 1].datetime;

      xScale = scaleTime()
        .domain([minDate, maxDate])
        .range([margin.left, width - margin.right]);

      yScale = scaleLinear()
        .domain([0, Math.max(...data.map(d => d.value))])
        .range([height - margin.bottom, margin.top]);

      xTicks = data.map(d => d.datetime);

      path = line()
        .x(d => xScale(d.datetime))
        .y(d => yScale(d.value))
        .curve(curveBasis)(data)
      
      sum = data.map(d => d.value).reduce((a, c) => a + c);
  }
</script>

<div class="graph" bind:offsetWidth={width} bind:offsetHeight={height}>
  {#if data}
    <svg>
      <g class="axis x-axis">
        {#each xTicks.slice(1, xTicks.length - 1) as tick}
          <g class="tick" transform="translate({xScale(tick)}, {height - 5})">
            <text>{formatTick(timeFormat('%H')(tick))}</text>
          </g>
        {/each}
      </g>
      <g class="axis y-axis" transform="translate(0, {margin.top})"></g>
      <path class="path-area" d={path}></path>
      {#if sum === 0}
        <g class="no-rain" width="100%" height="100%">
          <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">Looks quite dry. 👍</text>
        </g>
      {/if}
    </svg>
  {/if}
</div>

<style>
  .graph {
    width: 100%;
    height: 100%;
  }

  svg {
    position: relative;
		width: 100%;
		height: 100%;
		overflow: visible;
  }

  .tick:last-child {
    visibility: hidden;
  }

  .tick text {
    font-family: Assistant, sans-serif;
    font-size: 1.2rem;
		fill: #777;
	}

  .path-area {
		fill: #73B6E6;
	}

  .no-rain text {
    font-family: Assistant, sans-serif;
    font-size: 3rem;
  }
</style>
