import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function sitemap() {
  const { data: autos } = await supabase
    .from("autos")
    .select("id, marca, modelo, ano, created_at")
    .eq("estado", "aprobado");

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

  const paginas = [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/autos`, lastModified: new Date() },
    { url: `${baseUrl}/publicar`, lastModified: new Date() },
  ];

  const marcas = [...new Set(autos?.map((a) => a.marca.toLowerCase()) || [])];
  const paginasMarcas = marcas.map((marca) => ({
    url: `${baseUrl}/autos?marca=${marca}`,
    lastModified: new Date(),
  }));

  const paginasAutos = autos?.map((auto) => {
    const slug = `${auto.marca}-${auto.modelo}-${auto.ano}-${auto.id}`
      .toLowerCase()
      .replace(/\s+/g, "-");
    return {
      url: `${baseUrl}/autos/${slug}`,
      lastModified: new Date(auto.created_at),
    };
  }) || [];

  return [...paginas, ...paginasMarcas, ...paginasAutos];
}