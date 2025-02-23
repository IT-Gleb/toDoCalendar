import sql from "@/clientdb/connectdb";
import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { decryptId } from "@/utils/functions";

export const dynamic = "force-dynamic";
export const maxDuration = 8;

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
// function stripContentEncoding(result: Response) {
//   const responseHeaders = new Headers(result.headers);
//   responseHeaders.delete("content-encoding");

//   return new Response(result.body, {
//     status: result.status,
//     statusText: result.statusText,
//     headers: responseHeaders,
//   });
// }

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

const handler = auth(async function POST(req) {
  let data: any = null;
  if (req.auth) {
    if (req.body) {
      data = await req.json();
    }
    if (data) {
      const { user, id, role } = data;
      const userId = decryptId(id as string);
      const items =
        await sql`SELECT * FROM tasks WHERE userid=${userId} and isdeleted=false 
        ORDER BY begin_at desc LIMIT 20 OFFSET 0;`;

      return NextResponse.json(items);
    }
    data = await req.text();
    return NextResponse.json({
      message: data as string,
      status: 200,
    });
  }
  return NextResponse.json({ message: "User not auth", status: 401 });
});

export { handler as GET, handler as POST };
