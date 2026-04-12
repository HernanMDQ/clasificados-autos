import "./globals.css";
import BotonWA from "./components/BotonWA";

const LOGO_ICONO = "https://vxqcaybsjnrhyfdlmytg.supabase.co/storage/v1/object/public/assets/LOGO%20AUTO%20OSCURO.png";
const LOGO_COMPLETO = "https://vxqcaybsjnrhyfdlmytg.supabase.co/storage/v1/object/public/assets/logo-ac-white.png";

export const metadata = {
  title: "Autos Concordia",
  description: "Encontra tu proximo auto en Concordia con inteligencia artificial",
  icons: {
    icon: LOGO_ICONO,
    apple: LOGO_ICONO,
  },
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
          <a href="/" style={{ display: "flex", alignItems: "center", textDecoration: "none" }}>
            <img
              src={LOGO_COMPLETO}
              alt="Autos Concordia"
              className="logo-desktop"
              style={{ height: 36, width: "auto", objectFit: "contain" }}
            />
            <img
              src={LOGO_ICONO}
              alt="Autos Concordia"
              className="logo-mobile"
              style={{ height: 36, width: "auto", objectFit: "contain" }}
            />
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
            <a href="/faqs" style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, textDecoration: "none" }}>
              Preguntas frecuentes
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