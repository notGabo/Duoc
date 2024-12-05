"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CrosshairLogo from "../components/icons/CrosshairLogo";


export default function Login() {
  const router = useRouter();
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [submitMessage, setSubmitMessage] = useState(<></>);
  const [credentials, setCredentials] = useState({
    mail: "",
    clave: "",
  });

  const handleChange = (e: any) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  // envio formulario login a backend
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(credentials),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    console.log(credentials)
    const data = await response.json();
    console.log(data)
    // si el objeto viene vacio, quiere decir que algun dato esta erroneo

    // while data is loading, show a loading message
    setSubmitMessage(
      <div className="bg-yellow-500 py-3 px-1 text-center border-4 text-white border-yellow-800 rounded-xl animate-pulse">
        <p>Cargando...</p>
      </div>
    );

    
    if (Object.keys(data).length === 0) {
      setSubmitMessage(
        <div className="bg-red-500 py-3 px-1 text-center border-4 text-white border-red-800 rounded-xl animate-pulse">
          <p>Usuario o contraseña incorrectos</p>
        </div>
      )
    }
    // si el objeto viene con datos, quiere decir que el login fue exitoso y se redirecciona a home
    else {
      // force reload to the home page
      setSubmitMessage(
        <div className="bg-green-500 py-3 px-1 text-center border-4 text-white border-green-800 rounded-xl animate-pulse">
          <p>Sesion iniciada! redireccinando </p>
        </div>
      )
      window.location.replace("/");
    }
  };

    useEffect(() => {
    // Verificar si los campos obligatorios están llenos
    const isRequiredFieldsFilled =
    credentials.mail !== "" && credentials.clave !== "";
    // Actualizar el estado de isSubmitDisabled
    setIsSubmitDisabled(!isRequiredFieldsFilled);
  }, [credentials]);


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
      if (response.status === 200) {
        setSubmitMessage(
          <div className="bg-green-500 py-3 px-1 text-center border-4 text-white border-green-800 rounded-xl animate-pulse">
            <p>Sesion inicada</p>
          </div>)
        router.push("/");
      }
      if (response.status !== 200) {
        console.log("no estas logeado");
      }
    };
    checkLoggedIn();
  }, []);

  return (
    <>
      <div className="mx-auto flex min-h-screen flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
        <CrosshairLogo className="fill-rose-600 h-[100px] w-[100px] mb-10 animate-pulse" />
        <div className="w-full rounded-lg border border-rose-600 dark:bg-gray-900 bg-[#EEE7D8] shadow sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-xl font-VALORANT text-rose-600 md:text-2xl">
              Ingresa a tu cuenta
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label
                  htmlFor="mail"
                  className="mb-2 block text-sm font-medium text-rose-600"
                >
                  Correo
                </label>
                <input
                  type="email"
                  name="mail"
                  id="mail"
                  onChange={handleChange}
                  className="dark:border-gray-600 dark:bg-gray-700  dark:text-white dark:placeholder-gray-400 bg-[#FCF8ED] border-gray-400  focus:ring-red-600 focus:border-red-600 block w-full rounded-lg p-2.5 sm:text-sm"
                  placeholder="correo@ejemplo.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="clave"
                  className="mb-2 block text-sm font-medium text-rose-600"
                >
                  Contraseña
                </label>
                <input
                  type="password"
                  name="clave"
                  id="clave"
                  onChange={handleChange}
                  className="dark:border-gray-600 dark:bg-gray-700  dark:text-white dark:placeholder-gray-400 bg-[#FCF8ED] border-gray-400  focus:ring-red-600 focus:border-red-600 block w-full rounded-lg p-2.5 sm:text-sm"
                  placeholder="********"
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <Link
                  href="#"
                  className="text-rose-600  text-sm font-medium hover:underline"
                >
                  Olvidé mi contraseña
                </Link>
              </div>
              {/* <button
                onClick={handleSubmit}
                className="w-full rounded-lg bg-rose-600 px-5 py-2.5 text-center text-sm font-medium text-white transition duration-300 hover:bg-green-500 hover:text-white hover:shadow-2xl hover:shadow-red-600 focus:outline-none focus:ring-4"
              >
                Iniciar Sesión
              </button> */}

              <button
              disabled={isSubmitDisabled}
              className={`${ isSubmitDisabled ? "bg-gray-600 cursor-not-allowed" : "bg-rose-600 hover:bg-green-500"} w-full rounded-lg px-5 py-2.5 text-center text-sm font-medium text-white transition duration-300 focus:outline-none focus:ring-4`} >
              {`${
                isSubmitDisabled ? "Verifica bien tus datos" : "Iniciar sesion"
              } `}
              </button>

              <p className="text-sm font-light text-rose-600">
                ¿Aún no tienes una cuenta?{" "}
                <Link
                  href="/register"
                  className="text-primary-600 text-primary-500 font-medium hover:underline"
                >
                  ¡Registrate aqui!
                </Link>
              </p>
            </form>
            {submitMessage && <div>{submitMessage}</div>}
          </div>
        </div>
      </div>
    </>
  );
}
