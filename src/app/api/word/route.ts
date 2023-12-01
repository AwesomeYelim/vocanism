import path from "path";
import fs from "fs";
import { NextResponse } from "next/server";

export async function GET(res: Response) {
  //   const { data } = await res.query;
  //   console.log(res, req);

  //   const thePath = path.join(process.cwd(), "data", "md", `${data}.md`);

  //   const theRoot = fs.readFileSync(thePath);

  return NextResponse.json({
    message: "성공쓰~",
    res,
  });
}
