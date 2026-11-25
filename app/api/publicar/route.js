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

    // Un vehiculo por persona: se chequea aca porque el navegador solo ve los aprobados
    const { data: existente } = await supabase
      .from("autos")
      .select("id")
      .eq("telefono", datos.telefono)
      .in("estado", ["aprobado", "pendiente"])
      .limit(1);
    if (existente?.length) {
      return Response.json(
        { ok: false, error: "Ya existe un auto con este numero de telefono. Solo se permite un vehiculo por persona." },
        { status: 409 }
      );
    }

    const { error } = await supabase.from("autos").insert([datos]);

    if (error) return Response.json({ ok: false, error: error.message }, { status: 500 });

    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }
}
