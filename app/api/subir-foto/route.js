import { createClient } from "@supabase/supabase-js";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const archivo = formData.get("archivo");
    const nombreOriginal = String(formData.get("nombre") || "foto");

    if (!archivo || typeof archivo.arrayBuffer !== "function") {
      return Response.json({ ok: false, error: "Archivo invalido" }, { status: 400 });
    }
    // algunos navegadores mandan HEIC sin tipo MIME
    const esHeicSinTipo = !archivo.type && /\.(heic|heif)$/i.test(nombreOriginal);
    if (!/^image\//.test(archivo.type) && !esHeicSinTipo) {
      return Response.json({ ok: false, error: "Solo se permiten imagenes" }, { status: 400 });
    }
    if (archivo.size > 15 * 1024 * 1024) {
      return Response.json({ ok: false, error: "La imagen supera los 15 MB" }, { status: 400 });
    }
    // sin barras ni caracteres raros: evita escribir en otras carpetas del bucket
    const nombre = nombreOriginal.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 150);

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const buffer = Buffer.from(await archivo.arrayBuffer());
    const { error } = await supabase.storage.from("fotos-autos").upload(nombre, buffer, {
      contentType: archivo.type,
    });

    if (error) return Response.json({ ok: false, error: error.message }, { status: 500 });

    const { data } = supabase.storage.from("fotos-autos").getPublicUrl(nombre);

    return Response.json({ ok: true, url: data.publicUrl });
  } catch (error) {
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }
}
