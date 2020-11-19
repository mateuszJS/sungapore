import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import { useForecast } from '~/hooks'
import Switch from '~/ui/Switch'
import Panel from '~/ui/Panel'
import { getWeatherDescription, intl } from '~/utils'
import { ReactComponent as TemperatureSvg } from '~/icons/temperature.svg'
import { ReactComponent as HumiditySvg } from '~/icons/humidity.svg'
import { ReactComponent as PressureSvg } from '~/icons/pressure.svg'
import { ReactComponent as SunriseSvg } from '~/icons/sunrise.svg'
import { ReactComponent as SunsetSvg } from '~/icons/sunset.svg'
import useStyles from './styles'
import theme from '~/ui/theme'

const CurrWeatherPanel = () => {
  const forecast = useForecast()
  const [isShownMore, setIsShownMore] = useState(false)
  const onChange = () => setIsShownMore((state) => !state)
  const { t } = useTranslation()
  const classes = useStyles()

  const currentWeatherData = forecast.data?.current ?? { weather: [] }
  const temperatureData = [
    {
      name: t('currWeather.current'),
      value: currentWeatherData.temp,
      color: theme.palette.accents.neon5,
    },
    {
      name: t('currWeather.minTemp'),
      value: currentWeatherData.minTemp,
      color: theme.palette.accents.neon1,
    },
    {
      name: t('currWeather.maxTemp'),
      value: currentWeatherData.maxTemp,
      color: theme.palette.accents.neon2,
    },
  ]
  const showMoreData = [
    {
      name: t('currWeather.humidity'),
      value: currentWeatherData.humidity,
      icon: HumiditySvg,
      formatter: intl.toHumidity,
    },
    {
      name: t('currWeather.pressure'),
      value: currentWeatherData.pressure,
      icon: PressureSvg,
      formatter: intl.toPressure,
    },
    {
      name: t('currWeather.sunrise'),
      value: currentWeatherData.sunrise,
      icon: SunriseSvg,
      formatter: intl.getHourMins,
    },
    {
      name: t('currWeather.sunset'),
      value: currentWeatherData.sunset,
      icon: SunsetSvg,
      formatter: intl.getHourMins,
    },
  ]

  return (
    <Panel loading={forecast.loading} error={forecast.error}>
      <Typography variant="h2" color="secondary">
        {t('currWeather.title')}
      </Typography>
      <div className={classes.header}>
        {currentWeatherData.weather.map((weather) => (
          <img
            key={weather.icon}
            src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt="weather icon"
          />
        ))}
        <Typography variant="h1">{getWeatherDescription(currentWeatherData.weather)}</Typography>
      </div>

      <div className={classes.tempWrapper}>
        <TemperatureSvg height="2.2em" color={theme.palette.text.primary} />
        <div className={classes.tempDataWrapper}>
          <Typography variant="body2">{t('currWeather.temp')}</Typography>
          <ul className={classes.listWrapper}>
            {temperatureData.map((entry) => (
              <li className={classes.listItem} key={entry.name}>
                <Typography>
                  {entry.name}
                  {entry.value !== undefined && ( // entry.value can be equal 0
                    <Box component="span" fontWeight={500} color={entry.color}>
                      {intl.toCelsius(entry.value)}
                    </Box>
                  )}
                </Typography>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <Button onClick={onChange} disableRipple>
          {t('currWeather.moreInfo')}
        </Button>
        <Switch checked={isShownMore} onChange={onChange} />
      </div>
      {isShownMore ? (
        <ul className={`${classes.listWrapper} ${classes.twoColumns}`}>
          {showMoreData.map((entry) => (
            <li className={classes.listItem} key={entry.name}>
              <entry.icon height="1em" color={theme.palette.text.primary} />
              <Typography variant="body2">
                {entry.name}
                {entry.value && (
                  <Box component="span" fontWeight={500}>
                    {entry.formatter(entry.value)}
                  </Box>
                )}
              </Typography>
            </li>
          ))}
        </ul>
      ) : (
        <Typography className={classes.advertPlaceholder}>
          {t('currWeather.advertPlaceholder')}
        </Typography>
      )}
    </Panel>
  )
}

export default CurrWeatherPanel
