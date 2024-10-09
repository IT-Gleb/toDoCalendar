import { nanoid } from "nanoid";

export const MainMenu: TMainMenu[] = [
  { id: nanoid(), title: "На Главную", href: "/", slug: "/" },
  { id: nanoid(), title: "Задачи", href: "/mainTasks", slug: "/mainTasks" },
  { id: nanoid(), title: "Новая", href: "/newTask", slug: "/newTask" },
  { id: nanoid(), title: "Календарь", href: "/calendar", slug: "/calendar" },
];

export const Mounths: string[] = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];

export const DaysOfWeek: string[] = [
  "-Воскресение-",
  "Понедельник",
  "Вторник",
  "Среда",
  "Четверг",
  "Пятница",
  "Суббота",
  "Воскресение",
];

export const shortDaysOfWeek: string[] = [
  "-Вс-",
  "Пн",
  "Вт",
  "Ср",
  "Чт",
  "Пт",
  "Сб",
  "Вс",
];
