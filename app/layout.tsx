import type { Metadata } from "next";
import { Oswald, DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-oswald",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kopi Kebun Bintaro — Menu",
  description:
    "Secangkir tenang di tengah kebun kota — diseduh perlahan, dinikmati tanpa terburu.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body className={`${oswald.variable} ${dmSans.variable} ${fraunces.variable}`}>
        {children}
      </body>
    </html>
  );
}
