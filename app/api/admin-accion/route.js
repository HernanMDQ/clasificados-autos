import { createClient } from "@supabase/supabase-js";
import { esAdmin, noAutorizado } from "@/lib/adminAuth";

const CAMPOS_FOTO = ["foto_url", "foto_url_2", "foto_url_3"];
const ESTADOS = ["pendiente", "aprobado", "rechazado"];

export async function POST(req) {
  if (!esAdmin(req)) return noAutorizado();
  try {
    const { accion, id, estado, campo, url } = await req.json();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    let res;
    if (accion === "cambiar_estado" && ESTADOS.includes(estado)) {
      res = await supabase.rpc("cambiar_estado_auto", { auto_id: id, p_estado: estado });
    } else if (accion === "eliminar_foto" && CAMPOS_FOTO.includes(campo)) {
      res = await supabase.rpc("eliminar_foto_auto", { auto_id: id, campo });
    } else if (accion === "actualizar_foto" && CAMPOS_FOTO.includes(campo) && typeof url === "string") {
      res = await supabase.rpc("actualizar_foto_auto", { auto_id: id, campo, url });
    } else {
      return Response.json({ ok: false, error: "Accion invalida" }, { status: 400 });
    }

    if (res.error) return Response.json({ ok: false, error: res.error.message }, { status: 500 });
    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }
}
