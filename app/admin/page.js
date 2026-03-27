"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
const USER = process.env.NEXT_PUBLIC_ADMIN_USER;

export default function Admin() {
  const [autos, setAutos] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [autenticado, setAutenticado] = useState(false);
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pestana, setPestana] = useState("pendientes");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [anno, setAnno] = useState("");

  const limpiarRechazados = async () => {
    const hace15dias = new Date();
    hace15dias.setDate(hace15dias.getDate() - 15);
    await supabase
      .from("autos")
      .delete()
      .eq("estado", "rechazado")
      .lt("created_at", hace15dias.toISOString());
  };

  const cargarAutos = async (estado) => {
    setLoading(true);
    const { data } = await supabase
      .from("autos")
      .select("*")
      .eq("estado", estado)
      .order("created_at", { ascending: false });
    setAutos(data || []);
    setFiltrados(data || []);
    setLoading(false);
  };

  const limpiarFiltros = () => {
    setMarca("");
    setModelo("");
    setAnno("");
  };

  useEffect(() => {
    let resultado = autos;
    if (marca.trim()) resultado = resultado.filter((a) => a.marca.toLowerCase().includes(marca.toLowerCase()));
    if (modelo.trim()) resultado = resultado.filter((a) => a.modelo.toLowerCase().includes(modelo.toLowerCase()));
    if (anno.trim()) resultado = resultado.filter((a) => String(a.ano).includes(anno));
    setFiltrados(resultado);
  }, [marca, modelo, anno, autos]);

  const cambiarEstado = async (id, estado) => {
    await supabase.from("autos").update({ estado }).eq("id", id);

    if (estado === "aprobado") {
      const auto = autos.find((a) => a.id === id);
      if (auto) {
        const slug = `${auto.marca}-${auto.modelo}-${auto.ano}-${auto.id}`
          .toLowerCase()
          .replace(/\s+/g, "-");
        const url = `${process.env.NEXT_PUBLIC_SITE_URL}/autos/${slug}`;
        const mensaje = `Tu anuncio fue aprobado! Ya podés verlo publicado aqui: ${url}`;
        window.open(`https://wa.me/+54${auto.telefono}?text=${encodeURIComponent(mensaje)}`, "_blank");
      }
    }

    cargarAutos(pestana);
  };

  const eliminar = async (id) => {
    if (!confirm("Seguro que queres eliminar este anuncio?")) return;
    
    const auto = autos.find((a) => a.id === id);
    
    if (auto?.foto_url) {
      const fileName = auto.foto_url.split("/fotos-autos/")[1];
      if (fileName) {
        await supabase.storage.from("fotos-autos").remove([fileName]);
      }
    }

    await supabase.from("autos").delete().eq("id", id);
    cargarAutos(pestana);
  };

  const handleLogin = () => {
    if (usuario === USER && password === PASSWORD) {
      setAutenticado(true);
      setError("");
    } else {
      setError("Usuario o contrasena incorrectos");
    }
  };

  useEffect(() => {
    if (autenticado) {
      limpiarRechazados();
      cargarAutos("pendiente");
    }
  }, [autenticado]);

  useEffect(() => {
    if (autenticado) {
      limpiarFiltros();
      cargarAutos(pestana);
    }
  }, [pestana]);

  if (!autenticado) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 max-w-sm w-full">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Panel de administracion
          </h1>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            placeholder="Usuario"
            className="w-full border border-gray-300 rounded-xl px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Contrasena"
            className="w-full border border-gray-300 rounded-xl px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
          <button
            onClick={handleLogin}
            className="w-full bg-blue-500 text-white py-2 rounded-xl hover:bg-blue-600"
          >
            Ingresar
          </button>
        </div>
      </main>
    );
  }

  const pestanas = [
    { id: "pendiente", label: "Pendientes" },
    { id: "aprobado", label: "Aprobados" },
    { id: "rechazado", label: "Rechazados" },
  ];

  return (
    <main className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Panel de moderacion</h1>

        <div className="flex gap-2 mb-6">
          {pestanas.map((p) => (
            <button
              key={p.id}
              onClick={() => setPestana(p.id)}
              className={`px-4 py-2 rounded-xl font-medium ${
                pestana === p.id
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {p.label}
            </button>
          ))}
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
            <label className="text-xs text-gray-500">Modelo</label>
            <input
              value={modelo}
              onChange={(e) => setModelo(e.target.value)}
              placeholder="Ej: Hilux"
              className="border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className="text-xs text-gray-500">Año</label>
            <input
              value={anno}
              onChange={(e) => setAnno(e.target.value)}
              placeholder="Ej: 2020"
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

        {loading && <p className="text-gray-500">Cargando...</p>}

        {!loading && filtrados.length === 0 && (
          <p className="text-gray-500">No hay anuncios en esta seccion.</p>
        )}

        <div className="flex flex-col gap-4">
          {filtrados.map((auto) => (
            <div key={auto.id} className="bg-white rounded-2xl shadow p-4 flex gap-4 items-start">
              {auto.foto_url && (
                <img
                  src={auto.foto_url}
                  alt={auto.marca + " " + auto.modelo}
                  className="w-28 h-20 object-cover rounded-xl flex-shrink-0"
                />
              )}
              <div className="flex-1">
                <h2 className="text-lg font-bold text-gray-800">
                  {auto.marca} {auto.modelo}
                </h2>
                <p className="text-gray-500 text-sm">
                  {auto.ano} · {auto.kilometros?.toLocaleString()} km · USD {auto.precio?.toLocaleString()}
                </p>
                <p className="text-gray-600 text-sm mt-1">{auto.descripcion}</p>
                <p className="text-gray-400 text-xs mt-1">Tel: {auto.telefono}</p>
                <p className="text-gray-400 text-xs">
                  Publicado: {new Date(auto.created_at).toLocaleDateString("es-AR")}
                </p>
                <div className="flex gap-2 mt-3 flex-wrap">
                  {pestana === "pendientes" && (
                    <>
                      <button
                        onClick={() => cambiarEstado(auto.id, "aprobado")}
                        className="bg-green-500 text-white px-3 py-1 rounded-xl text-sm hover:bg-green-600"
                      >
                        Aprobar
                      </button>
                      <button
                        onClick={() => cambiarEstado(auto.id, "rechazado")}
                        className="bg-red-500 text-white px-3 py-1 rounded-xl text-sm hover:bg-red-600"
                      >
                        Rechazar
                      </button>
                    </>
                  )}
                  {pestana === "aprobado" && (
                    <>
                      <button
                        onClick={() => cambiarEstado(auto.id, "rechazado")}
                        className="bg-yellow-500 text-white px-3 py-1 rounded-xl text-sm hover:bg-yellow-600"
                      >
                        Desaprobar
                      </button>
                      <button
                        onClick={() => eliminar(auto.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-xl text-sm hover:bg-red-600"
                      >
                        Eliminar
                      </button>
                    </>
                  )}
                  {pestana === "rechazado" && (
                    <>
                      <button
                        onClick={() => cambiarEstado(auto.id, "aprobado")}
                        className="bg-green-500 text-white px-3 py-1 rounded-xl text-sm hover:bg-green-600"
                      >
                        Aprobar
                      </button>
                      <button
                        onClick={() => eliminar(auto.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded-xl text-sm hover:bg-red-600"
                      >
                        Eliminar
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}