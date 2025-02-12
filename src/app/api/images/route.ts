import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { stat, readdir } from "fs/promises";
import { join } from "path";
import { Stats } from "fs";

const handler = auth(async function POST(Request) {
  if (!Request.auth) {
    return NextResponse.json({
      status: 401,
      message: "Пользователь не авторизован!",
    });
  }
  if (Request.method === "POST") {
    const data = await Request.json();
    const { imgPath } = data;

    const scanDir = join(process.cwd(), "public", imgPath);
    let statDir: Stats;
    try {
      statDir = await stat(scanDir);
    } catch (error) {
      return NextResponse.json({
        status: 404,
        message: (error as Error).message,
      });
    }
    //Прочитать файлы и вернуть их
    if (statDir.isDirectory()) {
      try {
        const files = await readdir(scanDir, { recursive: true });

        return NextResponse.json({ path: scanDir, files });
      } catch (error) {
        return NextResponse.json({
          status: 404,
          message: (error as Error).message,
        });
      }
    } else {
      return NextResponse.json({
        status: 404,
        message: `${scanDir} - не является каталогом.`,
      });
    }
  }
});

export { handler as POST };
