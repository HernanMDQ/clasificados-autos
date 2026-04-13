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

const prompt = `Sos un asistente de clasificados de autos usados en Concordia, Argentina. Respondés siempre de forma muy corta y directa, sin rodeos ni frases de relleno.

Listado actual de autos disponibles:
${JSON.stringify(autos, null, 2)}

Reglas:
- Máximo 2 oraciones de texto, más los links si corresponde. Sin introducciones ni cierres largos.
- Si encontrás coincidencias (4 o menos), listalas directamente con este formato: [MARCA MODELO ANO - USD PRECIO](${baseUrl}/autos/marca-modelo-ano-id)
- Si hay más de 4 coincidencias, mostrá 2 o 3 ejemplos con links y agregá: [Ver los X resultados](${baseUrl}/autos?marca=MARCA&precioMax=PRECIO&annoMin=ANO) — solo incluí los parámetros que el usuario mencionó.
- Si no hay coincidencias, decilo en una línea y preguntá algo concreto para ajustar la búsqueda (ej: rango de precio, año, tipo de auto).
- NUNCA compartas el teléfono del vendedor. Si preguntan cómo contactar, indicá que en la ficha del anuncio hay un botón de WhatsApp.
- Si preguntan algo fuera del tema de autos, redirigí en una sola oración.`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        max_tokens: 300,
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