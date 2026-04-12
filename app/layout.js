import "./globals.css";
import BotonWA from "./components/BotonWA";
import NavBar from "./components/NavBar";


const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://autosconcordia.com.ar";
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
          padding: "24px",
          textAlign: "center",
        }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 24, flexWrap: "wrap", marginBottom: 12 }}>
            <a href="/contacto" style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, textDecoration: "none" }}>Contacto</a>
            <a href="/privacidad" style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, textDecoration: "none" }}>Politicas de privacidad</a>
            <a href="/descargo" style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, textDecoration: "none" }}>Descargo de responsabilidad</a>
            <a href="/faqs" style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, textDecoration: "none" }}>FAQ's</a>
          </div>
          <p style={{ color: "rgba(255,255,255,0.18)", fontSize: 12 }}>
            © {new Date().getFullYear()} Autos Concordia. Todos los derechos reservados.
          </p>
        </footer>
      </body>
    </html>
  );
}