import { NewTaskFormComponent } from "@/components/forms/newTaskFormComponent";

export default async function NewTaskPage() {
  return (
    <section>
      <div className="w-[95%] lg:w-[60%] mx-auto p-1">
        <NewTaskFormComponent />
      </div>
    </section>
  );
}
