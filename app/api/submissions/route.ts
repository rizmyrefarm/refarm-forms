import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const formSlug = searchParams.get("formSlug");
    const search = searchParams.get("search");
    const status = searchParams.get("status");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    const where: any = {};

    if (formSlug && formSlug !== "all") {
      where.formSlug = formSlug;
    }

    if (status && status !== "all") {
      where.status = status;
    }

    if (search && search.trim() !== "") {
      const q = search.trim();
      where.OR = [
        { projectName: { contains: q } },
        { clientName: { contains: q } },
        { formTitle: { contains: q } },
      ];
    }

    if (startDate || endDate) {
      where.createdAt = {};
      if (startDate) {
        where.createdAt.gte = new Date(startDate);
      }
      if (endDate) {
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999);
        where.createdAt.lte = end;
      }
    }

    const submissions = await db.submission.findMany({
      where,
      orderBy: { createdAt: "desc" },
    });

    return NextResponse.json(submissions);
  } catch (error: any) {
    console.error("Fetch submissions error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch submissions" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { formSlug, formTitle, projectName, clientName, status, data } = body;

    if (!formSlug || !formTitle || !data) {
      return NextResponse.json(
        { error: "Missing required fields: formSlug, formTitle, data" },
        { status: 400 }
      );
    }

    const submission = await db.submission.create({
      data: {
        formSlug,
        formTitle,
        projectName: projectName || null,
        clientName: clientName || null,
        status: status || "submitted",
        data,
      },
    });

    return NextResponse.json(submission, { status: 201 });
  } catch (error: any) {
    console.error("Create submission error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to save submission" },
      { status: 500 }
    );
  }
}
