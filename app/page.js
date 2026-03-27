"use client";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Hola! Soy tu asistente de autos. Que tipo de auto estas buscando?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (messages.length > 1) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: input,
        historial: updatedMessages.map((m) => ({
          role: m.role === "user" ? "user" : "assistant",
          content: m.text
        }))
      }),
    });

    const data = await res.json();
    setMessages((prev) => [...prev, { role: "assistant", text: data.reply }]);
    setLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  const ejemplos = [
    "Busco una pickup hasta USD 20.000",
    "Quiero un auto familiar del 2019 en adelante",
    "Tenes algo automatico por menos de USD 15.000?",
  ];

  return (
    <main className="min-h-screen bg-gray-100">

      <section className="bg-blue-600 text-white py-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-4">Encontra tu proximo auto con IA</h1>
        <p className="text-blue-100 text-lg mb-6 max-w-xl mx-auto">
          Contanos que estas buscando y nuestra IA te ayuda a encontrar el auto ideal entre todos los anuncios disponibles.
        </p>
        <div className="flex justify-center gap-3 flex-wrap">
          <a href="/autos" className="bg-white text-blue-600 font-semibold px-6 py-2 rounded-xl hover:bg-blue-50">
            Ver todos los autos
          </a>
          <a href="/publicar" className="bg-blue-500 border border-white text-white font-semibold px-6 py-2 rounded-xl hover:bg-blue-700">
            Publicar mi auto
          </a>
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-4 py-10">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-gray-800">Buscar con IA</h2>
            <button
              onClick={() => setMessages([{ role: "assistant", text: "Hola! Soy tu asistente de autos. Que tipo de auto estas buscando?" }])}
              className="text-sm text-gray-400 hover:text-red-400"
            >
              Nueva conversacion
            </button>
          </div>

          <div className="bg-gray-50 rounded-xl p-4 h-64 overflow-y-auto mb-4 flex flex-col gap-3">
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`px-4 py-2 rounded-2xl max-w-xs text-sm ${
                  msg.role === "user"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="px-4 py-2 rounded-2xl bg-gray-200 text-gray-500 text-sm">
                  Escribiendo...
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ej: busco una pickup hasta $20.000..."
              className="flex-1 border border-gray-300 rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={sendMessage}
              className="bg-blue-500 text-white px-4 py-2 rounded-xl hover:bg-blue-600"
            >
              Enviar
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {ejemplos.map((ej, i) => (
              <button
                key={i}
                onClick={() => setInput(ej)}
                className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full hover:bg-blue-50 hover:text-blue-600"
              >
                {ej}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 pb-16">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-8">Como funciona</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <p className="text-4xl mb-3">🔍</p>
            <h3 className="font-bold text-gray-800 mb-2">Busca con IA</h3>
            <p className="text-gray-500 text-sm">Contanos que auto necesitas en lenguaje natural y la IA busca por vos.</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <p className="text-4xl mb-3">📋</p>
            <h3 className="font-bold text-gray-800 mb-2">Explora el listado</h3>
            <p className="text-gray-500 text-sm">Filtra por marca, precio y año para encontrar exactamente lo que buscas.</p>
          </div>
          <div className="bg-white rounded-2xl shadow p-6 text-center">
            <p className="text-4xl mb-3">💬</p>
            <h3 className="font-bold text-gray-800 mb-2">Contacta por WhatsApp</h3>
            <p className="text-gray-500 text-sm">Conectate directamente con el vendedor con un solo clic.</p>
          </div>
        </div>
      </section>

    </main>
  );
}