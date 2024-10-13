import { AgCartesianSeriesOptions, AgChartOptions } from 'ag-charts-community';
import React, { useState } from 'react';

import { AgCharts } from 'ag-charts-react'; // Correct import for AgCharts
import Papa from 'papaparse';

// Define types for your data
interface ChartData {
  [key: string]: string | number;
}

interface ChartOptions {
  autoSize: boolean;
  data: ChartData[];
  series: {
    type: string;
    xKey: string;
    yKey: string;
  }[];
}

function FileUpload() {
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const [chartOptions, setChartOptions] = useState<AgChartOptions | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type === 'application/json') {
      const reader = new FileReader();
      reader.onload = (event: ProgressEvent<FileReader>) => {
        const jsonData = JSON.parse(event.target?.result as string);
        setChartData(jsonData);
        updateChartOptions(jsonData);
      };
      reader.readAsText(file);
    } else if (file.type === 'text/csv') {
      Papa.parse<ChartData>(file, {
        header: true,
        dynamicTyping: true,
        complete: (results) => {
          setChartData(results.data);
          updateChartOptions(results.data);
        },
      });
    }
  };

  const updateChartOptions = (data: ChartData[]) => {
    if (data.length === 0) return;

    const labels = Object.keys(data[0]); // Get the keys from the first data row
    const xKey = labels[0];
    const yKey = labels[1];

    // setChartOptions({
    //   autoSize: true,
    //   data: data,
    //   series: [
    //     {
    //       type: 'column',
    //       xKey: xKey,
    //       yKey: yKey,
    //     },
    //   ],
    // });
  };

  return (
    <div>
      {chartOptions && <AgCharts options={chartOptions} />}
      <input type="file" onChange={handleFileUpload} accept=".csv, .json" />
    </div>
  );
}

export default FileUpload;
