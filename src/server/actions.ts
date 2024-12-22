"use server";

import { z, ZodError } from "zod";
import bcrypt from "bcrypt";
import sql from "@/clientdb/connectdb";
import { revalidateTag } from "next/cache";
import { decryptId, StrDateFromNumbers } from "@/utils/functions";
import { signIn } from "@/auth";
import { NICKNAME, UEMAIL, UKEY, UPASS1 } from "@/utils/data";
import { userSchema, checkSchema } from "@/zodSchemas/zSchema";
import { TPropertyDeleteTasks } from "@/components/tasks/deleteTaskForm";
import { nanoid } from "nanoid";
import TaskPage from "@/app/(tasks)/tasks/[id]/page";
import { isValue } from "@/utils/tasksFunctions";

export async function newTaskAction(
  initialState: TFormState,
  paramData: FormData
): Promise<TFormState> {
  //console.log(paramData);
  try {
    const tName: string = paramData.get("nameTask")?.toString() ?? "";

    const isCompleted: string =
      paramData.get("status")?.toString() ?? Boolean(false).toString();

    let userId = paramData.get("key")?.toString() ?? "";
    if (userId !== "" && userId.trim().length > 5) {
      userId = decryptId(userId as string);
    }

    const temp_date = new Date();
    const tCurrentDate: string =
      paramData.get("currentDate")?.toString() ??
      StrDateFromNumbers(
        temp_date.getFullYear(),
        temp_date.getMonth(),
        temp_date.getDate()
      );
    // console.log(tCurrentDate);

    let tCompleted: boolean = isCompleted === "0" ? true : false;
    //console.log(tCompleted);
    let tBeginAt: string =
      (paramData.get("beginTask") as unknown as string) ??
      Date.now().toString();
    let tEndAt: string | null =
      (paramData.get("endTask") as unknown as string) ?? null;

    tBeginAt = tBeginAt + ":00Z";
    tEndAt = tEndAt + ":00Z";
    //console.log(tBeginAt, tEndAt);
    //    const check = z.string().datetime().parse(tEndAt);
    //    const check1 = z.string().datetime().parse(tBeginAt);
    //    console.log(new Date(check).getTime() - new Date(check1).getTime());
    //Проверка на соответствие
    await checkSchema.parseAsync({
      name: tName,
      completed: tCompleted,
      currentDate: tCurrentDate,
      beginD: tBeginAt,
      endD: tEndAt,
    });

    //throw new Error("Не могу добавить данные!!!");

    await sql`INSERT INTO tasks(userid, name, completed, begin_at, end_at, items) VALUES(${userId}, ${tName}, ${tCompleted}, ${tBeginAt}, ${tEndAt}, ${[]}::jsonb)`;

    initialState.status = true;
    Object.values(initialState.messages).forEach((item) => (item = ""));
    initialState.messages["success"] = "Данные добавлены!";

    revalidateTag("task-" + tBeginAt.split("T")[0]);

    return initialState;
  } catch (e) {
    //console.log(e);
    initialState.status = false;
    (e as ZodError).issues.forEach((item) => {
      if (item.path.includes("name")) {
        initialState.messages["name"] = item.message;
      }
      if (item.path.includes("beginD")) {
        initialState.messages["beginDate"] =
          initialState.messages["beginDate"] + "-" + item.message;
      }
      if (item.path.includes("endD")) {
        initialState.messages["endDate"] = item.message;
      }
      if (item.path.includes("completed")) {
        initialState.messages["completed"] = item.message;
      }
      if (item.code === "custom") {
        initialState.messages["status"] = item.message;
      }
    });

    return initialState;
  }
}

//Get user from DB by id
export async function getUserFromDbId(
  paramId: number | string
): Promise<TUser | null> {
  let userTemp: TPartUser = {};
  let user: TUser;
  try {
    const userId = paramId as string;
    if (!userId) {
      throw new Error("No id");
    }
    const userData =
      await sql`SELECT id, nickname, email, userkey, create_at, update_at FROM tblusers WHERE id=${userId.trim()} AND isdeleted=false;`;
    if (userData && userData.length) {
      const { id, nickname, email, userkey, create_at, update_at } =
        userData[0];
      userTemp.id = id;
      userTemp.nickname = nickname;
      userTemp.email = email;
      userTemp.userkey = userkey;
      userTemp.create_at = create_at;
      userTemp.update_at = update_at;

      user = Object.assign({}, userTemp as TUser);
      return user;
    } else {
      return null;
    }
  } catch (err) {
    console.log((err as Error).message);
    return null;
  }
}

//Get user data from DB nickname and email and password hash
export async function GetUserFromDbCredential(
  paramNickName: string,
  paramEmail: string,
  paramHwPass: string
): Promise<TUser | null> {
  let user: TPartUser = {};
  try {
    const UserData =
      await sql`SELECT id, nickname, email, userkey, create_at, update_at FROM tblusers WHERE nickname=${paramNickName} AND email=${paramEmail} AND userkey=${paramHwPass} AND isdeleted=false;`;
    if (UserData && UserData.length) {
      const { id, nickname, email, userkey, create_at, update_at } =
        UserData[0];
      user.id = id;
      user.nickname = nickname;
      user.email = email;
      user.userkey = userkey;
      user.create_at = create_at;
      user.update_at = update_at;
      return user as TUser;
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
}

export async function signUser(
  paramState: string,
  paramData: FormData
): Promise<string> {
  const name = paramData.get(NICKNAME);
  const email = paramData.get(UEMAIL);
  const userId = paramData.get(UPASS1);
  const role: TUserRole = "user";
  //console.log(name, email, id, role);
  await signIn("credentials", { name, email, userId, role });
  paramState = "success";
  return paramState;
}

//Get user data from DB nickname and email
export async function GetUserFromDb(
  paramNickName: string,
  paramEmail: string
): Promise<TUser | null> {
  let user: TPartUser = {};
  try {
    const UserData =
      await sql`SELECT id, nickname, email, userkey, create_at, update_at FROM tblusers WHERE nickname=${paramNickName} AND email=${paramEmail} AND isdeleted=false;`;
    if (UserData && UserData.length) {
      const { id, nickname, email, userkey, create_at, update_at } =
        UserData[0];
      user.id = id;
      user.nickname = nickname;
      user.email = email;
      user.userkey = userkey;
      user.create_at = create_at;
      user.update_at = update_at;
      return user as TUser;
    } else {
      return null;
    }
  } catch (err) {
    return null;
  }
}

export async function checkUser(
  paramState: TFormStateAndStatus,
  paramData: FormData
): Promise<TFormStateAndStatus> {
  // for (const [key, val] of paramData.entries()) {
  //   console.log(`${key} : ${val}`);
  // }
  //Получить данные
  const _UName: string = paramData.get(NICKNAME)?.toString() ?? "";
  const _UEmail: string = paramData.get(UEMAIL)?.toString() ?? "";
  const _Pass: string = paramData.get(UKEY)?.toString() ?? "";
  try {
    //Проверить данные на корректность ввода
    await userSchema.parseAsync({
      nickname: _UName,
      email: _UEmail,
      userkey: _Pass,
      checkkey: _Pass,
    });
  } catch (err) {
    let msg: string = "";
    (err as ZodError).issues.forEach((item) => {
      msg += "#" + item.message;
      return msg;
    });
    return {
      status: "error",
      message: msg + "  Error!!! Dont give up !!! Register!",
    } as TFormStateAndStatus;
  }
  //Получить данные пользователя из базы данных
  let user: TUser | null = null;
  try {
    user = await GetUserFromDb(_UName, _UEmail);
  } catch (err) {
    return {
      status: "error",
      message: "Немогу найти пользователя! " + (err as Error).message,
    } as TFormStateAndStatus;
  }
  //Зарегистрироваить сеанс пользователя
  if (user) {
    //Проверить пароль
    const isPassed: boolean = await bcrypt.compare(_Pass, user.userkey);
    if (isPassed) {
      //Зарегистрировать сеанс пользователя
      await signIn("credentials", {
        name: user.nickname,
        email: user.email,
        userId: user.id,
        role: "user",
      });
      return { status: "success", message: "Успех!" } as TFormStateAndStatus;
    }
    return {
      status: "error",
      message: "Пароль не верен",
    } as TFormStateAndStatus;
  }
  return {
    status: "error",
    message: "Error!!! User not found !!! Register!",
  } as TFormStateAndStatus;
}

//Удалить задачу
export async function DeleteTask(
  paramInit: TFormInitState,
  param: FormData
): Promise<TFormInitState> {
  const user = param.get("userId")?.toString() ?? "";
  const task = param.get("taskId")?.toString() ?? "";
  const page = param.get("paramPage")?.toString() ?? "";

  let userId: number = -1;
  if (user) {
    userId = parseInt(decryptId(user));
  }
  try {
    await sql`UPDATE tasks SET isdeleted=true WHERE id=${parseInt(
      task
    )} AND userid=${userId}`;
    revalidateTag(`task-${page}`);
    paramInit = "success";

    return paramInit;
  } catch (err) {
    paramInit = "error";
    return paramInit;
  }
}
//---------------

export async function ChangeCompleted(
  param: boolean,
  paramUser: string,
  paramTask: string,
  paramPage: string
) {
  const user: number = parseInt(decryptId(paramUser));
  const task: number = parseInt(paramTask);

  try {
    await sql`UPDATE tasks SET completed=${param} WHERE id=${task} AND userid=${user}`;

    revalidateTag(`task-${paramPage}`);
  } catch (err) {
    console.log((err as Error).message);
  }
}

//Получить JSON данные из головной задачи
async function getTaskDbJson(
  paramTaskId: number,
  paramUserId: string | number
) {
  try {
    const childTasks =
      await sql`SELECT items::jsonb FROM tasks WHERE isdeleted=false AND id=${paramTaskId} AND userid=${paramUserId};`;
    console.log(childTasks[0].items);
    if (isValue(childTasks[0].items)) {
      return childTasks[0].items as TTaskList;
    } else {
      return [];
    }
  } catch (err) {
    console.log((err as Error).message);
  }
}

//Add child Task in Array of items
//ВНИМАНИЕ!!! обновлять в базе только задачу содержащую этот JSON
//parent_id
export async function addItemTask(
  paramInit: "init" | "success" | "error",
  paramFormData: FormData
): Promise<"init" | "success" | "error"> {
  let result: "init" | "success" | "error" = paramInit;

  const parentId = (paramFormData.get("pId")?.valueOf() as string) ?? "";
  let pppId: string | number = "";
  if (!isNaN(parseInt(parentId))) {
    pppId = parentId as unknown as number;
  } else {
    pppId = parentId as string;
  }

  const addedTask: Partial<TTask> = {
    id: paramFormData.get("taskId")?.toString() ?? nanoid(),
    parent_id: pppId,
    userId: decryptId(
      paramFormData.get("user")?.valueOf() as string
    ) as unknown as number,
    name: (paramFormData.get("nameTask")?.valueOf() as string) ?? "a001",
    create_at: Date.now(),
    begin_at:
      (paramFormData.get("begin")?.toString() as unknown as number) ??
      Date.now(),
    end_at: (paramFormData.get("end")?.valueOf() as number) ?? Date.now(),
    completed:
      (paramFormData.get("completed")?.valueOf() as string) === "false"
        ? false
        : true,

    items: [],
    level: parseInt(paramFormData.get("level")?.valueOf() as string) ?? 1,
    maintask: (paramFormData.get("maintask")?.valueOf() as string) ?? "",
  };

  const taskPage = paramFormData.get("taskDay")?.valueOf() ?? "2024-12-19";

  const uId = addedTask.userId;

  //Получить подзадачи
  const childrenTasks: TTaskList = (await getTaskDbJson(
    pppId as number,
    uId as number
  )) as TTaskList;
  //Добавить и отсортировать по началу
  childrenTasks.push(addedTask);
  if (childrenTasks.length > 1) {
    childrenTasks.sort((a, b) => {
      if (
        (a.begin_at as unknown as number) < (b.begin_at as unknown as number)
      ) {
        return -1;
      } else {
        return 1;
      }
    });
  }
  //console.log(childrenTasks);

  result = "error";
  try {
    // await sql`UPDATE tasks SET items=json_build_array(jsonb_build_object(
    //   'id',${taskId}::text,
    //   'parent_id',${addedTask.parent_id as string}::text,
    //   'userid',${addedTask.userId as number}::int,
    //   'name', ${addedTask.name as string}::text,
    //   'create_at',${addedTask.create_at as number}::timestamptz,
    //   'begin_at',${addedTask.begin_at as number}::timestamptz,
    //   'end_at',${addedTask.end_at as number}::timestamptz,
    //   'completed',${addedTask.completed as boolean}::boolean,
    //   'items', ${addedTask.items as never}::json,
    //   'level',${addedTask.level as number}::int))
    //   WHERE userid=${uId as number}::int AND id=${pppId as string};`;

    await sql`UPDATE tasks SET items=${
      childrenTasks as never
    }::jsonb WHERE userid=${
      uId as number
    }::int AND id=${pppId} AND isdeleted=false;`;

    result = "success";
    //Обновить данные

    revalidateTag(`task-${taskPage}`);
    return result;
  } catch (err) {
    console.log((err as Error).message);
    return result;
  }
}
//---------------------------------
