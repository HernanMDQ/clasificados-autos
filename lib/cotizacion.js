// Cotizacion del dolar oficial (BNA, venta) desde dolarapi.com.
// Se cachea 1 hora; si la API falla, Next sigue sirviendo el ultimo valor cacheado.
export async function obtenerCotizacion() {
  try {
    const res = await fetch("https://dolarapi.com/v1/dolares/oficial", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const j = await res.json();
    if (!(Number(j.venta) > 0)) throw new Error("cotizacion invalida");
    return { venta: Number(j.venta), fecha: j.fechaActualizacion ?? null };
  } catch (err) {
    console.error("No se pudo obtener la cotizacion:", err.message);
    return null;
  }
}
