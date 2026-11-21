import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

function getApiKey(): string {
  if (process.env.GEMINI_API_KEY) {
    return process.env.GEMINI_API_KEY;
  }
  try {
    const envPath = path.join(process.cwd(), ".env");
    if (fs.existsSync(envPath)) {
      const content = fs.readFileSync(envPath, "utf-8");
      const match = content.match(/GEMINI_API_KEY=\s*([^\r\n]+)/);
      if (match && match[1]) {
        return match[1].trim();
      }
    }
  } catch (err) {
    console.error("Error reading .env file:", err);
  }
  return "";
}

const SYSTEM_INSTRUCTION = `Eres el asistente virtual y estilista personal inteligente de Bershka.
Tu misión es aconsejar a los clientes sobre moda, tendencias, outfits, tallas y combinaciones de ropa con un tono vanguardista, juvenil, fresco y profesional acorde a la marca Bershka.

Catálogo actual disponible en la tienda:
1. Camiseta Tye-Die de tul (9,99 €) - Estilo festivalero/nocturno, estampado semitransparente.
2. Camiseta con manga asimétrica (12,99 €) - Elegante y moderna, ideal para salidas nocturnas o eventos.
3. Camiseta manga larga escote corazón (12,99 €) - Clásica y favorecedora.
4. Camiseta con cuello pico (5,99 €) - Básica de algodón suave, esencial para el día a día.
5. Camiseta de canalé con botones frente (12,99 €) - Toque casual chic, excelente con vaqueros mom-fit.
6. Camiseta cropped con detalle drapeado (12,99 €) - Juvenil y moderna, en rojo vibrante.
7. Camiseta con drapeado lateral (12,99 €) - Ceñida, estiliza la figura.
8. Camiseta con mensaje gráfico vintage (7,99 €) - Estilo streetwear retro.
9. Camiseta tirantes rib fluida (8,99 €) - Básico de verano.
10. Camiseta manga corta lisa seamless (9,99 €) - Ajuste perfecto sin costuras.
11. Top asimétrico escote fiesta (15,99 €) - Destaca por su corte cut-out.
12. Camiseta print retro psicodélico (11,99 €) - Colorida y noventera.

Pautas de respuesta:
- Sé conciso, dinámico y amigable (máximo 2 a 4 párrafos cortos).
- Usa emojis con estilo de forma moderada (✨, ✦, 🖤).
- Da consejos prácticos de cómo combinar las prendas (calzado, pantalones, accesorios, ocasiones).
- Si el cliente tiene dudas sobre tallas, recuérdale que los modelos ajustados suelen requerir una talla más si prefiere un fit más holgado.`;

export async function POST(req: Request) {
  try {
    const apiKey = getApiKey();
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key de Gemini no configurada en el servidor." },
        { status: 500 }
      );
    }

    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Se requiere un array de mensajes." },
        { status: 400 }
      );
    }

    // Convert messages to Gemini format
    const contents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" || m.role === "model" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: SYSTEM_INSTRUCTION }],
        },
        contents,
        generationConfig: {
          temperature: 0.7,
          maxOutputTokens: 600,
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API error:", data);
      return NextResponse.json(
        { error: data.error?.message || "Error al comunicarse con Gemini" },
        { status: response.status }
      );
    }

    const reply =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Lo siento, no pude procesar la respuesta en este momento.";

    return NextResponse.json({ reply });
  } catch (error: any) {
    console.error("API route error:", error);
    return NextResponse.json(
      { error: error.message || "Error interno del servidor" },
      { status: 500 }
    );
  }
}
