"use client";

import { memo, useEffect, useState } from "react";
import TasksChart01 from "./tasksChart01";
import Loader from "../loader/loaderComp";
import { useSession } from "next-auth/react";
import {
  ChangeDateItemsMonthAdd,
  getNowDateStr,
  getValue,
  MyPipeStr,
} from "@/utils/functions";

type TDataForChart = {
  [key: string]: number;
}[];

type TChartDataValue = {
  value: number;
  label: string;
  color: string;
};

type TChartDataValues = Array<TChartDataValue>;

function getLabel(key: string) {
  if (key.startsWith("all")) {
    return "Всего задач";
  }
  if (key.startsWith("yes")) {
    return "Завершено";
  }
  if (key.startsWith("no")) {
    return "Не завершено";
  }
  if (key.startsWith("deprecated")) {
    return "Просрочено";
  }
}

function getColor(key: string) {
  if (key.startsWith("all")) {
    return "#8DA2FB";
  }
  if (key.startsWith("yes")) {
    return "#31C48D";
  }
  if (key.startsWith("no")) {
    return "#F98080";
  }
  if (key.startsWith("deprecated")) {
    return "#6B7280";
  }
}

function converDataDbToChart(paramData: TDataForChart | TResponseError) {
  const result: TChartDataValues = [];
  if ("status" in paramData) {
    return result;
  }

  paramData.map((item) => {
    for (let key in item) {
      result.push({
        value: getValue(item, key),
        label: getLabel(key) as string,
        color: getColor(key) as string,
      });
    }
  });

  return result;
}

export const DataChart01 = memo(() => {
  const { data: session } = useSession();
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [chartData, setChartData] = useState<TDataForChart | TResponseError>(
    []
  );
  const [dataChart, setDataChart] = useState<TChartDataValues>([]);

  useEffect(() => {
    let isSubscribed: boolean = true;

    if (isSubscribed) {
      (async function getChartData() {
        const url: string = "/api/tasksForChart";
        setIsLoad(true);
        try {
          const request = await fetch(url, {
            headers: { "Content-Type": "application/json" },
            method: "POST",
            body: JSON.stringify({
              userid: session?.user.userId,
              day: MyPipeStr(ChangeDateItemsMonthAdd)(getNowDateStr()),
            }),
            next: { revalidate: 4 },
          });
          if (request.ok) {
            const tmp_chartData = (await request.json()) as TDataForChart;
            if (tmp_chartData) {
              setChartData(tmp_chartData);
            }
          }
        } catch (err) {
          setChartData({
            status: (err as Error).name,
            message: (err as Error).message,
          });
        } finally {
          setIsLoad(false);
        }
      })();
    }

    return () => {
      isSubscribed = false;
    };
  }, []);

  useEffect(() => {
    setDataChart(converDataDbToChart(chartData));
  }, [chartData, setDataChart]);

  if (isLoad) {
    return (
      <div className=" mx-auto w-[120px] h-[120px] text-green-400">
        <Loader />
      </div>
    );
  }

  if ("status" in chartData) {
    return (
      <div className="text-red-600 bg-white w-fit mx-auto mt-10 flex flex-col gap-y-4">
        <div>{chartData.status}</div>
        <div>{chartData.message}</div>
      </div>
    );
  }

  return <TasksChart01 paramData={dataChart} />;
});

export default DataChart01;
