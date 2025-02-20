import { LogoMassage } from "@/svg_components/logo_massage";
import React from "react";
import { motion, MotionValue, useTransform } from "framer-motion";
import { PopoverUp } from "@/utils/functions";

const heightSizes = [750, 130]; //Высота элемента начальное конечное

export const HeaderTestPageComponent = ({
  offsetY,
  scrollY,
}: {
  offsetY: number[];
  scrollY: MotionValue<number>;
}) => {
  const thisHeight = useTransform(scrollY as MotionValue, offsetY, heightSizes);
  const opacityButton = useTransform(scrollY, [350, 500], [0, 1]);
  const imgWidth = useTransform(scrollY, offsetY, [320, 120]);
  const textOpacity = useTransform(scrollY, offsetY, [1, 0]);
  const widthText1 = useTransform(scrollY, offsetY, [1000, 0]);
  const widthText2 = useTransform(scrollY, offsetY, [0, 1000]);
  const textOpacity2 = useTransform(scrollY, offsetY, [0, 1]);

  const handleButton = () => {
    PopoverUp({
      param: "Lorem ipsum dolor, sit amet consectetur adipisicing elit.",
      isError: false,
    });
  };

  return (
    <motion.div
      className="sticky top-0 z-[2] bg-slate-700 text-white flex items-center gap-x-2 p-2 overflow-hidden"
      style={{ height: thisHeight }}
    >
      <motion.div
        className="text-slate-200"
        style={{ width: imgWidth, height: "auto" }}
      >
        <LogoMassage />
      </motion.div>
      <motion.p
        className="w-full text-[clamp(0.8rem,4vw,2.5rem)] uppercase overflow-hidden p-1"
        style={{ opacity: textOpacity2, width: widthText2 }}
      >
        "Вы в хороших, добрых руках"
      </motion.p>
      <motion.p
        className="w-full text-[clamp(0.8rem,4vw,1.5rem)] uppercase overflow-hidden p-1"
        style={{ opacity: textOpacity, width: widthText1 }}
      >
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Maiores sit
        consequatur vero sunt corrupti at ab libero fugit aspernatur similique!
      </motion.p>
      <motion.button
        className="p-1 w-[110px] h-[26px]  overflow-hidden text-[clamp(0.65rem,4vw,0.75rem)] bg-rose-400 text-white active:scale-90 rounded-md"
        onClick={handleButton}
        style={{ opacity: opacityButton }}
      >
        Пример
      </motion.button>
    </motion.div>
  );
};
