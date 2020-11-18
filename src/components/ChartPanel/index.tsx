import React from 'react'
import { useForecast, useFilterState } from '~/hooks'
import { ForecastType } from '~/hooks/use-filter-state'
import Chart from '~/components/Chart'
import Switch from '~/components/Switch'
import { Forecast } from '~/redux/forecast'
import { TooltipFormatter, LabelFormatter } from 'recharts'
import { getWeatherDescription, intl } from '~/utils'

const convertDailyTemps: TooltipFormatter = (value, name) => [
  intl.toCelsius(value as number),
  name === 'maxTemp' ? 'Max temperature' : 'Min temperature',
]
const convertHourlyTemps: TooltipFormatter = (value) => [
  intl.toCelsius(value as number),
  'Temperature',
]

const getDataProps = (type: ForecastType, forecastData?: Forecast) => {
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
        { dataKey: 'minTemp', color: 'blue' },
        { dataKey: 'maxTemp', color: 'red' },
      ],
      xTickFormatter: intl.getShortDayName,
      tooltipLabelFormatter: intl.getLongDayName as LabelFormatter,
      tooltipValuesFormatter: convertDailyTemps as TooltipFormatter,
    }
  } else {
    const data = forecastData[ForecastType.hourly].map((hourlyInfo) => ({
      weather: getWeatherDescription(hourlyInfo.weather),
      temp: hourlyInfo.temp,
      dt: hourlyInfo.dt,
    }))
    return {
      data,
      dataStructure: [{ dataKey: 'temp', color: 'orange' }],
      xTickFormatter: intl.getHour,
      tooltipLabelFormatter: ((value: number) =>
        `${intl.getLongDayName(value)} ${intl.getHour(value)}`) as LabelFormatter,
      tooltipValuesFormatter: convertHourlyTemps as TooltipFormatter,
    }
  }
}

const AreaChart = () => {
  const forecast = useForecast()
  const { type, setType } = useFilterState()
  const onChange = () => {
    console.log(type)
    const newValue = type === ForecastType.daily ? ForecastType.hourly : ForecastType.daily
    setType(newValue)
  }

  return (
    <div>
      <Switch checked={type == ForecastType.daily} onChange={onChange} />
      <Chart
        width={500}
        height={400}
        yTickFormatter={intl.toCelsius}
        {...getDataProps(type, forecast.data)}
      />
    </div>
  )
}

export default AreaChart
