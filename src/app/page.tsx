import { GoCalendarButtonComponent } from "@/components/buttons/goCalendarButtonComponent";
import { GoTasksButtonComponent } from "@/components/buttons/goTasksButtonComponent";
import { LoaderCalendarComponent } from "@/components/loader/loaderCalendarComponent";
import { BgSvgTasksComponent } from "@/svg_components/bgSvgTasksComponent";
// import { LoaderFormComponent } from "@/components/loader/loaderFormComponent";
// import { BgSVGComponent } from "@/svg_components/bgSVGComponent";
import { BgSvgWithClockComponent } from "@/svg_components/bgSvgWithClockComponent";
import { ClockSvgComponent } from "@/svg_components/clockSvgComponent";
import FraseSvgComponent from "@/svg_components/fraseSvgComponent";
import { GraphSvgComponent } from "@/svg_components/graphSvgComponent";
import { PlanshetSVGComponent } from "@/svg_components/planshetSVGComponent";

// import { EmptySvgComponent } from "@/svg_components/emptySvgComponent";
// import { MordaSvgComponent } from "@/svg_components/mordaSvgComponent";
import dynamic from "next/dynamic";

const DynamicCalendar = dynamic(
  () =>
    import("@/components/Calendar/calendar2/calendarWithMashine").then(
      (component) => component.CalendarWithMashine
    ),
  {
    loading: () => <LoaderCalendarComponent />,
  }
);

export default async function Home() {
  return (
    <>
      <section className=" w-full p-1 md:px-8 md:w-[99%] md:mx-auto ">
        <BgSvgTasksComponent />
      </section>
      <section className="w-full h-[30vh] md:h-[50vh] xl:h-[100vh] place-content-center relative mx-auto p-2 mt-5 bg-[url('../../assets/images/svg/bg-space_production.svg')] bg-no-repeat bg-left-top lg:bg-center bg-cover lg:bg-contain">
        <DynamicCalendar />
      </section>
      {/* <FraseSvgComponent /> */}
    </>
  );
}
