import { createClient } from "@supabase/supabase-js";

export async function POST(req) {
  try {
    const body = await req.json();

    // Solo campos permitidos; el estado siempre arranca en "pendiente" (moderacion)
    const datos = {
      marca: body.marca,
      modelo: body.modelo,
      ano: body.ano,
      kilometros: body.kilometros,
      precio: body.precio,
      telefono: body.telefono,
      descripcion: body.descripcion,
      foto_url: body.foto_url ?? null,
      foto_url_2: body.foto_url_2 ?? null,
      foto_url_3: body.foto_url_3 ?? null,
      estado: "pendiente",
    };

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { error } = await supabase.from("autos").insert([datos]);

    if (error) return Response.json({ ok: false, error: error.message }, { status: 500 });

    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }
}
