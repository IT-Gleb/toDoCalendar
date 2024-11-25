import AuthProvider from "@/components/authComponents/authProviderComponent";
import { CheckDialog } from "@/components/checkForm/checkDialog";
//import { LoaderCalendarComponent } from "@/components/loader/loaderCalendarComponent";

import { BgSvgTasksComponent } from "@/svg_components/bgSvgTasksComponent";

// import { LoaderFormComponent } from "@/components/loader/loaderFormComponent";
// import { BgSVGComponent } from "@/svg_components/bgSVGComponent";

// import { EmptySvgComponent } from "@/svg_components/emptySvgComponent";
// import { MordaSvgComponent } from "@/svg_components/mordaSvgComponent";
// import dynamic from "next/dynamic";

// const DynamicCalendar = dynamic(
//   () =>
//     import("@/components/Calendar/calendar2/calendarWithMashine").then(
//       (component) => component.CalendarWithMashine
//     ),
//   {
//     loading: () => <LoaderCalendarComponent />,
//   }
// );

export default async function Home() {
  // const usrId = await GetCookieId();
  // if (usrId) {
  //   return redirect(`/member/${usrId}`);
  // }

  return (
    <>
      <section className=" w-full md:px-8 md:w-[99%] md:mx-auto relative">
        <AuthProvider>
          <CheckDialog />
        </AuthProvider>

        <BgSvgTasksComponent />
      </section>
    </>
  );
}
