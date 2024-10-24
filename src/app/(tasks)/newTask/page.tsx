import { CheckAuth } from "@/app/auth";
import { NewTaskFormComponent } from "@/components/forms/newTaskFormComponent";
import { NoAuthComponent } from "@/components/noAuthComponent";

export default async function NewTaskPage() {
  const isAuth: boolean = await CheckAuth();
  if (!isAuth) return <NoAuthComponent />;

  return (
    <section>
      <div className="w-[95%] lg:w-[60%] mx-auto p-1">
        <NewTaskFormComponent />
      </div>
    </section>
  );
}
