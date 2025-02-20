import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { join } from "path";
import { writeFile, stat, mkdir } from "node:fs/promises";
//import { chmod } from "node:fs";

const handler = auth(async function POST(req) {
  if (!req.auth) {
    return NextResponse.json({
      status: 403,
      message: "Пользователь не авторизован.",
    });
  }
  if (req.method === "POST") {
    try {
      const body = await req.formData();

      let uploadDir = body.get("folder")
        ? body.get("folder")?.toString()
        : "images/massage";

      uploadDir = join(process.cwd(), "storage", uploadDir as string);
      //Если нет создать каталог
      try {
        await stat(uploadDir);
      } catch (err: any) {
        if (err.code === "ENOENT") {
          await mkdir(uploadDir, { recursive: true });
        } else {
          console.error(
            "Ошибка при попытке создать каталог при загрузке файла\n"
          );
        }
      }

      let fileMode = "0o777";

      const file = body.get("file") as File;
      const fileArrayBuffer = await file.arrayBuffer();
      const buffer = new Uint8Array(fileArrayBuffer);

      //await writeFile(`${uploadDir}/${file.name}`, buffer, { mode: fileMode });
      await writeFile(`${uploadDir}/${file.name}`, buffer);
      //chmod(`${uploadDir}/${file.name}`, fileMode, (err) => console.log(err));

      return NextResponse.json({
        path: uploadDir,
        file: file.name,
        size: (file.size / 1024 / 1000).toFixed(3),
      });
    } catch (err) {
      //console.log((err as Error).name);
      return NextResponse.json({
        status: 503,
        message: (err as Error).message,
      });
    }
  }
});

export { handler as POST };
