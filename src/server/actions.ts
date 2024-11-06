"use server";

import { z, ZodError } from "zod";
import sql from "@/clientdb/connectdb";
import { revalidateTag } from "next/cache";
import { StrDateFromNumbers } from "@/utils/functions";
import { signIn } from "@/auth";

const checkSchema = z
  .object({
    name: z
      .string({
        required_error: "Имя не должно быть пустым",
        invalid_type_error: "Это должно быть строкой.",
      })
      .trim()
      .min(5, { message: "Имя должно быть 5 или больше символов." }),
    completed: z.boolean({ message: "Булево значение" }),
    currentDate: z.string().date(),
    beginD: z.string().datetime({
      message: "Не верный формат даты или времени",
    }),
    endD: z.string().datetime({
      message: "Неверный формат даты или времени",
    }),
  })
  .refine(
    (obj) => {
      let currDate = obj.beginD.split("T")[0];

      let fromDate = obj.currentDate;

      // console.log(obj.beginD, currDate, fromDate);
      return currDate.toLowerCase() === fromDate.toLowerCase();
    },
    {
      message: "Дата начала не может быть меньше или больше текущей!",
    }
  )
  .refine(
    (obj) => new Date(obj.endD).getTime() > new Date(obj.beginD).getTime(),
    {
      message: "Дата окончания должна быть больше Даты начала",
    }
  );

export async function newTaskAction(
  initialState: TFormState,
  paramData: FormData
): Promise<TFormState> {
  //console.log(paramData);
  try {
    const tName: string = paramData.get("nameTask")?.toString() ?? "";

    const isCompleted: string =
      paramData.get("status")?.toString() ?? Boolean(false).toString();

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

    await sql`INSERT INTO tasks(name, completed, begin_at, end_at, items) VALUES(${tName}, ${tCompleted}, ${tBeginAt}, ${tEndAt}, ${[]}::jsonb)`;

    initialState.status = true;
    Object.values(initialState.messages).forEach((item) => (item = ""));
    initialState.messages["succes"] = "Данные добавлены!";

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
      await sql`SELECT id, nickname, email, userkey, create_at, update_at FROM tblusers WHERE id=${userId.trim()};`;
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
      await sql`SELECT id, nickname, email, userkey, create_at, update_at FROM tblusers WHERE nickname=${paramNickName} AND email=${paramEmail} AND userkey=${paramHwPass};`;
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
  const name = paramData.get("u-nickname");
  const email = paramData.get("u-email");
  const userId = paramData.get("u-pass1");
  const role: TUserRole = "user";
  //console.log(name, email, id, role);
  await signIn("credentials", { name, email, userId, role });
  paramState = "success";
  return paramState;
}