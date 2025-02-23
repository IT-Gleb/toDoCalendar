import { nanoid } from "nanoid";
import { DaysOfWeek, Mounths } from "./data";
import { isValue } from "./tasksFunctions";

// export const Base_URL: string = "http://localhost:3001/";
export const Base_URL = process.env.NEXT_PUBLIC_BASE_APP_URL;
const MounthData_url: string = "/api/monthdata/";
export const CookieUserId: string = "u_value"; //Для cookie userId
export const TASKS_ON_PAGE: number = 10;
export const POPOVER: string = "page-popover";

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
  hour = ZeroToNumber(hour);

  let minutes: string | number = dt.getMinutes() as number;
  minutes = ZeroToNumber(minutes);
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
  let dt = new Date();
  //console.log(dt.toString());
  let res: string = "";
  let strDate: string = StrDateFromNumbers(
    dt.getFullYear(),
    dt.getMonth() + 1,
    dt.getDate()
  );

  let Hour: string | number = dt.getHours();
  let Min: string | number = dt.getMinutes();
  Min = ZeroToNumber(Min);
  Hour = ZeroToNumber(Hour);

  res = strDate + "T" + Hour + ":" + Min;

  return res;
}

export function GetCurrentTimeStr() {
  let dt = new Date();
  let Hour: string | number = dt.getHours();
  let Min: string | number = dt.getMinutes();
  Min = ZeroToNumber(Min);
  Hour = ZeroToNumber(Hour);

  return `${Hour}:${Min}:00`;
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
  Min = ZeroToNumber(Min);
  Hour = ZeroToNumber(Hour);

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

//Неделя в году Считает более верно. Параметр текущая дата приведенная к номеру
function getWeekOfYear_Verno(param: number) {
  //const tmpDt = new Date(param);
  const date = new Date(param);
  date.setHours(0, 0, 0, 0);
  // Thursday in current week decides the year.
  date.setDate(date.getDate() + 3 - ((date.getDay() + 6) % 7));
  // January 4 is always in week 1.
  let week1 = new Date(date.getFullYear(), 0, 4);
  // Adjust to Thursday in week 1 and count number of weeks from date to week1.
  return (
    1 +
    Math.round(
      ((date.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7
    )
  );
}

//Сформировать массив дней в месяце из года и месяца
export function getMounthData(paramDate: number): TCalendarItems {
  const result: TCalendarItems = [];

  const dt = new Date(paramDate);
  let dataItem: TCData = {};
  let Mounth_tmp = dt.getMonth() + 1;
  let work_Mounth = dt.getMonth() + 1;
  let work_day: number = 1; //С понедельника

  let dt_now = Date.now() - 1000 * 60 * 60 * 24;

  while (Mounth_tmp === work_Mounth) {
    dataItem = {};
    dt.setDate(work_day);
    dataItem.id = nanoid();
    dataItem.day = work_day;
    dataItem.mounth = work_Mounth;
    dataItem.year = dt.getFullYear();
    dataItem.mounth_str = Mounths[work_Mounth - 1];
    //dataItem.dayOfWeek = dt.getDay();
    //dataItem.dayOfWeek = getLocalDay(dt.getTime());
    dataItem.dayOfWeek = getLocalDay(dt.valueOf());

    dataItem.weekOfYear = getWeekOfYear_Verno(dt.valueOf());
    //Костыль для декабря 2024 года
    if (work_Mounth === 12 && dataItem.weekOfYear < 2) {
      dataItem.weekOfYear = 53;
    }
    if (work_Mounth === 1 && dataItem.weekOfYear > 50) {
      dataItem.weekOfYear = 0;
    }
    //-------------------------

    dataItem.weekDay = DaysOfWeek[dataItem.dayOfWeek];
    dataItem.isSelected = false;

    // Проверить на равенство текущей дате
    dataItem.enabled = dt.getTime() >= dt_now;

    result.push(dataItem);

    work_day++;
    dt.setDate(work_day);
    work_Mounth = dt.getMonth() + 1;
  }

  //Вернуть результат
  // console.log(result);
  return result;
}

//Группировать по номеру недели в году
export function ConverMonthDataToObject(
  paramMonth: TCalendarItems
): TMonthObject {
  let result: TMonthObject = {};

  //console.log(paramMonth);

  if (paramMonth.length > 0) {
    result = paramMonth.reduce((acc: TMonthObject, curr: TCData) => {
      if (curr.id !== undefined && curr.weekOfYear !== undefined) {
        if (!acc.hasOwnProperty(curr.weekOfYear)) {
          acc[curr.weekOfYear] = [curr];
        } else if (
          acc.hasOwnProperty(curr.weekOfYear) &&
          Array.isArray(acc[curr.weekOfYear])
        ) {
          acc[curr.weekOfYear].push(curr);
        }
      }
      return acc;
    }, result);
  }

  //console.log(result);

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
  // if (month >= 0 && month <= 11) {
  //   if (month < 0) month = 0;
  //   dt.setMonth(month);
  // }
  dt.setMonth(month);

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
  paramDate: number,
  paramUserId: string
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

  //console.log("User id: ", paramUserId);

  //const url: string = `${MounthData_url}?startDay=${startDay}&endDay=${endDay}&key=${paramUserId}`;
  const url: string = `${MounthData_url}`;

  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ startDay, endDay, key: paramUserId }),
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
    result = new Date(paramDate).getTime() >= Date.now() - 1000 * 60 * 60 * 24;
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
//Вернуть год из текущей даты
export function getNowYear(): number {
  return new Date().getFullYear();
}
//--------------------------

//Рандом целого числа из диапазона
export function randomInteger(min: number, max: number): number {
  let rand: number = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

//Простое шифрование id userа для cookie---------
//ВНИМАНИЕ - только цифры
const shifr_str: string = "f7v)34r0t(W5b8n8mA)4s7d09/3e1Q6w5cvLfr=](45Zer)9aK";
const step: number = 4;
const step_shift: number = 1;

export function cryptId(paramId: number | string): string {
  let result: string = Number.isInteger(paramId)
    ? paramId.toString()
    : (paramId as string);

  let s_str: string = "";
  for (let i: number = 0; i < result.length; i++) {
    let tmp: string = "";
    while (tmp.length < step) {
      tmp = tmp + shifr_str[randomInteger(0, shifr_str.length - 1)];
    }
    s_str += tmp + (Number(result[i]) ^ step_shift);
  }
  //Добавить символы в конец
  let tmp: string = "";
  while (tmp.length < Math.floor(step / randomInteger(1, step - 1))) {
    tmp = tmp + shifr_str[randomInteger(0, shifr_str.length - 1)];
  }
  s_str += tmp;
  //---------------------
  result = s_str;

  return result;
}

//ВНИМАНИЕ - только цифры
export function decryptId(paramShifr: string): string {
  let result: string = "";

  let ind: number = step;

  while (ind < paramShifr.length) {
    let tmp: string | undefined = paramShifr.slice(ind, ind + 1)[0];

    if (tmp) {
      result += Number(tmp) ^ step_shift;
    }
    ind += step + 1;
  }

  return result;
}
//----------Простое шифрование----------------
//----ВНИМАНИЕ - только цифры----

//Функция рассчитывает прозрачность для массива и возвращает по индексу
export function CalculateOpacity(
  paramIndex: number,
  paramArrayLength: number
): number {
  const maxOpacity: number = 1;
  const minOpacity: number = 0.2;
  let result: number = maxOpacity;

  if (paramArrayLength < 4) {
    return maxOpacity;
  }

  let stepOpacity: number = (maxOpacity - minOpacity) / paramArrayLength;
  const arrayOpacity: number[] = [];
  let stepO: number = maxOpacity;
  for (let i: number = 0; i < paramArrayLength; i++) {
    arrayOpacity[i] = Number(stepO.toFixed(3));
    stepO -= stepOpacity;
    if (stepO < minOpacity) {
      stepO = minOpacity;
    }
  }
  if (paramIndex >= 0 && paramIndex < paramArrayLength) {
    result = arrayOpacity[paramIndex];
  }
  return result;
}
//-----------------------------------
export function ZeroToNumber(param: number): number | string {
  return param < 10 ? "0" + param : param;
}

//Конвертировать дату и время из формата Timezone в строку для вывода
export function TimeZoneDateToString(paramDate: string): string {
  let result: string = paramDate;
  const dt = new Date(result);

  let hours: string | number = dt.getHours();
  hours = ZeroToNumber(hours);
  let min: string | number = dt.getMinutes();
  min = ZeroToNumber(min);

  let day: string | number = dt.getDate();
  day = ZeroToNumber(day);
  let month: string | number = dt.getMonth() + 1;
  month = ZeroToNumber(month);
  const year = dt.getFullYear();

  result = day + "-" + month + "-" + year + " " + hours + ":" + min;
  return result;
}
//------------------------------------------------------------------
//Функция прибавляет и удаляет дни возвращает результат в виде строки
export function CalculateDate(paramDate: string, paramStepDay: number): string {
  let result: string = "";
  //Проверить параметр на соответвтвие шаблону dd-mm-yyyy
  if (!CheckDateFormat(paramDate)) {
    return "Не верный формат даты";
  }

  const dateArray: string[] = paramDate.split("-");
  const dt = new Date(
    Number(dateArray[2]),
    Number(dateArray[1]),
    Number(dateArray[0])
  );

  dt.setDate(dt.getDate() + paramStepDay);
  let month: string | number = dt.getMonth();

  month = ZeroToNumber(month);
  let day: number = dt.getDate();
  let strDay = ZeroToNumber(day);
  result = strDay + "-" + month + "-" + dt.getFullYear();

  return result;
}
//-------------------------------------------------------------------
export function getDateWithMonthStr(paramDate: string): string {
  let result: string = "";
  const dateArray: string[] = paramDate.split("-");
  dateArray[1] = Mounths[Number(dateArray[1])];
  result = dateArray.join("-");

  return result;
}
//Возвращает текущую дату в формате dd-mm-yyyy
export function getNowDateStr(): string {
  let result: string = "";
  const dt = new Date();
  let day: string | number = dt.getDate();
  day = ZeroToNumber(day);
  let month: string | number = dt.getMonth();
  month = ZeroToNumber(month);

  result = day + "-" + month + "-" + dt.getFullYear();
  return result;
}
//-------------------------------------------------
//Возвращает текущую дату и время в формате day-month-year hours:minutes
export function getNowDateTimeStr(): string {
  let result: string = "";

  const dt = new Date();
  let day: string | number = dt.getDate();
  day = ZeroToNumber(day);
  let month: string | number = dt.getMonth();
  month = ZeroToNumber(month);
  let hours: string | number = dt.getHours();
  hours = ZeroToNumber(hours);
  let minutes: string | number = dt.getMinutes();
  minutes = ZeroToNumber(minutes);

  result =
    day + "-" + month + "-" + dt.getFullYear() + " " + hours + ":" + minutes;

  return result;
}

//Принять строку типа day-month-year Поменять местами год и день,
// увеличить месяц на еденицу (для базы данных) вернуть строку типа year-month-day
export function ChangeDateItemsMonthAdd(param: string): string {
  let result: string = param;
  const arrayDate: string[] = result.split("-");
  let tmp: string = arrayDate[0];
  arrayDate[0] = arrayDate[2];
  arrayDate[1] = ZeroToNumber(Number(arrayDate[1]) + 1) as string;
  arrayDate[2] = tmp;
  result = arrayDate.join("-");
  return result;
}
//Проверяет строку на соответвие формату dd-mm-yyyy
function CheckDateFormat(paramDate: string): boolean {
  let dateStr = new RegExp("^[0-9]{2,2}-[0-9]{2,2}-[0-9]{4,4}$", "giu");
  return dateStr.test(paramDate);
}
//---------------------------------------------------------------------------------------------
//Принять строку типа day-month-year Поменять местами год и день,
// вернуть строку типа year-month-day
export function ChangeDateItems(param: string): string {
  //console.log(param, " - ", dateStr.test(param));
  if (!CheckDateFormat(param)) {
    return "Не верный формат даты- " + param;
  }

  const paramLength: number = 3;

  let result: string = param;
  const arrayDate: string[] = result.split("-");
  if (arrayDate.length < paramLength || arrayDate.length > paramLength) {
    return "Error param dateTime";
  }
  let tmp: string = arrayDate[0];
  arrayDate[0] = arrayDate[2];
  arrayDate[2] = tmp;

  result = arrayDate.join("-");

  if (CheckDateFormatYYYY(result)) {
    return result;
  }

  return "Error dateTime format";
}
//---------------------------------------------------------------------------------------------
//Проверяет строку на соответствие формату yyyy-mm-dd
function CheckDateFormatYYYY(paramDate: string): boolean {
  const dateStr = new RegExp("^[0-9]{4,4}-[0-9]{2,2}-[0-9]{2,2}$", "giu");
  return dateStr.test(paramDate);
}

//Проверить строку на domain
export function hasDomain(paramUrl: string): boolean | string {
  const res = new RegExp(`^(https|http)?:\\/\\/(www\.)?([^\\/]+)`, "gi");
  // const res = new RegExp(
  //   `^(https)?:\\/\\/(www\\.)?([a-z\\/]+)\\.([a-z]{2,4})$`,
  //   "gi"
  // ); //Фильтрует по расширению, точка и две или четыре буквы в конце
  let tmp = res.exec(paramUrl);
  //console.log(tmp);
  if (!isValue(tmp)) {
    return false;
  }
  // //@ts-ignore
  // if (!isValue(tmp[1]) && !isValue(tmp[2])) {
  //   return false;
  // }

  //@ts-ignore
  return tmp[3] === undefined || tmp[3] === null
    ? false
    : //@ts-ignore
      tmp[3].trim();
}

//Реализация pipe
export const MyPipeStr =
  (...fns: any[]) =>
  (x: string) =>
    fns.reduce((v, f) => f(v), x) as string;
//----------------------------

export const returnStrPartOne = (paramVal: string) => {
  const result: string[] = paramVal.split(" ");
  if (result.length < 2) {
    return "-error-";
  }
  return result[0];
};

export const returnStrPartTwo = (paramVal: string) => {
  const result: string[] = paramVal.split(" ");
  if (result.length < 2) {
    return "-error-";
  }
  return result[1];
};

//-------------------------------------------------------

//Проверить дату на корректность
export function isValidDate(paramDate: string | Object): boolean {
  if (typeof paramDate === "object") {
    if (!(paramDate instanceof Date)) {
      return false;
    }
  }
  return !isNaN(Date.parse(paramDate as string));
}
//-------------------------------

export function getStringFromDate(paramId: string) {
  let result: string = "";
  result = new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "full",
    timeZone: "Europe/Moscow",
  }).format(new Date(paramId).getTime());

  return result;
}

export function getNowStringFromDate() {
  let result: string = "";
  result = new Intl.DateTimeFormat("ru-RU", {
    dateStyle: "full",
    timeZone: "Europe/Moscow",
  }).format(new Date().getTime());

  return result;
}

export function getValue<T, K extends keyof T>(param: T, key: K): T[K] {
  return param[key];
}

function groupTasks(paramTasks: TTaskList, paramGroup: "completed") {
  return Object.groupBy(paramTasks, (item) =>
    item[paramGroup] ? "Worked" : "NotWorked"
  );
}
//Проверка на допустимые символы в имени
export function hasNoLatinSymbols(param: string): boolean {
  //Определить символы не латинницы
  let textStr = new RegExp(`[^\dA-Za-z0-9@._]`, "giu");
  return textStr.test(param);
}

//Проверка на скрипт в сообщении
function checkScriptString(param: string): string {
  const reg = new RegExp(`^(<script .+[>$])?([^<]+)(</script>)?$`, "giu");
  let resultArray = reg.exec(param);

  //console.log(resultArray);
  let result: string = "";
  //@ts-ignore
  if (isValue(resultArray) && resultArray?.length > 0) {
    //@ts-ignore
    result = resultArray[2];
  }
  return result;
}

export function PopoverUp({
  param,
  isError,
}: {
  param: string;
  isError: boolean;
}) {
  const popover = document.getElementById(POPOVER);
  let timerId: number = -1;
  if (isValue(popover)) {
    isError
      ? ((popover as HTMLElement).style.backgroundColor = "#F05252")
      : ((popover as HTMLElement).style.backgroundColor = "#31C48D");

    let msg: string = checkScriptString(param).trim();
    let isNull: boolean = msg === "";

    if (isNull) {
      return;
    }

    (popover as HTMLElement).innerText = msg;

    const maxHeight = window.innerHeight; //высота экрана
    //const pop2 = document.getElementById("page-popover");
    const popHeight =
      popover?.offsetHeight !== undefined
        ? Math.max(100, popover.offsetHeight, 120)
        : 100;
    //    console.log(maxHeight, popHeight, pop2);
    (popover as HTMLElement).style.top = `${maxHeight - popHeight}px`;
    //@ts-ignore
    popover.showPopover();
    timerId = window.setTimeout(() => {
      popover?.hidePopover();
      window.clearTimeout(timerId);
    }, 3500);
  }
}

//функция ожидания в миллисекундах!
export async function Wait(param: number): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, param));
}

//Проверка на тип TypeGuard
