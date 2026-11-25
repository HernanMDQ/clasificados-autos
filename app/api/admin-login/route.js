import { credencialesValidas, crearCookieSesion, cookieLogout, esAdmin } from "@/lib/adminAuth";

// Chequear si hay sesion activa
export async function GET(req) {
  return Response.json({ ok: esAdmin(req) });
}

// Login
export async function POST(req) {
  try {
    const { usuario, password } = await req.json();
    if (!credencialesValidas(usuario, password)) {
      await new Promise((r) => setTimeout(r, 1000)); // frenar fuerza bruta
      return Response.json({ ok: false, error: "Usuario o contrasena incorrectos" }, { status: 401 });
    }
    return Response.json({ ok: true }, { headers: { "Set-Cookie": crearCookieSesion() } });
  } catch {
    return Response.json({ ok: false, error: "Error de login" }, { status: 500 });
  }
}

// Logout
export async function DELETE() {
  return Response.json({ ok: true }, { headers: { "Set-Cookie": cookieLogout() } });
}
