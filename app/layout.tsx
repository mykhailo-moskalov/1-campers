import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./css/globals.css";
import Header from "@/components/Header/Header";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import { Toaster } from "react-hot-toast";

const inter = Inter({
  weight: ["400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Campers",
  description: "Web app for finding best campers",
  openGraph: {
    title: "Campers",
    description: "Web app for finding best campers",
    url: ``, // !!!
    images: [
      {
        url: "/home.jpg", // !!!
        width: 1200,
        height: 630,
        alt: "Campers",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Campers`,
    description: "Web app for finding best campers",
    images: ["/home.jpg"], // !!!
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        <TanStackProvider>
          <Header />
          {children}
          <Toaster position="top-right" />
        </TanStackProvider>
      </body>
    </html>
  );
}
