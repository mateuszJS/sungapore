const intlShortDayName = new Intl.DateTimeFormat(['en'], { weekday: 'short' })
const intlLongDayName = new Intl.DateTimeFormat(['en'], { weekday: 'long' })
export const getShortDayName = (value: number) => intlShortDayName.format(new Date(value * 1000))
export const getLongDayName = (value: number) => intlLongDayName.format(new Date(value * 1000))
export const getHour = (value: number) => `${new Date(value * 1000).getHours()}:00`
export const getHourMins = (value: number) => {
  const date = new Date(value * 1000)
  return `${date.getHours()}:${date.getMinutes()}`
}
export const toCelsius = (value: number) => `${value}°C`
export const toPressure = (value: number) => `${value} hPA`
export const toHumidity = (value: number) => `${value}%`
