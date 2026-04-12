"use client";
import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

const PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD;
const USER = process.env.NEXT_PUBLIC_ADMIN_USER;

const s = {
  page: {
    minHeight: "calc(100vh - 65px)",
    background: "#0d1520",
    padding: "32px 16px",
  },
  container: { maxWidth: 900, margin: "0 auto" },
  title: { color: "#fff", fontSize: 26, fontWeight: 700, marginBottom: 24 },

  // Login
  loginWrap: {
    minHeight: "calc(100vh - 65px)",
    background: "#0d1520",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  loginCard: {
    background: "#131f30",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 16,
    padding: 32,
    width: "100%",
    maxWidth: 360,
  },
  loginTitle: { color: "#fff", fontSize: 20, fontWeight: 700, textAlign: "center", marginBottom: 24 },
  input: {
    width: "100%",
    background: "#0d1520",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 10,
    padding: "10px 14px",
    color: "#fff",
    fontSize: 14,
    marginBottom: 12,
    outline: "none",
    boxSizing: "border-box",
  },
  loginBtn: {
    width: "100%",
    background: "#ff4500",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    padding: "10px 0",
    fontSize: 15,
    fontWeight: 600,
    cursor: "pointer",
  },
  errorMsg: { color: "#f87171", fontSize: 13, marginBottom: 12 },

  // Tabs
  tabs: { display: "flex", gap: 8, marginBottom: 20 },
  tabActive: {
    background: "#ff4500",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "8px 18px",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
  },
  tabInactive: {
    background: "#131f30",
    color: "rgba(255,255,255,0.55)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 8,
    padding: "8px 18px",
    fontSize: 14,
    fontWeight: 500,
    cursor: "pointer",
  },

  // Filters
  filterBar: {
    background: "#131f30",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 12,
    padding: "16px 20px",
    marginBottom: 20,
    display: "flex",
    flexWrap: "wrap",
    gap: 12,
    alignItems: "flex-end",
  },
  filterGroup: { display: "flex", flexDirection: "column", gap: 4 },
  filterLabel: { color: "rgba(255,255,255,0.4)", fontSize: 11, textTransform: "uppercase", letterSpacing: 1 },
  filterInput: {
    background: "#0d1520",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 8,
    padding: "8px 12px",
    color: "#fff",
    fontSize: 13,
    outline: "none",
    width: 130,
  },
  clearBtn: {
    background: "none",
    border: "none",
    color: "rgba(255,255,255,0.35)",
    fontSize: 13,
    cursor: "pointer",
    padding: "8px 0",
  },
  resultsCount: { color: "rgba(255,255,255,0.35)", fontSize: 13, padding: "8px 0" },

  // Cards
  card: {
    background: "#131f30",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 14,
    padding: 16,
    display: "flex",
    gap: 14,
    alignItems: "flex-start",
    marginBottom: 12,
  },
  img: { width: 112, height: 80, objectFit: "cover", borderRadius: 10, flexShrink: 0 },
  cardTitle: { color: "#fff", fontSize: 16, fontWeight: 700, marginBottom: 4 },
  cardSub: { color: "rgba(255,255,255,0.45)", fontSize: 13, marginBottom: 4 },
  cardDesc: { color: "rgba(255,255,255,0.6)", fontSize: 13, marginBottom: 4 },
  cardMeta: { color: "rgba(255,255,255,0.3)", fontSize: 12, marginBottom: 2 },
  btnRow: { display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" },

  btnEdit: {
    background: "rgba(255,255,255,0.08)",
    color: "rgba(255,255,255,0.7)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 8,
    padding: "6px 16px",
    fontSize: 13,
    fontWeight: 500,
    cursor: "pointer",
  },

  // Modal
  overlay: {
    position: "fixed",
    inset: 0,
    background: "rgba(0,0,0,0.7)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 100,
    padding: 16,
  },
  modal: {
    background: "#131f30",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 16,
    padding: 28,
    width: "100%",
    maxWidth: 520,
    maxHeight: "90vh",
    overflowY: "auto",
  },
  modalTitle: { color: "#fff", fontSize: 18, fontWeight: 700, marginBottom: 20 },
  modalGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 },
  modalGroup: { display: "flex", flexDirection: "column", gap: 5 },
  modalGroupFull: { display: "flex", flexDirection: "column", gap: 5, gridColumn: "1 / -1" },
  modalLabel: { color: "rgba(255,255,255,0.4)", fontSize: 11, textTransform: "uppercase", letterSpacing: 0.8 },
  modalInput: {
    background: "#0d1520",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 8,
    padding: "9px 12px",
    color: "#fff",
    fontSize: 14,
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  },
  modalTextarea: {
    background: "#0d1520",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 8,
    padding: "9px 12px",
    color: "#fff",
    fontSize: 14,
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
    resize: "vertical",
    minHeight: 90,
    fontFamily: "inherit",
  },
  modalBtnRow: { display: "flex", gap: 10, marginTop: 20, justifyContent: "flex-end" },
  modalBtnCancel: {
    background: "rgba(255,255,255,0.07)",
    color: "rgba(255,255,255,0.6)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: 8,
    padding: "9px 20px",
    fontSize: 14,
    cursor: "pointer",
  },
  modalBtnSave: {
    background: "#ff4500",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "9px 20px",
    fontSize: 14,
    fontWeight: 600,
    cursor: "pointer",
  },

  btnGreen: {
    background: "#16a34a",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "6px 16px",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
  },
  btnRed: {
    background: "#dc2626",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "6px 16px",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
  },
  btnYellow: {
    background: "#d97706",
    color: "#fff",
    border: "none",
    borderRadius: 8,
    padding: "6px 16px",
    fontSize: 13,
    fontWeight: 600,
    cursor: "pointer",
  },

  empty: { color: "rgba(255,255,255,0.35)", fontSize: 15, padding: "24px 0" },
};

export default function Admin() {
  const [autos, setAutos] = useState([]);
  const [filtrados, setFiltrados] = useState([]);
  const [loading, setLoading] = useState(true);
  const [autenticado, setAutenticado] = useState(false);
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [pestana, setPestana] = useState("pendiente");
  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [anno, setAnno] = useState("");
  const [editando, setEditando] = useState(null);
  const [editForm, setEditForm] = useState({});
  const [editFotos, setEditFotos] = useState({ foto_url: null, foto_url_2: null, foto_url_3: null });

  const limpiarRechazados = async () => {
    const hace30dias = new Date();
    hace30dias.setDate(hace30dias.getDate() - 30);
    await fetch("/api/eliminar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ limpiar_rechazados: true, fecha: hace30dias.toISOString() }),
    });
  };

  const cargarAutos = async (estado) => {
    setLoading(true);
    const res = await fetch(`/api/admin-autos?estado=${estado}`);
    const json = await res.json();
    setAutos(json.data || []);
    setFiltrados(json.data || []);
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
    await supabase.rpc("cambiar_estado_auto", { auto_id: id, p_estado: estado });

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
    const res = await fetch("/api/eliminar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    const json = await res.json();
    if (!json.ok) {
      alert("Error al eliminar: " + json.error);
      return;
    }
    cargarAutos(pestana);
  };

  const eliminarFoto = async (id, campo) => {
    if (!confirm("¿Eliminar esta foto?")) return;
    await supabase.rpc("eliminar_foto_auto", { auto_id: id, campo });
    cargarAutos(pestana);
  };

  const abrirEditor = (auto) => {
    setEditando(auto.id);
    setEditForm({
      marca: auto.marca || "",
      modelo: auto.modelo || "",
      ano: auto.ano || "",
      kilometros: auto.kilometros || "",
      precio: auto.precio || "",
      descripcion: auto.descripcion || "",
      telefono: auto.telefono || "",
      foto_url: auto.foto_url || null,
      foto_url_2: auto.foto_url_2 || null,
      foto_url_3: auto.foto_url_3 || null,
    });
    setEditFotos({ foto_url: null, foto_url_2: null, foto_url_3: null });
  };

  const subirFotoAdmin = async (archivo) => {
    const nombre = Date.now() + "-" + Math.random().toString(36).slice(2) + "-" + archivo.name;
    const fd = new FormData();
    fd.append("archivo", archivo);
    fd.append("nombre", nombre);
    const res = await fetch("/api/subir-foto", { method: "POST", body: fd });
    const data = await res.json();
    if (!data.ok) throw new Error(data.error);
    return data.url;
  };

  const guardarEdicion = async () => {
    const datos = {
      marca: editForm.marca,
      modelo: editForm.modelo,
      ano: Number(editForm.ano),
      kilometros: Number(editForm.kilometros),
      precio: Number(editForm.precio),
      descripcion: editForm.descripcion,
      telefono: editForm.telefono,
    };

    for (const campo of ["foto_url", "foto_url_2", "foto_url_3"]) {
      if (editFotos[campo]) {
        try {
          const url = await subirFotoAdmin(editFotos[campo]);
          await supabase.rpc("actualizar_foto_auto", { auto_id: editando, campo, url });
        } catch (err) {
          alert("Error al subir foto: " + err.message);
          return;
        }
      }
    }

    const res = await fetch("/api/editar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: editando, datos }),
    });
    const json = await res.json();
    if (!json.ok) {
      alert("Error al guardar: " + json.error);
      return;
    }
    setEditando(null);
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
      <main style={s.loginWrap}>
        <div style={s.loginCard}>
          <h1 style={s.loginTitle}>Panel de administracion</h1>
          <input
            type="text"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            placeholder="Usuario"
            style={s.input}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            placeholder="Contrasena"
            style={s.input}
          />
          {error && <p style={s.errorMsg}>{error}</p>}
          <button onClick={handleLogin} style={s.loginBtn}>
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
    <main style={s.page}>
      <div style={s.container}>
        <h1 style={s.title}>Panel de moderacion</h1>

        <div style={s.tabs}>
          {pestanas.map((p) => (
            <button
              key={p.id}
              onClick={() => setPestana(p.id)}
              style={pestana === p.id ? s.tabActive : s.tabInactive}
            >
              {p.label}
            </button>
          ))}
        </div>

        <div style={s.filterBar}>
          <div style={s.filterGroup}>
            <label style={s.filterLabel}>Marca</label>
            <input value={marca} onChange={(e) => setMarca(e.target.value)} placeholder="Ej: Toyota" style={s.filterInput} />
          </div>
          <div style={s.filterGroup}>
            <label style={s.filterLabel}>Modelo</label>
            <input value={modelo} onChange={(e) => setModelo(e.target.value)} placeholder="Ej: Hilux" style={s.filterInput} />
          </div>
          <div style={s.filterGroup}>
            <label style={s.filterLabel}>Año</label>
            <input value={anno} onChange={(e) => setAnno(e.target.value)} placeholder="Ej: 2020" type="number" style={s.filterInput} />
          </div>
          <button onClick={limpiarFiltros} style={s.clearBtn}>Limpiar filtros</button>
          <span style={s.resultsCount}>
            {filtrados.length} resultado{filtrados.length !== 1 ? "s" : ""}
          </span>
        </div>

        {loading && <p style={s.empty}>Cargando...</p>}

        {!loading && filtrados.length === 0 && (
          <p style={s.empty}>No hay anuncios en esta seccion.</p>
        )}

        <div>
          {filtrados.map((auto) => (
            <div key={auto.id} style={s.card}>
              <div style={{ display: "flex", flexDirection: "column", gap: 4, flexShrink: 0 }}>
                {[
                  { url: auto.foto_url, campo: "foto_url" },
                  { url: auto.foto_url_2, campo: "foto_url_2" },
                  { url: auto.foto_url_3, campo: "foto_url_3" },
                ].map(({ url, campo }) => url ? (
                  <div key={campo} style={{ position: "relative" }}>
                    <img src={url} alt={campo} style={s.img} />
                    <button
                      onClick={() => eliminarFoto(auto.id, campo)}
                      style={{
                        position: "absolute", top: 4, right: 4,
                        background: "rgba(0,0,0,0.7)", border: "none",
                        color: "#fff", borderRadius: "50%",
                        width: 20, height: 20, fontSize: 11,
                        cursor: "pointer", display: "flex",
                        alignItems: "center", justifyContent: "center",
                        lineHeight: 1,
                      }}
                    >✕</button>
                  </div>
                ) : (
                  <label key={campo} style={{
                    width: 112, height: 80, background: "rgba(255,255,255,0.03)",
                    border: "0.5px dashed rgba(255,255,255,0.15)", borderRadius: 10,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer", flexShrink: 0,
                  }}>
                    <span style={{ color: "rgba(255,255,255,0.25)", fontSize: 22 }}>+</span>
                    <input type="file" accept=".jpg,.jpeg,.png,.webp,.heic,.heif" style={{ display: "none" }}
                      onChange={async (e) => {
                        const archivo = e.target.files[0];
                        if (!archivo) return;
                        try {
                          const url = await subirFotoAdmin(archivo);
                          await supabase.rpc("actualizar_foto_auto", { auto_id: auto.id, campo, url });
                          cargarAutos(pestana);
                        } catch (err) {
                          alert("Error al subir foto: " + err.message);
                        }
                      }}
                    />
                  </label>
                ))}
              </div>
              <div style={{ flex: 1 }}>
                <h2 style={s.cardTitle}>{auto.marca} {auto.modelo}</h2>
                <p style={s.cardSub}>
                  {auto.ano} · {auto.kilometros?.toLocaleString()} km · USD {auto.precio?.toLocaleString()}
                </p>
                <p style={s.cardDesc}>{auto.descripcion}</p>
                <p style={s.cardMeta}>Tel: {auto.telefono}</p>
                <p style={s.cardMeta}>
                  Publicado: {new Date(auto.created_at).toLocaleDateString("es-AR")}
                </p>
                <div style={s.btnRow}>
                  {pestana === "pendiente" && (
                    <>
                      <button onClick={() => cambiarEstado(auto.id, "aprobado")} style={s.btnGreen}>Aprobar</button>
                      <button onClick={() => cambiarEstado(auto.id, "rechazado")} style={s.btnRed}>Rechazar</button>
                    </>
                  )}
                  {pestana === "aprobado" && (
                    <>
                      <button onClick={() => cambiarEstado(auto.id, "rechazado")} style={s.btnYellow}>Desaprobar</button>
                      <button onClick={() => eliminar(auto.id)} style={s.btnRed}>Eliminar</button>
                    </>
                  )}
                  {pestana === "rechazado" && (
                    <>
                      <button onClick={() => cambiarEstado(auto.id, "aprobado")} style={s.btnGreen}>Aprobar</button>
                      <button onClick={() => eliminar(auto.id)} style={s.btnRed}>Eliminar</button>
                    </>
                  )}
                  <button onClick={() => abrirEditor(auto)} style={s.btnEdit}>Editar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {editando && (
        <div style={s.overlay} onClick={() => setEditando(null)}>
          <div style={s.modal} onClick={(e) => e.stopPropagation()}>
            <h2 style={s.modalTitle}>Editar anuncio</h2>
            <div style={s.modalGrid}>
              <div style={s.modalGroup}>
                <label style={s.modalLabel}>Marca</label>
                <input style={s.modalInput} value={editForm.marca} onChange={(e) => setEditForm({ ...editForm, marca: e.target.value })} />
              </div>
              <div style={s.modalGroup}>
                <label style={s.modalLabel}>Modelo</label>
                <input style={s.modalInput} value={editForm.modelo} onChange={(e) => setEditForm({ ...editForm, modelo: e.target.value })} />
              </div>
              <div style={s.modalGroup}>
                <label style={s.modalLabel}>Año</label>
                <input style={s.modalInput} type="number" value={editForm.ano} onChange={(e) => setEditForm({ ...editForm, ano: e.target.value })} />
              </div>
              <div style={s.modalGroup}>
                <label style={s.modalLabel}>Kilometros</label>
                <input style={s.modalInput} type="number" value={editForm.kilometros} onChange={(e) => setEditForm({ ...editForm, kilometros: e.target.value })} />
              </div>
              <div style={s.modalGroup}>
                <label style={s.modalLabel}>Precio (USD)</label>
                <input style={s.modalInput} type="number" value={editForm.precio} onChange={(e) => setEditForm({ ...editForm, precio: e.target.value })} />
              </div>
              <div style={s.modalGroup}>
                <label style={s.modalLabel}>Telefono</label>
                <input style={s.modalInput} value={editForm.telefono} onChange={(e) => setEditForm({ ...editForm, telefono: e.target.value })} />
              </div>
              <div style={s.modalGroupFull}>
                <label style={s.modalLabel}>Descripcion</label>
                <textarea style={s.modalTextarea} value={editForm.descripcion} onChange={(e) => setEditForm({ ...editForm, descripcion: e.target.value })} />
              </div>

              <div style={s.modalGroupFull}>
                <label style={s.modalLabel}>Fotos</label>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {[
                    { campo: "foto_url", label: "Frente" },
                    { campo: "foto_url_2", label: "Lateral" },
                    { campo: "foto_url_3", label: "Trasera" },
                  ].map(({ campo, label }) => (
                    <div key={campo} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      {editForm[campo] ? (
                        <img src={editForm[campo]} style={{ width: 72, height: 52, objectFit: "cover", borderRadius: 6, flexShrink: 0 }} />
                      ) : (
                        <div style={{ width: 72, height: 52, background: "rgba(255,255,255,0.04)", border: "0.5px dashed rgba(255,255,255,0.15)", borderRadius: 6, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                          <span style={{ color: "rgba(255,255,255,0.2)", fontSize: 11 }}>Sin foto</span>
                        </div>
                      )}
                      <label style={{ flex: 1, background: "rgba(255,255,255,0.06)", border: "0.5px solid rgba(255,255,255,0.12)", borderRadius: 8, padding: "7px 12px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}>{label}</span>
                        <span style={{ color: editFotos[campo] ? "#ff6b35" : "rgba(255,255,255,0.3)", fontSize: 12 }}>
                          {editFotos[campo] ? editFotos[campo].name : "Subir foto"}
                        </span>
                        <input type="file" accept=".jpg,.jpeg,.png,.webp,.heic,.heif" style={{ display: "none" }}
                          onChange={(e) => {
                            const f = e.target.files[0];
                            if (f) setEditFotos({ ...editFotos, [campo]: f });
                          }}
                        />
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div style={s.modalBtnRow}>
              <button onClick={() => setEditando(null)} style={s.modalBtnCancel}>Cancelar</button>
              <button onClick={guardarEdicion} style={s.modalBtnSave}>Guardar cambios</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
