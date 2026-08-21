import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import crypto from "crypto";

export const dynamic = "force-dynamic";

const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(process.cwd(), "uploads");

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Ensure uploads directory exists
    if (!fs.existsSync(UPLOAD_DIR)) {
      fs.mkdirSync(UPLOAD_DIR, { recursive: true });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Sanitize and create unique filename
    const originalExt = path.extname(file.name) || "";
    const baseName = path
      .basename(file.name, originalExt)
      .replace(/[^a-zA-Z0-9_-]/g, "_");
    const uniqueHash = crypto.randomBytes(4).toString("hex");
    const safeFilename = `${Date.now()}_${baseName}_${uniqueHash}${originalExt}`;

    const filePath = path.join(UPLOAD_DIR, safeFilename);
    fs.writeFileSync(filePath, buffer);

    const fileUrl = `/api/files/${encodeURIComponent(safeFilename)}`;

    return NextResponse.json({
      url: fileUrl,
      name: file.name,
      size: file.size,
      storedFilename: safeFilename,
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to upload file" },
      { status: 500 }
    );
  }
}
