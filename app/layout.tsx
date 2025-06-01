"use client";
import { AuthProvider } from "./context/auth_context";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="Найдите идеальных специалистов и инвесторов для вашего стартапа. Платформа для поиска партнеров, экспертов и финансирования стартапов."
        />
        <title>ProStarter</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <AuthProvider>{children} </AuthProvider>
      </body>
    </html>
  );
}
