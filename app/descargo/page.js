export default function Descargo() {
  const secciones = [
    {
      titulo: "Responsabilidad sobre el contenido publicado",
      contenido: [
        "Toda la información incluida en los anuncios (precio, estado del vehículo, kilometraje, fotografías y descripción) es ingresada exclusivamente por el usuario que realiza la publicación.",
        "Autos Concordia no verifica, valida ni garantiza la veracidad, exactitud o integridad de los datos proporcionados por los vendedores.",
        "Revisamos los anuncios antes de publicarlos para detectar contenido inapropiado o claramente fraudulento, pero esta moderación no implica una certificación de la información declarada.",
      ]
    },
    {
      titulo: "No somos intermediarios",
      contenido: [
        "Autos Concordia es únicamente un medio de contacto entre compradores y vendedores particulares.",
        "No participamos, intervenimos ni representamos a ninguna de las partes en las negociaciones ni en las operaciones de compraventa.",
        "No recibimos dinero, no gestionamos pagos y no somos responsables por el resultado de ninguna transacción realizada entre usuarios.",
        "El acuerdo de compraventa se realiza directa y exclusivamente entre comprador y vendedor, quedando Autos Concordia completamente ajena a dicha operación.",
      ]
    },
    {
      titulo: "Verificación previa a la compra",
      contenido: [
        "Recomendamos firmemente a los compradores verificar el estado real del vehículo de manera presencial antes de realizar cualquier pago o acuerdo.",
        "Es aconsejable solicitar la documentación del vehículo (título, cédula, VTV) y consultar con un profesional de confianza ante cualquier duda.",
        "Ante la posibilidad de un vehículo con deudas, inhibiciones o problemas legales, sugerimos realizar las consultas correspondientes en los organismos oficiales.",
      ]
    },
    {
      titulo: "Prevención de fraudes",
      contenido: [
        "Desconfiá de ofertas que parezcan demasiado convenientes o de vendedores que soliciten pagos anticipados, señas por transferencia o datos personales sensibles.",
        "Nunca realices pagos sin haber verificado el vehículo y la documentación de manera presencial.",
        "Si detectás un anuncio sospechoso o fraudulento, te pedimos que nos lo informes a través del botón de soporte para que podamos revisarlo y tomar las medidas correspondientes.",
      ]
    },
    {
      titulo: "Límite de responsabilidad",
      contenido: [
        "Autos Concordia no se hace responsable por daños, perjuicios, pérdidas económicas ni conflictos de ninguna naturaleza que surjan como consecuencia de una operación de compraventa realizada entre usuarios del sitio.",
        "Tampoco somos responsables por la conducta de los usuarios, la calidad de los vehículos publicados ni por el incumplimiento de acuerdos entre las partes.",
        "El uso del sitio implica la aceptación de estas condiciones por parte del usuario.",
      ]
    },
    {
      titulo: "Conducta del usuario",
      contenido: [
        "Los usuarios se comprometen a publicar información veraz y actualizada sobre los vehículos que ofrecen.",
        "Está prohibido publicar vehículos con datos falsos, precios engañosos o fotografías que no correspondan al vehículo anunciado.",
        "Nos reservamos el derecho de dar de baja cualquier publicación y bloquear a usuarios que incumplan estas condiciones, sin necesidad de notificación previa.",
      ]
    },
    {
      titulo: "Contacto ante inconvenientes",
      contenido: [
        "Si tuviste un problema con un vendedor o detectaste información falsa en un anuncio, podés contactarnos por WhatsApp a través del botón de soporte disponible en el sitio.",
        "Próximamente también estará disponible un correo electrónico de contacto para este tipo de consultas.",
        "Evaluaremos cada caso y tomaremos las acciones que estén a nuestro alcance dentro del sitio, sin que esto implique responsabilidad legal de nuestra parte.",
      ]
    },
  ];

  return (
    <main style={{ background: "#0d1520", minHeight: "100vh", padding: "40px 24px" }}>
      <title>Descargo de responsabilidad | Autos Concordia</title>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <a href="/" style={{ color: "rgba(255,255,255,0.4)", fontSize: 13, textDecoration: "none", display: "block", marginBottom: 24 }}>
          ← Volver al inicio
        </a>
        <div style={{ background: "#111c2b", border: "0.5px solid rgba(255,255,255,0.07)", borderRadius: 16, padding: "36px 32px" }}>
          <h1 style={{ color: "#fff", fontSize: 24, fontWeight: 500, marginBottom: 6 }}>
            Descargo de responsabilidad
          </h1>
          <p style={{ color: "rgba(255,255,255,0.35)", fontSize: 13, marginBottom: 36, lineHeight: 1.6 }}>
            Autos Concordia es una plataforma de avisos clasificados que facilita el contacto entre compradores y vendedores de vehículos usados en Concordia, Argentina. A continuación detallamos el alcance y los límites de nuestra responsabilidad.
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
              Ultima actualizacion: abril 2026. Autos Concordia se reserva el derecho de modificar este descargo en cualquier momento. El uso continuado del sitio implica la aceptación de las condiciones vigentes.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
