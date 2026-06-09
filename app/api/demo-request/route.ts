import { NextResponse } from "next/server";

/**
 * Demo-request endpoint. The landing form already POSTs here, but for now it
 * simply validates and acknowledges — no persistence/email yet.
 *
 * To go live, wire one of these inside the handler:
 *   - send an email (Resend / SendGrid)
 *   - push to a CRM (HubSpot / Pipedrive)
 *   - insert into a DB (Postgres / Supabase)
 */
export async function POST(request: Request) {
  try {
    const data = await request.json();

    if (!data?.email || typeof data.email !== "string" || !data.email.includes("@")) {
      return NextResponse.json(
        { ok: false, error: "Email inválido" },
        { status: 400 },
      );
    }

    // TODO: integrate real delivery (email / CRM / DB) here.
    console.log("[demo-request] nueva solicitud:", data);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Payload inválido" },
      { status: 400 },
    );
  }
}
