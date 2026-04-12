import { createClient } from "@supabase/supabase-js";
import FichaAuto from "./FichaAuto";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

export async function generateMetadata({ params }) {
  const { id: idParam } = await params;
  const id = idParam.split("-").pop();
  const { data: auto } = await supabase.from("autos").select("*").eq("id", id).single();

  if (!auto) {
    return { title: "Auto no encontrado | Autos Concordia" };
  }

  const title = `${auto.marca} ${auto.modelo} ${auto.ano} – USD ${auto.precio?.toLocaleString()} | Autos Concordia`;
  const description = `${auto.marca} ${auto.modelo} ${auto.ano}, ${auto.kilometros?.toLocaleString()} km. Publicado en Autos Concordia, Concordia Entre Ríos.`;
  const image = auto.foto_url || "https://vxqcaybsjnrhyfdlmytg.supabase.co/storage/v1/object/public/assets/logo-ac-white.png";
  const url = `${process.env.NEXT_PUBLIC_SITE_URL}/autos/${auto.marca}-${auto.modelo}-${auto.ano}-${auto.id}`.toLowerCase().replace(/\s+/g, "-");

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      siteName: "Autos Concordia",
      images: [{ url: image, width: 1200, height: 630, alt: `${auto.marca} ${auto.modelo}` }],
      locale: "es_AR",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [image],
    },
  };
}

export default function Page() {
  return <FichaAuto />;
}
