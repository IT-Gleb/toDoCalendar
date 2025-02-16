import { auth } from "@/auth";
import sql from "@/clientdb/connectdb";
import { decryptId } from "@/utils/functions";
import { NextResponse, NextRequest } from "next/server";

export const maxDuration: number = 8;
export const dynamic = "force-dynamic";

export const handler = auth(async function GET(req) {
  if (!req.auth) {
    return NextResponse.json({
      status: 401,
      message: "Пользователь не авторизирован...",
    });
  }
  let start_day: string = "2024-10-01";
  let end_day: string = "2024-10-31";
  let userId: string | number = -1;

  if (req.method === "GET") {
    start_day = req.nextUrl.searchParams.get("startDay") ?? "2024-10-01";
    end_day = req.nextUrl.searchParams.get("endDay") ?? "2024-10-31";
    userId = req.nextUrl.searchParams.get("key") ?? "-1";
  }

  if (req.method === "POST") {
    const request = await req.json();
    const { startDay, endDay, key } = request;
    start_day = startDay;
    end_day = endDay;
    userId = key as string;
  }

  if (
    (userId !== -1 && userId !== "-1") ||
    (userId as string).trim().length > 5
  ) {
    userId = decryptId(userId as string);
  }
  //console.log(userId);

  let data: TMonthDayData = [];

  data =
    await sql`WITH month_data AS(SELECT id, begin_at::date as _day, COUNT(id) OVER(PARTITION BY begin_at::date) as num FROM tasks 
    WHERE userid=${userId} AND isdeleted=false AND begin_at::date BETWEEN ${start_day} AND ${end_day} GROUP BY id) 
    SELECT DISTINCT _day, num as t_count FROM month_data ORDER BY _day;`;

  return NextResponse.json(data);
}) as never;

export { handler as GET, handler as POST };
