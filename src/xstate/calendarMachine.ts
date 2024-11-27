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
      current: number; //Date now
      userId: string; //User Id
      retryCount: number;
      currDates: TCalendarItems;
      selInMonth: TMonthDayData;
      currMonth: TMonthObject;
    };
    events:
      | { type: "today"; data: number }
      | { type: "next" }
      | { type: "previos" }
      | { type: "RETRY" }
      | {
          type: "user";
          userId: string;
        };
  },
  actors: {
    fetchSelected: fromPromise(
      ({ input }: { input: { paramDate: number; paramUserId: string } }) => {
        return fetcherSelectedDaysInMonth(input.paramDate, input.paramUserId);
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
    userId: "-1", //User Id
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
        input: ({ context }) => ({
          paramDate: context.current,
          paramUserId: context.userId,
        }),
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
    user: {
      actions: assign({
        userId: ({ event }) => {
          return event.userId;
        },
      }),
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
