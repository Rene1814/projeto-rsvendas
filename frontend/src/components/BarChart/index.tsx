import { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import type { SaleSuccess } from "../../types/sale";
import { BASE_URL } from "../../utils/requests";
import axios from "axios";
import { round } from "../../utils/format";

type SeriesData = {
  name: string;
  data: number[];
};

type ChartData = {
  series: SeriesData[];
  labels: { categories: string[] };
};

const BarChart = () => {
  const [chartData, setChartData] = useState<ChartData>({
    series: [{ name: "% Sucesso", data: [] }],
    labels: { categories: [] },
  });

  useEffect(() => {
    axios.get(`${BASE_URL}/sales/success-by-seller`).then((response) => {
      const data = response.data as SaleSuccess[];
      const myLabels = data.map((x) => x.sellerName);
      const mySeries = data.map((x) => round((100 * x.deals) / x.visited, 1));
      setChartData({
        series: [{ name: "% Sucesso", data: mySeries }],
        labels: { categories: myLabels },
      });
    });
  }, []);

  const options = {
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
  };

  return (
    <>
      <Chart
        options={{ ...options, xaxis: chartData.labels }}
        series={chartData.series}
        type="bar"
        height="240"
      />
    </>
  );
};

export default BarChart;
