import { Weather } from '~/redux/forecast'

const getWeatherDescription = (weatherList: Weather[]) => {
  const string = weatherList.map((weather) => weather.description).join(',')
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export default getWeatherDescription
