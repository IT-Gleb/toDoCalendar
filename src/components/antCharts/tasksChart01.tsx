import { getNowStringFromDate } from "@/utils/functions";
import { Chart as ChartJS, registerables } from "chart.js";
import { memo, useLayoutEffect, useRef } from "react";
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
      // yAxisID: "yAxis",
      // xAxisID: "xAxis",
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
      // yAxis: {
      //   display: true,
      //   type: "linear",
      //   text: "AAAAA",
      // },
      // xAxis: {
      //   display: true,
      //   type: "linear",
      //   text: ["aaa01", "b00001"],
      // },
      y: {
        beginAtZero: true,
        grid: { display: true },
        title: {
          display: true,
          text: "Категории задач".toUpperCase(),
          color: "#1E429F",
          font: {
            family: "Verdana, Tahoma",
            size: 10,
            weight: 100,
          },
        },
      },
      x: {
        beginAtZero: true,
        grid: { display: true },
        title: {
          display: true,
          text: "Количество задач по категориям".toUpperCase(),
          color: "#1E429F",
          font: {
            family: "Verdana, Tahoma",
            size: 10,
            weight: 100,
          },
        },
      },
    },

    plugins: {
      title: {
        display: true,
        font: {
          family: "Impact",
          size: 16,
          weight: 300,
        },
        text:
          "График задач".toUpperCase() + " на " + ` ${getNowStringFromDate()}`,
        padding: { top: 2, bottom: 2 },
        color: "#3F83F8",
      },
      legend: {
        labels: {
          font: {
            size: 10,
            weight: 300,
            family: "Verdana, Tahoma",
          },
          //color: "#cecece",
        },
      },
      tooltip: {
        backgroundColor: "#FDF6B2",
        titleColor: "#8E4B10",
        callbacks: {
          // labelColor: (ctx: any) => {
          //   return {
          //     backgroundColor: "rgb(210, 200, 67)",
          //   };
          // },
          labelTextColor: (ctx: any) => {
            return "#633112";
          },
        },
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
  //   ChartJS.defaults.scales["linear"].title.display = true;
  //   ChartJS.defaults.scales["linear"].title.text = "AAAAAA";
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
