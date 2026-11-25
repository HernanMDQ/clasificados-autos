import { createClient } from "@supabase/supabase-js";
import { limpiarRechazadosViejos } from "@/lib/fotos";

// Llamado a diario por Vercel Cron (ver vercel.json):
// - mantiene activo Supabase (el plan gratuito pausa tras 7 dias sin uso)
// - borra anuncios rechazados con mas de 30 dias, junto con sus fotos
export const dynamic = "force-dynamic";

export async function GET(req) {
  // Vercel manda "Authorization: Bearer <CRON_SECRET>" si la variable existe
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get("authorization") !== `Bearer ${secret}`) {
    return Response.json({ ok: false }, { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );

  const { error, borrados } = await limpiarRechazadosViejos(supabase);
  if (error) return Response.json({ ok: false, error: error.message }, { status: 500 });

  return Response.json({ ok: true, rechazados_borrados: borrados, at: new Date().toISOString() });
}
