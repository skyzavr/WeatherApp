export const API_URL = `https://goweather.herokuapp.com/weather/`;
export const API_CITIES = `http://geodb-free-service.wirefreethought.com/v1/geo/cities?limit=10&offset=0&namePrefix=`;
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
  state.search = {};
  for (const key in cities) {
    const res = await getJSON(api, key);
    if (!res.ok) return;
    const data = await res.json();
    if (data.temperature === '') continue;
    state.search[`${key}`] = {
      city: key.slice(0, 10),
      temp: res.ok ? data.temperature.slice(0, -2) : 'ND',
      desc: data.description,
      wind: data.wind,
    };
  }
  return state.search;
}
export async function loadWeather(api, city) {
  const res = await getJSON(api, city);
  if (!res.ok) return;
  const data = await res.json();
  state.weather = {
    city: city.slice(0, 10),
    desc: data.description,
    temp: data.temperature,
    wind: data.wind,
    days: data.forecast,
    date: new Date(),
  };
}
