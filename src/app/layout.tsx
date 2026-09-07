import type { Metadata } from "next";
import { Fredoka, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
  variable: "--font-fredoka",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Happy Birthday Asha Mecca Mandani | Special Scrapbook Edition",
  description: "Special Cutie Scrapbook Paper Craft Birthday Celebration & Surprise Drop",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${fredoka.variable} ${jakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col text-[#4a1215] font-sans antialiased selection:bg-[#b82329] selection:text-[#fcf7ea]">
        {children}
      </body>
    </html>
  );
}
