"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import Link from "next/link";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Autos() {
  const [autos, setAutos] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [marca, setMarca] = useState("");
  const [precioMax, setPrecioMax] = useState("");
  const [annoMin, setAnnoMin] = useState("");

  useEffect(() => {
    const cargar = async () => {
      const { data } = await supabase
        .from("autos")
        .select("*")
        .eq("estado", "aprobado")
        .order("created_at", { ascending: false });
      setAutos(data || []);
      setFiltrados(data || []);
    };
    cargar();
  }, []);

  useEffect(() => {
    let resultado = autos;

    if (marca.trim()) {
      resultado = resultado.filter((a) =>
        a.marca.toLowerCase().includes(marca.toLowerCase())
      );
    }

    if (precioMax) {
      resultado = resultado.filter((a) => a.precio <= parseFloat(precioMax));
    }

    if (annoMin) {
      resultado = resultado.filter((a) => a.ano >= parseInt(annoMin));
    }

    setFiltrados(resultado);
  }, [marca, precioMax, annoMin, autos]);

  const limpiarFiltros = () => {
    setMarca("");
    setPrecioMax("");
    setAnnoMin("");
  };

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Autos disponibles</h1>
          <Link href="/publicar" className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600">
            Publicar auto
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow p-4 mb-6 flex flex-wrap gap-3 items-end">
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">Marca</label>
            <input
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
              placeholder="Ej: Toyota"
              className="border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">Precio maximo (USD)</label>
            <input
              value={precioMax}
              onChange={(e) => setPrecioMax(e.target.value)}
              placeholder="Ej: 20000"
              type="number"
              className="border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">Año minimo</label>
            <input
              value={annoMin}
              onChange={(e) => setAnnoMin(e.target.value)}
              placeholder="Ej: 2018"
              type="number"
              className="border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            onClick={limpiarFiltros}
            className="text-sm text-gray-400 hover:text-red-400 pb-2"
          >
            Limpiar filtros
          </button>
          <p className="text-sm text-gray-400 pb-2">
            {filtrados.length} resultado{filtrados.length !== 1 ? "s" : ""}
          </p>
        </div>

        {filtrados.length === 0 && (
          <p className="text-center text-gray-500">No hay autos que coincidan con la busqueda.</p>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtrados.map((auto) => (
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
                
                  <div className="flex flex-col gap-2">
                  
                    <a href={`/autos/${auto.marca}-${auto.modelo}-${auto.ano}-${auto.id}`.toLowerCase().replace(/\s+/g, "-")}
                    className="block text-center bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600"
                  >
                    Ver detalle
                  </a>
                  
                    <a href={"https://wa.me/+54" + auto.telefono}
                    target="_blank"
                    className="block text-center bg-green-500 text-white py-2 rounded-xl hover:bg-green-600"
                  >
                    Contactar por WhatsApp
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}