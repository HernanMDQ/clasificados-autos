export async function POST(req) {
  try {
    const { marca, modelo, anno, km, precio } = await req.json();

    if (!marca || !modelo || !anno || !km || !precio) {
      return Response.json({ error: "Faltan datos del vehículo" }, { status: 400 });
    }

    const prompt = `Generá una descripción atractiva para un anuncio de venta de vehículo usado en Argentina.

Datos del vehículo:
- Marca: ${marca}
- Modelo: ${modelo}
- Año: ${anno}
- Kilometraje: ${parseInt(km).toLocaleString()} km
- Precio: USD ${parseFloat(precio).toLocaleString()}

Reglas:
- Escribí en español rioplatense, tono amigable y directo
- Máximo 400 caracteres
- Destacá los puntos fuertes según el año y kilometraje (ej: si tiene pocos km mencionalo, si es reciente también)
- NO menciones el precio ni datos de contacto, eso ya está en el anuncio
- NO uses frases genéricas como "excelente oportunidad" o "no te lo pierdas"
- Devolvé solo el texto de la descripción, sin comillas ni aclaraciones`;

    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 200,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const descripcion = data.choices?.[0]?.message?.content?.trim();

    if (!descripcion) throw new Error("No se pudo generar la descripción");

    return Response.json({ descripcion });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
