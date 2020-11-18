import React from 'react'
import { TooltipProps } from 'recharts'

type Props = {
  active: boolean
  label: number
  labelFormatter: Required<TooltipProps>['labelFormatter']
  payload: Required<TooltipProps>['payload']
  formatter: Required<TooltipProps>['formatter']
}

const CustomTooltip = ({ active, label, labelFormatter, payload, formatter }: Props) => {
  if (active && payload) {
    return (
      <div>
        <p>Label: {labelFormatter(label)}</p>
        <p>{payload[0].payload.weather}</p>
        {payload.map((entry, index) => (
          <p key={entry.name} style={{ color: entry.color }}>
            {formatter(entry.value as number, entry.name, entry, index)}
          </p>
        ))}
      </div>
    )
  }

  return null
}

export default CustomTooltip
