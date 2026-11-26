"use client";
import { useState, useEffect } from "react";

// Devuelve la cotizacion del dolar oficial (numero) o null mientras carga / si falla
export function useCotizacion() {
  const [cot, setCot] = useState(null);
  useEffect(() => {
    fetch("/api/cotizacion")
      .then((r) => r.json())
      .then((j) => j.ok && setCot(j.venta))
      .catch(() => {});
  }, []);
  return cot;
}
