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
    succes: string;
  };
};

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
