declare type TTask = {
  id: number | string;
  parent_id: number | string | null;
  name: string;
  completed: boolean;
  create_at: number | null;
  begin_at: number | null;
  end_at: number | null;
  items: TTaskList | null;
  level: number;
  userId: number | null;
  taskscount: number | null;
};

declare type TTaskList = Array<Partial<TTask>>;

declare type TMainMenu = {
  id: string;
  title: string;
  href: string;
  slug: string;
};

declare type TFormState = {
  status: boolean;
  messages: {
    name: string;
    beginDate: string;
    endDate: string;
    completed: string;
    status: string;
    success: string;
  };
};

declare type TFormStateAndStatus = {
  status: TFormInitState;
  message: string;
};

declare type TFormShirtState = {
  status: boolean;
  message: string;
};

declare type TFormInitState = "init" | "success" | "error";

declare type TCalendarData = {
  id: string;
  day: number;
  dayOfWeek: number;
  weekDay: string;
  mounth: number;
  mounth_str: string;
  year: number;
  weekOfYear: number;
  item: string;
  isSelected: boolean;
  enabled: boolean;
};

type TCData = Partial<TCalendarData>;

declare type TCalendarItems = TCData[];

declare type TMonthObject = {
  [index: string]: TCalendarItems;
};

declare type TMonthDay = {
  _day: string;
  t_count: number;
};

declare type TMonthDayData = Array<TMonthDay>;

declare type TUser = {
  id: number;
  nickname: string;
  email: string;
  userkey: string; //Пароль
  create_at: number;
  update_at: number;
};

declare type TPartUser = Partial<TUser>;

declare type TUserRole = "user" | "admin";
