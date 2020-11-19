import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Typography from '@material-ui/core/Typography'
import Box from '@material-ui/core/Box'
import { useForecast } from '~/hooks'
import Switch from '~/ui/Switch'
import Panel from '~/ui/Panel'
import { getWeatherDescription } from '~/utils'

const CurrWeatherPanel = () => {
  const forecast = useForecast()
  const [isShownMore, setIsShownMore] = useState(false)
  const onChange = () => setIsShownMore((state) => !state)
  const { t } = useTranslation()
  const currentWeatherData = forecast.data?.current ?? { weather: [] }
  const showMoreData = [
    { name: t('currWeather.humidity'), value: currentWeatherData.humidity },
    { name: t('currWeather.pressure'), value: currentWeatherData.pressure },
    { name: t('currWeather.sunrise'), value: currentWeatherData.sunrise },
    { name: t('currWeather.sunset'), value: currentWeatherData.sunset },
  ]

  return (
    <Panel loading={forecast.loading} error={forecast.error}>
      {currentWeatherData.weather.map((weather) => (
        <img
          key={weather.icon}
          src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
          alt="weather icon"
        />
      ))}
      <h1>{t('currWeather.title')}</h1>
      <p>{getWeatherDescription(currentWeatherData.weather)}</p>
      <p>
        {t('currWeather.temp')} {currentWeatherData.temp}
      </p>
      {/* <p>Today high temperature: {forecast.data.daily[0].temp.max}</p>
      <p>Today low temperature: {forecast.data.daily[0].temp.min}</p> */}
      <Switch checked={isShownMore} onChange={onChange} />
      {isShownMore && (
        <div>
          {showMoreData.map((entry) => (
            <Typography key={entry.name}>
              {entry.name}
              <Box component="span" fontWeight={500}>
                {entry.value}
              </Box>
            </Typography>
          ))}
        </div>
      )}
    </Panel>
  )
}

export default CurrWeatherPanel
