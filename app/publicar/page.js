"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Publicar() {
  const [form, setForm] = useState({
    marca: "",
    modelo: "",
    anno: "",
    km: "",
    precio: "",
    telefono: "",
    descripcion: ""
  });
  const [foto, setFoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [exito, setExito] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!form.marca || !form.modelo || !form.anno || !form.km || !form.precio || !form.telefono) {
      alert("Por favor completa todos los campos obligatorios");
      return;
    }

    if (!foto) {
      alert("Por favor agrega una foto del auto");
      return;
    }

    if (foto.size > 1 * 1024 * 1024) {
      alert("La foto no puede pesar mas de 1MB");
      return;
    }
    const { data: autoExistente } = await supabase
      .from("autos")
      .select("id")
      .eq("telefono", form.telefono)
      .eq("estado", "aprobado")
      .single();

    if (autoExistente) {
      alert("Ya existe un auto aprobado con este numero de telefono. Solo se permite un vehiculo por persona.");
      return;
    }

    setLoading(true);
    try {
      let foto_url = "";

      if (foto) {
        const fileName = Date.now() + "-" + foto.name;
        const { error: uploadError } = await supabase.storage
          .from("fotos-autos")
          .upload(fileName, foto);

        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("fotos-autos")
          .getPublicUrl(fileName);

        foto_url = urlData.publicUrl;
      }

      const { error } = await supabase.from("autos").insert([
        {
          marca: form.marca,
          modelo: form.modelo,
          ano: parseInt(form.anno),
          kilometros: parseInt(form.km),
          precio: parseFloat(form.precio),
          telefono: form.telefono,
          descripcion: form.descripcion,
          foto_url: foto_url
        }
      ]);

      if (error) throw error;
      setExito(true);
    } catch (err) {
      alert("Error al publicar: " + err.message);
    }
    setLoading(false);
  };

  if (exito) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <p className="text-4xl mb-4">🎉</p>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Auto publicado!</h2>
          <p className="text-gray-500 mb-6">Tu anuncio estara disponible una vez aprobado.</p>
          <a href="/" className="bg-blue-500 text-white px-6 py-2 rounded-xl hover:bg-blue-600">
            Volver al inicio
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center py-10">
      <title>Publicar anuncio | Clasificados IA</title>
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-xl w-full">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-2">
          Publicar mi auto
        </h1>
        <p className="text-center text-red-400 text-sm mb-6">* Todos los campos son obligatorios salvo descripcion</p>
        <div className="flex flex-col gap-4">
          <input
            name="marca"
            value={form.marca}
            onChange={handleChange}
            placeholder="Marca (ej: Toyota) *"
            className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="modelo"
            value={form.modelo}
            onChange={handleChange}
            placeholder="Modelo (ej: Hilux) *"
            className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="anno"
            value={form.anno}
            onChange={handleChange}
            placeholder="Año (ej: 2020) *"
            className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="km"
            value={form.km}
            onChange={handleChange}
            placeholder="Kilometros (ej: 50000) *"
            className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="precio"
            value={form.precio}
            onChange={handleChange}
            placeholder="Precio en USD (ej: 18000) *"
            className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <input
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            placeholder="Telefono de contacto *"
            className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <textarea
            name="descripcion"
            value={form.descripcion}
            onChange={handleChange}
            placeholder="Descripcion adicional (opcional)"
            rows={3}
            className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFoto(e.target.files[0])}
              className="border border-gray-300 rounded-xl px-4 py-2 w-full"
            />
            <p className="text-gray-400 text-xs mt-1">* La imagen no puede superar 1MB</p>
          </div>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? "Publicando..." : "Publicar anuncio"}
          </button>
        </div>
      </div>
    </main>
  );
}