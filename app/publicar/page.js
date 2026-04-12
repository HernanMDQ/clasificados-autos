"use client";
import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const LABELS = ["Frente *", "Lateral", "Trasera"];
const TIPOS_PERMITIDOS = ["image/jpeg", "image/png", "image/webp", "image/heic", "image/heif"];
const TIPOS_LEGIBLES = "JPG, PNG, WEBP o HEIC";

export default function Publicar() {
  const [form, setForm] = useState({
    marca: "", modelo: "", anno: "", km: "", precio: "", telefono: "", descripcion: ""
  });
  const [fotos, setFotos] = useState([null, null, null]);
  const [loading, setLoading] = useState(false);
  const [exito, setExito] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [aceptaTerminos, setAceptaTerminos] = useState(false);
  const [generando, setGenerando] = useState(false);

  const toBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });

  const generarDescripcion = async () => {
    if (!form.marca || !form.modelo || !form.anno || !form.km || !form.precio) {
      setErrorMsg("Completá marca, modelo, año, kilometros y precio antes de generar la descripción");
      return;
    }
    setGenerando(true);
    setErrorMsg("");
    try {
      let fotoBase64 = null;
      if (fotos[0]) fotoBase64 = await toBase64(fotos[0]);

      const res = await fetch("/api/generar-descripcion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ marca: form.marca, modelo: form.modelo, anno: form.anno, km: form.km, precio: form.precio, fotoBase64 }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      setForm((prev) => ({ ...prev, descripcion: data.descripcion }));
    } catch (err) {
      setErrorMsg("No se pudo generar la descripción. Intentá de nuevo.");
    }
    setGenerando(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrorMsg("");
  };

  const handleFoto = (index, archivo) => {
    if (archivo && !TIPOS_PERMITIDOS.includes(archivo.type)) {
      setErrorMsg(`Tipo de archivo no permitido. Usá ${TIPOS_LEGIBLES}.`);
      return;
    }
    if (archivo && archivo.size > 1 * 1024 * 1024) {
      setErrorMsg(
        <span>
          La imagen <strong>"{archivo.name}"</strong> supera el límite de 1MB.{" "}
          Podés comprimirla gratis en{" "}
          <a href="https://tinypng.com" target="_blank" rel="noopener noreferrer" style={{ color: "#ff6b35", textDecoration: "underline" }}>
            tinypng.com
          </a>{" "}
          antes de subirla.
        </span>
      );
      return;
    }
    const nuevas = [...fotos];
    nuevas[index] = archivo;
    setFotos(nuevas);
    setErrorMsg("");
  };

  const subirFoto = async (foto) => {
    const nombre = Date.now() + "-" + Math.random().toString(36).slice(2) + "-" + foto.name;
    const fd = new FormData();
    fd.append("archivo", foto);
    fd.append("nombre", nombre);
    const res = await fetch("/api/subir-foto", { method: "POST", body: fd });
    const data = await res.json();
    if (!data.ok) throw new Error(data.error);
    return data.url;
  };

  const capitalizarPalabras = (str) =>
    str.trim().toLowerCase().replace(/(^|\s|-)(\w)/g, (_, sep, c) => sep + c.toUpperCase());

  const normalizarPrecio = (valor) => {
    const s = valor.toString();
    // Elimina la parte decimal (coma o punto seguido de 1-2 dígitos al final)
    const sinDecimal = s.replace(/[,.](\d{1,2})$/, "");
    // Elimina todo lo que no sea dígito
    return parseInt(sinDecimal.replace(/\D/g, "")) || 0;
  };

  const normalizarKm = (valor) => {
    return parseInt(valor.toString().replace(/\D/g, "")) || 0;
  };

  const normalizarTelefono = (tel) => {
    let n = tel.replace(/[\s\-().]/g, "");
    if (n.startsWith("+54")) n = n.slice(3);
    else if (n.startsWith("54") && n.length > 10) n = n.slice(2);
    if (n.startsWith("0")) n = n.slice(1);
    return n;
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
    const telefonoNormalizado = normalizarTelefono(form.telefono);
    if (!/^\d{10}$/.test(telefonoNormalizado)) {
      setErrorMsg("El teléfono debe tener 10 dígitos. Ejemplo: 3454123456 (sin 0 ni +54)");
      return;
    }
    if (!fotos[0]) {
      setErrorMsg("Por favor agrega al menos la foto de frente del auto");
      return;
    }
    const { data: autoExistente } = await supabase
      .from("autos")
      .select("id")
      .eq("telefono", telefonoNormalizado)
      .in("estado", ["aprobado", "pendiente"])
      .maybeSingle();

    if (autoExistente) {
      setErrorMsg("Ya existe un auto con este numero de telefono. Solo se permite un vehiculo por persona.");
      return;
    }

    setLoading(true);
    try {
      const urls = await Promise.all(
        fotos.map((f) => (f ? subirFoto(f) : Promise.resolve(null)))
      );

      const res = await fetch("/api/publicar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          marca: capitalizarPalabras(form.marca), modelo: capitalizarPalabras(form.modelo),
          ano: parseInt(form.anno), kilometros: normalizarKm(form.km),
          precio: normalizarPrecio(form.precio),
          telefono: telefonoNormalizado, descripcion: form.descripcion,
          foto_url: urls[0],
          foto_url_2: urls[1] || null,
          foto_url_3: urls[2] || null,
          estado: "pendiente",
        }),
      });
      const data = await res.json();
      if (!data.ok) throw new Error(data.error);
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
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
              <div>
                <label style={labelStyle}>Precio en USD *</label>
                <input name="precio" value={form.precio} onChange={handleChange} placeholder="Ej: 18000" style={inputStyle} />
              </div>
              <div>
                <label style={labelStyle}>Telefono de contacto *</label>
                <input name="telefono" value={form.telefono} onChange={handleChange} placeholder="Ej: 3454123456 (sin 0 ni +54)" style={inputStyle} />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Fotos del auto (hasta 3)</label>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8 }}>
                {fotos.map((foto, i) => (
                  <div key={i}>
                    <label style={{
                      display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
                      background: "rgba(255,255,255,0.06)",
                      border: foto ? "0.5px solid rgba(255,69,0,0.4)" : "0.5px solid rgba(255,255,255,0.12)",
                      borderRadius: 8, padding: "12px 8px", cursor: "pointer",
                      textAlign: "center", position: "relative", minHeight: 80
                    }}>
                      <span style={{
                        background: foto ? "#ff4500" : "rgba(255,255,255,0.1)",
                        color: "#fff",
                        padding: "4px 10px", borderRadius: 6,
                        fontSize: 11, fontWeight: 500, whiteSpace: "nowrap"
                      }}>
                        {LABELS[i]}
                      </span>
                      <span style={{ color: foto ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.3)", fontSize: 11, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", width: "100%" }}>
                        {foto ? foto.name : "Sin archivo"}
                      </span>
                      {foto && (
                        <button
                          type="button"
                          onClick={(e) => { e.preventDefault(); handleFoto(i, null); }}
                          style={{ position: "absolute", top: 6, right: 6, background: "none", border: "none", color: "rgba(255,255,255,0.3)", cursor: "pointer", fontSize: 14, lineHeight: 1 }}
                        >
                          ✕
                        </button>
                      )}
                      <input type="file" accept=".jpg,.jpeg,.png,.webp,.heic,.heif" onChange={(e) => handleFoto(i, e.target.files[0] || null)} style={{ display: "none" }} />
                    </label>
                  </div>
                ))}
              </div>
              <p style={{ color: "rgba(255,255,255,0.25)", fontSize: 11, marginTop: 6 }}>* Cada imagen no puede superar 1MB. Formatos permitidos: JPG, PNG, WEBP, HEIC</p>
            </div>

            <div>
              <label style={labelStyle}>Descripcion (opcional)</label>
              <textarea name="descripcion" value={form.descripcion} onChange={handleChange} placeholder="Informacion adicional del auto..." rows={3} maxLength={500} style={{ ...inputStyle, resize: "vertical" }} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 6 }}>
                <button
                  type="button"
                  onClick={generarDescripcion}
                  disabled={generando}
                  style={{
                    background: "rgba(255,69,0,0.1)",
                    border: "0.5px solid rgba(255,69,0,0.25)",
                    color: generando ? "rgba(255,107,53,0.5)" : "#ff6b35",
                    borderRadius: 6,
                    padding: "5px 12px",
                    fontSize: 12,
                    cursor: generando ? "default" : "pointer",
                  }}
                >
                  {generando ? "Generando..." : "✦ Generar descripción con IA"}
                </button>
                <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 11 }}>{form.descripcion.length}/500</span>
              </div>
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
                <a href="/privacidad" style={{ color: "#ff6b35", textDecoration: "none" }}>politicas de privacidad</a>
                {" "}y el{" "}
                <a href="/descargo" style={{ color: "#ff6b35", textDecoration: "none" }}>descargo de responsabilidad</a>
                {". "}Declaro que la informacion ingresada es veridica y corresponde al vehiculo que estoy ofreciendo.
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
