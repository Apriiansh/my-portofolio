import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Apri's Portfolio - Full-Stack Developer & Designer",
  description: "Modern portfolio website showcasing full-stack development and creative design skills. Built with Next.js, TypeScript, and Tailwind CSS.",
  keywords: "portfolio, full-stack developer, web developer, designer, Next.js, React, TypeScript",
  authors: [{ name: "Apri" }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#fef3c7" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" }
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}