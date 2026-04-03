export default function NotFound() {
  return (
    <div style={{
      minHeight: "calc(100vh - 65px)",
      background: "#0d1520",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      padding: "40px 24px",
      textAlign: "center",
    }}>
      {/* Logo */}
      <a href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", marginBottom: 40 }}>
        <div style={{
          width: 52, height: 52,
          background: "#ff4500",
          borderRadius: 12,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 26,
        }}>🚗</div>
        <span style={{ color: "#fff", fontSize: 22, fontWeight: 500 }}>
          Autos <span style={{ color: "#ff6b35" }}>Concordia</span>
        </span>
      </a>

      {/* 404 */}
      <div style={{
        fontSize: "clamp(80px, 20vw, 160px)",
        fontWeight: 800,
        lineHeight: 1,
        background: "linear-gradient(135deg, #ff4500 0%, #ff6b35 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        marginBottom: 16,
      }}>
        404
      </div>

      <h1 style={{ color: "#fff", fontSize: 22, fontWeight: 600, margin: "0 0 10px" }}>
        Página no encontrada
      </h1>
      <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 15, maxWidth: 360, margin: "0 0 36px" }}>
        La dirección que ingresaste no existe o el auto que buscabas ya no está disponible.
      </p>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        <a href="/" style={{
          background: "#ff4500",
          color: "#fff",
          padding: "10px 24px",
          borderRadius: 8,
          fontSize: 14,
          fontWeight: 500,
          textDecoration: "none",
        }}>
          Volver al inicio
        </a>
        <a href="/autos" style={{
          background: "rgba(255,255,255,0.07)",
          color: "rgba(255,255,255,0.8)",
          padding: "10px 24px",
          borderRadius: 8,
          fontSize: 14,
          fontWeight: 500,
          textDecoration: "none",
          border: "1px solid rgba(255,255,255,0.1)",
        }}>
          Ver autos
        </a>
      </div>
    </div>
  );
}
