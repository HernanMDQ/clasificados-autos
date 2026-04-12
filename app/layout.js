import "./globals.css";
import BotonWA from "./components/BotonWA";
import NavBar from "./components/NavBar";


const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://autoconcordia.com.ar";
const OG_IMAGE = "https://vxqcaybsjnrhyfdlmytg.supabase.co/storage/v1/object/public/assets/logo-ac-white.png";

export const metadata = {
  title: "Autos Concordia | Venta de usados y compras con IA",
  description: "Encontra tu proximo auto o publicalo gratis para Concordia y la región",
  openGraph: {
    title: "Autos Concordia | Venta de usados y compras con IA",
    description: "Encontra tu proximo auto o publicalo gratis para Concordia y la región",
    url: SITE_URL,
    siteName: "Autos Concordia",
    images: [{ url: OG_IMAGE, width: 500, height: 500, alt: "Autos Concordia" }],
    locale: "es_AR",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Autos Concordia | Venta de usados y compras con IA",
    description: "Encontra tu proximo auto o publicalo gratis para Concordia y la región",
    images: [OG_IMAGE],
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
          padding: "32px 24px 24px",
        }}>
          <div style={{
            maxWidth: 640,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 24,
            marginBottom: 24,
          }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 11, textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>Legal</p>
              <a href="/privacidad" style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, textDecoration: "none" }}>Politicas de privacidad</a>
              <a href="/descargo" style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, textDecoration: "none" }}>Descargo de responsabilidad</a>
              <a href="/faqs" style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, textDecoration: "none" }}>Preguntas frecuentes</a>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <p style={{ color: "rgba(255,255,255,0.2)", fontSize: 11, textTransform: "uppercase", letterSpacing: 1, marginBottom: 2 }}>Contacto y redes</p>
              <a href="/contacto" style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, textDecoration: "none" }}>Contacto</a>
              <a href="https://www.instagram.com/autosconcordiacomar/" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, textDecoration: "none" }}>Instagram</a>
              <a href="https://www.facebook.com/AutosConcordia" target="_blank" rel="noopener noreferrer" style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, textDecoration: "none" }}>Facebook</a>
            </div>
          </div>
          <p style={{ color: "rgba(255,255,255,0.18)", fontSize: 12, textAlign: "center" }}>
            © {new Date().getFullYear()} Autos Concordia. Todos los derechos reservados.
          </p>
        </footer>
      </body>
    </html>
  );
}