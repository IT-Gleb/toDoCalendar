import { nanoid } from "nanoid";
import { DaysOfWeek, Mounths } from "./data";

// export const Base_URL: string = "http://localhost:3001/";
export const Base_URL = process.env.NEXT_PUBLIC_BASE_APP_URL;
const MounthData_url: string = "/api/monthdata/";

//Количество дней до конца года
export function DaysToEndOfYear(): number {
  let result: number = -1;

  const dt = new Date();
  let newYear = new Date(dt.getFullYear() + 1, 0, 0);
  let CurrentYear = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate());
  result = Math.floor(
    (newYear.getTime() - CurrentYear.getTime()) / (1000 * 60 * 60 * 24)
  );

  return result;
}
//Сколько дней в году
export function DaysInYear(): number {
  let result: number = 0;

  const dt = new Date();
  const currentYear = new Date(dt.getFullYear(), 0, 0);
  const todayYear = new Date(dt.getFullYear() + 1, 0, 0);
  result =
    (todayYear.getTime() - currentYear.getTime()) / (1000 * 60 * 60 * 24);

  return result;
}

//Последняя цифра в номере
export function LastDidgitInNumber(param: number): number {
  let result: number = Math.abs(param);
  let str: string = result.toString();
  if (str.length) {
    result = Number(str[str.length - 1]);
  }
  return result;
}

export function StrDateFromNumbers(
  year: number,
  month: number,
  day: number
): string {
  let result: string = "";
  let monthStr: string =
    month < 10 ? "0" + month : (month as unknown as string);
  let dayStr: string = day < 10 ? "0" + day : (day as unknown as string);

  result = year + "-" + monthStr + "-" + dayStr;

  return result;
}

export function StrTimeFromOneNumber(paramDate: number): string {
  let result: string = "";

  const dt = new Date(paramDate);
  let hour: string | number = dt.getHours() as number;
  hour = hour < 10 ? "0" + hour : (hour as unknown as string);

  let minutes: string | number = dt.getMinutes() as number;
  minutes = minutes < 10 ? "0" + minutes : (minutes as unknown as string);
  result = hour + ":" + minutes;

  return result;
}

export function StrTimeFromNumbers(
  paramYear: number,
  paramMonth: number,
  paramDay: number,
  paramHour: number,
  paramMinutes: number
): string {
  let result: string = "";

  const dt = new Date(paramYear, paramMonth, paramDay, paramHour, paramMinutes);
  result = StrTimeFromOneNumber(dt.getTime());

  return result;
}

export function StrFullDateTimeFromNumbers(paramDate: number) {
  const dt = new Date(paramDate);
  let year = dt.getFullYear();
  let month = dt.getMonth() + 1;
  let day = dt.getDate();
  let hour = dt.getHours();
  let minutes = dt.getMinutes();
  let result = "";
  let strDate: string = StrDateFromNumbers(year, month, day);
  let hr: string = hour < 10 ? "0" + hour : (hour as unknown as string);
  let min: string =
    minutes < 10 ? "0" + minutes : (minutes as unknown as string);

  result = strDate + " " + hr + ":" + min;

  return result;
}

export function CurrentDateToInput() {
  let dt = new Date(Date.now());
  //console.log(dt.toString());
  let res: string = "";
  let strDate: string = StrDateFromNumbers(
    dt.getFullYear(),
    dt.getMonth() + 1,
    dt.getDate()
  );

  let Hour: string | number = dt.getHours();
  let Min: string | number = dt.getMinutes();
  Min = Min < 10 ? "0" + Min : Min;
  Hour = Hour < 10 ? "0" + Hour : Hour;

  res = strDate + "T" + Hour + ":" + Min;

  return res;
}

export function formatDateToInput(paramDate: number) {
  let dt = new Date(paramDate);
  //console.log(dt.toString());
  let res: string = "";

  let strDate: string = StrDateFromNumbers(
    dt.getFullYear(),
    dt.getMonth() + 1,
    dt.getDate()
  );

  let Hour: string | number = dt.getHours();
  let Min: string | number = dt.getMinutes();
  Min = Min < 10 ? "0" + Min : Min;
  Hour = Hour < 10 ? "0" + Hour : Hour;

  res = strDate + "T" + Hour + ":" + Min;

  return res;
}

export function DateAddMinutesToInput(paramDate: number, paramMinutes: number) {
  let dt = new Date(paramDate);
  let Minutes = dt.getMinutes() + paramMinutes;
  dt.setMinutes(Minutes);
  return formatDateToInput(Number(dt));
}

export function NumberFromString(
  paramDate: TCData,
  isString: boolean
): number | string {
  let result: number | string = isString ? "-1" : -1;

  if (paramDate.id) {
    let tmpStr: string = StrDateFromNumbers(
      paramDate.year as number,
      paramDate.mounth as number,
      paramDate.day as number
    );
    if (isString) {
      result = tmpStr;
    }
    if (!isString) {
      result = new Date(tmpStr).getTime();
    }
  }

  return result;
}

//Перевести дату в понедельник 1-й день недели
function getLocalDay(paramDate: number): number {
  let result: number = 0;
  const dt = new Date(paramDate);
  result = dt.getDay();
  if (result === 0) {
    result = 7;
  }

  return result;
}

//Получить номер недели в году
function getWeekOfYear(paramDate: number): number {
  let result: number = 0;

  const dt = new Date(paramDate.valueOf());
  const startTimeOfCurrentYear = new Date(dt.getFullYear(), 0, 0).getTime();
  let currentTime = new Date(
    dt.getFullYear(),
    dt.getMonth(),
    dt.getDate()
  ).getTime();
  const pastTimeOfStartCurrentYear = currentTime - startTimeOfCurrentYear;
  const hourOfMillisecs: number = 1000 * 60 * 60; //3600000;
  const hoursOfWeek: number = 24 * 7; //168;
  result = Math.ceil(
    pastTimeOfStartCurrentYear / hourOfMillisecs / hoursOfWeek
  );

  return result;
}

//Сформировать массив дней в месяце из года и месяца
export function getMounthData(paramDate: number): TCalendarItems {
  const result: TCalendarItems = [];

  const dt = new Date(paramDate);
  let dataItem: TCData = {};
  let Mounth_tmp = dt.getMonth() + 1;
  let work_Mounth = dt.getMonth() + 1;
  let work_day: number = 1; //С понедельника

  let dt_now = Date.now() - 1000 * 60 * 60 * 22;

  while (Mounth_tmp === work_Mounth) {
    dataItem = {};
    dt.setDate(work_day);
    dataItem.id = nanoid();
    dataItem.day = work_day;
    dataItem.mounth = work_Mounth;
    dataItem.year = dt.getFullYear();
    dataItem.mounth_str = Mounths[work_Mounth - 1];
    //dataItem.dayOfWeek = dt.getDay();
    dataItem.dayOfWeek = getLocalDay(dt.getTime());
    dataItem.weekOfYear = getWeekOfYear(
      new Date(dataItem.year, dataItem.mounth - 1, dataItem.day).getTime()
    );

    dataItem.weekDay = DaysOfWeek[dataItem.dayOfWeek];
    dataItem.isSelected = false;

    // Проверить на равенство текущей дате
    dataItem.enabled = dt.getTime() >= dt_now;

    result.push(dataItem);

    work_day = work_day + 1;
    dt.setDate(work_day);
    work_Mounth = dt.getMonth() + 1;
  }

  //Добавить пустые значения
  // work_day = result[0].dayOfWeek as number;

  // if (work_day && work_day > 1) {
  //   let ind: number = 1;
  //   while (ind < work_day) {
  //     dataItem = {};
  //     result.unshift(dataItem);
  //     ind++;
  //   }
  // }

  // let len: number = 35;
  // if (work_day && work_day === 7) {
  //   len = 42;
  // }
  // if (result.length < len) {
  //   while (result.length < len) {
  //     dataItem = {};
  //     result.push(dataItem);
  //   }
  // }
  //Вернуть результат
  return result;
}

//Группировать по номеру недели в году
export function ConverMonthDataToObject(
  paramMonth: TCalendarItems
): TMonthObject {
  let result: TMonthObject = {};

  if (paramMonth.length > 0) {
    result = paramMonth.reduce((acc: TMonthObject, curr: TCData) => {
      if (curr.id !== undefined && curr.weekOfYear !== undefined) {
        if (!acc.hasOwnProperty(curr.weekOfYear)) {
          acc[curr.weekOfYear] = [curr];
        } else if (Array.isArray(acc[curr.weekOfYear])) {
          acc[curr.weekOfYear].push(curr);
        }
      }
      return acc;
    }, result);
  }

  //Добавить пустые значения в начало
  let week = Object.keys(result)[0];
  let daysWeek = result[week];
  let work_day = daysWeek[0].dayOfWeek as number;
  if (work_day > 1) {
    let ind: number = 1;
    while (ind < work_day) {
      daysWeek.unshift({});
      ind++;
    }
  }
  //Добавить пустые значения в конец
  let weeks = Object.keys(result);
  daysWeek = result[weeks[weeks.length - 1]];
  work_day = daysWeek[daysWeek.length - 1].dayOfWeek as number;
  if (work_day) {
    let ind: number = work_day;
    while (ind < 7) {
      daysWeek.push({});
      ind++;
    }
  }

  return result;
}

//Перемещаться по месяцам календаря + вперед - назад
export function goMonth(paramDate: number, paramValue: number = 1): number {
  let result: number = 0;

  let num: number = paramValue >= 0 ? 1 : -1;

  const dt = new Date(paramDate);
  let month: number = dt.getMonth() + num;
  if (month >= 0 && month <= 11) {
    if (month < 0) month = 0;
    dt.setMonth(month);
  }

  result = new Date(dt.getFullYear(), dt.getMonth(), dt.getDate()).getTime();

  return result;
}

export async function getArrayMonthData(
  paramArray: any[]
): Promise<TMonthDayData> {
  const t_requestes: any[] = [];
  paramArray.forEach((item) => {
    t_requestes.push(
      fetch(`${Base_URL}api/monthdata/?dayMonth=${item}`, {
        headers: { "Content-Type": "application/json" },
        next: { revalidate: 2 },
      })
    );
  });
  const result: TMonthDayData = [];

  await Promise.all(t_requestes)
    .then(
      async (responses) =>
        await Promise.all(responses.map((item) => item.json()))
    )
    .then((item) => item.forEach((data) => result.push(data)));

  return result;
}

//Получить дни в которых есть задачи
export const fetcherSelectedDaysInMonth = async (
  paramDate: number
): Promise<TMonthDayData> => {
  let result: TMonthDayData = [];

  let dt = new Date(paramDate);

  dt = new Date(dt.getFullYear(), dt.getMonth(), 1);
  let startDay: string = StrDateFromNumbers(
    dt.getFullYear(),
    dt.getMonth() + 1,
    dt.getDate()
  );

  dt = new Date(dt.getFullYear(), dt.getMonth() + 1, 0);
  let endDay: string = StrDateFromNumbers(
    dt.getFullYear(),
    dt.getMonth() + 1,
    dt.getDate()
  );

  const url: string = `${MounthData_url}?startDay=${startDay}&endDay=${endDay}`;

  await fetch(url, {
    headers: { "Content-Type": "application/json" },
    cache: "default",
  })
    .then((data) => data.json())
    .then((obj) => obj.forEach((item: any) => result.push(item as TMonthDay)));

  return result;
};

//Сравнить данные есть ли задачи в месяце
export function haveTasksInMonth(
  paramDates: TCalendarItems,
  paramCompareDate: TMonthDayData
): TCalendarItems {
  let result: TCalendarItems = [];

  result = Array.from(paramDates);

  if (!paramCompareDate || paramCompareDate.length === 0) {
    return result;
  }

  result.forEach((item) => {
    let tmpDate: string = StrDateFromNumbers(
      item.year as number,
      item.mounth as number,
      item.day as number
    );
    let indx: number = 0;
    while (indx < paramCompareDate.length) {
      let CompareDate: string = paramCompareDate[indx]._day.split("T")[0];
      if (
        tmpDate.toLowerCase() === CompareDate.toLowerCase() &&
        paramCompareDate[indx].t_count > 0
      ) {
        item.isSelected = true;
        break;
      }

      indx++;
    }
  });

  return result;
}

//Функция сравнивает дату с текущей true если больше
export function CompareDateNow(paramDate: string): boolean {
  let result: boolean = false;

  try {
    result = new Date(paramDate).getTime() >= Date.now() - 1000 * 60 * 60 * 22;
  } catch (err) {
    console.log("Не верная дата в параметре:", paramDate);
  } finally {
    return result;
  }
}

//Функция сравнивает дату с текущей true если равно
export function EqualDateNow(paramDate: string): boolean {
  let result: boolean = false;
  let nowDate = new Date(Date.now());
  nowDate = new Date(
    nowDate.getFullYear(),
    nowDate.getMonth(),
    nowDate.getDate()
  );
  let fromDate = new Date(paramDate);
  fromDate = new Date(
    fromDate.getFullYear(),
    fromDate.getMonth(),
    fromDate.getDate()
  );

  try {
    result = fromDate.getTime() === nowDate.getTime();
  } catch (err) {
    console.log("Не верная дата в параметре:", paramDate);
  } finally {
    return result;
  }
}

//Рандом целого числа из диапазона
export function randomInteger(min: number, max: number): number {
  let rand: number = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}
