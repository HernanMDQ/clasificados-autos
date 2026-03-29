"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function FichaAuto() {
  const params = useParams();
  const [auto, setAuto] = useState(null);
  const [cargado, setCargado] = useState(false);
  const [popup, setPopup] = useState(false);

  useEffect(() => {
    const id = params.id.split("-").pop();
    supabase.from("autos").select("*").eq("id", id).single().then(({ data }) => {
      setAuto(data);
      setCargado(true);
    });
  }, []);

  if (!cargado) return (
    <main style={{ background: "#0d1520", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <p style={{ color: "rgba(255,255,255,0.4)" }}>Cargando...</p>
    </main>
  );

  if (!auto) return (
    <main style={{ background: "#0d1520", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#111c2b", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 32, textAlign: "center" }}>
        <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: 16 }}>Auto no encontrado.</p>
        <a href="/autos" style={{ color: "#ff6b35", fontSize: 14, textDecoration: "none" }}>Volver al listado</a>
      </div>
    </main>
  );

  const slug = `${auto.marca}-${auto.modelo}-${auto.ano}-${auto.id}`.toLowerCase().replace(/\s+/g, "-");
  const urlCompartir = `https://wa.me/?text=Mira este auto: ${auto.marca} ${auto.modelo} ${auto.ano} - USD ${auto.precio?.toLocaleString()} - ${process.env.NEXT_PUBLIC_SITE_URL}/autos/${slug}`;

  return (
    <main style={{ background: "#0d1520", minHeight: "100vh", padding: "32px 24px" }}>
      <div style={{ maxWidth: 640, margin: "0 auto" }}>
        <a href="/autos" style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, textDecoration: "none", display: "block", marginBottom: 20 }}>
          ← Volver al listado
        </a>
        <div style={{ background: "#111c2b", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 16, overflow: "hidden" }}>

          {auto.foto_url && (
            <div style={{ position: "relative", cursor: "pointer" }} onClick={() => setPopup(true)}>
              <img src={auto.foto_url} alt={auto.marca + " " + auto.modelo} style={{ width: "100%", height: 300, objectFit: "cover" }} />
              <div style={{
                position: "absolute", bottom: 10, right: 10,
                background: "rgba(0,0,0,0.5)", color: "#fff",
                fontSize: 11, padding: "4px 10px", borderRadius: 6
              }}>
                Ver foto completa
              </div>
            </div>
          )}

          <div style={{ padding: "24px 28px" }}>
            <h1 style={{ color: "#fff", fontSize: 26, fontWeight: 500, marginBottom: 8 }}>
              {auto.marca} {auto.modelo}
            </h1>
            <p style={{ color: "#ff6b35", fontSize: 24, fontWeight: 500, marginBottom: 20 }}>
              USD {auto.precio?.toLocaleString()}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
              {[
                { label: "Año", value: auto.ano },
                { label: "Kilometros", value: auto.kilometros?.toLocaleString() + " km" },
              ].map((item, i) => (
                <div key={i} style={{ background: "rgba(255,255,255,0.04)", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 10, padding: "12px 16px" }}>
                  <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, marginBottom: 4 }}>{item.label}</p>
                  <p style={{ color: "#fff", fontSize: 15, fontWeight: 500 }}>{item.value}</p>
                </div>
              ))}
            </div>
            {auto.descripcion && (
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
                {auto.descripcion}
              </p>
            )}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              
                <a href={"https://wa.me/+54" + auto.telefono}
                target="_blank"
                style={{ display: "block", textAlign: "center", background: "rgba(37,211,102,0.12)", color: "#25d366", border: "0.5px solid rgba(37,211,102,0.25)", padding: "12px", borderRadius: 10, fontSize: 14, fontWeight: 500, textDecoration: "none" }}
              >
                Contactar por WhatsApp
              </a>
              
                <a href={urlCompartir}
                target="_blank"
                style={{ display: "block", textAlign: "center", background: "rgba(255,69,0,0.08)", color: "#ff6b35", border: "0.5px solid rgba(255,69,0,0.2)", padding: "12px", borderRadius: 10, fontSize: 14, textDecoration: "none" }}
              >
                Compartir este auto
              </a>
            </div>
          </div>
        </div>
      </div>

      {popup && (
        <div
          onClick={() => setPopup(false)}
          style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.92)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, cursor: "zoom-out", padding: 24 }}
        >
          <img src={auto.foto_url} alt="foto completa" style={{ maxWidth: "100%", maxHeight: "90vh", objectFit: "contain", borderRadius: 8 }} />
          <button
            onClick={() => setPopup(false)}
            style={{ position: "fixed", top: 20, right: 24, background: "rgba(255,255,255,0.1)", border: "none", color: "#fff", fontSize: 20, width: 36, height: 36, borderRadius: "50%", cursor: "pointer" }}
          >
            ✕
          </button>
        </div>
      )}
    </main>
  );
}