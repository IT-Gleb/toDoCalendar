"use server";

import sql from "@/clientdb/connectdb";
import { z, ZodError } from "zod";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { cryptId, decryptId, CookieUserId, Base_URL } from "@/utils/functions";
import { signIn } from "@/auth";

const userSchema = z
  .object({
    nickname: z
      .string()
      .trim()
      .min(4, { message: "Имя должно быть больше 3-x символов" }),
    email: z.string().trim().email({ message: "Введите корректный e-mail" }),
    userkey: z
      .string()
      .trim()
      .min(8, { message: "Длина пароля не менее 8-ми символов." }),
    checkkey: z
      .string()
      .trim()
      .min(8, { message: "Длина пароля не менее 8 символов!" }),
  })
  .refine(
    (obj) => {
      return obj.userkey.toLowerCase() === obj.checkkey.toLowerCase();
    },
    { message: "Проверочный пароль и пароль должны совпадать!" }
  );

const SaltHash: number = 8;

export async function SetCookies(paramUserId: string) {
  const theCookie = await cookies();
  if (theCookie.has(CookieUserId)) {
    (await cookies()).delete(CookieUserId);
  }
  const Id_crypted: string = cryptId(paramUserId);
  (await cookies()).set(CookieUserId, Id_crypted, {
    maxAge: 4 * 6.75 * 60 * 60,
  }); //На сутки начиная с текущего часа
}

export async function GetCookieId(): Promise<string> {
  let result: string = "";

  result = (await cookies()).get(CookieUserId)?.value ?? "";
  if (result) {
    result = decryptId(result);
  }
  //console.log(result);

  return result;
}

export async function AddUser(
  paramInitState: string,
  paramData: FormData
): Promise<string> {
  let result: string = paramInitState;

  try {
    //Get data
    const UName: string = paramData.get("u-nickname")?.toString() ?? "";
    const UEmail: string = paramData.get("u-email")?.toString() ?? "";
    const UPass1: string = paramData.get("u-pass1")?.toString() ?? "";
    const UPass2: string = paramData.get("u-pass2")?.toString() ?? "";

    //console.log("Данные: ", UName, UEmail, UPass);

    //Check data
    await userSchema.parseAsync({
      nickname: UName,
      email: UEmail,
      userkey: UPass1,
      checkkey: UPass2,
    });

    //Hash password
    const hash_p = bcrypt.hashSync(UPass1, SaltHash);

    //Check password
    //const match_p: boolean = await bcrypt.compare("11111111", hash_p);
    //console.log("Pass compared: ", match_p);
    //---------------------------

    //Insert data into db get user id
    try {
      const get_id =
        await sql`INSERT INTO tblusers (nickname, email, userkey) VALUES(${UName}, ${UEmail}, ${hash_p}) RETURNING id;`;
      const { id } = get_id[0];

      //Register user
      //console.log(id);
      await signIn("credentials", {
        name: UName,
        email: UEmail,
        userId: id as string,
        role: "user",
      });

      //Set result
      result = "good";
      paramInitState = result;
      return paramInitState;
    } catch (err) {
      result =
        "error ###Ошибка ввода данных в таблицу - " + (err as Error).message;

      return result;
    }
    //Set result
    result = "success";
    return result;
  } catch (e) {
    result = "error: ";
    (e as ZodError).issues.forEach(
      (item) => (result = result + "###" + item.message)
    );
    return result;
  }
}
