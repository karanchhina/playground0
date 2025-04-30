import { Outfit } from "next/font/google";
import "./globals.css";
import NavbarWrapper from "./components/NavbarWrapper";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata = {
  title: "Auth for GenAI Playground",
  description: "Auth for GenAI Playground",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${outfit.variable} antialiased`}
        style={{
          fontFamily: "var(--font-outfit), sans-serif",
        }}
      >
        <div className="flex flex-col h-screen text-gray-800 font-mono bg-white">
          <NavbarWrapper />
          <div className="flex flex-1 bg-white">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
