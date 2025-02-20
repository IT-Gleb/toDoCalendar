import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { stat, readdir, readFile } from "node:fs/promises";
import { join } from "path";
import { openAsBlob, Stats } from "node:fs";

function blobToBase64(param: Blob) {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.readAsDataURL(param);
    reader.onloadend = () => resolve(reader.result);
  });
}

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

    const scanDir = join(process.cwd(), "storage", imgPath);
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

        const tmpFiles = [];
        for (let fl of files) {
          const buffer = await openAsBlob(`${scanDir}/${fl}`);

          // const reader = new FileReader();
          // reader.readAsDataURL(blob);
          // let url: string | undefined = undefined;
          // reader.onload = () => {
          //   url = reader.result?.toString();
          // };
          let url: string = URL.createObjectURL(buffer);
          // blobToBase64(buffer).then((res) => {
          //   url = res as string;
          //   console.log(url);
          // });

          tmpFiles.push({ name: fl, url });
        }

        const data = { path: scanDir, files: tmpFiles };

        return NextResponse.json(data);
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
