"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default function Publicar() {
  const [form, setForm] = useState({
    marca: "", modelo: "", anno: "", km: "", precio: "", telefono: "", descripcion: ""
  });
  const [foto, setFoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const [exito, setExito] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [aceptaTerminos, setAceptaTerminos] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorMsg("");
  };

  const handleSubmit = async () => {
    if (!aceptaTerminos) {
      setErrorMsg("Debes aceptar las politicas de privacidad para continuar");
      return;
    }

    if (!form.marca || !form.modelo || !form.anno || !form.km || !form.precio || !form.telefono) {
      setErrorMsg("Por favor completa todos los campos obligatorios");
      return;
    }
    if (!foto) {
      setErrorMsg("Por favor agrega una foto del auto");
      return;
    }
    if (foto.size > 1 * 1024 * 1024) {
      setErrorMsg("La foto no puede pesar mas de 1MB");
      return;
    }

    const { data: autoExistente } = await supabase
      .from("autos")
      .select("id")
      .eq("telefono", form.telefono)
      .in("estado", ["aprobado", "pendiente"])
      .maybeSingle();

    if (autoExistente) {
      setErrorMsg("Ya existe un auto con este numero de telefono. Solo se permite un vehiculo por persona.");
      return;
    }

    setLoading(true);
    try {
      let foto_url = "";
      if (foto) {
        const fileName = Date.now() + "-" + foto.name;
        const { error: uploadError } = await supabase.storage.from("fotos-autos").upload(fileName, foto);
        if (uploadError) throw uploadError;
        const { data: urlData } = supabase.storage.from("fotos-autos").getPublicUrl(fileName);
        foto_url = urlData.publicUrl;
      }

      const { error } = await supabase.from("autos").insert([{
        marca: form.marca, modelo: form.modelo,
        ano: parseInt(form.anno), kilometros: parseInt(form.km),
        precio: parseFloat(form.precio),
        telefono: form.telefono, descripcion: form.descripcion, foto_url
      }]);

      if (error) throw error;
      setExito(true);
    } catch (err) {
      setErrorMsg("Error al publicar: " + err.message);
    }
    setLoading(false);
  };

  const inputStyle = {
    width: "100%",
    background: "rgba(255,255,255,0.06)",
    border: "0.5px solid rgba(255,255,255,0.12)",
    borderRadius: 8,
    padding: "10px 14px",
    color: "#fff",
    fontSize: 14,
    outline: "none"
  };

  const labelStyle = {
    color: "rgba(255,255,255,0.4)",
    fontSize: 12,
    marginBottom: 6,
    display: "block"
  };

  if (exito) return (
    <main style={{ background: "#0d1520", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#111c2b", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: 40, textAlign: "center", maxWidth: 400 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
        <h2 style={{ color: "#fff", fontSize: 22, fontWeight: 500, marginBottom: 8 }}>Auto publicado!</h2>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 14, marginBottom: 24 }}>Tu anuncio estara disponible una vez aprobado.</p>
        <a href="/" style={{ background: "#ff4500", color: "#fff", padding: "10px 24px", borderRadius: 8, fontSize: 14, fontWeight: 500, textDecoration: "none" }}>
          Volver al inicio
        </a>
      </div>
    </main>
  );

  return (
    <main style={{ background: "#0d1520", minHeight: "100vh", padding: "40px 24px" }}>
      <title>Publicar anuncio | Autos Concordia</title>
      <div style={{ maxWidth: 560, margin: "0 auto" }}>
        <div style={{ background: "#111c2b", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "32px 28px" }}>
          <h1 style={{ color: "#fff", fontSize: 22, fontWeight: 500, marginBottom: 6, textAlign: "center" }}>
            Publicar mi auto
          </h1>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, textAlign: "center", marginBottom: 28 }}>
            * Todos los campos son obligatorios salvo descripcion
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={labelStyle}>Marca *</label>
              <input name="marca" value={form.marca} onChange={handleChange} placeholder="Ej: Toyota" list="lista-marcas" style={inputStyle} />
              <datalist id="lista-marcas">
                {["Toyota","Ford","Chevrolet","Volkswagen","Renault","Peugeot","Fiat","Honda","Nissan","Hyundai","Kia","Citroen","Mercedes-Benz","BMW","Audi","Jeep","Dodge","Ram","Mitsubishi","Subaru","Suzuki","Mazda"].map(m => (
                  <option key={m} value={m} />
                ))}
              </datalist>
            </div>
            <div>
              <label style={labelStyle}>Modelo *</label>
              <input name="modelo" value={form.modelo} onChange={handleChange} placeholder="Ej: Hilux" style={inputStyle} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label style={labelStyle}>Año *</label>
                <input name="anno" value={form.anno} onChange={handleChange} placeholder="Ej: 2020" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Kilometros *</label>
                <input name="km" value={form.km} onChange={handleChange} placeholder="Ej: 50000" style={inputStyle} />
              </div>
            </div>
            <div>
              <label style={labelStyle}>Precio en USD *</label>
              <input name="precio" value={form.precio} onChange={handleChange} placeholder="Ej: 18000" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Telefono de contacto *</label>
              <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="Ej: 3454123456" style={inputStyle} />
            </div>
            <div>
              <label style={labelStyle}>Descripcion (opcional)</label>
              <textarea name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Informacion adicional del auto..." rows={3} style={{ ...inputStyle, resize: "vertical" }} />
            </div>
            <div>
              <label style={labelStyle}>Foto del auto *</label>
              <label style={{
                display: "flex", alignItems: "center", gap: 12,
                background: "rgba(255,255,255,0.06)",
                border: "0.5px solid rgba(255,255,255,0.12)",
                borderRadius: 8, padding: "10px 14px", cursor: "pointer"
              }}>
                <span style={{
                  background: "#ff4500", color: "#fff",
                  padding: "5px 14px", borderRadius: 6,
                  fontSize: 13, fontWeight: 500, whiteSpace: "nowrap"
                }}>
                  Seleccionar foto
                </span>
                <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {foto ? foto.name : "Ningun archivo seleccionado"}
                </span>
                <input type="file" accept="image/*" onChange={(e) => setFoto(e.target.files[0])} style={{ display: "none" }} />
              </label>
              <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 11, marginTop: 6 }}>* La imagen no puede superar 1MB</p>
            </div>

            {errorMsg && (
              <div style={{
                background: "rgba(255,69,0,0.1)",
                border: "0.5px solid rgba(255,69,0,0.3)",
                borderRadius: 8, padding: "12px 16px",
                color: "#ff6b35", fontSize: 13
              }}>
                {errorMsg}
              </div>
            )}
<div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
              <input
                type="checkbox"
                id="terminos"
                checked={aceptaTerminos}
                onChange={(e) => { setAceptaTerminos(e.target.checked); setErrorMsg(""); }}
                style={{ marginTop: 2, accentColor: "#ff4500", cursor: "pointer", width: 16, height: 16, flexShrink: 0 }}
              />
              <label htmlFor="terminos" style={{ color: "rgba(255,255,255,0.45)", fontSize: 13, lineHeight: 1.5, cursor: "pointer" }}>
                Acepto las{" "}
                <a href="/privacidad" style={{ color: "#ff6b35", textDecoration: "none" }}>
                  politicas de privacidad
                </a>
                {" "}del sitio
              </label>
            </div>
            <button
              onClick={handleSubmit}
              disabled={loading}
              style={{
                background: loading ? "rgba(255,69,0,0.5)" : "#ff4500",
                color: "#fff", padding: "12px", borderRadius: 8,
                fontSize: 14, fontWeight: 500, border: "none",
                cursor: loading ? "not-allowed" : "pointer"
              }}
            >
              {loading ? "Publicando..." : "Publicar anuncio"}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}