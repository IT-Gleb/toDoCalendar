import {
  ConverMonthDataToObject,
  fetcherSelectedDaysInMonth,
  getMounthData,
  goMonth,
  haveTasksInMonth,
} from "@/utils/functions";
import { setup, assign, fromPromise } from "xstate";

export const calendarMachine = setup({
  types: {} as {
    context: {
      current: number;
      retryCount: number;
      currDates: TCalendarItems;
      selInMonth: TMonthDayData;
      currMonth: TMonthObject;
    };
    events:
      | { type: "today"; data: number }
      | { type: "next" }
      | { type: "previos" }
      | { type: "RETRY" };
  },
  actors: {
    fetchSelected: fromPromise(
      ({ input }: { input: { paramDate: number } }) => {
        return fetcherSelectedDaysInMonth(input.paramDate);
      }
    ),
  },
  guards: {
    isThreeCount: ({ context }) => context.retryCount < 3,
  },
}).createMachine({
  id: "calendarMonth",
  context: {
    current: 0, //Date.now(),
    retryCount: 0,
    currDates: [],
    selInMonth: [],
    currMonth: {},
  },
  initial: "idle",

  states: {
    idle: {
      entry: function ({ context }) {
        context.currDates = getMounthData(context.current);
        //context.retryCount = 0;

        context.currDates = haveTasksInMonth(
          context.currDates,
          context.selInMonth
        );
        context.currMonth = ConverMonthDataToObject(context.currDates);
      },
    },
    loading: {
      guard: "isThreeCount",

      invoke: {
        src: "fetchSelected",
        input: ({ context }) => ({ paramDate: context.current }),
        onDone: {
          target: "idle",
          actions: [
            assign({ selInMonth: ({ event }) => event.output }),
            assign({ retryCount: () => 0 }),
          ],
        },
        onError: "failre",
      },
    },
    failre: {
      after: {
        1500: "checkLoadCount",
      },
      on: {
        RETRY: "idle",
      },
    },
    checkLoadCount: {
      entry: function ({ context }) {
        if (context.retryCount < 3) {
          context.retryCount++;
        }
        return context.retryCount;
      },
      target: "loading",
    },
  },
  on: {
    today: {
      actions: assign({
        current: ({ event }) => {
          return event.data;
        },
      }),
      target: ".loading",
    },
    next: {
      actions: assign({
        current: ({ context }) => {
          return goMonth(context.current);
        },
      }),
      target: ".loading",
    },
    previos: {
      actions: assign({
        current: ({ context }) => {
          return goMonth(context.current, -1);
        },
      }),
      target: ".loading",
    },
  },
});
