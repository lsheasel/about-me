import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Shease | Developer & Linux Enthusiast",
  description:
    "Portfolio of Shease - Full Stack Developer, Linux Enthusiast and Open Source Contributor",
  icons: {
    icon: [
      {
        url: "/favicon.ico", // Beachte: kein ./ am Anfang
        sizes: "any",
      },
    ],
    // apple icon kann entfernt werden wenn nicht benötigt
  },
  keywords: ["Developer", "Linux", "Next.js", "React", "Portfolio"],
  openGraph: {
    title: "Shease | Developer & Linux Enthusiast",
    description:
      "Portfolio of Shease - Full Stack Developer, Linux Enthusiast and Open Source Contributor",
    url: "https://shease.de",
    siteName: "Shease Portfolio",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
