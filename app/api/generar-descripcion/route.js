export async function POST(req) {
  try {
    const { marca, modelo, anno, km, precio, fotoBase64 } = await req.json();

    if (!marca || !modelo || !anno || !km || !precio) {
      return Response.json({ error: "Faltan datos del vehículo" }, { status: 400 });
    }

    const textoDatos = `Marca: ${marca} | Modelo: ${modelo} | Año: ${anno} | Kilometraje: ${parseInt(km).toLocaleString()} km | Precio: USD ${parseFloat(precio).toLocaleString()}`;

    const instruccion = `Generá una descripción atractiva para un anuncio de venta de vehículo usado en Argentina.

Datos del vehículo: ${textoDatos}
${fotoBase64 ? "Analizá la imagen para identificar el color del vehículo e incluilo en la descripción." : ""}

Reglas:
- Escribí en español rioplatense, tono amigable y directo
- Máximo 400 caracteres
- Incluí el color del vehículo${fotoBase64 ? " (obtenelo de la imagen)" : " si podés inferirlo"}
- Destacá puntos fuertes según año y kilometraje
- NO menciones el precio ni datos de contacto
- NO uses frases como "excelente oportunidad" o "no te lo pierdas"
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
