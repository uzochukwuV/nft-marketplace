import { pinata } from "@/config/pinata";
import { type NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();
    const name: string | undefined = data.get("name")?.toString();
   
    const description: string | undefined = data.get("description")?.toString();
    if (!name || !description) {
      throw new Error(`No name or description `);
    }
    const file: File | null = data.get("file") as unknown as File;
    const uploadData = await pinata.upload.public.file(file)

    const url = await pinata.gateways.public.convert(uploadData?.cid);
    const view = {
      name: name,
      description: description,
      external_url:  data.get("video_url")?.toString() || "https://pinata.cloud",
      image_url: url,
      logo: url,
      owner: data.get("owner")?.toString() || "",
      media_type:  data.get("mediaType")?.toString() || "image",
      attributes:[
        {
          trait_type:"owner",
          value: data.get("owner")?.toString() || "",
        }
      ]
    };

    const uploadJson = await pinata.upload.public.json(view);
    const jsonurl = await pinata.gateways.public.convert(uploadJson.cid);
    return NextResponse.json({ url, jsonurl }, { status: 200 });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
