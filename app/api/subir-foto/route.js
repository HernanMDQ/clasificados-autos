import { createClient } from "@supabase/supabase-js";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const archivo = formData.get("archivo");
    const nombre = formData.get("nombre");

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
