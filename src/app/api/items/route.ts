import sql from "@/clientdb/connectdb";
import { NextResponse } from "next/server";

//export const dynamic = "force-static";

export async function GET() {
  const items =
    await sql`SELECT * FROM tasks ORDER BY begin_at LIMIT 10 OFFSET 0;`;
  //   const items = { message: "Hello where!!!" };
  return NextResponse.json(items);
}
