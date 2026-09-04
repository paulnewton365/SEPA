import { NextResponse } from "next/server";
import { submitToSmartsheet } from "../../../lib/smartsheet";

export const runtime = "nodejs";

export async function POST(request) {
  try {
    const body = await request.json();
    const { answers, submittedAt, audience } = body || {};

    if (!answers || typeof answers !== "object") {
      return NextResponse.json(
        { error: "Missing or invalid answers payload." },
        { status: 400 }
      );
    }

    const result = await submitToSmartsheet({
      answers,
      audience,
      submittedAt: submittedAt || new Date().toISOString(),
    });

    return NextResponse.json({ ok: true, result });
  } catch (err) {
    console.error("Submit error:", err);
    return NextResponse.json(
      { error: err.message || "Server error" },
      { status: 500 }
    );
  }
}
