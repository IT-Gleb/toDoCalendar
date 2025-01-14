import { join } from "path";
import { stat, mkdir, writeFile } from "fs/promises";
import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { isValue } from "@/utils/tasksFunctions";
import { Stream } from "stream";

// export async function POST(request: NextRequest) {
//   const formData = await request.formData();
//   const file = formData.get("file") as Blob | null;

//   if (!file) {
//     return NextResponse.json(
//       { error: "File blob is required." },
//       { status: 400 }
//     );
//   }
//   const folder = formData.get("folder") as string;

//   const relativeUploadDir = `/portfolio/${folder}`;
//   const uploadDir = join(process.cwd(), "public/", relativeUploadDir);

//   try {
//     await stat(uploadDir);
//   } catch (e: any) {
//     if (e.code === "ENOENT") {
//       await mkdir(uploadDir, { recursive: true });
//     } else {
//       console.error(
//         "Ошибка при попытке создать каталог при загрузке файла\n",
//         e
//       );
//       return NextResponse.json(
//         { error: "Что-то пошло не так." },
//         { status: 500 }
//       );
//     }
//   }

//   try {
//     const folderArray = [];
//     const formDataEntryValues = Array.from(formData.values()) as [];
//     for (const formDataEntryValue of formDataEntryValues) {
//       if (
//         typeof formDataEntryValue === "object" &&
//         "arrayBuffer" in formDataEntryValue
//       ) {
//         const file = formDataEntryValue as unknown as Blob;
//         const buffer = Buffer.from(await file.arrayBuffer());
//         await writeFile(`${uploadDir}/${file.name}`, buffer);
//         folderArray.push(`${relativeUploadDir}/${file.name}`);
//       }
//     }
//     return NextResponse.json({ filename: folderArray });
//   } catch (e) {
//     console.error("Error while trying to upload a file\n", e);
//     return NextResponse.json({ error: "Что-то пошло не так" }, { status: 500 });
//   }
// }
const handler = auth(async function POST(req) {
  if (!req.auth) {
    return NextResponse.json({
      status: 401,
      message: "Пользователь не авторизован! Зарегистрируйтесь!",
    });
  }
  if (req.method === "POST") {
    //console.log("Начинаю обработку...");
    try {
      //Получить данные
      const data = await req.formData();
      const fileName = (data.get("fileUpName") as File).name ?? "_no_file";
      const file = data.get("fileUpName") as Blob | null;
      let folderName: string = data.get("folder")?.toString() ?? "_no";
      const folder = JSON.parse(folderName);
      folderName = `audio/${folder.name + folder.userId}`;

      const uploadDir = join(process.cwd(), "public/", folderName);
      //console.log(uploadDir);
      //--------------------------------------------
      //Создать папку если ее нет
      try {
        await stat(uploadDir);
      } catch (e: any) {
        if (e.code === "ENOENT") {
          await mkdir(uploadDir, { recursive: true });
        } else {
          console.error(
            "Ошибка при попытке создать каталог при загрузке файла\n"
          );
          return NextResponse.json({
            status: 500,
            message: "Ошибка при попытке создать каталог.",
          });
        }
      }
      //-------------------------
      //Записать файл в папку

      const fName: string = `${uploadDir}/${fileName}`;
      if (isValue(file)) {
        const buffer = Buffer.from(await (file as Blob).arrayBuffer());
        await writeFile(fName, buffer as unknown as Stream);
      }
      //---------------------

      return NextResponse.json({ status: 200, message: fName });
    } catch (err) {
      console.log((err as Error).message, (err as Error).cause);
      return NextResponse.json({
        status: 500,
        message: "Ошибка получения данных- " + (err as Error).message,
      });
    }
  }
});

export { handler as POST };
