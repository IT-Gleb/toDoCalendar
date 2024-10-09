import sql from "@/clientdb/connectdb";
import { nanoid } from "nanoid";
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function GET() {
  const name: string = "Задача 1";
  const rId: string = nanoid();
  const task3: TTask = {
    id: nanoid(),
    parent_id: rId,
    name: "Подзадача 2",
    completed: false,
    create_at: Date.now(),
    begin_at: Date.now() + 1200,
    end_at: Date.now() + 2400,
    items: [],
  };
  const task2: TTask = {
    id: nanoid(),
    parent_id: rId,
    name: "Подзадача подзадачи",
    completed: false,
    create_at: Date.now(),
    begin_at: Date.now() + 30,
    end_at: Date.now() + 50,
    items: [],
  };
  const task1: TTask = {
    id: rId,
    parent_id: 30,
    name: "Подзадача 1",
    completed: false,
    create_at: Date.now(),
    begin_at: Date.now() + 60,
    end_at: Date.now() + 120,
    items: [task2, task3],
  };
  let AddTask =
    await sql`INSERT INTO tasks(name, completed, items) VALUES(${name}, ${false}, ${[
      task1 as any,
    ]}::jsonb) RETURNING id, name`;

  // const id = 30;
  // AddTask =
  //   await sql`SELECT id, parent_id, name, completed, create_at, begin_at, end_at, items FROM tasks WHERE id=${id}`;
  revalidateTag("tasks");

  return NextResponse.json(AddTask);
}
