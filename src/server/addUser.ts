"use server";

import sql from "@/clientdb/connectdb";
import { z, ZodError } from "zod";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { cryptId, decryptId, CookieUserId } from "@/utils/functions";
import { signIn } from "@/auth";
import { type TFormAddUserState } from "@/components/authComponents/authFormContent";
import { NICKNAME, UEMAIL, UPASS1, UPASS2 } from "@/utils/data";
import { userSchema } from "@/zodSchemas/zSchema";

const SaltHash: number = 8;

export async function SetCookies(paramUserId: string) {
  const theCookie = await cookies();
  if (theCookie.has(CookieUserId)) {
    (await cookies()).delete(CookieUserId);
  }
  const Id_crypted: string = cryptId(paramUserId);
  (await cookies()).set(CookieUserId, Id_crypted, {
    maxAge: 4 * 6.75 * 60 * 60,
  }); //На 12 часов начиная с текущего часа
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
  paramInitState: TFormAddUserState,
  paramData: FormData
): Promise<TFormAddUserState> {
  try {
    //Get data
    const _UName: string = paramData.get(NICKNAME)?.toString() ?? "";
    const _UEmail: string = paramData.get(UEMAIL)?.toString() ?? "";
    const _UPass1: string = paramData.get(UPASS1)?.toString() ?? "";
    const _UPass2: string = paramData.get(UPASS2)?.toString() ?? "";

    //console.log("Данные: ", UName, UEmail, UPass);

    //Check data
    await userSchema.parseAsync({
      nickname: _UName,
      email: _UEmail,
      userkey: _UPass1,
      checkkey: _UPass2,
    });

    //Hash password
    const hash_p = bcrypt.hashSync(_UPass1, SaltHash);

    //Check password
    //const match_p: boolean = await bcrypt.compare("11111111", hash_p);
    //console.log("Pass compared: ", match_p);
    //---------------------------

    //Insert data into db get user id
    try {
      const get_id =
        await sql`INSERT INTO tblusers (nickname, email, userkey) VALUES(${_UName}, ${_UEmail}, ${hash_p}) RETURNING id;`;
      const { id } = get_id[0];

      //Register user
      //console.log(id);
      await signIn("credentials", {
        name: _UName,
        email: _UEmail,
        userId: id as string,
        role: "user",
        // userkey: _UPass1,
      });

      //Set result
      paramInitState.status = true;
      paramInitState.message = "success";
    } catch (err) {
      paramInitState.message =
        "error ###Ошибка ввода данных в таблицу - " + (err as Error).message;
      paramInitState.status = false;
      return paramInitState;
    }
    //Set result

    paramInitState.status = true;
    paramInitState.message = "success";
    //console.log(paramInitState);
  } catch (e) {
    paramInitState.message = "error: ";
    (e as ZodError).issues.forEach(
      (item) =>
        (paramInitState.message = paramInitState.message + "###" + item.message)
    );
    paramInitState.status = false;
    return paramInitState;
  }
  //Вернуть результат
  paramInitState.message = "success";
  paramInitState.status = true;
  //console.log(paramInitState);
  return paramInitState;
}
