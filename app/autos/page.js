import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
export const metadata = {
  title: "Autos publicados | Clasificados IA",
};
export default async function Autos() {
  const { data: autos } = await supabase.from("autos").select("*").order("created_at", { ascending: false });

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Autos disponibles</h1>
          <Link href="/publicar" className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600">
            Publicar auto
          </Link>
        </div>

        {autos?.length === 0 && (
          <p className="text-center text-gray-500">No hay autos publicados todavia.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {autos?.map((auto) => (
            <div key={auto.id} className="bg-white rounded-2xl shadow overflow-hidden">
              {auto.foto_url ? (
                <img
                  src={auto.foto_url}
                  alt={auto.marca + " " + auto.modelo}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gray-200 flex items-center justify-center text-gray-400">
                  Sin foto
                </div>
              )}
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800">
                  {auto.marca} {auto.modelo}
                </h2>
                <p className="text-gray-500 text-sm mb-2">
                  {auto.ano} · {auto.kilometros?.toLocaleString()} km
                </p>
                <p className="text-blue-600 font-bold text-lg mb-3">
                  USD {auto.precio?.toLocaleString()}
                </p>
                <p className="text-gray-600 text-sm mb-4">{auto.descripcion}</p>
                
                  <a href={"tel:" + auto.telefono}
                  className="block text-center bg-green-500 text-white py-2 rounded-xl hover:bg-green-600"
                >
                  Contactar
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}