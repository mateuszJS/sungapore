import React from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  TickFormatterFunction,
  Tooltip,
  TooltipFormatter,
  LabelFormatter,
} from 'recharts'
import CustomTooltip from './CustomTooltip'

type Data = {
  [key: string]: string | number
  weather: string
  dt: number
}

type ChartProps = {
  data?: Data[]
  dataStructure?: Array<{
    dataKey: string
    color: string
  }>
  width: number
  height: number
  yTickFormatter: TickFormatterFunction
  xTickFormatter?: TickFormatterFunction
  tooltipValuesFormatter?: TooltipFormatter
  tooltipLabelFormatter?: LabelFormatter
}

const getCustomizedDot = (color: string) => ({
  cx,
  cy,
  index,
}: {
  cx: number
  cy: number
  index: number
}) => (
  <g key={index}>
    <circle cx={cx} cy={cy} r={7} fill={color} opacity={0.25} />
    <circle cx={cx} cy={cy} r={3} fill="white" strokeWidth={2} stroke={color} />
  </g>
)

const noop = () => ''

const Chart = ({
  data = [],
  width,
  height,
  dataStructure = [],
  xTickFormatter = noop,
  yTickFormatter,
  tooltipLabelFormatter = noop,
  tooltipValuesFormatter = noop,
}: ChartProps) => (
  <AreaChart width={width} height={height} data={data}>
    <CartesianGrid
      vertical={false}
      horizontal={{
        stroke: '#DBDBDB',
      }}
    />
    <XAxis
      dataKey="dt"
      tickLine={false}
      axisLine={false}
      tickFormatter={xTickFormatter}
      interval="preserveStart"
      minTickGap={10}
    />
    <YAxis
      tickLine={false}
      domain={['dataMin - 1', 'dataMax + 1']}
      tickFormatter={yTickFormatter}
      interval="preserveEnd"
      scale="linear"
    />
    <defs>
      {dataStructure.map(({ color }) => (
        <linearGradient key={color} id={`${color}Uv`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity={0.2} />
          <stop offset="100%" stopColor={color} stopOpacity={0} />
        </linearGradient>
      ))}
    </defs>
    {dataStructure.map(({ dataKey, color }) => (
      <Area
        type="monotone"
        key={dataKey}
        dataKey={dataKey}
        stroke={color}
        fill={`url(#${color}Uv)`}
        fillOpacity={1}
        strokeWidth={2}
        activeDot={getCustomizedDot(color)}
        isAnimationActive={false}
      />
    ))}
    <Tooltip
      labelFormatter={tooltipLabelFormatter}
      formatter={tooltipValuesFormatter}
      content={CustomTooltip}
      cursor={{
        stroke: 'blue',
        strokeWidth: 1,
        strokeDasharray: '3 3',
      }}
    />
  </AreaChart>
)

export default Chart
