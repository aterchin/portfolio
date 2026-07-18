import { NextResponse } from "next/server";
import { resend } from "@/lib/resend";

// ─── Rate limiting ─────────────────────────────────────────────────────────────
// Simple in-memory approach — resets on process restart, good enough for a
// portfolio. Swap the Map for a Redis-backed solution if traffic warrants it.

const WINDOW_MS = 60 * 60 * 1000; // 1 hour
const MAX_REQUESTS = 5;
const ipTimestamps = new Map<string, number[]>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = (ipTimestamps.get(ip) ?? []).filter(
    (t) => now - t < WINDOW_MS
  );
  if (timestamps.length >= MAX_REQUESTS) return false;
  ipTimestamps.set(ip, [...timestamps, now]);
  return true;
}

// ─── Validation ────────────────────────────────────────────────────────────────

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface FormData {
  name: string;
  email: string;
  message: string;
}

function validate(data: FormData): string | null {
  if (!data.name?.trim()) return "Name is required.";
  if (!data.email?.trim()) return "Email is required.";
  if (!EMAIL_RE.test(data.email)) return "Please enter a valid email address.";
  if (!data.message?.trim()) return "Message is required.";
  if (data.message.trim().length < 10) return "Message is too short.";
  if (data.message.trim().length > 5000) return "Message is too long.";
  return null;
}

// ─── Handler ───────────────────────────────────────────────────────────────────

export async function POST(request: Request) {
  // Get IP from header set by Apache reverse proxy
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ?? "unknown";

  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  let body: FormData;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const validationError = validate(body);
  if (validationError) {
    return NextResponse.json({ error: validationError }, { status: 400 });
  }

  const { name, email, message } = body;
  const toEmail = process.env.CONTACT_TO_EMAIL;

  if (!toEmail) {
    console.error("CONTACT_TO_EMAIL is not set");
    return NextResponse.json(
      { error: "Server configuration error." },
      { status: 500 }
    );
  }

  try {
    await resend.emails.send({
      from: "Adam <adam@contact.reallyslowwebsites.com>",
      to: toEmail,
      replyTo: email,
      subject: `New message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Resend error:", err);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
