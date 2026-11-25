import { createClient } from "@supabase/supabase-js";

// Llamado a diario por Vercel Cron (ver vercel.json) para que Supabase
// no pause el proyecto por inactividad (plan gratuito: 7 dias sin uso).
export const dynamic = "force-dynamic";

export async function GET(req) {
  // Vercel manda "Authorization: Bearer <CRON_SECRET>" si la variable existe
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) {
    return Response.json({ ok: false }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );

  const { error } = await supabase.from("autos").select("id").limit(1);
  if (error) return Response.json({ ok: false, error: error.message }, { status: 500 });

  return Response.json({ ok: true, at: new Date().toISOString() });
}
