import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function FichaAuto({ params }) {
  const { id } = await params;
  const realId = id.split("-").pop();

  const { data: auto } = await supabase
    .from("autos")
    .select("*")
    .eq("id", realId)
    .single();

  if (!auto) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <p className="text-gray-500">Auto no encontrado.</p>
          <a href="/autos" className="text-blue-500 mt-4 block">Volver al listado</a>
        </div>
      </main>
    );
  }

  const slug = `${auto.marca}-${auto.modelo}-${auto.ano}-${auto.id}`
    .toLowerCase()
    .replace(/\s+/g, "-");

  const urlCompartir = `https://wa.me/?text=Mira este auto: ${auto.marca} ${auto.modelo} ${auto.ano} - USD ${auto.precio?.toLocaleString()} - ${process.env.NEXT_PUBLIC_SITE_URL}/autos/${slug}`;

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-2xl mx-auto">
        <a href="/autos" className="text-blue-500 text-sm mb-4 block">
          Volver al listado
        </a>
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {auto.foto_url && (
            <img
              src={auto.foto_url}
              alt={auto.marca + " " + auto.modelo}
              className="w-full h-72 object-cover"
            />
          )}
          <div className="p-6">
            <h1 className="text-3xl font-bold text-gray-800 mb-1">
              {auto.marca} {auto.modelo}
            </h1>
            <p className="text-blue-600 font-bold text-2xl mb-4">
              USD {auto.precio?.toLocaleString()}
            </p>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400">Año</p>
                <p className="font-semibold text-gray-800">{auto.ano}</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <p className="text-xs text-gray-400">Kilometros</p>
                <p className="font-semibold text-gray-800">{auto.kilometros?.toLocaleString()} km</p>
              </div>
            </div>
            {auto.descripcion && (
              <p className="text-gray-600 mb-6">{auto.descripcion}</p>
            )}
            <div className="flex flex-col gap-3">
              
                <a href={"https://wa.me/+54" + auto.telefono}
                target="_blank"
                className="block text-center bg-green-500 text-white py-3 rounded-xl hover:bg-green-600 font-medium"
              >
                Contactar por WhatsApp
              </a>
              
                <a href={urlCompartir}
                target="_blank"
                className="block text-center bg-gray-100 text-gray-700 py-3 rounded-xl hover:bg-gray-200 font-medium"
              >
                Compartir este auto
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}