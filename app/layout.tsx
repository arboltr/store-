import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Camisetas de Mujer | Bershka",
  description: "Descubre las últimas tendencias en camisetas de mujer en Bershka. Nuevos modelos cada semana: básicas, estampadas, manga corta y tops.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className="h-full antialiased">
      <body className="min-h-full flex flex-col font-sans bg-white text-[#111111]">
        {children}
      </body>
    </html>
  );
}
