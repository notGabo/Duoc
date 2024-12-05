"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CgSpinnerAlt } from "react-icons/cg";

interface PerfilData {
  mensaje: string;
  userid: number;
  name: string;
  gender: string;
  birthdate: string;
  phone: number;
  mail: string;
  password: string;
}

export default function Perfil() {
  const [datosPerfil, setDatosPerfil] = useState<PerfilData | null>(null);
  const router = useRouter();

  useEffect(() => {
    const checkLoggedIn = async () => {
      const response = await fetch("/api/perfilHandler", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.status === 200) {
        const resJson = await response.json();
        console.log(resJson);
        setDatosPerfil(resJson);
        console.log("datos");
        console.log(datosPerfil);
        console.log("estás logeado");
      } else {
        console.log("no estás logeado");
        router.push("/login");
      }
    };

    checkLoggedIn();
  }, []);

  const cerrarSesion = async () => {
    // get request to /api/cerrarsesion
    const response = await fetch("/api/cerrarsesion", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    if (response.status === 200) {
      window.location.reload();
      router.push("/");
    }
  };

  // pantalla de carga
  // si los datos aun no se han cargado
  if (!datosPerfil) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center text-rose-600 transition duration-300 hover:scale-110 hover:text-[#0db196]">
          <CgSpinnerAlt className="animate-spin h-32 w-32 text-rose-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-6 mb-10 mt-10 w-full max-w-md rounded-lg border border-rose-600 dark:bg-gray-900 bg-[#EEE7D8] p-6 shadow-lg md:mx-0">
        <div className="flex flex-col items-center justify-center">
          <h1 className="mb-6 text-2xl font-bold leading-tight text-rose-600 font-VALORANT"></h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label className="mb-2 text-sm text-rose-600 font-VALORANT">
                Id de usuario
              </label>
              <p
                className="mb-6 text-xl dark:text-white text-black"
                style={{ wordWrap: "break-word" }}
              >
                {datosPerfil?.userid ?? "Error cargando datos"}
              </p>
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-sm text-rose-600 font-VALORANT">
                Correo electrónico
              </label>
              <p
                className="mb-6 text-xl dark:text-white text-black"
                style={{ wordWrap: "break-word" }}
              >
                {" "}
                {datosPerfil?.mail ?? "Error cargando datos"}
              </p>
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-sm text-rose-600 font-VALORANT">
                Clave
              </label>
              <p
                className="mb-6 text-xl dark:text-white text-black"
                style={{ wordWrap: "break-word" }}
              >
                {datosPerfil?.mail ?? "Error cargando datos"}
              </p>
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-sm text-rose-600 font-VALORANT">
                Nombre
              </label>
              <p
                className="mb-6 text-xl dark:text-white text-black"
                style={{ wordWrap: "break-word" }}
              >
                {datosPerfil?.name ?? "Error cargando datos"}
              </p>
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-sm text-rose-600 font-VALORANT">
                Sexo
              </label>
              <p
                className="mb-6 text-xl dark:text-white text-black"
                style={{ wordWrap: "break-word" }}
              >
                {datosPerfil?.gender ?? "Error cargando datos"}
              </p>
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-sm text-rose-600 font-VALORANT">
                Fecha de nacimiento
              </label>
              <p
                className="mb-6 text-xl dark:text-white text-black"
                style={{ wordWrap: "break-word" }}
              >
                {datosPerfil?.birthdate ?? "Error cargando datos"}
              </p>
            </div>
            <div className="flex flex-col">
              <label className="mb-2 text-sm text-rose-600 font-VALORANT">
                Telefono
              </label>
              <p
                className="mb-6 text-xl dark:text-white text-black"
                style={{ wordWrap: "break-word" }}
              >
                {datosPerfil?.phone ?? "Error cargando datos"}
              </p>
            </div>
          </div>
          <button
            className="mt-8 px-4 py-2 text-white  bg-rose-600 rounded-lg shadow-lg transition duration-300 hover:bg-green-600"
            onClick={cerrarSesion}
          >
            Cerrar sesión
          </button>
        </div>
      </div>
    </div>
  );
}
