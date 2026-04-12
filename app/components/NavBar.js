"use client";
import { useState } from "react";

export default function NavBar() {
  const [abierto, setAbierto] = useState(false);

  return (
    <>
      <nav style={{
        background: "#0d1520",
        borderBottom: "0.5px solid rgba(255,255,255,0.08)",
        padding: "14px 24px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}>
        <a href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
          <img
            src="https://vxqcaybsjnrhyfdlmytg.supabase.co/storage/v1/object/public/assets/logo-ac-white.png"
            alt="Autos Concordia"
            className="logo-desktop"
            style={{ height: 36, width: "auto", objectFit: "contain" }}
          />
          <img
            src="https://vxqcaybsjnrhyfdlmytg.supabase.co/storage/v1/object/public/assets/LOGO%20AUTO%20OSCURO.png"
            alt="Autos Concordia"
            className="logo-mobile"
            style={{ height: 36, width: "auto", objectFit: "contain" }}
          />
        </a>

        {/* Desktop */}
        <div className="nav-desktop" style={{ display: "flex", gap: 24, alignItems: "center" }}>
          <a href="/" style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, textDecoration: "none" }}>Buscar</a>
          <a href="/autos" style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, textDecoration: "none" }}>Listado</a>
          <a href="/publicar" style={{ background: "#ff4500", color: "#fff", padding: "7px 16px", borderRadius: 8, fontSize: 14, fontWeight: 500, textDecoration: "none" }}>
            Publicar
          </a>
        </div>

        {/* Mobile */}
        <div className="nav-mobile" style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <a href="/publicar" style={{ background: "#ff4500", color: "#fff", padding: "7px 14px", borderRadius: 8, fontSize: 13, fontWeight: 500, textDecoration: "none" }}>
            Publicar
          </a>
          <button
            onClick={() => setAbierto(!abierto)}
            style={{ background: "none", border: "none", cursor: "pointer", display: "flex", flexDirection: "column", gap: 5, padding: 4 }}
          >
            <span style={{ display: "block", width: 22, height: 2, background: abierto ? "rgba(255,255,255,0.3)" : "#fff", borderRadius: 2, transition: "0.2s", transform: abierto ? "rotate(45deg) translate(5px, 5px)" : "none" }} />
            <span style={{ display: "block", width: 22, height: 2, background: "#fff", borderRadius: 2, transition: "0.2s", opacity: abierto ? 0 : 1 }} />
            <span style={{ display: "block", width: 22, height: 2, background: abierto ? "rgba(255,255,255,0.3)" : "#fff", borderRadius: 2, transition: "0.2s", transform: abierto ? "rotate(-45deg) translate(5px, -5px)" : "none" }} />
          </button>
        </div>
      </nav>

      {/* Dropdown mobile */}
      {abierto && (
        <div className="nav-mobile" style={{
          position: "fixed", top: 65, left: 0, right: 0, zIndex: 49,
          background: "#0d1520",
          borderBottom: "0.5px solid rgba(255,255,255,0.08)",
          padding: "8px 0",
        }}>
          {[
            { href: "/", label: "Buscar" },
            { href: "/autos", label: "Listado" },
          ].map(({ href, label }) => (
            <a
              key={href}
              href={href}
              onClick={() => setAbierto(false)}
              style={{ display: "block", padding: "14px 24px", color: "rgba(255,255,255,0.7)", fontSize: 15, textDecoration: "none", borderBottom: "0.5px solid rgba(255,255,255,0.05)" }}
            >
              {label}
            </a>
          ))}
        </div>
      )}
    </>
  );
}
