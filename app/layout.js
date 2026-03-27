import "./globals.css";

export const metadata = {
  title: "Clasificados IA",
  description: "Buscá tu próximo auto con inteligencia artificial",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>
        <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
          <a href="/" className="text-xl font-bold text-blue-600">
            Clasificados IA
          </a>
          <div className="flex gap-4">
            <a href="/" className="text-gray-600 hover:text-blue-500">
              Buscar
            </a>
            <a href="/autos" className="text-gray-600 hover:text-blue-500">
              Autos
            </a>
            <a href="/publicar" className="bg-blue-500 text-white px-4 py-1 rounded-xl hover:bg-blue-600">
              Publicar
            </a>
          </div>
        </nav>
        {children}
      </body>
    </html>
  );
}