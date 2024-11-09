import sql from "@/clientdb/connectdb";
import { auth } from "@/auth";
import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

//export const dynamic = "force-dynamic";

// export const GET = async (req: NextRequest) => {
//   console.log(req);

//   const session = await auth();

//   if (!session) {
//     return Response.json(
//       { message: "Пользователь не авторизован!", status: 401 },
//       { status: 401 }
//     );
//   }
//   const items = await sql`SELECT * FROM tasks WHERE userid=${
//     session?.user.userId as string
//   } ORDER BY begin_at desc LIMIT 10 OFFSET 0;`;
//   //   const items = { message: "Hello where!!!" };
//   //console.log(items);
//   return Response.json(items);
// };
// Review if we need this, and why
function stripContentEncoding(result: Response) {
  const responseHeaders = new Headers(result.headers);
  responseHeaders.delete("content-encoding");

  return new Response(result.body, {
    status: result.status,
    statusText: result.statusText,
    headers: responseHeaders,
  });
}

// async function handler(req: NextRequest) {
//   const session = await auth();
//   //const token = await getToken({ req });
//   console.log(session);

//   // const headers = new Headers(req.headers);
//   // headers.set("Authorization", `Bearer ${session?.accessToken}`);

//   // let backendUrl = "http://localhost:3001/api/items";

//   // let url = req.nextUrl.href.replace(req.nextUrl.origin, backendUrl);
//   // let result = await fetch(url, { headers, body: req.body });

//   // return stripContentEncoding(result);
//   if (!session) {
//     return Response.json(
//       { message: "Пользователь не авторизован!", status: 401 },
//       { status: 401 }
//     );
//   }
//   return Response.json([]);
// }

export const handler = auth(async function POST(req) {
  let data: any = null;
  if (req.auth) {
    if (req.body) {
      data = await req.json();
    }
    if (data) {
      const { user, id, role } = data;
      const items = await sql`SELECT * FROM tasks WHERE userid=${
        id as string
      } and isdeleted=false ORDER BY begin_at desc LIMIT 10 OFFSET 0;`;
      const task = {
        id: 23,
        parent_id: null,
        userId: id,
        name: "Задача 1",
        completed: false,
        isdeleted: false,
        items: [
          {
            id: 26,
            parent_id: 23,
            userId: id,
            name: "Подзадача 1",
            completed: false,
            isdeleted: false,
            items: [],
            create_at: Date.now(),
            begin_at: Date.now(),
            end_at: Date.now(),
          },
        ],
        create_at: Date.now(),
        begin_at: Date.now(),
        end_at: Date.now(),
      };
      items.push(task);
      return NextResponse.json(items);
    }
    data = await req.text();
    return NextResponse.json({
      message: data as string,
      status: 200,
    });
  }
  return NextResponse.json({ message: "User not auth", status: 401 });
}) as any;

export const dynamic = "force-dynamic";

export { handler as GET, handler as POST };
