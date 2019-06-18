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
  const now = Date.now();
  
  const parsed = prediction.timeSeries.map((e) => {
    return({
      time: (Date.parse(e.validTime) - now) / (1000 * 60 * 60),
      value: e.parameters.find(param => param.name === 'pmedian').values[0]
    });
  });

  return(parsed);
};

export default {
  fetchPrediction,
  extractRain
};
