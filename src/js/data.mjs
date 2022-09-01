export const API_URL = `https://goweather.herokuapp.com/weather/`;
export const API_CITIES = `http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=10&offset=0&namePrefix=`;
export const weather_cond = [
  'sunny',
  'cloudy',
  'rainy',
  'clear',
  'foggy',
  'snowy',
  'windy',
  'thunderstorm',
];
export const bookmarks = [];
export const state = {
  bookmarks: {},
  weather: {},
  search: {},
  defaultCities: {
    London: {},
    Berlin: {},
    Detroid: {},
    Venice: {},
    Belgrad: {},
    Bejing: {},
    Lima: {},
    Oksk: {},
  },
  query: {},
};
async function getJSON(api, city) {
  const resp = await fetch(`${api}${city}`);
  const res = await Promise.race([
    resp,
    new Promise(() => setTimeout(() => {}, 3000)),
  ]);
  return res;
}
export async function loadCitiesQuery(api, city) {
  const result = await getJSON(api, city);
  const data = await result.json();
  if (data.data.length === 0) return;
  state.query = {};
  for (const key in data.data) {
    const city = data.data[key];
    state.query[`${city.city}`] = {
      city: city.city.slice(0, 10),
      country: city.countryCode,
    };
  }
}

export async function loadSearch(api, cities) {
  const path = 'src/img/weather_icon';
  state.search = {};
  for (const key in cities) {
    const res = await getJSON(api, key);
    if (!res.ok) return;
    const data = await res.json();
    if (data.temperature === '') continue;
    state.search[`${key}`] = {
      city: key,
      temp: res.ok ? data.temperature.slice(0, -2) : 'ND',
      desc: data.description,
      wind: data.wind,
      days: data.forecast,
      date: new Date(),
      icon: `${path}/${icon_gen(data.description)}.svg`,
    };
  }
  cities = {};
  Object.assign(cities, state.search);
  console.log(cities);
  return cities;
}
export async function loadWeather(api, city) {
  const res = await getJSON(api, city);
  const path = 'src/img/weather_icon';
  if (!res.ok) return;
  const data = await res.json();
  state.weather = {
    city: city.slice(0, 10),
    desc: data.description,
    temp: data.temperature,
    wind: data.wind,
    days: data.forecast,
    date: new Date(),
    icon: `${path}/${icon_gen(data.description)}.svg`,
  };
}
function icon_gen(str) {
  //weather_cond -arr of weather condition
  let compVal = str.toLowerCase();
  let icon = '';
  if (str.includes(' ')) {
    const weathDesc = compVal.split(' ');
    for (let i = 0; i < weathDesc.length; i++) {
      for (let j = 0; j < weather_cond.length; j++) {
        if (weather_cond[j].includes(weathDesc[i])) {
          icon = weather_cond[j];
          console.log(icon);
          break;
        }
      }
    }
  } else {
    for (let j = 0; j < weather_cond.length; j++) {
      if (weather_cond[j].includes(compVal)) {
        icon = weather_cond[j];
        break;
      }
    }
  }
  return (icon = '' ? 'undef' : icon);
}
