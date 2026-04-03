import { createClient } from "@supabase/supabase-js";

export async function POST(req) {
  try {
    const { id, datos } = await req.json();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { error } = await supabase.rpc("editar_auto", {
      auto_id: id,
      p_marca: datos.marca,
      p_modelo: datos.modelo,
      p_ano: datos.ano,
      p_kilometros: datos.kilometros,
      p_precio: datos.precio,
      p_descripcion: datos.descripcion,
      p_telefono: datos.telefono,
    });

    if (error) return Response.json({ ok: false, error: error.message }, { status: 500 });

    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }
}
