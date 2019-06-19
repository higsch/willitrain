<script>
  import * as d3 from 'd3'
  import { position } from '../stores.js';
  import { onDestroy } from 'svelte';

  import SMHI from '../smhi.js';

  let pos;
  let data;

  const margin = {
    top: 10,
    right: 0,
    bottom: 30,
    left: 30
  };

  let width = 100;
  let height = 280;

  const drawGraph = (data, width, height) => {
    d3.selectAll('g').remove();

    const svg = d3.select('#graph')
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    
    // x axis
    const x = d3.scaleLinear()
      .domain(d3.extent(data, function(d) { return d.time; }))
      .range([0, width - margin.left - margin.right]);
    
    svg.append('g')
      .attr('transform', 'translate(0,' + (height - margin.top - margin.bottom) +')')
      .call(d3.axisBottom(x));

    // y axis
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return + d.value; })])
      .range([height - margin.top - margin.bottom, 0]);
    
    svg.append('g')
      .call(d3.axisLeft(y));

    // the line
    svg.append('path')
      .datum(data)
      .attr('fill', '#73B6E6')
      .attr('d', d3.line()
        .x(function(d) { return x(d.time); })
        .y(function(d) { return y(d.value); })
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
      pos = position;
    }
  });

  $: {
    if (data) {
      drawGraph(data, width, height);
    }
  }

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
</style>

<div id="graph-area"
     bind:offsetWidth={width}>
  <svg id="graph"
       width={width}
       height={height}>
  </svg>
</div>
