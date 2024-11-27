"use client";

import React, { useEffect, useState, memo } from "react";
import { calendarMachine } from "@/xstate/calendarMachine";
import { useMachine } from "@xstate/react";
import { CalendarNew } from "./calendarNew";
import { useDateSelect } from "@/store/dateStore";
import { useShallow } from "zustand/shallow";
import { Next_SVG, Previos_SVG } from "@/utils/svg-icons";
import { AnimatePresence, motion, useAnimate } from "framer-motion";
import { LoaderCalendarComponent } from "@/components/loader/loaderCalendarComponent";
import { useSession } from "next-auth/react";

export const CalendarWithMashine = memo(() => {
  const { data: session } = useSession();
  const curr_Date = useDateSelect(useShallow((state) => state.current_date));
  const [state, send] = useMachine(calendarMachine);
  const [month, setMonth] = useState<TMonthObject>(state.context.currMonth);

  const [animRef, animate] = useAnimate();

  useEffect(() => {
    let isSubscribed: boolean = true;

    //Проинициализировать данные
    if (isSubscribed) {
      state.context.userId =
        session !== null && session !== undefined
          ? (session.user.userId as string)
          : "-1";
      // send({
      //   type: "user",
      //   userId:
      //     session !== null && session !== undefined
      //       ? Number(session.user.userId)
      //       : -1,
      // });
      send({ type: "today", data: curr_Date });
    }

    return () => {
      isSubscribed = false;
    };
  }, []);
  //--------------------------------

  useEffect(() => {
    let isSubscribed: boolean = true;

    if (isSubscribed) {
      setMonth(state.context.currMonth);
    }

    return () => {
      isSubscribed = false;
    };
  }, [state.context.currDates]);

  useEffect(() => {
    let isSubscribed: boolean = true;
    if (isSubscribed) {
      if (state.matches("failre")) {
        send({ type: "RETRY" });
      }
    }
    return () => {
      isSubscribed = false;
    };
  }, [state]);

  const handlePrevios = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await animate(animRef.current, { opacity: 0, x: 75 }, { duration: 0.15 });
    send({ type: "previos" });
    await animate(
      animRef.current,
      { opacity: 1, x: [-125, 0] },
      { duration: 0.25 }
    );
  };

  const handleNext = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    await animate(animRef.current, { opacity: 0, x: -75 }, { duration: 0.15 });
    send({ type: "next" });
    await animate(
      animRef.current,
      //{ opacity: 1 },
      { opacity: 1, x: [125, 0] },
      { duration: 0.25 }
    );
  };

  if (state.matches("loading")) {
    return (
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <LoaderCalendarComponent />
        </motion.div>
      </AnimatePresence>
    );
  }

  return (
    <section className="w-fit mx-auto text-center flex flex-col sm:flex-row items-center justify-center gap-1">
      {/* Кнопки для при mobile */}
      <div className="w-full flex items-start justify-between p-1 sm:hidden ">
        <button
          type="button"
          title="Предыдущий месяц"
          onClick={handlePrevios}
          className="w-[50px] h-fit hover:text-sky-600 active:scale-90"
        >
          <div className="w-fit mx-auto">
            <Previos_SVG pWidth={22} pHeight={22} />
          </div>
        </button>
        <button
          type="button"
          title="Следующий месяц"
          onClick={handleNext}
          className="w-[50px] h-fit hover:text-sky-600 active:scale-90"
        >
          <div className="w-fit mx-auto">
            <Next_SVG pWidth={22} pHeight={22} />
          </div>
        </button>
      </div>

      {/* Кнопки в обычном режиме */}
      <button
        type="button"
        title="Предыдущий месяц"
        onClick={handlePrevios}
        className="w-[132px] h-fit sm:w-fit sm:h-[132px] hover:text-sky-600 active:scale-90 hidden sm:block"
      >
        <Previos_SVG pWidth={22} pHeight={22} />
      </button>
      {month && (
        <AnimatePresence>
          <motion.div
            ref={animRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className=""
          >
            <CalendarNew paramMonth={state.context.currMonth} />
          </motion.div>
        </AnimatePresence>
      )}
      <button
        type="button"
        title="Следующий месяц"
        onClick={handleNext}
        className="w-[132px] h-fit sm:w-fit sm:h-[132px] hover:text-sky-600 active:scale-90 mx-auto hidden sm:block"
      >
        <Next_SVG pWidth={22} pHeight={22} />
      </button>
    </section>
  );
});
