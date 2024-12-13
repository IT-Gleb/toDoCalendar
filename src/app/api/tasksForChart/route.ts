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
        // await sql`WITH data1 AS(SELECT COUNT(id) OVER() as allTasks FROM tasks WHERE isdeleted=false AND userid=${userId} GROUP BY id),
        // data2 AS(SELECT completed, (SELECT CASE WHEN completed=true THEN COUNT(completed) ELSE 0 END) as yesTasks,
        // (SELECT CASE WHEN completed=false THEN COUNT(completed) ELSE 0 END) as noTasks
        // FROM tasks WHERE isdeleted=false AND userid=${userId} GROUP BY completed),
        // data3 AS(SELECT (SELECT CASE WHEN end_at::date<${day} THEN COUNT(end_at) ELSE 0 END) as dTask FROM tasks WHERE isdeleted=false AND completed=false AND userid=${userId} GROUP BY end_at),
        // data4 AS(SELECT CASE WHEN dTask>0 THEN SUM(dTask) ELSE SUM(0) END as deprecatedTasks FROM data3 GROUP BY dTask)
        // SELECT DISTINCT a.allTasks, b.yesTasks, b.noTasks, c.deprecatedTasks FROM data1 as a, data2 as b, data4 as c;`;

        const chartData =
          await sql`WITH data1 AS(SELECT SUM(CASE WHEN completed=true THEN 1 ELSE 0 END) as yesTasks FROM tasks WHERE userid=${userId} AND isdeleted=false),
          data2 AS(SELECT SUM(CASE WHEN completed=false THEN 1 ELSE 0 END) as noTasks FROM tasks WHERE userid=${userId} AND isdeleted=false),
          data3 AS(SELECT COUNT(id) OVER() as allTasks FROM tasks WHERE userid=${userId} AND isdeleted=false ORDER BY id),
          data4 AS(SELECT SUM(CASE WHEN end_at::date<${day} THEN 1 ELSE 0 END) as deprecatedTasks FROM tasks WHERE userid=${userId} AND isdeleted=false AND completed=false )
          SELECT DISTINCT a.allTasks, b.yesTasks, c.noTasks, d.deprecatedTasks FROM data3 as a, data1 as b, data2 as c, data4 as d;`;

        //console.log(chartData);
        //Обработать данные
        if (chartData && chartData.length > 0) {
          const data = chartData.reduce((accum, current) => {
            for (let key in current) {
              if (!(key in accum)) {
                accum[key] = current[key];
              } else {
                let tmp: number = parseFloat(accum[key]);
                if (tmp < 1) {
                  tmp += parseFloat(current[key]);
                }
                accum[key] = tmp;
              }
            }
            return accum;
          }, {});

          //console.log(data);

          return NextResponse.json([data]);
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
