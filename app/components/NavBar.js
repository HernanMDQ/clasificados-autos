"use client";
import { useState } from "react";

export default function NavBar() {
  const [abierto, setAbierto] = useState(false);

  return (
    <div style={{ position: "sticky", top: 0, zIndex: 50 }}>
      <nav style={{
        background: "#0d1520",
        borderBottom: "0.5px solid rgba(255,255,255,0.08)",
        padding: "14px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "relative",
      }}>
        <a href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <img
            src="https://vxqcaybsjnrhyfdlmytg.supabase.co/storage/v1/object/public/assets/logo-ac-white.png"
            alt="Autos Concordia"
            style={{ height: 36, width: "auto", objectFit: "contain" }}
          />
        </a>

        {/* Desktop */}
        <div className="nav-desktop" style={{ gap: 24, alignItems: "center" }}>
          <a href="/" style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, textDecoration: "none" }}>Buscar</a>
          <a href="/autos" style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, textDecoration: "none" }}>Listado</a>
          <a href="https://www.instagram.com/autosconcordiacomar/" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.4)", display: "flex", alignItems: "center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none"/>
            </svg>
          </a>
          <a href="https://www.facebook.com/AutosConcordia" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.4)", display: "flex", alignItems: "center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
            </svg>
          </a>
          <a href="/publicar" style={{ background: "#ff4500", color: "#fff", padding: "7px 16px", borderRadius: 8, fontSize: 14, fontWeight: 500, textDecoration: "none" }}>
            Publicar
          </a>
        </div>

        {/* Mobile */}
        <div className="nav-mobile" style={{ alignItems: "center", gap: 12 }}>
          <a href="/publicar" style={{ background: "#ff4500", color: "#fff", padding: "7px 14px", borderRadius: 8, fontSize: 13, fontWeight: 500, textDecoration: "none" }}>
            Publicar
          </a>
          <button
            onClick={() => setAbierto(!abierto)}
            style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: 5, padding: 4 }}
          >
            <span style={{ display: "block", width: 22, height: 2, background: "#fff", borderRadius: 2, transition: "0.2s", transform: abierto ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
            <span style={{ display: "block", width: 22, height: 2, background: "#fff", borderRadius: 2, transition: "0.2s", opacity: abierto ? 0 : 1 }} />
            <span style={{ display: "block", width: 22, height: 2, background: "#fff", borderRadius: 2, transition: "0.2s", transform: abierto ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
          </button>
        </div>

        {/* Dropdown mobile */}
        {abierto && (
          <div style={{
            position: "absolute", top: "100%", right: 0,
            width: 180,
            background: "#0d1520",
            border: "0.5px solid rgba(255,255,255,0.08)",
            borderTop: "none",
            borderRadius: "0 0 12px 12px",
          }}>
            {[
              { href: "/", label: "Buscar" },
              { href: "/autos", label: "Listado" },
              { href: "https://www.instagram.com/autosconcordiacomar/", label: "@instagram", externo: true },
              { href: "https://www.facebook.com/AutosConcordia", label: "@facebook", externo: true },
            ].map(({ href, label, externo }) => (
              <a
                key={href}
                href={href}
                onClick={() => setAbierto(false)}
                target={externo ? "_blank" : undefined}
                rel={externo ? "noopener noreferrer" : undefined}
                style={{ display: "block", padding: "14px 24px", color: externo ? "rgba(255,107,53,0.8)" : "rgba(255,255,255,0.7)", fontSize: 15, textDecoration: "none", borderBottom: "0.5px solid rgba(255,255,255,0.05)" }}
              >
                {label}
              </a>
            ))}
          </div>
        )}
      </nav>
    </div>
  );
}
