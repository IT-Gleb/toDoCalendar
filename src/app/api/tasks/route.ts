import sql from "@/clientdb/connectdb";
import { auth } from "@/auth";

import { NextResponse, NextRequest } from "next/server";

import { decryptId } from "@/utils/functions";

// export async function GET(request: NextRequest) {
//   //console.log(request.nextUrl.searchParams);
//   const date_day = request.nextUrl.searchParams.get("day") ?? "2024-09-25";
//   const limit = request.nextUrl.searchParams.get("limit") ?? "10";
//   const offset = request.nextUrl.searchParams.get("offset") ?? "0";
//   let data: any = {};
//   try {
//     data =
//       await sql`SELECT id, parent_id, userid, name, completed, begin_at, end_at, items FROM tasks WHERE begin_at::date=${date_day} AND isdeleted=false ORDER BY begin_at LIMIT ${limit} OFFSET ${offset}`;
//   } catch (err) {
//     data = { status: false, message: (err as Error).message };
//   }

//   return NextResponse.json(data);
// }

export const handler = auth(async (req) => {
  if (!req.auth) {
    return NextResponse.json({ status: 403, message: "Не авторизован!" });
  }
  if (req.method === "POST") {
    const body = await req.json();
    if (body) {
      //console.log(body);
      const { day, limit, offset, userid } = body;
      let userId = userid;
      if (userId !== "-1" && userId.trim().length > 5) {
        userId = decryptId(userId);
      }

      let data: TTaskList | TResponseError = [];
      try {
        data =
          (await sql`SELECT id, parent_id, userid, name, completed, begin_at, end_at,
          items, (SELECT 0) as level, (SELECT id) as maintask 
          FROM tasks 
          WHERE userid=${userId}::int AND begin_at::date=${day} AND isdeleted=false 
          ORDER BY begin_at LIMIT ${limit} OFFSET ${offset}`) as TTaskList;
        //console.log(data);
        return NextResponse.json(data);
      } catch (err) {
        data = { status: "error", message: (err as Error).message };
        return NextResponse.json(data);
      }
    }
    return NextResponse.json({
      status: 500,
      message: "Ошибка получения данных!",
    });
  }
}) as never;

export { handler as POST };
