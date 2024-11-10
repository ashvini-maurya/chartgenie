import "./chart-custommization.css"

interface IChartCustomization {
  chartColor: string,
  setChartColor: (e: any) => void,
  xAxisLabel: string,
  setXAxisLabel: (e: any) => void,
  yAxisLabel: string,
  setYAxisLabel: (e: any) => void,
  showLabels: boolean,
  setShowLabels: (e: any) => void
}

const ChartCustomization = ({
  chartColor,
  setChartColor,
  xAxisLabel,
  setXAxisLabel,
  yAxisLabel,
  setYAxisLabel,
  showLabels,
  setShowLabels }: IChartCustomization) => {
  return (
    <div className="customization-panel">
      <h3>Chart Customization</h3>
      <label>
        Chart Color:
        <input
          type="color"
          value={chartColor}
          onChange={(e) => setChartColor(e.target.value)}
        />
      </label>

      <label>
        X-Axis Label:
        <input
          type="text"
          value={xAxisLabel}
          onChange={(e) => setXAxisLabel(e.target.value)}
        />
      </label>

      <label>
        Y-Axis Label:
        <input
          type="text"
          value={yAxisLabel}
          onChange={(e) => setYAxisLabel(e.target.value)}
        />
      </label>

      <label>
        Show Labels:
        <input
          type="checkbox"
          checked={showLabels}
          onChange={(e) => setShowLabels(e.target.checked)}
        />
      </label>
    </div>
  )
}

export default ChartCustomization