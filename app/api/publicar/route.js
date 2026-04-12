import { createClient } from "@supabase/supabase-js";

export async function POST(req) {
  try {
    const datos = await req.json();

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
