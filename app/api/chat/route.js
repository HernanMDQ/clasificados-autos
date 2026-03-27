import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
  try {
    const { message, historial } = await req.json();

    const { data: autos } = await supabase.from("autos").select("*");

    const prompt = `Sos un asistente de clasificados de autos usados.
Tenés acceso a este listado de autos disponibles:
${JSON.stringify(autos, null, 2)}

Respondé en español de forma amigable y concisa, maximo 3 oraciones.
Si el usuario busca un auto, sugeri opciones del listado que coincidan.
Si no hay coincidencias, avisale amablemente.
Si preguntan por detalles de un auto ya mencionado, usá el contexto de la conversacion.
Si te preguntan algo que no es sobre autos, redirigi la conversacion.`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [
          { role: "system", content: prompt },
          ...historial
        ]
      })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "No pude obtener respuesta";

    return Response.json({ reply });

  } catch (error) {
    console.error("Error:", error);
    return Response.json({ reply: "Error: " + error.message }, { status: 500 });
  }
}