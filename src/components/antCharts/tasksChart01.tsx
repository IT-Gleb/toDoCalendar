import { Chart as ChartJS, registerables } from "chart.js";
import { useRef } from "react";
import { Chart } from "react-chartjs-2";

ChartJS.register(...registerables);

export default function TasksChart01({ paramData }: { paramData: any }) {
  const chartRef = useRef<ChartJS>(null);

  const ChartData = {
    datasets: paramData.map((item: any) => ({
      data: [item],
      backgroundColor: item.color,
      label: item.label + `(${item.value})`,
      axis: "y",
      parsing: { xAxisKey: "value", yAxisKey: "label" },
      borderWidth: 1,
      borderColor: "rgba(0,0,0,0.5)",
      barPercentage: 4,
      //barThickness: "flex",
      //maxBarThickness: 70,
    })),
  };

  const ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    //    parsing: { xAxisKey: "label", yAxisKey: "value" },

    indexAxis: "y" as const,
    //-------
    layout: {
      padding: { left: 4 },
    },

    scales: {
      y: { beginAtZero: false, grid: { display: true } },
      x: { beginAtZero: false, grid: { display: true } },
    },

    plugins: {
      title: {
        display: true,
        text: "Выполнение задач".toUpperCase(),
        padding: { top: 2, bottom: 2 },
      },

      //   subtitle: {
      //     display: true,
      //     text: "AAAAAA",
      //   },
    },
  };

  const ChartPlugin = {
    id: "customLegendTitle",
    legend: {
      display: true,
      position: "top" as const,
      title: {
        text: "cvcvcvcv",
      },
      padding: 2,
    },
  };

  // useLayoutEffect(() => {
  //   ChartJS.defaults.plugins.legend.labels.padding = 40;
  // }, []);

  return (
    <Chart
      ref={chartRef}
      type="bar"
      data={ChartData}
      options={ChartOptions}
      plugins={[ChartPlugin]}
    />
  );
}
