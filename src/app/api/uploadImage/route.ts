import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { join } from "path";
import { writeFile } from "fs/promises";
import { Stream } from "stream";
import { revalidatePath, revalidateTag } from "next/cache";

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

      let uploadDir = body.get("path")
        ? body.get("path")?.toString()
        : "images/massage";

      const file = body.get("file") as File;

      uploadDir = join(process.cwd(), "public", uploadDir as string);
      const buffer = Buffer.from(await (file as Blob).arrayBuffer());
      await writeFile(`${uploadDir}/${file.name}`, buffer as unknown as Stream);

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
