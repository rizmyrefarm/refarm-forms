import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(process.cwd(), "uploads");

export async function GET(
  req: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const rawFilename = decodeURIComponent(params.filename);
    const safeFilename = path.basename(rawFilename); // Prevent path traversal
    const filePath = path.join(UPLOAD_DIR, safeFilename);

    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const fileBuffer = fs.readFileSync(filePath);
    const ext = path.extname(filePath).toLowerCase();

    // Map content types
    const mimeTypes: Record<string, string> = {
      ".pdf": "application/pdf",
      ".png": "image/png",
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".gif": "image/gif",
      ".webp": "image/webp",
      ".csv": "text/csv",
      ".txt": "text/plain",
      ".docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ".xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    };

    const contentType = mimeTypes[ext] || "application/octet-stream";

    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `inline; filename="${safeFilename}"`,
        "Cache-Control": "public, max-age=31536000, immutable",
      },
    });
  } catch (error: any) {
    console.error("File serve error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve file" },
      { status: 500 }
    );
  }
}
