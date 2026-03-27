import "./globals.css";

export const metadata = {
  title: "Clasificados IA",
  description: "Buscá tu próximo auto con inteligencia artificial",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className="overflow-x-hidden">
        <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center sticky top-0 z-50">
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
        
          <a href="https://wa.me/+543454045864"
          target="_blank"
          className="fixed bottom-6 right-6 flex items-center gap-2 group z-50"
        >
          <span className="bg-white text-green-600 text-sm font-medium px-3 py-1 rounded-xl shadow opacity-0 group-hover:opacity-100 transition-opacity">
            Soporte Humano
          </span>
          <div className="bg-green-500 hover:bg-green-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg text-2xl">
            💬
          </div>
        </a>
      </body>
    </html>
  );
}