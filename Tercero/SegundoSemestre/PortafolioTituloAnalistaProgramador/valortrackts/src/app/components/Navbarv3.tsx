"use client";
import CrosshairLogo from "./icons/CrosshairLogo";
import { FiMenu } from "react-icons/fi";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import ThemeSwitcher from "../ThemeSwitcher";

const Dropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !(dropdownRef.current as HTMLElement).contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const paginas = [
    {
      p: "Agentes",
      classHref: "/agentes",
    },
    {
      p: "Jugadores",
      classHref: "/jugadores",
    },
  ];

  return (
    <div className="lg:px-5 py-2 cursor-default block text-center relative">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className={`${isOpen ? "dark:text-white text-[#0db196]" : "text-rose-600"}  transition rounded-lg items-center justify-between`}
      >
        <p className="transition dark:hover:text-white hover:text-[#0db196]">Tablas</p>
      </button>
      {isOpen ? (
        <div className="border border-[#e11d48] dark:bg-gray-900 bg-[#eee7d8] absolute pl-10 pr-10 top-10 lg:top-16 left-0 w-full flex flex-wrap items-start rounded-lg p-2 justify-center cursor-default rounded-r-lg border-left-trasparent z-10">
          {paginas.map((pagina, i) => (
            <Link href={pagina.classHref} key={i}>
              <p className="block px-4 py-2 transition cursor-default  hover:text-[#0db196] sm:w-full sm:justify-center">
                {pagina.p}
              </p>
            </Link>
          ))}
        </div>
      ) : null}
    </div>
  );
};
export default function Navmenu() {
  const [openNav, setOpenNav] = useState(false);
  const [textButton, setTextButton] = useState(<Link
    href="#"
    className="lg:px-5 py-2 cursor-default block text-center no-underline rounded transition text-white bg-rose-600  dark:hover:text-rose-600 dark:hover:bg-white hover:text-white hover:bg-[#0db196]">
    Cargando...
    </Link>);



   //   checkeo login con cookie
   useEffect(() => {
    const checkLoggedIn = async () => {
      const response = await fetch("/api/perfilHandler", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      
      // mientras carga la respuesta, modifica el texto del boton y ponle un spinner
      setTextButton(<Link
        href={`/`}
        className="lg:px-5 py-2 cursor-default block text-center no-underline rounded transition text-white bg-rose-600  dark:hover:text-rose-600 dark:hover:bg-white hover:text-white hover:bg-[#0db196]">
        Cargando...
        </Link>)

      if (response.status === 200) {
        const resJson = await response.json();
        console.log(resJson);
        setTextButton(<Link
        href={`/perfil`}
        className="lg:px-5 py-2 cursor-default block text-center no-underline rounded transition text-white bg-rose-600  dark:hover:text-rose-600 dark:hover:bg-white hover:text-white hover:bg-[#0db196]">
        {resJson.name}
        </Link>) 
        console.log("estas logeado");
      }
      if (response.status !== 200) {
        setTextButton(<Link
          href={`/login`}
          className="lg:px-5 py-2 cursor-default block text-center no-underline rounded transition text-white bg-rose-600  dark:hover:text-rose-600 dark:hover:bg-white hover:text-white hover:bg-[#0db196]">
          Login 
          </Link>) 
        console.log("no estas logeado");
      }
    };
    checkLoggedIn();
  }, []);

  return (
    <header className="border-b border-rose-600 dark:bg-gray-900 bg-[#eee7d8] shadow-md py-3">
      <div className="flex items-center justify-between xl:max-w-7xl xl:mx-auto max-w-full px-[8%] flex-wrap w-full">
        {/* logo */}
        <div className="flex px-2 fill-rose-600 text-rose-600 transition dark:hover:fill-white dark:hover:text-white hover:fill-[#0db196] hover:text-[#0db196] ">
          <CrosshairLogo className="w-9 mr-2" />
          <a href="#" className="cursor-default py-1.5 font-VALORANT text-2xl">
            VAlortrack
          </a>
        </div>

        <FiMenu
          className="lg:hidden block h-6 w-6 cursor-pointer text-rose-600"
          onClick={() => setOpenNav(!openNav)}
        />

<nav className={`${openNav ? "block" : "hidden"} w-full lg:flex lg:items-center lg:w-auto transition-opacity duration-200 ease-in`}>

          <ul className="text-base text-rose-600 lg:flex lg:justify-between">
            <li>
              <Link
                href="/"
                className="lg:px-5 py-2 cursor-default block text-center transition dark:hover:text-white hover:text-[#0db196]"
              >
                Inicio
              </Link>
            </li>
            <li className="relative" >
              <Dropdown />
            </li>
            <li>
              <Link
                href="/infografias"
                className="lg:px-5 py-2 cursor-default block text-center transition dark:hover:text-white hover:text-[#0db196]"
              >
                Infografias
              </Link>
            </li>
            <li>
              <Link
                href="/composiciones"
                className="lg:px-5 py-2 cursor-default block text-center transition dark:hover:text-white hover:text-[#0db196]"
              >
                Composiciones
              </Link>
            </li>
            <li>
            {textButton && <div className="px-3">{textButton}</div>}
            </li>
          </ul>
          <div className="mt-2">

  {/* Agregar el componente ThemeSwitcher aquí */}
  <ThemeSwitcher attribute="class" > 
  {true}
  </ThemeSwitcher>
</div>
          
        </nav>
      </div>
      
    </header>
  );
}
