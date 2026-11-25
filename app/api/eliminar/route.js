import { createClient } from "@supabase/supabase-js";
import { esAdmin, noAutorizado } from "@/lib/adminAuth";
import { CAMPOS_FOTO, eliminarAutosConFotos, limpiarRechazadosViejos } from "@/lib/fotos";

export async function POST(req) {
  if (!esAdmin(req)) return noAutorizado();
  try {
    const body = await req.json();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    if (body.limpiar_rechazados) {
      const { error } = await limpiarRechazadosViejos(supabase);
      if (error) return Response.json({ ok: false, error: error.message }, { status: 500 });
      return Response.json({ ok: true });
    }

    const { data: auto, error: errBuscar } = await supabase
      .from("autos")
      .select(`id, ${CAMPOS_FOTO.join(", ")}`)
      .eq("id", body.id)
      .maybeSingle();
    if (errBuscar) return Response.json({ ok: false, error: errBuscar.message }, { status: 500 });
    if (!auto) return Response.json({ ok: false, error: "El anuncio no existe" }, { status: 404 });

    const { error } = await eliminarAutosConFotos(supabase, [auto]);
    if (error) return Response.json({ ok: false, error: error.message }, { status: 500 });

    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }
}
