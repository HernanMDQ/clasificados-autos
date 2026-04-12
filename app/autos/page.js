"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const POR_PAGINA = 3;

function AutosContent() {
  const searchParams = useSearchParams();
  const [autos, setAutos] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [marca, setMarca] = useState(searchParams.get("marca") || "");
  const [modelo, setModelo] = useState(searchParams.get("modelo") || "");
  const [precioMax, setPrecioMax] = useState(searchParams.get("precioMax") || "");
  const [annoMin, setAnnoMin] = useState(searchParams.get("annoMin") || "");
  const [pagina, setPagina] = useState(1);

  useEffect(() => {
    const cargar = async () => {
      const { data } = await supabase
        .from("autos")
        .select("*")
        .eq("estado", "aprobado")
        .order("created_at", { ascending: false });
      setAutos(data || []);
      setFiltrados(data || []);
    };
    cargar();
  }, []);

  useEffect(() => {
    let resultado = autos;
    if (marca.trim()) resultado = resultado.filter((a) => a.marca.toLowerCase().includes(marca.toLowerCase()));
    if (modelo.trim()) resultado = resultado.filter((a) => a.modelo.toLowerCase().includes(modelo.toLowerCase()));
    if (precioMax) resultado = resultado.filter((a) => a.precio <= parseFloat(precioMax));
    if (annoMin) resultado = resultado.filter((a) => a.ano >= parseInt(annoMin));
    setFiltrados(resultado);
    setPagina(1);
  }, [marca, modelo, precioMax, annoMin, autos]);

  const limpiarFiltros = () => { setMarca(""); setModelo(""); setPrecioMax(""); setAnnoMin(""); };

  const totalPaginas = Math.ceil(filtrados.length / POR_PAGINA);
  const paginados = filtrados.slice((pagina - 1) * POR_PAGINA, pagina * POR_PAGINA);

  const inputStyle = {
    background: "rgba(255,255,255,0.06)",
    border: "0.5px solid rgba(255,255,255,0.12)",
    borderRadius: 8,
    padding: "8px 12px",
    color: "#fff",
    fontSize: 13,
    outline: "none",
    width: "100%"
  };

  const btnPaginaStyle = (activo) => ({
    background: activo ? "#ff4500" : "rgba(255,255,255,0.06)",
    color: activo ? "#fff" : "rgba(255,255,255,0.5)",
    border: activo ? "none" : "0.5px solid rgba(255,255,255,0.12)",
    borderRadius: 8,
    padding: "7px 13px",
    fontSize: 13,
    cursor: activo ? "default" : "pointer",
    fontWeight: activo ? 500 : 400,
  });

  const btnNavStyle = (disabled) => ({
    background: "rgba(255,255,255,0.06)",
    color: disabled ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.7)",
    border: "0.5px solid rgba(255,255,255,0.12)",
    borderRadius: 8,
    padding: "7px 14px",
    fontSize: 13,
    cursor: disabled ? "default" : "pointer",
  });

  return (
    <main style={{ background: "#0d1520", minHeight: "100vh", padding: "32px 24px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <h1 style={{ color: "#fff", fontSize: 24, fontWeight: 500 }}>Autos disponibles</h1>
          <Link href="/publicar" style={{
            background: "#ff4500", color: "#fff", padding: "8px 18px",
            borderRadius: 8, fontSize: 14, fontWeight: 500, textDecoration: "none"
          }}>
            Publicar auto
          </Link>
        </div>

        {/* FILTROS */}
        <div style={{
          background: "#111c2b",
          border: "0.5px solid rgba(255,255,255,0.07)",
          borderRadius: 12,
          padding: "16px 20px",
          marginBottom: 24,
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          alignItems: "flex-end"
        }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 140 }}>
            <label style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Marca</label>
            <input value={marca} onChange={(e) => setMarca(e.target.value)} placeholder="Ej: Toyota" style={inputStyle} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 140 }}>
            <label style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Modelo</label>
            <input value={modelo} onChange={(e) => setModelo(e.target.value)} placeholder="Ej: Hilux" style={inputStyle} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 140 }}>
            <label style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Precio maximo (USD)</label>
            <input value={precioMax} onChange={(e) => setPrecioMax(e.target.value)} placeholder="Ej: 20000" type="number" style={inputStyle} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6, minWidth: 120 }}>
            <label style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Año minimo</label>
            <input value={annoMin} onChange={(e) => setAnnoMin(e.target.value)} placeholder="Ej: 2018" type="number" style={inputStyle} />
          </div>
          <button onClick={limpiarFiltros} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.3)", fontSize: 13, cursor: "pointer", paddingBottom: 2 }}>
            Limpiar
          </button>
          <span style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, paddingBottom: 2 }}>
            {filtrados.length} resultado{filtrados.length !== 1 ? "s" : ""}
          </span>
        </div>

        {filtrados.length === 0 && (
          <p style={{ color: "rgba(255,255,255,0.4)", textAlign: "center", marginTop: 48 }}>
            No hay autos que coincidan con la busqueda.
          </p>
        )}

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
          {paginados.map((auto) => (
            <div key={auto.id} style={{
              background: "#131e2e",
              border: "0.5px solid rgba(255,255,255,0.07)",
              borderRadius: 12,
              overflow: "hidden"
            }}>
              {auto.foto_url ? (
                <img src={auto.foto_url} alt={auto.marca + " " + auto.modelo} style={{ width: "100%", height: 180, objectFit: "cover" }} />
              ) : (
                <div style={{ width: "100%", height: 180, background: "#1a2740", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.15)", fontSize: 13 }}>
                  Sin foto
                </div>
              )}
              <div style={{ padding: "14px 16px" }}>
                <h2 style={{ color: "#fff", fontSize: 16, fontWeight: 500, marginBottom: 4 }}>
                  {auto.marca} {auto.modelo}
                </h2>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, marginBottom: 8 }}>
                  {auto.ano} · {auto.kilometros?.toLocaleString()} km
                </p>
                <p style={{ color: "#ff6b35", fontSize: 18, fontWeight: 500, marginBottom: 12 }}>
                  USD {auto.precio?.toLocaleString()}
                </p>
                <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, marginBottom: 12, lineHeight: 1.5, minHeight: 36 }}>
                  {auto.descripcion ? (auto.descripcion.length > 80 ? auto.descripcion.slice(0, 80) + "..." : auto.descripcion) : ""}
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <a href={`/autos/${auto.marca}-${auto.modelo}-${auto.ano}-${auto.id}`.toLowerCase().replace(/\s+/g, "-")}
                    style={{
                      display: "block", textAlign: "center",
                      background: "rgba(255,69,0,0.1)",
                      color: "#ff6b35",
                      border: "0.5px solid rgba(255,69,0,0.25)",
                      padding: "8px", borderRadius: 8, fontSize: 13, textDecoration: "none"
                    }}
                  >
                    Ver detalle
                  </a>
                  <a href={`https://wa.me/+54${auto.telefono}?text=${encodeURIComponent(`Hola, te contacto por la publicación de ${auto.marca} ${auto.modelo} (${auto.ano}) visto en autoconcordia.com.ar`)}`}
                    target="_blank"
                    style={{
                      display: "block", textAlign: "center",
                      background: "rgba(37,211,102,0.1)",
                      color: "#25d366",
                      border: "0.5px solid rgba(37,211,102,0.25)",
                      padding: "8px", borderRadius: 8, fontSize: 13, textDecoration: "none"
                    }}
                  >
                    Contactar por WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* PAGINACION */}
        {totalPaginas > 1 && (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: 8, marginTop: 32 }}>
            <button
              onClick={() => setPagina(p => p - 1)}
              disabled={pagina === 1}
              style={btnNavStyle(pagina === 1)}
            >
              ← Anterior
            </button>

            {Array.from({ length: totalPaginas }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPagina(n)}
                style={btnPaginaStyle(n === pagina)}
              >
                {n}
              </button>
            ))}

            <button
              onClick={() => setPagina(p => p + 1)}
              disabled={pagina === totalPaginas}
              style={btnNavStyle(pagina === totalPaginas)}
            >
              Siguiente →
            </button>
          </div>
        )}

      </div>
    </main>
  );
}

export default function Autos() {
  return (
    <Suspense>
      <AutosContent />
    </Suspense>
  );
}
