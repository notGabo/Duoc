"use client"
import React from 'react';
import 'react-slideshow-image/dist/styles.css';
import { Slide } from 'react-slideshow-image';
import { BsFillArrowLeftSquareFill, BsFillArrowRightSquareFill } from 'react-icons/bs';

const Carrusel = () => {
  const imagenes = [
    {
      foto: "assets/images/first.jpg",
      texto:  (
        <h1 className="font-black font-VALORANT text-center lg:text-6xl md:text-2xl sm:text-5xl text-rose-600 transition ease-in-out delay-150 hover:-translate-y-1 hover:text-white hover:scale-110 duration-300">
          bienvenido a vAlortrack
        </h1>
      )
    },
    {
      foto: "assets/images/second.jpg",
      texto: (
        <p className='text-[11px] sm:text-base md:text-lg lg:text-xl xl:text-2xl bg-black'>¡Domina el campo de batalla en Valorant! Nuestra plataforma impulsada por IA analiza tu juego y te ofrece consejos personalizados para mejorar tus habilidades. Desbloquea tu verdadero potencial hoy mismo.</p>
      )
    },
    {
      foto: "assets/images/third.jpg",
      texto: (
        <p className='text-[11px] sm:text-base md:text-lg lg:text-xl xl:text-2xl'>Obtén una ventaja competitiva sin dedicar horas infinitas. Nuestra plataforma inteligente utiliza algoritmos avanzados para identificar tus áreas de mejora y te proporciona estrategias sencillas para un rendimiento sobresaliente en Valorant.</p>
        
      )
    },
    {
      foto: "assets/images/fourth.jpg",
      texto: (
        <p className='text-[11px] sm:text-base md:text-lg lg:text-xl xl:text-2xl'>Encuentra tu estilo de juego único en Valorant. Nuestra plataforma te ayuda a desarrollar un enfoque estratégico que se adapte a tu personalidad y habilidades, permitiéndote tomar decisiones inteligentes y alcanzar el éxito en el juego.</p>
      )
    },
    {
      foto: "assets/images/fifth.jpg",
      texto: (
        <p className='text-[11px] sm:text-base md:text-lg lg:text-xl xl:text-2xl'>Desarrolla una jugabilidad en equipo impecable en Valorant. analiza tu estilo de juego con nuestro servicio y te brindaremos recomendaciones para fortalecer la cooperación, la estrategia y el trabajo en equipo. Lleva tu rendimiento a nuevas alturas junto a tus compañeros de equipo.</p>
      )
    },
    {
      foto: "assets/images/sixth.jpeg",
            texto: (
              <p className='text-[11px] sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white bg-black'>Domina el arte de las decisiones tácticas en Valorant. Ya sea que prefieras un juego agresivo o inteligente, nuestra plataforma te brinda estrategias personalizadas para maximizar tu estilo y llevar tu rendimiento al siguiente nivel.</p>
      )
    }
  ];

  const propiedadesSlide = {
    indicators: false,
    duration: 10000000,
    transitionDuration: 700,
    infinite: true,
  
    prevArrow: (
      <div className='cursor-pointer top-[45px] sm:top-auto'>
        <BsFillArrowLeftSquareFill className='scale-150 sm:scale-150 md:scale-150 lg:scale-150 xl:scale-150 m-10 opacity-80 lg:text-5xl md:text-sm text-gray-900 transition hover:scale-[2] hover:text-rose-600' />
      </div>
    ),
    nextArrow: (
      <div className='cursor-pointer top-[45px] sm:top-auto'>
        <BsFillArrowRightSquareFill className='scale-150 m-10 opacity-80 lg:text-5xl md:text-sm text-gray-900 transition hover:scale-[2]  hover:text-rose-600' />
      </div>
    )
  };

  return (
    <div className=''>
      <Slide {...propiedadesSlide}>
        {imagenes.map((each, index) => (
          <div key={index} className='flex -top-[45px] justify-center lg:w-full relative'>
            <img className='z-0 lg:w-screen lg:h-screen object-cover shadow-xl' src={each.foto} alt={`Slide ${index}`} />
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-center'>
              {each.texto}
            </div>
          </div>
        ))}
      </Slide>


      
    </div>

    
  );
};
export default Carrusel;