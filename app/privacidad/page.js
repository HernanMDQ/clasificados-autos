export default function Privacidad() {
  const secciones = [
    {
      titulo: "Datos que recopilamos",
      contenido: [
        "Número de teléfono del vendedor, utilizado exclusivamente para que los interesados puedan contactarse.",
        "Fotografías del vehículo publicado.",
        "Datos del vehículo: marca, modelo, año, kilometraje, precio y descripción proporcionada por el usuario.",
      ]
    },
    {
      titulo: "Uso de los datos",
      contenido: [
        "El número de teléfono se muestra en el anuncio para facilitar el contacto entre comprador y vendedor.",
        "Las fotografías se publican en el anuncio y se almacenan en nuestros servidores mientras el anuncio esté activo.",
        "No compartimos datos personales con terceros ni los utilizamos con fines publicitarios.",
        "No vendemos ni cedemos información personal bajo ninguna circunstancia.",
      ]
    },
    {
      titulo: "Moderación de anuncios",
      contenido: [
        "Todos los anuncios son revisados por nuestro equipo antes de ser publicados.",
        "Nos reservamos el derecho de rechazar anuncios que no cumplan con las condiciones del sitio.",
        "Cada número de teléfono puede tener un único vehículo publicado activo a la vez.",
      ]
    },
    {
      titulo: "Conservación de datos",
      contenido: [
        "Los anuncios rechazados son eliminados automáticamente a los 30 días.",
        "Los anuncios aprobados permanecen publicados hasta que el vendedor solicite la baja o sean dados de baja por el equipo de moderación.",
        "Las fotografías asociadas a un anuncio eliminado son borradas de nuestros servidores.",
      ]
    },
    {
      titulo: "Baja y eliminación de datos",
      contenido: [
        "Para solicitar la baja de un anuncio o la eliminación de tus datos personales, podés contactarnos por WhatsApp al número de soporte que figura en el sitio.",
        "Procesaremos tu solicitud en un plazo máximo de 48 horas hábiles.",
        "Una vez eliminado el anuncio, tus datos y fotografías serán removidos de nuestros servidores.",
      ]
    },
    {
      titulo: "Seguridad",
      contenido: [
        "Utilizamos servicios de almacenamiento seguros para proteger la información publicada.",
        "No almacenamos contraseñas ni datos bancarios de ningún tipo.",
        "Recomendamos a los usuarios no compartir información personal sensible más allá de lo necesario para concretar la venta.",
      ]
    },
    {
      titulo: "Veracidad de la informacion publicada",
      contenido: [
        "Al publicar un anuncio en Autos Concordia, el usuario declara que toda la informacion ingresada (datos del vehiculo, precio, kilometraje, fotografias y descripcion) es verdadera, precisa y corresponde al vehiculo que se ofrece.",
        "La aceptacion de estas politicas al momento de publicar implica el compromiso expreso del usuario de no ingresar datos falsos, engañosos o que puedan inducir a error a potenciales compradores.",
        "Autos Concordia se reserva el derecho de dar de baja publicaciones que contengan informacion incorrecta o fraudulenta, sin perjuicio de las acciones que correspondan.",
      ]
    },
    {
      titulo: "Contacto",
      contenido: [
        "Para consultas relacionadas con privacidad o solicitudes de eliminación de datos, contactanos por WhatsApp a través del botón de soporte disponible en el sitio.",
        "También podés escribirnos directamente y te responderemos a la brevedad.",
      ]
    },
  ];

  return (
    <main style={{ background: "#0d1520", minHeight: "100vh", padding: "40px 24px" }}>
      <title>Politicas de privacidad | Autos Concordia</title>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <a href="/" style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, textDecoration: "none", display: "block", marginBottom: 24 }}>
          ← Volver al inicio
        </a>
        <div style={{ background: "#111c2b", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "36px 32px" }}>
          <h1 style={{ color: "#fff", fontSize: 24, fontWeight: 500, marginBottom: 6 }}>
            Politicas de privacidad
          </h1>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, marginBottom: 36, lineHeight: 1.6 }}>
            En Autos Concordia nos comprometemos a proteger tu informacion personal. A continuacion detallamos como recopilamos, usamos y resguardamos los datos que nos proporcionas.
          </p>

          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            {secciones.map((seccion, i) => (
              <div key={i}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                  <div style={{ width: 4, height: 20, background: "#ff4500", borderRadius: 2 }} />
                  <h2 style={{ color: "#fff", fontSize: 16, fontWeight: 500 }}>{seccion.titulo}</h2>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8, paddingLeft: 14 }}>
                  {seccion.contenido.map((punto, j) => (
                    <div key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                      <div style={{ width: 4, height: 4, borderRadius: "50%", background: "#ff4500", marginTop: 7, flexShrink: 0, opacity: 0.6 }} />
                      <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 14, lineHeight: 1.65 }}>{punto}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div style={{
            marginTop: 36,
            background: "rgba(255,69,0,0.06)",
            border: "0.5px solid rgba(255,69,0,0.2)",
            borderRadius: 10,
            padding: "16px 20px"
          }}>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, lineHeight: 1.6 }}>
              Ultima actualizacion: marzo 2026. Autos Concordia se reserva el derecho de modificar estas politicas en cualquier momento. Los cambios seran notificados a traves del sitio.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}