import sql from "@/clientdb/connectdb";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  let start_day = request.nextUrl.searchParams.get("startDay") ?? "2024-10-01";
  let end_day = request.nextUrl.searchParams.get("endDay") ?? "2024-10-30";
  let data: TMonthDayData = [];

  data =
    await sql`WITH month_data AS(SELECT id, begin_at::date as _day, COUNT(id) OVER(PARTITION BY begin_at::date) as num FROM tasks WHERE begin_at::date BETWEEN ${start_day} AND ${end_day} GROUP BY id) SELECT DISTINCT _day, num as t_count FROM month_data ORDER BY _day;`;

  //console.log(data);

  return NextResponse.json(data);
}
