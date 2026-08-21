import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const submission = await db.submission.findUnique({
      where: { id: params.id },
    });

    if (!submission) {
      return NextResponse.json(
        { error: "Submission not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(submission);
  } catch (error: any) {
    console.error("Get submission error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to retrieve submission" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json();
    const { projectName, clientName, status, data } = body;

    const submission = await db.submission.update({
      where: { id: params.id },
      data: {
        ...(projectName !== undefined ? { projectName: projectName || null } : {}),
        ...(clientName !== undefined ? { clientName: clientName || null } : {}),
        ...(status !== undefined ? { status } : {}),
        ...(data !== undefined ? { data } : {}),
      },
    });

    return NextResponse.json(submission);
  } catch (error: any) {
    console.error("Update submission error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update submission" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await db.submission.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Delete submission error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete submission" },
      { status: 500 }
    );
  }
}
