<script>
  import * as d3 from 'd3'
  import { position } from '../stores.js';
  import { onMount, onDestroy } from 'svelte';

  import SMHI from '../smhi.js';

  let data;

  const margin = {
    top: 10,
    right: 10,
    bottom: 30,
    left: 10
  };

  let width;
  let height;

  const drawGraph = (data) => {
    if (!data) return;

    d3.selectAll('g').remove();

    const svg = d3.select('#graph')
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    
    // x axis
    const x = d3.scaleTime()
      .domain([data[0].datetime, data[data.length - 1].datetime])
      .range([0, width - margin.left - margin.right]);

    svg.append('g')
      .attr('class', 'x-axis')
      .attr('transform', 'translate(0,' + (height - margin.top - margin.bottom) +')')
      .call(d3.axisBottom(x)
        .tickFormat(function(d) { return d3.timeFormat('%H')(d); }));

    // y axis
    const y = d3.scaleLinear()
      //.domain([0, d3.max(data, function(d) { return d.pmedian; })])
      .domain([0, 10])
      .range([height - margin.top - margin.bottom, 0]);
    
    svg.append('g')
      .attr('class', 'y-axis')
      .call(d3.axisLeft(y));

    // the line
    svg.append('path')
      .datum(data)
      .attr('fill', '#73B6E6')
      .attr('d', d3.line()
        .x(function(d) { return x(d.datetime); })
        .y(function(d) { return y(d.pmedian); })
        .curve(d3.curveBasis)
      );
  };

  const fetchNewData = async (latlng) => {
    const prediction = await SMHI.fetchPrediction(latlng);
    data = SMHI.extractRain(prediction);
  };

  const subPosition = position.subscribe(value => {
    if (value.lat && value.lng) {
      fetchNewData(value);
    }
  });
  
  $: drawGraph(data, width, height);

  onDestroy(subPosition);
</script>

<style>
  #graph-area {
    display: inline-block;
    position: relative;
    width: 100%;
    vertical-align: top;
    overflow: hidden;
  }

  :global(path, line) {
    stroke: #73B6E6;
  }

  :global(.x-axis text) {
    color: #777;
    font-family: Assistant, sans-serif;
    font-size: 1.4rem;
  }

  :global(.y-axis line, .y-axis text) {
    visibility: hidden;
  }
</style>

<div id="graph-area"
     bind:offsetWidth={width}
     bind:offsetHeight={height}>
  <svg id="graph"
       width={width}
       height={height}>
  </svg>
</div>
