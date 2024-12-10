import { auth } from "@/auth";
import sql from "@/clientdb/connectdb";
import { decryptId } from "@/utils/functions";
import { NextResponse } from "next/server";

const handler = auth(async function POST(req: any) {
  if (!req.auth) {
    return NextResponse.json({ status: 401, message: "Register reqired!!!" });
  }
  if (req.auth && req.method === "POST") {
    const Request = await req.json();
    if (Request) {
      const { userid, day } = Request;
      const userId: string = decryptId(userid);
      try {
        const chartData =
          await sql`WITH data1 AS(SELECT COUNT(id) OVER() as allTasks FROM tasks WHERE isdeleted=false AND userid=${userId} GROUP BY id),
          data2 AS(SELECT COUNT(id) OVER() as yesTasks FROM tasks WHERE isdeleted=false AND completed=true AND userid=${userId} GROUP BY id),
          data3 AS(SELECT COUNT(id) OVER() as noTasks FROM tasks WHERE isdeleted=false AND completed=false AND userid=${userId} GROUP BY id),
          data4 AS(SELECT COUNT(id) OVER() as deprecatedTasks FROM tasks WHERE isdeleted=false AND completed=false AND end_at::date<${day} AND userid=${userId} GROUP BY id)
          SELECT DISTINCT a.allTasks, b.yesTasks, c.noTasks, d.deprecatedTasks FROM data1 a, data2 b, data3 c, data4 d;`;
        if (chartData && chartData.length > 0) {
          return NextResponse.json(chartData);
        }
        throw new Error("Нет данных...");
      } catch (err) {
        return NextResponse.json({
          status: 500,
          message: (err as Error).message,
        });
      }
    }
  }
});

export { handler as POST };
