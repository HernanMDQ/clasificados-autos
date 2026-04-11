"use client";
import { useState } from "react";

const WA_NUMBER = "+543454045864";

export default function Contacto() {
  const [form, setForm] = useState({ nombre: "", email: "", asunto: "", mensaje: "" });
  const [loading, setLoading] = useState(false);
  const [exito, setExito] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorMsg("");
  };

  const handleSubmit = async () => {
    if (!form.nombre || !form.email || !form.asunto || !form.mensaje) {
      setErrorMsg("Por favor completá todos los campos.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/contacto", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error);
      setExito(true);
    } catch (err) {
      setErrorMsg("Error al enviar: " + err.message);
    }
    setLoading(false);
  };

  const inputStyle = {
    width: "100%",
    background: "rgba(255,255,255,0.06)",
    border: "0.5px solid rgba(255,255,255,0.12)",
    borderRadius: 8,
    padding: "10px 14px",
    color: "#fff",
    fontSize: 14,
    outline: "none",
    boxSizing: "border-box",
  };

  const labelStyle = {
    color: "rgba(255,255,255,0.4)",
    fontSize: 12,
    marginBottom: 6,
    display: "block",
  };

  return (
    <main style={{ background: "#0d1520", minHeight: "100vh", padding: "40px 24px" }}>
      <title>Contacto | Autos Concordia</title>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <a href="/" style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, textDecoration: "none", display: "block", marginBottom: 24 }}>
          ← Volver al inicio
        </a>

        <h1 style={{ color: "#fff", fontSize: 26, fontWeight: 500, marginBottom: 6 }}>Contacto</h1>
        <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 14, marginBottom: 32, lineHeight: 1.6 }}>
          Podés escribirnos por el formulario o contactarnos directamente por WhatsApp.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>

          {/* FORMULARIO */}
          <div style={{ background: "#111c2b", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "28px 24px" }}>
            <h2 style={{ color: "#fff", fontSize: 17, fontWeight: 500, marginBottom: 20 }}>Envianos un mensaje</h2>

            {exito ? (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <div style={{ fontSize: 40, marginBottom: 12 }}>✅</div>
                <p style={{ color: "#fff", fontSize: 16, fontWeight: 500, marginBottom: 8 }}>Mensaje enviado</p>
                <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>Te respondemos a la brevedad.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <label style={labelStyle}>Nombre</label>
                  <input name="nombre" value={form.nombre} onChange={handleChange} placeholder="Tu nombre" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="tu@email.com" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Asunto</label>
                  <input name="asunto" value={form.asunto} onChange={handleChange} placeholder="¿En qué te podemos ayudar?" style={inputStyle} />
                </div>
                <div>
                  <label style={labelStyle}>Mensaje</label>
                  <textarea name="mensaje" value={form.mensaje} onChange={handleChange} placeholder="Escribí tu consulta..." rows={5} style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }} />
                </div>
                {errorMsg && (
                  <div style={{ background: "rgba(255,69,0,0.1)", border: "0.5px solid rgba(255,69,0,0.3)", borderRadius: 8, padding: "10px 14px", color: "#ff6b35", fontSize: 13 }}>
                    {errorMsg}
                  </div>
                )}
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  style={{ background: loading ? "rgba(255,69,0,0.5)" : "#ff4500", color: "#fff", padding: "11px", borderRadius: 8, fontSize: 14, fontWeight: 500, border: "none", cursor: loading ? "not-allowed" : "pointer" }}
                >
                  {loading ? "Enviando..." : "Enviar mensaje"}
                </button>
              </div>
            )}
          </div>

          {/* CONTACTO DIRECTO */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div style={{ background: "#111c2b", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "28px 24px" }}>
              <h2 style={{ color: "#fff", fontSize: 17, fontWeight: 500, marginBottom: 20 }}>Contacto directo</h2>
              <a
                href={`https://wa.me/${WA_NUMBER.replace(/\D/g, "")}`}
                target="_blank"
                style={{ display: "flex", alignItems: "center", gap: 16, textDecoration: "none", background: "rgba(37,211,102,0.08)", border: "0.5px solid rgba(37,211,102,0.2)", borderRadius: 12, padding: "18px 20px" }}
              >
                <div style={{ width: 48, height: 48, background: "#25d366", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, flexShrink: 0 }}>
                  💬
                </div>
                <div>
                  <p style={{ color: "#25d366", fontSize: 15, fontWeight: 600, marginBottom: 2 }}>WhatsApp</p>
                  <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13 }}>{WA_NUMBER}</p>
                  <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 12, marginTop: 4 }}>Respondemos en horario comercial</p>
                </div>
              </a>
            </div>

            <div style={{ background: "#111c2b", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "24px" }}>
              <h3 style={{ color: "#fff", fontSize: 15, fontWeight: 500, marginBottom: 16 }}>Preguntas frecuentes</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {[
                  { p: "¿Cuánto cuesta publicar mi auto?", r: "La publicación es completamente gratuita para particulares." },
                  { p: "¿Cuánto tarda en aparecer mi anuncio?", r: "Revisamos cada anuncio antes de publicarlo. Suele estar disponible en pocas horas." },
                  { p: "¿Cómo contacto al vendedor?", r: "Desde la ficha de cada auto encontrás un botón para comunicarte directamente por WhatsApp." },
                ].map((faq, i) => (
                  <div key={i}>
                    <p style={{ color: "rgba(255,255,255,0.75)", fontSize: 13, fontWeight: 500, marginBottom: 3 }}>{faq.p}</p>
                    <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, lineHeight: 1.5 }}>{faq.r}</p>
                  </div>
                ))}
              </div>
              <a href="/faqs" style={{ display: "inline-block", marginTop: 16, color: "#ff6b35", fontSize: 13, textDecoration: "none" }}>
                Ver todas las preguntas frecuentes →
              </a>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
