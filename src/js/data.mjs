export const API_URL = `https://goweather.herokuapp.com/weather/`;
export const state = {
  bookmarks: [],
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
  },
};
async function getJSON(city) {
  const resp = await fetch(`${API_URL}${city}`);
  const res = await Promise.race([
    resp,
    new Promise(() => setTimeout(() => {}, 3000)),
  ]);
  return res;
}
export async function loadSearch() {
  for (const key in state.defaultCities) {
    const res = await getJSON(key);
    console.log(res);
    if (!res.ok) return;
    const data = await res.json();
    console.log(key);
    state.defaultCities[`${key}`] = {
      city: key,
      temp: data.temperature,
    };
    console.log(state.defaultCities);
  }
}
export async function loadWeather(city) {
  //Array.isArray(city)
  const res = await getJSON(city);
  console.log(res);
  if (!res.ok) return;
  const data = await res.json();
  console.log(data);
  state.weather = {
    city: city,
    desc: data.description,
    temp: data.temperature,
    wind: data.wind,
    days: data.forecast,
    date: new Date(),
  };
  console.log(data);
}
// {temperature: '22 °C', wind: '16 km/h', description: 'Sunny', forecast: Array(3)}
// description: "Sunny"
// forecast: Array(3)
// 0: {day: '1', temperature: '22 °C', wind: '18 km/h'}
// 1: {day: '2', temperature: '17 °C', wind: '12 km/h'}
// 2: {day: '3', temperature: '17 °C', wind: '11 km/h'}
// length: 3
// [[Prototype]]: Array(0)
// temperature: "22 °C"
// wind: "16 km/h"
