import React, { useState } from 'react'
import { useForecast } from '~/hooks'
import Switch from '~/components/Switch'
import { getWeatherDescription } from '~/utils'

const CurrWeatherPanel = () => {
  const forecast = useForecast()
  const [isShownMore, setIsShownMore] = useState(false)
  const onChange = () => setIsShownMore((state) => !state)

  return (
    <div>
      {forecast.loading || !forecast.data ? (
        <h1>Loading</h1>
      ) : (
        <>
          {forecast.data.current.weather.map((weather) => (
            <img
              key={weather.icon}
              src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
              alt="weather icon"
            />
          ))}
          <p>Current temperature: {getWeatherDescription(forecast.data.current.weather)}</p>
          <p>Current temperature: {forecast.data.current.temp}</p>
          {/* <p>Today high temperature: {forecast.data.daily[0].temp.max}</p>
          <p>Today low temperature: {forecast.data.daily[0].temp.min}</p> */}
          <Switch checked={isShownMore} onChange={onChange} />
          {isShownMore && (
            <div>
              <p>Humidity: {forecast.data.current.humidity}</p>
              <p>Pressure: {forecast.data.current.pressure}</p>
              <p>Sunrise: {forecast.data.current.sunrise}</p>
              <p>Sunset: {forecast.data.current.sunset}</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default CurrWeatherPanel
