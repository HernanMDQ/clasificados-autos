export async function POST(req) {
  try {
    const { marca, modelo, anno, km, precio, fotoBase64 } = await req.json();

    if (!marca || !modelo || !anno || !km || !precio) {
      return Response.json({ error: "Faltan datos del vehículo" }, { status: 400 });
    }

    const textoDatos = `Marca: ${marca} | Modelo: ${modelo} | Año: ${anno} | Kilometraje: ${parseInt(km).toLocaleString()} km | Precio: USD ${parseFloat(precio).toLocaleString()}`;

    const instruccion = `Escribí la descripción de un anuncio de venta de vehículo usado en Argentina, en nombre del vendedor (primera persona).

Datos del vehículo: ${textoDatos}
${fotoBase64 ? "Analizá la imagen para identificar el color del vehículo e incluilo en la descripción." : ""}

Reglas estrictas:
- Escribí en primera persona como si fueras el dueño del vehículo: "Vendo...", "El auto tiene...", "Cuenta con..."
- Tono directo y técnico, sin exageraciones ni lenguaje emotivo
- Máximo 400 caracteres
- Incluí el color${fotoBase64 ? " (obtenelo de la imagen)" : ""}
- Mencioná datos concretos: estado del vehículo, si tiene service al día, si es único dueño, etc. Solo si son razonablemente inferibles del año y km — no inventes datos
- PROHIBIDO: frases pomposas, emocionales o de marketing como "no te lo pierdas", "te va a dar felicidad", "oportunidad única", "el auto de tus sueños"
- PROHIBIDO: mencionar servicios que no corresponden al vendedor particular, como "vehículo verificado", "garantía incluida", "revisión técnica"
- NO menciones el precio ni datos de contacto, eso ya figura en el anuncio
- Devolvé solo el texto, sin comillas ni aclaraciones`;

    const messages = fotoBase64
      ? [
          {
            role: "user",
            content: [
              { type: "image_url", image_url: { url: fotoBase64 } },
              { type: "text", text: instruccion },
            ],
          },
        ]
      : [{ role: "user", content: instruccion }];

    const model = fotoBase64
      ? "meta-llama/llama-4-scout-17b-16e-instruct"
      : "llama-3.3-70b-versatile";

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({ model, messages, max_tokens: 200, temperature: 0.7 }),
    });

    const data = await response.json();
    const descripcion = data.choices?.[0]?.message?.content?.trim();

    if (!descripcion) throw new Error("No se pudo generar la descripción");

    return Response.json({ descripcion });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
