import React, { useState, useLayoutEffect, useRef } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import Box from '@material-ui/core/Box'
import { useTranslation } from 'react-i18next'
import { useForecast, useFilterState } from '~/hooks'
import { ForecastType } from '~/hooks/use-filter-state'
import Chart from './components/Chart'
import Switch from '~/ui/Switch'
import { Forecast } from '~/redux/forecast'
import { TooltipFormatter, LabelFormatter } from 'recharts'
import { getWeatherDescription, intl } from '~/utils'
import Panel from '~/ui/Panel'
import theme from '~/ui/theme'
import useStyles from './styles'
import { TFunction } from 'i18next'

const convertDailyTemps = (t: TFunction): TooltipFormatter => (value, name) => [
  name === 'maxTemp' ? t('chart.highTemp') : t('chart.lowTemp'),
  intl.toCelsius(value as number),
]
const convertHourlyTemps = (t: TFunction): TooltipFormatter => (value) => [
  t('chart.temp'),
  intl.toCelsius(value as number),
]

const getDataProps = (t: TFunction, type: ForecastType, forecastData?: Forecast) => {
  if (!forecastData) {
    return {}
  }
  if (type === ForecastType.daily) {
    const data = forecastData[ForecastType.daily].map((dailyInfo) => ({
      weather: getWeatherDescription(dailyInfo.weather),
      minTemp: dailyInfo.temp.min,
      maxTemp: dailyInfo.temp.max,
      dt: dailyInfo.dt,
    }))
    return {
      data,
      dataStructure: [
        { dataKey: 'maxTemp', color: theme.palette.accents.neon1 },
        { dataKey: 'minTemp', color: theme.palette.accents.neon2 },
      ],
      xTickFormatter: intl.getShortDayName,
      tooltipLabelFormatter: intl.getLongDayName as LabelFormatter,
      tooltipValuesFormatter: convertDailyTemps(t) as TooltipFormatter,
    }
  } else {
    const data = forecastData[ForecastType.hourly].map((hourlyInfo) => ({
      weather: getWeatherDescription(hourlyInfo.weather),
      temp: hourlyInfo.temp,
      dt: hourlyInfo.dt,
    }))
    return {
      data,
      dataStructure: [{ dataKey: 'temp', color: theme.palette.accents.neon5 }],
      xTickFormatter: intl.getHour,
      tooltipLabelFormatter: ((value: number) =>
        `${intl.getLongDayName(value)} ${intl.getHour(value)}`) as LabelFormatter,
      tooltipValuesFormatter: convertHourlyTemps(t) as TooltipFormatter,
    }
  }
}

const AreaChart = () => {
  const forecast = useForecast()
  const { type, setType } = useFilterState()
  const rootNode = useRef<HTMLDivElement>(null)
  const [chartSize, setChartSize] = useState({ width: 0, height: 0 })
  const { t } = useTranslation()
  const classes = useStyles()

  const onChange = () => {
    const newValue = type === ForecastType.daily ? ForecastType.hourly : ForecastType.daily
    setType(newValue)
  }

  useLayoutEffect(() => {
    const onResize = () => {
      if (rootNode.current) {
        const computedStyles = window.getComputedStyle(rootNode.current)
        setChartSize({
          width: Number.parseInt(computedStyles.width),
          height: Number.parseInt(computedStyles.height),
        })
      }
    }
    window.addEventListener('resize', onResize)
    onResize()
    return () => window.removeEventListener('resize', onResize)
  }, [rootNode.current])

  return (
    <Panel loading={forecast.loading} error={forecast.error}>
      <div className={classes.root}>
        <Typography variant="h2" color="secondary">
          {t('chart.title')}
        </Typography>
        <div className={classes.toggleWrapper}>
          <Button onClick={() => setType(ForecastType.hourly)} disableRipple>
            <Box component="span" color={theme.palette.accents.neon5}>
              {t('chart.hourly')}
            </Box>
          </Button>
          <Switch
            checked={type == ForecastType.daily}
            onChange={onChange}
            leftSideColor={theme.palette.accents.neon5}
            rightSideColor={theme.palette.accents.neon1}
          />
          <Button onClick={() => setType(ForecastType.daily)} disableRipple>
            <Box component="span" color={theme.palette.accents.neon1}>
              {t('chart.daily')}
            </Box>
          </Button>
        </div>
        <div className={classes.chartWrapper} ref={rootNode}>
          <Chart
            width={chartSize.width}
            height={chartSize.height}
            yTickFormatter={intl.toCelsius}
            {...getDataProps(t, type, forecast.data)}
          />
        </div>
      </div>
    </Panel>
  )
}

export default AreaChart
