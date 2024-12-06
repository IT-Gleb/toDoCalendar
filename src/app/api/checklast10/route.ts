import { auth } from "@/auth";
import sql from "@/clientdb/connectdb";
import { decryptId } from "@/utils/functions";
import { NextResponse } from "next/server";

const handler = auth(async function POST(req) {
  if (req.auth) {
    if (req.method === "POST") {
      const data = await req.json();
      if (data) {
        try {
          const { id, day, limit, offset } = data;
          const userId = decryptId(id);

          const tasks =
            await sql`SELECT id, name, completed, begin_at, end_at, COUNT(id) OVER() as taskscount FROM tasks WHERE isdeleted=false AND completed=false AND userid=${userId} AND begin_at::date>=${day} GROUP BY id ORDER BY begin_at LIMIT ${limit} OFFSET ${offset};`;
          if (tasks) {
            return NextResponse.json(tasks);
          }
        } catch (err) {
          return NextResponse.json({
            status: "Error",
            message: (err as Error).message,
          });
        }
      }
    }
    if (req.method === "GET") {
      console.log("GET method");
    }
    return NextResponse.json({ status: 200, message: "Data protected" });
  }
  return NextResponse.json({ status: 401, message: "Register reqired!!!" });
});

export { handler as POST, handler as GET };
