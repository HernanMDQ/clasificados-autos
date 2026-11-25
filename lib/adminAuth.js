import crypto from "crypto";

const COOKIE = "admin_session";
const DURACION_MS = 12 * 60 * 60 * 1000; // 12 horas

function secreto() {
  const s = process.env.ADMIN_SESSION_SECRET;
  if (!s || s.length < 32) throw new Error("ADMIN_SESSION_SECRET no configurado");
  return s;
}

function firmar(payload) {
  return crypto.createHmac("sha256", secreto()).update(payload).digest("base64url");
}

function igualSeguro(a, b) {
  const ha = crypto.createHash("sha256").update(String(a)).digest();
  const hb = crypto.createHash("sha256").update(String(b)).digest();
  return crypto.timingSafeEqual(ha, hb);
}

export function credencialesValidas(usuario, password) {
  const U = process.env.ADMIN_USER;
  const P = process.env.ADMIN_PASSWORD;
  if (!U || !P) return false;
  // evaluar ambas para no filtrar cual fallo por tiempo
  const okU = igualSeguro(usuario ?? "", U);
  const okP = igualSeguro(password ?? "", P);
  return okU && okP;
}

export function crearCookieSesion() {
  const exp = Date.now() + DURACION_MS;
  const payload = `admin.${exp}`;
  const token = `${payload}.${firmar(payload)}`;
  return `${COOKIE}=${token}; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=${DURACION_MS / 1000}`;
}

export function cookieLogout() {
  return `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Strict; Max-Age=0`;
}

export function esAdmin(req) {
  try {
    const header = req.headers.get("cookie") || "";
    const match = header.split(/;\s*/).find((c) => c.startsWith(`${COOKIE}=`));
    if (!match) return false;
    const token = match.slice(COOKIE.length + 1);
    const partes = token.split(".");
    if (partes.length !== 3) return false;
    const [sujeto, exp, firma] = partes;
    if (sujeto !== "admin" || !(Number(exp) > Date.now())) return false;
    return igualSeguro(firma, firmar(`${sujeto}.${exp}`));
  } catch {
    return false;
  }
}

export function noAutorizado() {
  return Response.json({ ok: false, error: "No autorizado" }, { status: 401 });
}
