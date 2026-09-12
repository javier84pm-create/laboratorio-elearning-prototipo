import type { Metadata } from "next";
import { Lexend, Outfit } from "next/font/google";
import { DemoProviders } from "@/components/DemoProviders";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const lexend = Lexend({
  variable: "--font-lexend",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SmartCaps | Laboratorio E-Learning",
  description:
    "Prototipo de microcápsulas interactivas SmartCaps para Laboratorio E-Learning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${outfit.variable} ${lexend.variable} antialiased`}>
        <DemoProviders>{children}</DemoProviders>
      </body>
    </html>
  );
}
