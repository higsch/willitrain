const round = (value, decimals) => {
  return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
};

const fetchPrediction = async (pos) => {
  const lon = round(pos.lng, 6);
  const lat = round(pos.lat, 6);
  const url = `https://opendata-download-metfcst.smhi.se/api/category/pmp3g/version/2/geotype/point/lon/${lon}/lat/${lat}/data.json`;
  const res = await fetch(url)
    .then(res => res.json())
    .catch(err => console.error(err));;
  return(res);
};

const extractRain = (prediction) => {
  let parsed = prediction.timeSeries.map((e) => {
    return({
      datetime: new Date(e.validTime),
      value: e.parameters.find(param => param.name === 'pmedian').values[0]
    });
  });

  // keep only first 24 entries
  parsed = parsed.slice(0, 24);
  return(parsed);
};

export default {
  fetchPrediction,
  extractRain
};
