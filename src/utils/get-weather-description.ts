import { Weather } from '~/redux/forecast'

const getWeatherDescription = (weatherList: Weather[]) =>
  weatherList.map((weather) => weather.description).join(',')

export default getWeatherDescription
