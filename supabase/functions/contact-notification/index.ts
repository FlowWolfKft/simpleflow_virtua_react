import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "jsr:@supabase/server@^1";
import { createClient } from "npm:@supabase/supabase-js@2";

interface ContactPayload {
  name: string;
  company?: string;
  email: string;
  phone?: string;
  message: string;
  gdpr: boolean;
}

const escapeHtml = (value: string) =>
  value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

export default {
  fetch: withSupabase(
    { auth: ["publishable"] },
    async (request) => {
      if (request.method !== "POST") {
        return Response.json(
          { error: "Method not allowed" },
          { status: 405 },
        );
      }

      let payload: ContactPayload;

      try {
        payload = await request.json();
      } catch {
        return Response.json(
          { error: "Invalid request body" },
          { status: 400 },
        );
      }

      const name = payload.name?.trim();
      const company = payload.company?.trim() || null;
      const email = payload.email?.trim();
      const phone = payload.phone?.trim() || null;
      const message = payload.message?.trim();

      const validEmail =
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email || "");

      if (
        !name ||
        !email ||
        !validEmail ||
        !message ||
        payload.gdpr !== true ||
        name.length > 120 ||
        (company && company.length > 160) ||
        (phone && phone.length > 60) ||
        message.length > 5000
      ) {
        return Response.json(
          { error: "Invalid form data" },
          { status: 400 },
        );
      }

      const supabaseUrl = Deno.env.get("SUPABASE_URL");
      const supabaseSecretKey =
        Deno.env.get("SUPABASE_SECRET_KEY") ||
        Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
      const resendApiKey = Deno.env.get("RESEND_API_KEY");
      const notificationEmail = Deno.env.get(
        "CONTACT_NOTIFICATION_EMAIL",
      );
      const fromEmail = Deno.env.get("CONTACT_FROM_EMAIL");

      if (
        !supabaseUrl ||
        !supabaseSecretKey ||
        !resendApiKey ||
        !notificationEmail ||
        !fromEmail
      ) {
        console.error("Missing required environment variables");

        return Response.json(
          { error: "Server configuration error" },
          { status: 500 },
        );
      }

      const adminClient = createClient(
        supabaseUrl,
        supabaseSecretKey,
        {
          auth: {
            persistSession: false,
            autoRefreshToken: false,
          },
        },
      );

      const { error: databaseError } = await adminClient
        .from("contact_messages")
        .insert({
          name,
          company,
          email,
          phone,
          message,
          gdpr: true,
        });

      if (databaseError) {
        console.error("Database insert error:", databaseError);

        return Response.json(
          { error: "Database insert failed" },
          { status: 500 },
        );
      }

      const safeName = escapeHtml(name);
      const safeCompany = escapeHtml(company || "–");
      const safeEmail = escapeHtml(email);
      const safePhone = escapeHtml(phone || "–");
      const safeMessage = escapeHtml(message).replaceAll(
        "\n",
        "<br>",
      );

      let notificationSent = false;

      try {
        const resendResponse = await fetch(
          "https://api.resend.com/emails",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${resendApiKey}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: `Simple Flow weboldal <${fromEmail}>`,
              to: [notificationEmail],
              reply_to: email,
              subject: `Új kapcsolatfelvétel – ${name
                .replace(/[\r\n]+/g, " ")
                .slice(0, 80)}`,
              html: `
                <h2>Új üzenet érkezett a Simple Flow weboldalról</h2>
                <p><strong>Név:</strong> ${safeName}</p>
                <p><strong>Cégnév:</strong> ${safeCompany}</p>
                <p><strong>E-mail:</strong> ${safeEmail}</p>
                <p><strong>Telefonszám:</strong> ${safePhone}</p>
                <p><strong>Üzenet:</strong><br>${safeMessage}</p>
              `,
            }),
          },
        );

        if (resendResponse.ok) {
          notificationSent = true;
        } else {
          console.error(
            "Resend error:",
            await resendResponse.text(),
          );
        }
      } catch (error) {
        console.error("Email notification error:", error);
      }

      return Response.json({
        success: true,
        notificationSent,
      });
    },
  ),
};
