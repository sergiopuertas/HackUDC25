import type { Metadata } from "next";
import "./globals.css";
import { poppins } from "../fonts/fonts";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no"
        />
      </head>
      <body
        style={poppins.style}
        className={`dark antialiased overflow-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
