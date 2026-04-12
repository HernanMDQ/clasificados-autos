import { createClient } from "@supabase/supabase-js";

export async function POST(req) {
  try {
    const body = await req.json();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    if (body.limpiar_rechazados) {
      await supabase.from("autos").delete().eq("estado", "rechazado").lt("created_at", body.fecha);
      return Response.json({ ok: true });
    }

    await supabase.from("autos").delete().eq("id", body.id);

    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }
}