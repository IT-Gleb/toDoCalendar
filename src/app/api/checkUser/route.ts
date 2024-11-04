import { LOGINPAGE_PATH } from "@/auth";
import sql from "@/clientdb/connectdb";
import { GetCookieId } from "@/server/addUser";
import { Base_URL } from "@/utils/functions";
import { NextRequest, NextResponse } from "next/server";
import { getUserFromDbId } from "../actions";

export async function GET(req: NextRequest) {
  const userId = (await GetCookieId()) ?? "";

  if (userId) {
    //console.log(userId);
    try {
      const user = await getUserFromDbId(userId);
      if (!user) {
        throw new Error("No User! User = null");
      }
      //console.log(user);
      return NextResponse.json(user);
    } catch (err) {
      console.log((err as Error).message);
      throw new Error("error get user data from db!");
    }
  } else {
    //При ошибке или не найден юзер перенаправить на login
    return NextResponse.redirect(Base_URL + LOGINPAGE_PATH);
  }
}
