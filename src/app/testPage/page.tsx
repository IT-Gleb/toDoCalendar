"use client";

import { BackButton } from "@/components/buttons/backButton";
import PopoverComponent from "@/components/popover/popoverComponent";
import { HeaderTestPageComponent } from "@/components/testPage/headerTestPageComponent";
import { useScroll, motion, useTransform } from "framer-motion";

const offsetY: number[] = [0, 600]; //Положение скролла по оси Y

const Page = () => {
  const { scrollY } = useScroll();
  // const y = useMotionValue(scrollY);

  const marginTop = useTransform(scrollY, offsetY, offsetY);

  return (
    <div className="relative">
      <HeaderTestPageComponent offsetY={offsetY} scrollY={scrollY} />
      <motion.div
        className="h-[100vh] bg-green-600 text-white text-[clamp(0.8rem,4vw,1.5rem)] p-1"
        style={{ marginTop: marginTop }}
      >
        <h2 className="uppercase">заголовок 1</h2>
      </motion.div>
      <div className="h-[80vh] bg-amber-600 text-white text-[clamp(0.8rem,4vw,1.5rem)] p-1">
        <h2 className="uppercase">заголовок 2</h2>
      </div>
      <section className="h-[100vh] bg-sky-600 text-white text-[clamp(0.8rem,4vw,1.5rem)] p-1">
        <h2 className="uppercase">Тестовая страница 3</h2>
      </section>
      <div className="w-fit mx-auto my-5">
        <BackButton />
        <PopoverComponent />
      </div>
    </div>
  );
};

export default Page;
