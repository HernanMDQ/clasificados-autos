"use client";
import { useState } from "react";

const faqs = [
  {
    categoria: "Publicar un auto",
    items: [
      {
        p: "¿Cuánto cuesta publicar mi auto?",
        r: "La publicación es completamente gratuita para particulares. No cobramos comisión ni ningún tipo de cargo.",
      },
      {
        p: "¿Cuánto tarda en aparecer mi anuncio?",
        r: "Revisamos cada anuncio antes de publicarlo para garantizar la calidad del contenido. Generalmente estará disponible dentro de las primeras horas de enviado.",
      },
      {
        p: "¿Cuántas fotos puedo subir?",
        r: "Podés subir hasta 3 fotos por anuncio. Recomendamos incluir frente, lateral y trasera del vehículo.",
      },
      {
        p: "¿Puedo publicar más de un auto?",
        r: "Por el momento permitimos un único vehículo publicado por número de teléfono. Si querés publicar otro, el anterior debe estar dado de baja.",
      },
    ],
  },
  {
    categoria: "Comprar un auto",
    items: [
      {
        p: "¿Cómo contacto al vendedor?",
        r: "Desde la ficha de cada auto encontrás un botón para comunicarte directamente con el vendedor por WhatsApp.",
      },
      {
        p: "¿Los datos publicados son verificados?",
        r: "La información es ingresada por los propios vendedores, quienes declaran que es verídica al momento de publicar. Recomendamos verificar el estado del vehículo de manera presencial antes de concretar cualquier operación.",
      },
      {
        p: "¿Autos Concordia interviene en la compraventa?",
        r: "No. Somos un medio de contacto entre compradores y vendedores. La negociación y la operación se realizan directamente entre las partes.",
      },
    ],
  },
  {
    categoria: "Gestión de anuncios",
    items: [
      {
        p: "¿Cómo doy de baja mi anuncio?",
        r: "Podés solicitar la baja contactándonos por WhatsApp o desde la página de contacto. Lo procesamos en menos de 48 horas hábiles.",
      },
      {
        p: "¿Qué pasa si mi anuncio fue rechazado?",
        r: "Te notificamos por WhatsApp indicando el motivo. Podés corregir la información y volver a publicar.",
      },
    ],
  },
];

export default function FAQs() {
  const [abiertos, setAbiertos] = useState({});

  const toggle = (key) => setAbiertos((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <main style={{ background: "#0d1520", minHeight: "100vh", padding: "40px 24px" }}>
      <title>Preguntas frecuentes | Autos Concordia</title>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <a href="/" style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, textDecoration: "none", display: "block", marginBottom: 24 }}>
          ← Volver al inicio
        </a>

        <h1 style={{ color: "#fff", fontSize: 26, fontWeight: 500, marginBottom: 6 }}>Preguntas frecuentes</h1>
        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 14, marginBottom: 36, lineHeight: 1.6 }}>
          Encontrá respuestas a las consultas más comunes sobre el portal.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {faqs.map((cat) => (
            <div key={cat.categoria}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
                <div style={{ width: 4, height: 20, background: "#ff4500", borderRadius: 2 }} />
                <h2 style={{ color: "#fff", fontSize: 16, fontWeight: 500 }}>{cat.categoria}</h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {cat.items.map((faq, i) => {
                  const key = `${cat.categoria}-${i}`;
                  const abierto = abiertos[key];
                  return (
                    <div
                      key={i}
                      style={{
                        background: "#111c2b",
                        border: "0.5px solid rgba(255,255,255,0.07)",
                        borderRadius: 10,
                        overflow: "hidden",
                      }}
                    >
                      <button
                        onClick={() => toggle(key)}
                        style={{
                          width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                          padding: "14px 18px", background: "none", border: "none", cursor: "pointer", textAlign: "left", gap: 12,
                        }}
                      >
                        <span style={{ color: "#fff", fontSize: 14, fontWeight: 500, lineHeight: 1.4 }}>{faq.p}</span>
                        <span style={{ color: "#ff4500", fontSize: 18, flexShrink: 0, transition: "transform 0.2s", transform: abierto ? "rotate(45deg)" : "none" }}>+</span>
                      </button>
                      {abierto && (
                        <div style={{ padding: "0 18px 16px" }}>
                          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 14, lineHeight: 1.65 }}>{faq.r}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 40, background: "#111c2b", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 12, padding: "20px 24px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14 }}>¿No encontraste lo que buscabas?</p>
          <a href="/contacto" style={{ background: "#ff4500", color: "#fff", padding: "9px 20px", borderRadius: 8, fontSize: 14, fontWeight: 500, textDecoration: "none" }}>
            Contactanos
          </a>
        </div>
      </div>
    </main>
  );
}
