const RESPUESTAS = [
  "¡Estamos arrancando! En breve vas a poder encontrar los mejores autos usados de Concordia acá. Volvé pronto.",
  "El asistente estará disponible cuando tengamos el catálogo completo. ¡Muy pronto!",
  "Estamos cargando el inventario. En unos días vas a poder buscar tu próximo auto con IA. ¡Gracias por la paciencia!",
];

export async function POST(req) {
  await req.json();
  const reply = RESPUESTAS[Math.floor(Math.random() * RESPUESTAS.length)];
  return Response.json({ reply });
}