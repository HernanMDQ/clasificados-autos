const BUCKET = "fotos-autos";
const MARCA = `/storage/v1/object/public/${BUCKET}/`;
export const CAMPOS_FOTO = ["foto_url", "foto_url_2", "foto_url_3"];

// De la URL publica a la ruta dentro del bucket (null si no es de nuestro bucket)
function rutaDesdeUrl(url) {
  if (typeof url !== "string") return null;
  const i = url.indexOf(MARCA);
  if (i === -1) return null;
  return decodeURIComponent(url.slice(i + MARCA.length).split("?")[0]);
}

// Borra del Storage los archivos de las URLs dadas. Requiere cliente con service role.
export async function borrarFotos(supabase, urls) {
  const rutas = urls.map(rutaDesdeUrl).filter(Boolean);
  if (!rutas.length) return;
  const { error } = await supabase.storage.from(BUCKET).remove(rutas);
  if (error) console.error("Error borrando fotos:", error.message);
}

// Elimina autos (filas + fotos). `autos` debe traer id y los campos de foto.
export async function eliminarAutosConFotos(supabase, autos) {
  if (!autos?.length) return { error: null };
  const { error } = await supabase.from("autos").delete().in("id", autos.map((a) => a.id));
  if (error) return { error };
  await borrarFotos(supabase, autos.flatMap((a) => CAMPOS_FOTO.map((c) => a[c])));
  return { error: null };
}

// Borra los rechazados con mas de 30 dias (y sus fotos)
export async function limpiarRechazadosViejos(supabase) {
  const limite = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString();
  const { data, error } = await supabase
    .from("autos")
    .select(`id, ${CAMPOS_FOTO.join(", ")}`)
    .eq("estado", "rechazado")
    .lt("created_at", limite);
  if (error) return { error, borrados: 0 };
  const res = await eliminarAutosConFotos(supabase, data);
  return { error: res.error, borrados: res.error ? 0 : data.length };
}
