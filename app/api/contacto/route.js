import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const { nombre, email, asunto, mensaje } = await req.json();

    if (!nombre || !email || !asunto || !mensaje) {
      return Response.json({ ok: false, error: "Todos los campos son obligatorios" }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Autos Concordia" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: email,
      subject: `Contacto web: ${asunto}`,
      html: `
        <div style="font-family: sans-serif; max-width: 560px;">
          <h2 style="color: #ff4500;">Nuevo mensaje desde Autos Concordia</h2>
          <table style="width:100%; border-collapse: collapse;">
            <tr><td style="padding: 8px 0; color: #666; width: 100px;">Nombre</td><td style="padding: 8px 0;"><strong>${nombre}</strong></td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #666;">Asunto</td><td style="padding: 8px 0;">${asunto}</td></tr>
          </table>
          <hr style="margin: 16px 0; border: none; border-top: 1px solid #eee;" />
          <p style="color: #333; line-height: 1.6; white-space: pre-wrap;">${mensaje}</p>
          <hr style="margin: 16px 0; border: none; border-top: 1px solid #eee;" />
          <p style="color: #999; font-size: 12px;">Mensaje enviado desde el formulario de contacto de autoconcordia.com.ar</p>
        </div>
      `,
    });

    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ ok: false, error: error.message }, { status: 500 });
  }
}
