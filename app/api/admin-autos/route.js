import { createClient } from "@supabase/supabase-js";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const estado = searchParams.get("estado");

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data, error } = await supabase.rpc("obtener_autos_por_estado", { p_estado: estado });

    if (error) return Response.json({ ok: false, error: error.message }, { status: 500 });

    return Response.json({ ok: true, data });
  } catch (error) {
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }
}
