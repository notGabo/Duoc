"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

import CrosshairLogo from "../components/icons/CrosshairLogo";

export default function Register() {
  const router = useRouter();
  const [registro, setRegistro] = useState({
    nombre: "",
    genero: "",
    nacimiento: "",
    telefono: 0,
    mail: "",
    clave: "",
    confirmClave: "",
    riotNombre: "",
    riotTag: "",
    riotRegion: "",
  });
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);
  const [submitMessage, setSubmitMessage] = useState(<></>);
  const [submitFormMessage, setSubmitFormMessage] = useState(<></>);
  const handleChange = (e: any) => {
    setRegistro({
      ...registro,
      [e.target.name]: e.target.value,
    });

    let mensajeNombre;
    let mensajeTelefono;
    let mensajeClave;
    let mensajeRiotTag;

    // if registro.nombre contains more than 0 numbers
    if (/\d/.test(registro.nombre) === true) {
      mensajeNombre = "El nombre no puede contener números.";
    }

    // if registro.telefono digits are not between 5 and 13
    if (registro.telefono.toString().length != 9) {
      mensajeTelefono =
        "El número de teléfono debe contener 9 dígitos.";
    }

    // if the password field is not the same as the confirm password field
    if (registro.clave !== registro.confirmClave) {
      mensajeClave = "Las contraseñas no coinciden.";
    }

    // if riotTag is not 3 and 5 characters long
    if (registro.riotTag.length < 3 || registro.riotTag.length > 5) {
      mensajeRiotTag = "El tag debe contener entre 3 y 5 caracteres.";
    }

    if (
      mensajeClave === undefined &&
      mensajeNombre === undefined &&
      mensajeRiotTag === undefined &&
      mensajeTelefono === undefined
    ) {
      setSubmitMessage(<p></p>);
    } else {
      setSubmitMessage(
        <div className="bg-yellow-700 py-3 px-1 text-center text-white border-4 border-yellow-900 rounded-xl">
          <p>{mensajeNombre}</p>
          <p>{mensajeTelefono}</p>
          <p>{mensajeClave}</p>
          <p>{mensajeRiotTag}</p>
        </div>
      );
    }
  };

  const handleConfirmPasswordChange = (e: any) => {
    setRegistro({
      ...registro,
      confirmClave: e.target.value,
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const date = registro.nacimiento.split("-");
    const birthdate = date[2] + "/" + date[1] + "/" + date[0];
    
    //today date in format dd/mm/yyyy
    const today = new Date();
    const todayParsed = today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();

    const dataToBackend = {
        nombre: registro.nombre,
        genero: registro.genero,
        nacimiento: birthdate,
        telefono: registro.telefono,
        mail: registro.mail,
        clave: registro.clave,
        puuid: Math.floor( Math.random() * 1000000000000 ),
        account_level: 1, // default account level        
        name: registro.riotNombre,
        tag: registro.riotTag,
        last_update: todayParsed,
        region: registro.riotRegion,
    };

  
    // envio formulario registro a backend
    const response = await fetch("api/register", { 
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(dataToBackend),
        credentials: "include",
    });

    const data = await response.json();

    if (response.status === 200) {
        setSubmitFormMessage(<div className="bg-green-500 py-3 px-1 text-center border-4 text-white border-green-800 rounded-xl animate-bounce"><p>Felicidades {data.name}!, tu cuenta fue creada con exito</p></div>)
    }
    else {
        setSubmitFormMessage (<div className="bg-red-500 py-3 px-1 text-center border-4 text-white border-red-800 rounded-xl animate-pulse"><p>{data.error}</p></div>)
      }

    }

  useEffect(() => {
    // Verificar si los campos obligatorios están llenos
    const isRequiredFieldsFilled =
      registro.nombre.trim() !== "" &&
      registro.genero.trim() !== "" &&
      registro.nacimiento.trim() !== "" &&
      //phone number length must be equal to 9
      registro.telefono.toString().length === 9 &&
      registro.mail.trim() !== "" &&
      registro.clave.trim() !== "" &&
      registro.confirmClave.trim() !== "" &&
      registro.riotNombre.trim() !== "" &&
      //riot tag lengt must be between 3 and 5 characters
      registro.riotTag.length >= 3 &&
      registro.riotTag.length <= 5 &&
      registro.riotRegion.trim() !== "";

    // Verificar si las contraseñas coinciden
    const doPasswordsMatch = registro.clave === registro.confirmClave;

    // Actualizar el estado de isSubmitDisabled
    setIsSubmitDisabled(!isRequiredFieldsFilled || !doPasswordsMatch);
  }, [registro]);


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
        router.push("/");
      }
      if (response.status !== 200) {
        console.log("no estas logeado");
      }
    };
    checkLoggedIn();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="mx-6 mb-10 mt-10 w-full max-w-md rounded-lg border border-rose-600 dark:bg-gray-900 bg-[#EEE7D8] p-6 shadow-lg md:mx-0">
        <div className="flex flex-col items-center justify-center">
          <CrosshairLogo className="fill-rose-600 h-[100px] w-[100px] mb-10 animate-pulse" />
          <h1 className="mb-6 text-2xl font-bold leading-tight text-rose-600 font-VALORANT">
            Crea tu cuenta
          </h1>
          <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
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
                placeholder="••••••••"
                onChange={handleChange}
                className="dark:border-gray-600 dark:bg-gray-700  dark:text-white dark:placeholder-gray-400 bg-[#FCF8ED] border-gray-400  focus:ring-red-600 focus:border-red-600 block w-full rounded-lg p-2.5 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="confirmpassword"
                className="mb-2 block text-sm font-medium text-rose-600"
              >
                Confirma contraseña
              </label>
              <input
                type="password"
                name="confirmPassword"
                id="confirmpassword"
                placeholder="••••••••"
                onChange={handleConfirmPasswordChange}
                className="dark:border-gray-600 dark:bg-gray-700  dark:text-white dark:placeholder-gray-400 bg-[#FCF8ED] border-gray-400  focus:ring-red-600 focus:border-red-600 block w-full rounded-lg p-2.5 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="nombre"
                className="mb-2 block text-sm font-medium text-rose-600"
              >
                Nombre
              </label>
              <input
                type="text"
                name="nombre"
                id="nombre"
                placeholder="Juanito"
                onChange={handleChange}
                className="dark:border-gray-600 dark:bg-gray-700  dark:text-white dark:placeholder-gray-400 bg-[#FCF8ED] border-gray-400  focus:ring-red-600 focus:border-red-600 block w-full rounded-lg p-2.5 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="genero"
                className="mb-2 block text-sm font-medium text-rose-600"
              >
                Genero
              </label>
              <select
                name="genero"
                id="genero"
                defaultValue={0}
                onChange={handleChange}
                className="dark:border-gray-600 dark:bg-gray-700  dark:text-white dark:placeholder-gray-400 bg-[#FCF8ED] border-gray-400  focus:ring-red-600 focus:border-red-600 block w-full rounded-lg p-2.5 sm:text-sm"
                required
              >
                <option value={0} disabled>
                  Selecciona una opción
                </option>
                <option value="M">Masculino</option>
                <option value="F">Femenino</option>
                <option value="O">Otro</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="telefono"
                className="mb-2 block text-sm font-medium text-rose-600"
              >
                Telefono
              </label>
              <input
                type="number"
                name="telefono"
                id="telefono"
                placeholder="912345678"
                onChange={handleChange}
                className="dark:border-gray-600 dark:bg-gray-700  dark:text-white dark:placeholder-gray-400 bg-[#FCF8ED] border-gray-400  focus:ring-red-600 focus:border-red-600 block w-full rounded-lg p-2.5 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="nacimiento"
                className="mb-2 block text-sm font-medium text-rose-600"
              >
                Fecha de nacimiento
              </label>
              <input
                type="date"
                name="nacimiento"
                id="nacimiento"
                onChange={handleChange}
                className="dark:border-gray-600 dark:bg-gray-700  dark:text-white dark:placeholder-gray-400 bg-[#FCF8ED] border-gray-400  focus:ring-red-600 focus:border-red-600 block w-full rounded-lg p-2.5 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="riotNombre"
                className="mb-2 block text-sm font-medium text-rose-600"
              >
                Nombre de usuario
              </label>
              <input
                type="text"
                name="riotNombre"
                id="riotNombre"
                placeholder="Juanito"
                onChange={handleChange}
                className="dark:border-gray-600 dark:bg-gray-700  dark:text-white dark:placeholder-gray-400 bg-[#FCF8ED] border-gray-400  focus:ring-red-600 focus:border-red-600 block w-full rounded-lg p-2.5 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="riotTag"
                className="mb-2 block text-sm font-medium text-rose-600"
              >
                Tag de usuario
              </label>
              <input
                type="text"
                name="riotTag"
                id="riotTag"
                placeholder="LAS"
                onChange={handleChange}
                className="dark:border-gray-600 dark:bg-gray-700  dark:text-white dark:placeholder-gray-400 bg-[#FCF8ED] border-gray-400  focus:ring-red-600 focus:border-red-600 block w-full rounded-lg p-2.5 sm:text-sm"
                required
              />
            </div>
            <div>
              <label
                htmlFor="riotRegion"
                className="mb-2 block text-sm font-medium text-rose-600"
              >
                Region
              </label>
              <select
                name="riotRegion"
                id="riotRegion"
                defaultValue={0}
                onChange={handleChange}
                className="dark:border-gray-600 dark:bg-gray-700  dark:text-white dark:placeholder-gray-400 bg-[#FCF8ED] border-gray-400  focus:ring-red-600 focus:border-red-600 block w-full rounded-lg p-2.5 sm:text-sm"
                required
              >
                <option value="0" disabled>
                  Selecciona una region
                </option>
                <option value="br">BR</option>
                <option value="eune">EUNE</option>
                <option value="euw">EUW</option>
                <option value="lan">LAN</option>
                <option value="las">LAS</option>
                <option value="na">NA</option>
                <option value="oce">OCE</option>
                <option value="ru">RU</option>
                <option value="tr">TR</option>
                <option value="jp">JP</option>
                <option value="kr">KR</option>
                <option value="ph">PH</option>
                <option value="sg">SG</option>
                <option value="tw">TW</option>
                <option value="th">TH</option>
                <option value="vn">VN</option>
                <option value="pbe">PBE</option>
              </select>
            </div>

            <button
              disabled={isSubmitDisabled}
              className={`${
                isSubmitDisabled
                  ? "opacity-50 cursor-not-allowed hover:bg-gray-700 hover:text-white hover:shadow-2xl hover:shadow-red-600"
                  : "bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 focus:ring-primary-800 hover:bg-green-700 hover:text-white hover:shadow-2xl hover:shadow-white"
              } w-full rounded-lg bg-gray-300 px-5 py-2.5 text-center text-sm font-medium text-neutral-800 transition duration-300 focus:outline-none focus:ring-4`}
            >
              {/* Iniciar Sesion */}
              {`${
                isSubmitDisabled ? "Verifica bien tus datos" : "Registrame!"
              } `}
            </button>
            <div className="flex justify-center">
              <Link
                href="/login"
                className="text-rose-600 text-primary-500 text-sm font-medium hover:underline"
              >
                ¿Ya tienes una cuenta? ¡Inicia sesion aqui!
              </Link>
            </div>
            {/* Mostrar el mensaje de envío */}

            {submitMessage && <div>{submitMessage}</div>}
            {/* mostrar mensaje de handle submit */}
            {submitFormMessage && <div>{submitFormMessage}</div>}
          </form>
        </div>
      </div>
    </div>
  );
}
