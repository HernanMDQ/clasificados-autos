import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export const revalidate = 3600;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://autosconcordia.com.ar";

function capitalizar(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

export async function generateStaticParams() {
  const { data } = await supabase
    .from("autos")
    .select("marca")
    .eq("estado", "aprobado");

  const marcas = [...new Set((data || []).map((a) => a.marca.toLowerCase().replace(/\s+/g, "-")))];
  return marcas.map((marca) => ({ marca }));
}

export async function generateMetadata({ params }) {
  const { marca } = await params;
  const marcaDisplay = capitalizar(marca.replace(/-/g, " "));

  return {
    title: `${marcaDisplay} usados en Concordia, Entre Ríos | Autos Concordia`,
    description: `Encontrá vehículos ${marcaDisplay} usados en venta en Concordia y la región de Entre Ríos. Autos, camionetas y SUV ${marcaDisplay} con los mejores precios. Publicá gratis tu anuncio.`,
    openGraph: {
      title: `${marcaDisplay} usados en Concordia, Entre Ríos`,
      description: `Comprá o vendé vehículos ${marcaDisplay} usados en Concordia, Entre Ríos. Los mejores precios de la región.`,
      url: `${SITE_URL}/autos/marcas/${marca}`,
      siteName: "Autos Concordia",
      locale: "es_AR",
      type: "website",
    },
  };
}

export default async function MarcaPage({ params }) {
  const { marca } = await params;
  const marcaDisplay = capitalizar(marca.replace(/-/g, " "));

  const { data: autos } = await supabase
    .from("autos")
    .select("*")
    .eq("estado", "aprobado")
    .ilike("marca", marca.replace(/-/g, " "))
    .order("created_at", { ascending: false });

  const lista = autos || [];

  return (
    <main style={{ background: "#0d1520", minHeight: "100vh", padding: "32px 24px" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>

        <Link href="/autos" style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, textDecoration: "none", display: "block", marginBottom: 24 }}>
          ← Volver al listado
        </Link>

        {/* SEO HEADER */}
        <div style={{ marginBottom: 32 }}>
          <h1 style={{ color: "#fff", fontSize: 28, fontWeight: 500, marginBottom: 12, letterSpacing: -0.5 }}>
            {marcaDisplay} usados en{" "}
            <span style={{ color: "#ff4500" }}>Concordia</span>
            , Entre Ríos
          </h1>
          <p style={{ color: "rgba(255,255,255,0.45)", fontSize: 14, lineHeight: 1.7, maxWidth: 680 }}>
            Explorá {lista.length > 0 ? `los ${lista.length} vehículo${lista.length !== 1 ? "s" : ""} ${marcaDisplay}` : `los vehículos ${marcaDisplay}`} disponibles en Concordia y la región de Entre Ríos.
            Encontrá autos, camionetas y SUV {marcaDisplay} usados con los mejores precios.
            Vendedores particulares, sin intermediarios.{" "}
            <Link href="/publicar" style={{ color: "#ff6b35", textDecoration: "none" }}>
              Publicá gratis tu {marcaDisplay}.
            </Link>
          </p>
        </div>

        {lista.length === 0 ? (
          <div style={{
            background: "#111c2b",
            border: "0.5px solid rgba(255,255,255,0.07)",
            borderRadius: 16,
            padding: "48px 32px",
            textAlign: "center"
          }}>
            <p style={{ color: "rgba(255,255,255,0.4)", marginBottom: 16 }}>
              No hay vehículos {marcaDisplay} disponibles en este momento.
            </p>
            <Link href="/publicar" style={{
              background: "#ff4500", color: "#fff", padding: "10px 24px",
              borderRadius: 8, fontSize: 14, fontWeight: 500, textDecoration: "none"
            }}>
              Publicar {marcaDisplay}
            </Link>
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
            {lista.map((auto) => {
              const slug = `${auto.marca}-${auto.modelo}-${auto.ano}-${auto.id}`.toLowerCase().replace(/\s+/g, "-");
              return (
                <div key={auto.id} style={{
                  background: "#131e2e",
                  border: "0.5px solid rgba(255,255,255,0.07)",
                  borderRadius: 12,
                  overflow: "hidden"
                }}>
                  {auto.foto_url ? (
                    <img src={auto.foto_url} alt={`${auto.marca} ${auto.modelo} ${auto.ano} usado Concordia`} style={{ width: "100%", height: 180, objectFit: "cover" }} />
                  ) : (
                    <div style={{ width: "100%", height: 180, background: "#1a2740", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.15)", fontSize: 13 }}>
                      Sin foto
                    </div>
                  )}
                  <div style={{ padding: "14px 16px" }}>
                    <h2 style={{ color: "#fff", fontSize: 16, fontWeight: 500, marginBottom: 4 }}>
                      {auto.marca} {auto.modelo}
                    </h2>
                    <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, marginBottom: 8 }}>
                      {auto.ano} · {auto.kilometros?.toLocaleString()} km
                    </p>
                    <p style={{ color: "#ff6b35", fontSize: 18, fontWeight: 500, marginBottom: 12 }}>
                      USD {auto.precio?.toLocaleString()}
                    </p>
                    <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, marginBottom: 12, lineHeight: 1.5, minHeight: 36 }}>
                      {auto.descripcion ? (auto.descripcion.length > 80 ? auto.descripcion.slice(0, 80) + "..." : auto.descripcion) : ""}
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      <Link href={`/autos/${slug}`} style={{
                        display: "block", textAlign: "center",
                        background: "rgba(255,69,0,0.1)", color: "#ff6b35",
                        border: "0.5px solid rgba(255,69,0,0.25)",
                        padding: "8px", borderRadius: 8, fontSize: 13, textDecoration: "none"
                      }}>
                        Ver detalle
                      </Link>
                      <a href={`https://wa.me/+54${auto.telefono}?text=${encodeURIComponent(`Hola, te contacto por la publicación de ${auto.marca} ${auto.modelo} (${auto.ano}) visto en autosconcordia.com.ar`)}`}
                        target="_blank"
                        style={{
                          display: "block", textAlign: "center",
                          background: "rgba(37,211,102,0.1)", color: "#25d366",
                          border: "0.5px solid rgba(37,211,102,0.25)",
                          padding: "8px", borderRadius: 8, fontSize: 13, textDecoration: "none"
                        }}>
                        Contactar por WhatsApp
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* OTRAS MARCAS */}
        <div style={{ marginTop: 48 }}>
          <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 12, textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>
            Otras marcas disponibles
          </p>
          <Link href="/autos" style={{
            display: "inline-block",
            background: "rgba(255,255,255,0.05)",
            border: "0.5px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.5)",
            padding: "8px 18px", borderRadius: 8, fontSize: 13, textDecoration: "none"
          }}>
            Ver todos los vehículos disponibles →
          </Link>
        </div>

      </div>
    </main>
  );
}
