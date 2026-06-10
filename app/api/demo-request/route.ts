import { NextResponse } from "next/server";

/**
 * Demo-request endpoint. El formulario de la landing hace POST acá; este handler
 * valida y envía un email de aviso vía Resend (https://resend.com).
 *
 * Variables de entorno necesarias (configurar en Vercel → Settings → Environment Variables):
 *   - RESEND_API_KEY    (obligatoria) API key de Resend.
 *   - DEMO_NOTIFY_EMAIL (opcional)    destino del aviso. Default: felipemiguelsainz@gmail.com
 *   - RESEND_FROM       (opcional)    remitente. Default: onboarding@resend.dev
 *                                     (el dominio compartido de Resend; sólo puede
 *                                     enviarte a la casilla con la que te registraste.
 *                                     Para enviar a cualquier destino, verificá tu
 *                                     propio dominio en Resend y poné acá algo como
 *                                     "Distro <demos@tudominio.com>").
 */

const NOTIFY_TO = process.env.DEMO_NOTIFY_EMAIL || "felipemiguelsainz@gmail.com";
const FROM = process.env.RESEND_FROM || "Distro <onboarding@resend.dev>";

function esc(v: unknown): string {
  return String(v ?? "—")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(request: Request) {
  let data: Record<string, unknown>;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Payload inválido" }, { status: 400 });
  }

  const email = data?.email;
  if (!email || typeof email !== "string" || !email.includes("@")) {
    return NextResponse.json({ ok: false, error: "Email inválido" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    // Sin API key no podemos enviar. No rompemos la UX del formulario, pero
    // dejamos el aviso en los logs para no perder el lead.
    console.error("[demo-request] RESEND_API_KEY no configurada. Lead sin enviar:", data);
    return NextResponse.json({ ok: true, warning: "email-not-configured" });
  }

  const nombre = `${esc(data.nombre)} ${esc(data.apellido)}`.trim();
  const html = `
    <h2>Nueva solicitud de demo</h2>
    <table style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
      <tr><td style="padding:4px 12px 4px 0"><b>Nombre</b></td><td>${nombre || "—"}</td></tr>
      <tr><td style="padding:4px 12px 4px 0"><b>Email</b></td><td>${esc(data.email)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0"><b>Empresa</b></td><td>${esc(data.empresa)}</td></tr>
      <tr><td style="padding:4px 12px 4px 0"><b>Equipo</b></td><td>${esc(data.equipo)}</td></tr>
    </table>
  `;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [NOTIFY_TO],
        reply_to: esc(data.email) === "—" ? undefined : String(data.email),
        subject: `Nueva demo: ${esc(data.empresa) || nombre || "sin empresa"}`,
        html,
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("[demo-request] Resend respondió error:", res.status, detail);
      return NextResponse.json({ ok: false, error: "No se pudo enviar el email" }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[demo-request] Error enviando email:", err);
    return NextResponse.json({ ok: false, error: "No se pudo enviar el email" }, { status: 502 });
  }
}
