import { auth } from "@/auth";
import sql from "@/clientdb/connectdb";
import { decryptId } from "@/utils/functions";
import { NextResponse } from "next/server";

export const maxDuration = 10;

const handler = auth(async function POST(req) {
  if (!req.auth) {
    return NextResponse.json({ status: 401, message: "Register required!!!" });
  }
  if (req.method === "GET") {
    const data =
      await sql`SELECT id,parent_id,userid,name,begin_at,end_at,completed,isdeleted,items,COUNT(id) OVER() as taskscount FROM tasks WHERE isdeleted=false AND completed=false AND userid=-1 AND begin_at::date<='2024-12-09' GROUP BY id ORDER BY begin_at desc;`;
    return NextResponse.json({
      status: 200,
      message: "Method allowed and protected...",
      tasks: data,
    });
  }
  if (req.method === "POST") {
    let params: TPostPartialParams = {};
    try {
      params = await req.json();
    } catch (err) {
      return NextResponse.json({
        status: 500,
        message: (err as Error).message,
      });
    }
    const { userid, day, limit, offset } = params;
    const user_id: string = decryptId(userid as string);
    try {
      const data =
        await sql`SELECT id,parent_id,userid,name,begin_at,end_at,completed,isdeleted,items,COUNT(id) OVER() as taskscount FROM tasks WHERE isdeleted=false AND completed=false AND userid=${user_id} AND end_at::date<${
          day as string
        } GROUP BY id ORDER BY end_at desc LIMIT ${limit as number} OFFSET ${
          offset as number
        };`;
      return NextResponse.json(data);
    } catch (err) {
      return NextResponse.json({
        status: 500,
        message: (err as Error).message,
      });
    }
  }
});

export { handler as POST, handler as GET };
