import { obtenerCotizacion } from "@/lib/cotizacion";

export async function GET() {
  const cot = await obtenerCotizacion();
  return Response.json(
    { ok: !!cot, venta: cot?.venta ?? null, fecha: cot?.fecha ?? null },
    { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } }
  );
}
