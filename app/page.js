"use client";
import { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

export default function Home() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hola! Soy tu asistente de autos. Que tipo de auto estas buscando?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatContainerRef = useRef(null);
  const chatBoxRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (messages.length > 1 && chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    inputRef.current?.blur();
    chatBoxRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    const userMessage = { role: "user", text: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: input,
        historial: updatedMessages.map((m) => ({
          role: m.role === "user" ? "user" : "assistant",
          content: m.text
        }))
      }),
    });
    const data = await res.json();
    setMessages((prev) => [...prev, { role: "assistant", text: data.reply }]);
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <main style={{ background: "#0d1520", minHeight: "100vh" }}>

      {/* HERO */}
      <section style={{
        background: "#111c2b",
        padding: "52px 24px 44px",
        textAlign: "center",
        borderBottom: "0.5px solid rgba(255,255,255,0.06)"
      }}>
        <div style={{
          display: "inline-block",
          background: "rgba(255,69,0,0.12)",
          color: "#ff6b35",
          border: "0.5px solid rgba(255,69,0,0.3)",
          padding: "4px 14px",
          borderRadius: 99,
          fontSize: 12,
          marginBottom: 20
        }}>
          Busqueda con inteligencia artificial
        </div>
        <h1 style={{ color: "#fff", fontSize: 30, fontWeight: 500, lineHeight: 1.25, marginBottom: 12, letterSpacing: -0.5 }}>
          Encontra tu proximo auto<br />en <span style={{ color: "#ff4500" }}>Concordia</span>
        </h1>
        <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, marginBottom: 28, maxWidth: 400, margin: "0 auto 28px", lineHeight: 1.65 }}>
          Compradores y vendedores de Concordia y Entre Ríos en un solo lugar, potenciado con inteligencia artificial. Sin comisiones, sin intermediarios.
        </p>

        {/* CHAT */}
        <div ref={chatBoxRef} style={{
          background: "rgba(255,255,255,0.03)",
          border: "0.5px solid rgba(255,255,255,0.09)",
          borderRadius: 14,
          padding: 20,
          maxWidth: 580,
          margin: "0 auto",
          textAlign: "left"
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>Asistente IA</span>
            <button
              onClick={() => setMessages([{ role: "assistant", text: "Hola! Soy tu asistente de autos. Que tipo de auto estas buscando?" }])}
              style={{ color: "rgba(255,255,255,0.3)", fontSize: 12, background: "none", border: "none", cursor: "pointer" }}
            >
              Nueva conversacion
            </button>
          </div>
          <div ref={chatContainerRef} style={{ height: 280, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: "flex", justifyContent: msg.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  background: msg.role === "user" ? "#ff4500" : "rgba(30,58,79,0.6)",
                  border: msg.role === "user" ? "none" : "0.5px solid rgba(255,255,255,0.08)",
                  color: "#fff",
                  padding: "9px 13px",
                  borderRadius: msg.role === "user" ? "12px 12px 4px 12px" : "12px 12px 12px 4px",
                  fontSize: 15,
                  maxWidth: "80%",
                  lineHeight: 1.5
                }}>
                  <ReactMarkdown
  components={{
    a: ({ href, children }) => (
      <a href={href} style={{ color: "#ff6b35", textDecoration: "underline" }} target="_blank">
        {children}
      </a>
    )
  }}
>
  {msg.text}
</ReactMarkdown>
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div style={{ background: "rgba(30,58,79,0.6)", color: "rgba(255,255,255,0.5)", padding: "9px 13px", borderRadius: "12px 12px 12px 4px", fontSize: 13 }}>
                  Escribiendo...
                </div>
              </div>
            )}
          </div>
          <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ej: busco una pickup hasta $20.000..."
              style={{
                flex: 1,
                background: "rgba(255,255,255,0.06)",
                border: "0.5px solid rgba(255,255,255,0.12)",
                borderRadius: 8,
                padding: "9px 12px",
                color: "#fff",
                fontSize: 13,
                outline: "none"
              }}
            />
            <button
              onClick={sendMessage}
              style={{ background: "#ff4500", color: "#fff", borderRadius: 8, padding: "9px 16px", fontSize: 13, fontWeight: 500, border: "none", cursor: "pointer" }}
            >
              Enviar
            </button>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 12, flexWrap: "wrap", marginTop: 24 }}>
          <a href="/autos" style={{ background: "#ff4500", color: "#fff", padding: "10px 22px", borderRadius: 10, fontSize: 14, fontWeight: 500, textDecoration: "none" }}>
            Ver todos los autos
          </a>
          <a href="/publicar" style={{ background: "rgba(255,255,255,0.06)", color: "rgba(255,255,255,0.8)", padding: "10px 22px", borderRadius: 10, fontSize: 14, border: "0.5px solid rgba(255,255,255,0.12)", textDecoration: "none" }}>
            Publicar mi auto
          </a>
        </div>

      </section>
      {/* ULTIMOS AUTOS *
      {ultimosAutos.length > 0 && (
        <section style={{ padding: "0 24px 36px", background: "#0d1520" }}>
          <div style={{ maxWidth: 720, margin: "0 auto" }}>
            <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 11, textTransform: "uppercase", letterSpacing: 1, marginBottom: 16, textAlign: "center" }}>
              Ultimos anuncios
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
              {ultimosAutos.map((auto) => (
                
                  <a key={auto.id}
                   href={`/autos/${auto.marca}-${auto.modelo}-${auto.ano}-${auto.id}`.toLowerCase().replace(/\s+/g, "-")}
                  style={{ textDecoration: "none" }}
                >
                  <div style={{ background: "#131e2e", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 12, overflow: "hidden" }}>
                    {auto.foto_url ? (
                      <img src={auto.foto_url} alt={auto.marca + " " + auto.modelo} style={{ width: "100%", height: 90, objectFit: "cover" }} />
                    ) : (
                      <div style={{ width: "100%", height: 90, background: "#1a2740", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.15)", fontSize: 11 }}>
                        Sin foto
                      </div>
                    )}
                    <div style={{ padding: "10px 12px" }}>
                      <p style={{ color: "#fff", fontSize: 13, fontWeight: 500, marginBottom: 3 }}>{auto.marca} {auto.modelo}</p>
                      <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 11, marginBottom: 6 }}>{auto.ano} · {auto.kilometros?.toLocaleString()} km</p>
                      <p style={{ color: "#ff6b35", fontSize: 14, fontWeight: 500 }}>USD {auto.precio?.toLocaleString()}</p>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>
      )}
      /}
      
      {/* COMO FUNCIONA */}
      <section style={{ padding: "36px 24px", background: "#0d1520" }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, textTransform: "uppercase", letterSpacing: 1, marginBottom: 16, textAlign: "center" }}>
            Como funciona
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
            {[
              { icon: "🔍", title: "Busca con IA", desc: "Contanos que auto necesitas en lenguaje natural" },
              { icon: "📋", title: "Explora el listado", desc: "Filtra por marca, precio y año facilmente" },
              { icon: "💬", title: "Contacta por WhatsApp", desc: "Conectate con el vendedor con un clic" },
            ].map((item, i) => (
              <div key={i} style={{
                background: "#111c2b",
                border: "0.5px solid rgba(255,255,255,0.07)",
                borderRadius: 12,
                padding: "16px 14px",
                textAlign: "center"
              }}>
                <div style={{ fontSize: 24, marginBottom: 10 }}>{item.icon}</div>
                <div style={{ color: "#fff", fontSize: 15, fontWeight: 500, marginBottom: 6 }}>{item.title}</div>
                <div style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, lineHeight: 1.5 }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}