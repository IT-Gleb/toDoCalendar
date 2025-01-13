import { auth } from "@/auth";
import { NextResponse } from "next/server";
import { readdirSync, statSync } from "fs";
import { isValue } from "@/utils/tasksFunctions";
import { join } from "path";
import { decryptId } from "@/utils/functions";

const handler = auth(async function POST(req) {
  if (!req.auth) {
    return NextResponse.json({
      status: 401,
      message: "Вы не автризированны. Зарегистрируйтесь в системе!",
    });
  }
  if (req.method === "POST") {
    const params = await req.json();

    if (isValue(params)) {
      const { name, userId } = params;
      let Id = decryptId(userId);
      const userFolder = `audio/${name + Id}`;
      const downloadFolder = join("public/", userFolder);

      let myFiles: string[] = [];
      try {
        let tmpFiles = readdirSync(downloadFolder);
        for (let f in tmpFiles) {
          let name = `${downloadFolder}/${tmpFiles[f]}`;
          //console.log(name);
          if (!statSync(name).isDirectory()) {
            myFiles.push(tmpFiles[f]);
          }
        }
        if (isValue(myFiles) && myFiles.length > 1) {
          myFiles.sort();
        }
        return NextResponse.json(myFiles);
      } catch (err) {
        //console.error(err);
        return NextResponse.json([]);
      }
    }
  }
  return NextResponse.json([]);
});

export { handler as POST };
