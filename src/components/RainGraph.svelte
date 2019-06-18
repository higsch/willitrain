<script>
  import * as d3 from 'd3'
  import { position } from '../stores.js';
  import { onDestroy } from 'svelte';

  import SMHI from '../smhi.js';

  let pos;

  const margin = {
    top: 10,
    right: 30,
    bottom: 30,
    left: 60
  };
  const width = 460 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const drawGraph = (data) => {
    d3.selectAll('svg').remove();

    const svg = d3.select('#graph-area')
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
    
    // x axis
    const x = d3.scaleLinear()
      .domain(d3.extent(data, function(d) { return d.time; }))
      .range([0, width]);
    
    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x));

    // y axis
    const y = d3.scaleLinear()
      .domain([0, d3.max(data, function(d) { return + d.value; })])
      .range([height, 0]);
    
    svg.append('g')
      .call(d3.axisLeft(y));

    // the line
    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'steelblue')
      .attr('stroke-width', 1.5)
      .attr('d', d3.line()
        .x(function(d) { return x(d.time); })
        .y(function(d) { return y(d.value); })
        .curve(d3.curveBasis)
      );
  };

  const refresh = async (latlng) => {
    const prediction = await SMHI.fetchPrediction(latlng);
    console.log(prediction);
    const data = SMHI.extractRain(prediction);
    console.log(data);
    drawGraph(data);
  };

  const subPosition = position.subscribe(value => {
    if (value.lat && value.lng) {
      refresh(value);
    }
  });

  onDestroy(subPosition);
</script>

<style>

</style>

<div id="graph-area">
</div>
