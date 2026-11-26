// Formato y conversion de precios USD / ARS (se puede usar en cliente y servidor)

export const MONEDAS = ["USD", "ARS"];

export function monedaDe(auto) {
  return auto?.moneda === "ARS" ? "ARS" : "USD";
}

export function formatoPrecio(precio, moneda = "USD") {
  const n = Math.round(Number(precio) || 0).toLocaleString("es-AR");
  return moneda === "ARS" ? `$ ${n}` : `USD ${n}`;
}

// cot = cotizacion del dolar oficial (pesos por dolar). Devuelve null si no se puede convertir.
export function convertir(precio, de, a, cot) {
  const n = Number(precio) || 0;
  if (de === a) return n;
  if (!(cot > 0)) return null;
  return de === "USD" ? n * cot : n / cot;
}

// Redondeo "amigable" para mostrar una referencia aproximada
function redondear(valor, moneda) {
  const paso = moneda === "ARS" ? 10000 : 100;
  return Math.round(valor / paso) * paso;
}

// "≈ USD 15.400" (o null si no hay cotizacion)
export function textoConversion(auto, cot) {
  const de = monedaDe(auto);
  const a = de === "USD" ? "ARS" : "USD";
  const v = convertir(auto.precio, de, a, cot);
  if (v == null) return null;
  return `≈ ${formatoPrecio(redondear(v, a), a)}`;
}

export function notaCotizacion(cot) {
  return cot > 0
    ? `Conversión aproximada al dólar oficial (BNA, venta ${formatoPrecio(cot, "ARS")}). Solo de referencia: el precio es el que fijó el vendedor.`
    : null;
}
