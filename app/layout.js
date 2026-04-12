import "./globals.css";
import BotonWA from "./components/BotonWA";
import NavBar from "./components/NavBar";

const LOGO_ICONO = "https://vxqcaybsjnrhyfdlmytg.supabase.co/storage/v1/object/public/assets/LOGO%20AUTO%20OSCURO.png";

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
        <NavBar />
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