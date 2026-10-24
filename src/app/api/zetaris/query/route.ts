import { NextRequest, NextResponse } from "next/server";
import { zetaris } from "@/lib/zetaris";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sql, limit } = body;

    if (!sql || typeof sql !== "string") {
      return NextResponse.json({ error: "Missing required SQL query" }, { status: 400 });
    }

    const result = await zetaris.executeSql({ sql, limit });
    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to execute Zetaris query" }, { status: 500 });
  }
}
