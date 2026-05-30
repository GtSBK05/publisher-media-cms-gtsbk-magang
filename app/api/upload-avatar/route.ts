import cloudinary from "@/lib/cloudinary";
import { Buffer } from "buffer";

export async function POST(
  req: Request
) {
  try {
    const formData =
      await req.formData();

    const file =
      formData.get(
        "file"
      ) as File;

    if (!file) {
      return Response.json(
        {
          error:
            "No file",
        },
        {
          status: 400,
        }
      );
    }

    const bytes =
      await file.arrayBuffer();

    const buffer =
      Buffer.from(bytes);

    const result =
      await new Promise<any>(
        (
          resolve,
          reject
        ) => {
          cloudinary.uploader.upload_stream(
            {
              folder:
                "avatars",
               resource_type:
                "image", 
            },
            (
              error,
              result
            ) => {
              if (error)
                reject(error);

              resolve(
                result
              );
            }
          ).end(buffer);
        }
      );

    return Response.json({
      url:
        result.secure_url,
    });

  } catch (error) {
    console.error(error);

    return Response.json(
      {
        error:
          "Upload failed",
      },
      {
        status: 500,
      }
    );
  }
}