import "./globals.css";
import BotonWA from "./components/BotonWA";

export const metadata = {
  title: "Autos Concordia",
  description: "Encontra tu proximo auto en Concordia con inteligencia artificial",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="overflow-x-hidden">
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
          <a href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}>
            <div style={{
              width: 36, height: 36,
              background: "#ff4500",
              borderRadius: 8,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 18
            }}>🚗</div>
            <span style={{ color: "#fff", fontSize: 17, fontWeight: 500 }}>
              Autos <span style={{ color: "#ff6b35" }}>Concordia</span>
            </span>
          </a>
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <a href="/" style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, textDecoration: "none" }}>
              Buscar
            </a>
            <a href="/autos" style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, textDecoration: "none" }}>
              Autos
            </a>
            <a href="/publicar" style={{
              background: "#ff4500",
              color: "#fff",
              padding: "7px 16px",
              borderRadius: 8,
              fontSize: 14,
              fontWeight: 500,
              textDecoration: "none"
            }}>
              Publicar
            </a>
          </div>
        </nav>
                {children}
        <BotonWA />
        <footer style={{
          background: "#0a1118",
          borderTop: "0.5px solid rgba(255,255,255,0.07)",
          padding: "24px",
          textAlign: "center",
        }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap", marginBottom: 12 }}>
            <a href="/contacto" style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, textDecoration: "none" }}>
              Contacto
            </a>
            <a href="/privacidad" style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, textDecoration: "none" }}>
              Politicas de privacidad
            </a>
            <a href="/descargo" style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, textDecoration: "none" }}>
              Descargo de responsabilidad
            </a>
          </div>
          <p style={{ color: "rgba(255,255,255,0.18)", fontSize: 12 }}>
            © {new Date().getFullYear()} Autos Concordia. Todos los derechos reservados.
          </p>
        </footer>
      </body>
    </html>
  );
}