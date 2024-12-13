import { Chart as ChartJS, registerables } from "chart.js";
import { memo, useRef } from "react";
import { Chart } from "react-chartjs-2";

ChartJS.register(...registerables);

export const TasksChart01 = memo(({ paramData }: { paramData: any }) => {
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
      barPercentage: 3,
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
      y: { beginAtZero: true, grid: { display: true } },
      x: { beginAtZero: true, grid: { display: true } },
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
    <div className="w-auto h-auto flex flex-col p-1">
      <button
        type="button"
        className="w-[70px] h-[28px] text-[0.65em] bg-slate-100 p-1 active:scale-90 self-end"
        onClick={() => chartRef.current?.update()}
      >
        Обновить
      </button>
      <Chart
        ref={chartRef}
        type="bar"
        data={ChartData}
        options={ChartOptions}
        plugins={[ChartPlugin]}
      />
    </div>
  );
});

export default TasksChart01;
