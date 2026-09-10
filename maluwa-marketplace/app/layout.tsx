import type { Metadata } from "next";
import { Source_Serif_4, Be_Vietnam_Pro } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/lib/context/CartContext";
import { Notifications } from "@/lib/components/Notifications";


const sourceSerif = Source_Serif_4({
  variable: "--font-source-serif",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const beVietnam = Be_Vietnam_Pro({
  variable: "--font-be-vietnam",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Malawi Bloom - The Warm Heart of Africa in Every Petal",
  description: "Discover Malawi's most exquisite local blooms, hand-picked and delivered with the same warmth that defines our home.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${sourceSerif.variable} ${beVietnam.variable} scroll-smooth`}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-background text-on-background font-body-md selection:bg-primary-container selection:text-on-primary-container">
        <CartProvider>
          <Notifications />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
