import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export async function POST(req) {
  try {
    const { message, historial } = await req.json();

    const { data: autos } = await supabase.from("autos").select("*").eq("estado", "aprobado");

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

const prompt = `Sos un asistente de clasificados de autos usados en Concordia, Argentina.
Tenés acceso a este listado de autos disponibles:
${JSON.stringify(autos, null, 2)}

Reglas importantes:
- Respondé en español de forma amigable y concisa, maximo 3 oraciones.
- Si el usuario busca un auto, sugeri opciones del listado que coincidan.
- Cuando menciones un auto SIEMPRE incluí su link usando este formato exacto: [MODELO - USD PRECIO](${baseUrl}/autos/MARCA-MODELO-ANO-ID) donde en la URL usá marca, modelo, ano e id en minusculas separados por guiones, y en el texto del link usá el modelo real y el precio, por ejemplo "Hilux - USD 18.000".
- NUNCA compartas el numero de telefono del vendedor en el chat. Si el usuario pregunta como contactar al vendedor, indicale que visite la pagina del anuncio donde encontrara el boton de contacto.
- Si no hay coincidencias, avisale amablemente.
- Si preguntan por detalles de un auto ya mencionado, usá el contexto de la conversacion.
- Si te preguntan algo que no es sobre autos, redirigi la conversacion.`;

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