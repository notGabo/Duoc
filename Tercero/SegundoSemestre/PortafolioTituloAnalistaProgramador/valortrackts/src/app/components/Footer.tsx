import Link from "next/link";
import CrosshairLogo from "./icons/CrosshairLogo";

const Footer = () => {
  return (
    <>
    <footer className="bottom-0 w-full h-20 ">
      <div className="dark:bg-gray-900 bg-[#eee7d8] px-4 md:px-8">
        <div className="mb-16 grid grid-cols-2 gap-12 pt-10 md:grid-cols-4 lg:grid-cols-5 lg:gap-8 lg:pt-12">
          <div className="col-span-full lg:col-span-2">
            <div className="mb-4">
              <Link
                className="inline-flex items-center gap-2 text-xl font-bold dark:text-gray-100 text-neutral-700 dark:fill-white fill-neutral-700 md:text-2xl"
                href="#"
              >
                <CrosshairLogo width={"35px"} />
                <span className="font-VALORANT">VAlortrack</span>
              </Link>
            </div>
            <p className="mb-6 dark:text-gray-400 text-neutral-700 sm:pr-8">
              Proyecto de portfolio de titulo Analista Programador. Duoc UC Sede
              Maipú.
            </p>
          </div>
          <div>
            <p className="mb-4 font-bold uppercase tracking-widest dark:text-gray-100 text-neutral-900">
              Enlaces
            </p>
            <nav className="flex flex-col gap-4">
              <div className="transition duration-100 dark:text-gray-400 text-neutral-700 hover:text-rose-500 active:text-indigo-600">
                <Link
                  className="transition duration-100 dark:text-gray-400 text-neutral-700 hover:text-rose-500 active:text-rose-600"
                  href="https://www.duoc.cl/"
                >
                  Duoc UC
                </Link>
              </div>
              <div>
                <Link
                  className="transition duration-100 dark:text-gray-400 text-neutral-700 hover:text-rose-500 active:text-rose-600"
                  href="#"
                >
                  Recursos utilizados
                </Link>
              </div>
              <div>
                <Link
                  className="transition duration-100 dark:text-gray-400 text-neutral-700 hover:text-rose-500 active:text-rose-600"
                  href="https://github.com/notGabo"
                >
                  Contacto
                </Link>
              </div>
            </nav>
          </div>
          <div>
            <p className="mb-4 font-bold uppercase tracking-widest dark:text-gray-100 text-neutral-900">
              Nosotros
            </p>
            <nav className="flex flex-col gap-4">
              <div>
                <Link
                  className="transition duration-100 dark:text-gray-400 text-neutral-700 hover:text-rose-500 active:text-rose-600"
                  href="https://github.com/Alvaro-AAC"
                >
                  @Alvaro-AAC
                </Link>
              </div>
              <div>
                <Link
                  className="transition duration-100 dark:text-gray-400 text-neutral-700 hover:text-rose-500 active:text-rose-600"
                  href="https://github.com/notGabo"
                >
                  @notGabo
                </Link>
              </div>
            </nav>
          </div>
          <div>
            <p className="mb-4 font-bold uppercase tracking-widest dark:text-gray-100 text-neutral-900">
              Documentacion
            </p>
            <nav className="flex flex-col gap-4">
              <div>
                <Link
                  className="transition duration-100 dark:text-gray-400 text-neutral-700 hover:text-rose-500 active:text-rose-600"
                  href="https://github.com/notGabo/valortrackts"
                >
                  Repositorio front end
                </Link>
              </div>
              <div>
                <Link
                  className="transition duration-100 dark:text-gray-400 text-neutral-700 hover:text-rose-500 active:text-rose-600"
                  href="http://129.151.120.46:8123/lab"
                >
                  Link backend Jupyter
                </Link>
              </div>
              <div>
                <Link
                  className="transition duration-100 dark:text-gray-400 text-neutral-700 hover:text-rose-500 active:text-rose-600"
                  href="https://github.com/notGabo/valortrackts/tree/master/Diagramas"
                >
                  Diagramas
                </Link>
              </div>
            </nav>
          </div>
        </div>
        <p className="border-t border-gray-800 py-8 text-center text-sm text-gray-400">
          © 2023 - Alvaro Arenas | Gabriel Soto.
        </p>
        </div>
    </footer>
    </>
    );
    
};
export default Footer;
