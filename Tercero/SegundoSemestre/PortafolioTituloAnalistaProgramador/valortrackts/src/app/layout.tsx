import "./globals.css";
import localFont from "next/font/local";
import Navmenu from "./components/Navbarv3";
import Footer from "./components/Footer";
import Providers from "./Providers";

const valorant = localFont({
  src: "../../public/fonts/ValorantFont.ttf",
  variable: "--font-valorant",
});

export const metadata = {
  title: "Valortrack",
  description: "Portafolio de título - Alvaro Arenas, Gabriel Soto",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${valorant.variable}`}>
      <Providers>
      <body className="dark:bg-gray-950 bg-[#fcf8ed] flex flex-col min-h-screen" suppressHydrationWarning={true} >
        <div className="relative">
          <Navmenu />
          {children}
          <Footer />
        </div>
      </body>
      </Providers>
    </html>
  );
}
