import { NextResponse } from "next/server";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
    try {
        const formData = await request.formData();

        const file = formData.get("file");

        if (!(file instanceof File)) {
            return NextResponse.json(
                {
                    success: false,
                    message: "No image provided.",
                },
                { status: 400 }
            );
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        const result = await new Promise<UploadApiResponse>(
            (resolve, reject) => {
                cloudinary.uploader
                    .upload_stream(
                        {
                            folder: "market-posts",
                        },
                        (error, result) => {
                            if (error) {
                                reject(error);
                                return;
                            }

                            if (!result) {
                                reject(
                                    new Error(
                                        "Cloudinary upload returned no result."
                                    )
                                );
                                return;
                            }

                            resolve(result);
                        }
                    )
                    .end(buffer);
            }
        );

        return NextResponse.json({
            success: true,
            url: result.secure_url,
        });
    } catch (error) {
        console.error("UPLOAD IMAGE ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Failed to upload image.",
            },
            { status: 500 }
        );
    }
}