import { AgCharts } from "ag-charts-react";
import { AgChartOptions } from "ag-charts-community";

interface ICgChart {
  chartOptions: AgChartOptions;
}

const CgChart = ({ chartOptions }: ICgChart) => {
  return <AgCharts options={chartOptions} />;
};

export default CgChart;
