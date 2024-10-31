"use server";

import sql from "@/clientdb/connectdb";
import { z, ZodError } from "zod";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { cryptId, decryptId } from "@/utils/functions";

const userSchema = z.object({
  nickname: z
    .string()
    .trim()
    .min(4, { message: "Имя должно быть больше 3-x символов" }),
  email: z.string().trim().email({ message: "Введите корректный e-mail" }),
  userkey: z
    .string()
    .trim()
    .min(8, { message: "Длина пароля не менее 8-ми символов." }),
});

const SaltHash: number = 11;
const CName: string = "u_value";

export async function SetCookies(paramUserId: string) {
  const theCookie = await cookies();
  if (theCookie.has(CName)) {
    (await cookies()).delete(CName);
  }
  (await cookies()).set(CName, paramUserId, { maxAge: 4 * 60 * 60 }); //На час начиная с текущего
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
    const UPass: string = paramData.get("u-pass")?.toString() ?? "";

    //console.log("Данные: ", UName, UEmail, UPass);

    //Check data
    await userSchema.parseAsync({
      nickname: UName,
      email: UEmail,
      userkey: UPass,
    });

    //Hash password
    const hash_p = bcrypt.hashSync(UPass, SaltHash);

    //Check password
    //const match_p: boolean = await bcrypt.compare("11111111", hash_p);
    //console.log("Pass compared: ", match_p);
    //---------------------------

    //Insert data into db get user id
    try {
      const get_id =
        await sql`INSERT INTO tblusers (nickname, email, userkey) VALUES(${UName}, ${UEmail}, ${hash_p}) RETURNING id;`;
      const { id } = get_id[0];
      //Set cookies
      //console.log("User id= ", id);
      await SetCookies(id as string);
      let tmp: string = cryptId(id);

      console.log(id, " = ", tmp);
      console.log(decryptId(tmp));

      //Set result
      result = "success";
    } catch (err) {
      result =
        "error ###Ошибка ввода данных в таблицу - " + (err as Error).message;
      return result;
    }

    return result;
  } catch (e) {
    result = "error: ";
    (e as ZodError).issues.forEach(
      (item) => (result = result + "###" + item.message)
    );
    return result;
  }
}
