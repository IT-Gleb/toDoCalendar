"use server";

import sql from "@/clientdb/connectdb";
import { z, ZodError } from "zod";

const userSchema = z.object({
  nickname: z
    .string()
    .trim()
    .min(5, { message: "Имя должно быть больше 5 символов" }),
  email: z.string().trim().email({ message: "Введите корректный e-mail" }),
  userkey: z
    .string()
    .trim()
    .min(8, { message: "Длина пароля не менее 8-ми символов." }),
});

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

    console.log("Данные: ", UName, UEmail, UPass);

    //Check data
    await userSchema.parseAsync({
      nickname: UName,
      email: UEmail,
      userkey: UPass,
    });

    //Insert data into db
    await sql`INSERT INTO tblusers (nickname, email, userkey) VALUES(${UName}, ${UEmail}, ${UPass});`;
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
