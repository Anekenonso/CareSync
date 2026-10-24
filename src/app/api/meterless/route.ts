import { NextRequest, NextResponse } from "next/server";
import { getPatientWorldModel, initializeCareSyncHMEM, recordAuditAction } from "@/lib/meterless/careSyncMemory";

export async function GET() {
  try {
    const worldModel = initializeCareSyncHMEM();
    return NextResponse.json(worldModel);
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to load Meterless world-model" }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { action, memoryId, actor, details } = body;

    const entry = recordAuditAction(action || "read", memoryId || "patient-ev-49201", actor || "Caregiver", details);
    return NextResponse.json({ success: true, entry });
  } catch (error: any) {
    return NextResponse.json({ error: error?.message || "Failed to append audit action" }, { status: 500 });
  }
}
