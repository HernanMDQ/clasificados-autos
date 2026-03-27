import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
  try {
    const { message } = await req.json();

    const { data: autos } = await supabase.from("autos").select("*");

    const prompt = `Sos un asistente de clasificados de autos usados. 
Tenés acceso a este listado de autos disponibles en JSON:
${JSON.stringify(autos, null, 2)}

Respondé en español de forma amigable y conversacional.
Si el usuario busca un auto, sugerí opciones del listado que coincidan.
Si no hay coincidencias, avisale amablemente.
Si te preguntan algo que no es sobre autos, redirigí la conversación.`;

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
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();
    console.log("Respuesta Groq:", JSON.stringify(data));
const reply = data.choices?.[0]?.message?.content || "No pude obtener respuesta";

    return Response.json({ reply });

  } catch (error) {
    console.error("Error:", error);
    return Response.json({ reply: "Error: " + error.message }, { status: 500 });
  }
}