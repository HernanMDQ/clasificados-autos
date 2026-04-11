"use client";
import { useState } from "react";

export default function BotonWA() {
  const [hover, setHover] = useState(false);

  return (
    
      <a href="https://wa.me/543454045864"
      target="_blank"
      style={{ position: "fixed", bottom: 24, right: 24, zIndex: 50, display: "flex", alignItems: "center", gap: 8, textDecoration: "none" }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span style={{
        background: "#fff", color: "#25d366",
        fontSize: 13, fontWeight: 500,
        padding: "5px 12px", borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
        opacity: hover ? 1 : 0,
        transition: "opacity 0.2s",
        whiteSpace: "nowrap"
      }}>
        Soporte humano
      </span>
      <div style={{
        background: "#25d366", borderRadius: "50%",
        width: 52, height: 52,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 22, boxShadow: "0 2px 12px rgba(0,0,0,0.3)"
      }}>💬</div>
    </a>
  );
}