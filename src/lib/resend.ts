import { Resend } from "resend";

// Instantiated once, reused across requests.
// RESEND_API_KEY must be set in .env.local — see .env.example.
export const resend = new Resend(process.env.RESEND_API_KEY);
