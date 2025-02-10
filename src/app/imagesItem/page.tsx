import { BackButton } from "@/components/buttons/backButton";
import PopoverComponent from "@/components/popover/popoverComponent";
import React from "react";

const Page = async () => {
  return (
    <div className="w-fit mx-auto">
      <BackButton />
      <PopoverComponent />
    </div>
  );
};

export default Page;
