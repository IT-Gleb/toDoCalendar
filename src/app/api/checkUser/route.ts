import { LOGINPAGE_PATH } from "@/app/auth";
import sql from "@/clientdb/connectdb";
import { GetCookieId } from "@/server/addUser";
import { Base_URL } from "@/utils/functions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const user: Partial<TUser> = {};
  const userId = (await GetCookieId()) ?? "";

  if (userId) {
    //console.log(userId);
    try {
      const userData =
        await sql`SELECT id, nickname, email, create_at, update_at FROM tblusers WHERE id=${Number(
          userId.trim()
        )}`;
      if (userData && userData.length) {
        const { id, nickname, email, create_at, update_at } = userData[0];
        user.id = id;
        user.email = email;
        user.nickname = nickname;
        //user.userkey = userkey;
        user.create_at = create_at;
        user.update_at = update_at;
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
