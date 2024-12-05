"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { CgSpinnerAlt } from "react-icons/cg";

interface AbilityProps {
  slot: string;
  displayName: string;
  description: string;
  displayIcon: string;
}

interface AgenteProps {
  abilities: AbilityProps[];
  background: string;
  backgroundGradientColors: string[];
  bustPortrait: string;
  description: string;
  displayIcon: string;
  displayIconSmall: string;
  displayName: string;
  fullPortrait: string;
  fullPortraitV2: string;
  isPlayableCharacter: boolean;
  killfeedPortrait: string;
  role: {
    uuid: string;
    displayName: string;
    description: string;
  };
  voiceLine: {
    minDuration: number;
    maxDuration: number;
    mediaList: string[];
  };
}

interface StatsProps {
  totalMatch: number;
  timespicked: number;
  pickrate: number;
  gamesplayed: number;
  wins: number;
  loss: number;
  winrate: number;
}

export default function Agente() {
  const [agenteData, setAgenteData] = useState<AgenteProps | null>(null);
  const [stats, setStats] = useState<StatsProps | null>(null);

  // get the current url and extract the uuid
  const pathname = usePathname();
  const extractedUuid = pathname.split("/")[2];

  useEffect(() => {
    const getAgente = async () => {
      try {
        // fetch agente data
        const res = await fetch(
          `https://valorant-api.com/v1/agents/${extractedUuid}?language=es-ES`
        );
        const data = await res.json();
        setAgenteData(data.data);
        // fetch agente stats
        const resStats = await fetch(
          "https://g722d0e58d6fa66-clasesdb.adb.sa-santiago-1.oraclecloudapps.com/ords/valortrack/api/v1/agentdata/"
        );
        const dataStats = await resStats.json();
        const currentAgentStats = dataStats.items.filter(
          (stats: any) => stats.agentname === data.data.displayName
        );
        setStats(currentAgentStats[0]);
        console.log(currentAgentStats[0]);
      } catch (error) {
        console.error("Error fetching agent data:", error);
      }
    };
    getAgente();
  }, [extractedUuid]);

  // Wait for agenteData to be loaded before accessing its values
  if (!agenteData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center text-rose-600 transition duration-300 hover:scale-110 hover:text-[#0db196]">
          <CgSpinnerAlt className="animate-spin h-32 w-32 text-rose-600" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 max-h-full pl-2 pr-2 ml-20 mr-20 rounded-md xl:pr-4">
      {/* Main Content */}
      <main className="flex-1 pt-2">
        <div className="pt-[40%] relative">
          <div className="absolute top-0 left-0 w-full h-full invert dark:filter-none ">
            <img
              src={agenteData.background}
              alt=""
              className="w-full h-full object-none opacity-40"
            />
            <div className="flex items-center justify-center absolute top-0 left-0 w-full h-full">
              <span className="text-6xl font-semibold text-rose-600 transition-all duration-300 hover:text-[#0db196] hover:text-9xl font-VALORANT">
                {agenteData.displayName}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center p-4 mt-4 dark:text-white dark:bg-gray-900 bg-[#eee7d8] border-2 border-rose-600   rounded-md shadow-md">
          <span className="text-xl text-center">{agenteData.description}</span>
        </div>
        <div className="flex items-center justify-center mt-4">
          <h1 className="text-2xl font-VALORANT text-rose-600 transition duration-300 hover:text-[#0db196]">
            Habilidades
          </h1>
        </div>
        <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2">
          {agenteData.abilities.map((ability, index) => (
            <div
              key={index}
              className={`flex flex-col items-center justify-center w-full dark:bg-gray-900 bg-[#eee7d8] text-white rounded-md border-2 border-rose-600 shadow-md  transition duration-dark:hover:hover:bg-[#0db196] 300 hover:bg-[#0db196] min-w-min overflow-hidden ${
                index === agenteData.abilities.length - 1 ? "last-item" : ""
              }`}
            >
              <img
                src={ability.displayIcon}
                alt={ability.displayName}
                className="w-8 h-8 mb-2 mt-2 invert dark:filter-none"
              />
              <div className="flex flex-col items-center justify-center">
                <span className="text-xl tracking-wider font-VALORANT uppercase dark:text-white text-neutral-800">
                  {ability.displayName}
                </span>
                <p className="pt-4 ml-4 mr-4 mb-4 dark:text-white text-neutral-800">
                  {ability.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center mt-5">
          <h1 className="text-2xl font-VALORANT text-rose-600 transition duration-300 hover:text-[#0db196]">
            Estadisticas
          </h1>
        </div>
        <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2 mb-5">
          <div className="flex flex-col items-center justify-center w-full h-56 border-2 border-rose-600 dark:bg-gray-900 bg-[#eee7d8] dark:text-white  text-neutral-800 rounded-md shadow-md  transition duration-300 dark:hover:hover:bg-[#0db196] hover:bg-[#0db196]">
            <span className="text-xl tracking-wider font-VALORANT uppercase">
              Total match
            </span>
            <p className="dark:text-white text-neutral-800 mt-2 font-semibold text-2xl ">
              {stats?.gamesplayed ? stats?.gamesplayed : "N/A"}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center w-full h-56 border-2 border-rose-600 dark:bg-gray-900 bg-[#eee7d8] dark:text-white  text-neutral-800 rounded-md shadow-md  transition duration-300 dark:hover:hover:bg-[#0db196] hover:bg-[#0db196]">
            <span className="text-xl tracking-wider font-VALORANT uppercase">
              Veces escogido
            </span>
            <p className="dark:text-white text-neutral-800 mt-2 font-semibold text-2xl">
              {stats?.timespicked ? stats?.timespicked : "N/A"}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center w-full h-56 border-2 border-rose-600 dark:bg-gray-900 bg-[#eee7d8] dark:text-white  text-neutral-800 rounded-md shadow-md  transition duration-300 dark:hover:hover:bg-[#0db196] hover:bg-[#0db196]">
            <span className="text-xl tracking-wider font-VALORANT uppercase">
              Porcentaje de veces escogido
            </span>
            <p className="dark:text-white text-neutral-800 mt-2 font-semibold text-2xl">
              {stats?.pickrate ? stats?.pickrate+"%"  : "N/A"}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center w-full h-56 border-2 border-rose-600 dark:bg-gray-900 bg-[#eee7d8] dark:text-white  text-neutral-800 rounded-md shadow-md  transition duration-300 dark:hover:hover:bg-[#0db196] hover:bg-[#0db196]">
            <span className="text-xl tracking-wider font-VALORANT uppercase">
              Partidas jugadas
            </span>
            <p className="dark:text-white text-neutral-800 mt-2 font-semibold text-2xl">
              {stats?.gamesplayed ? stats?.gamesplayed : "N/A"}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center w-full h-56 border-2 border-rose-600 dark:bg-gray-900 bg-[#eee7d8] dark:text-white  text-neutral-800 rounded-md shadow-md  transition duration-300 dark:hover:hover:bg-[#0db196] hover:bg-[#0db196]">
            <span className="text-xl tracking-wider font-VALORANT uppercase">
              Partidas ganadas
            </span>
            <p className="dark:text-white text-neutral-800 mt-2 font-semibold text-2xl">
              {stats?.wins ? stats?.wins : "N/A"}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center w-full h-56 border-2 border-rose-600 dark:bg-gray-900 bg-[#eee7d8] dark:text-white  text-neutral-800 rounded-md shadow-md  transition duration-300 dark:hover:hover:bg-[#0db196] hover:bg-[#0db196]">
            <span className="text-xl tracking-wider font-VALORANT uppercase">
              Partidas perdidas
            </span>
            <p className="dark:text-white text-neutral-800 mt-2 font-semibold text-2xl">
              {stats?.loss ? stats?.loss  : "N/A"}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center w-full h-56 border-2 border-rose-600 dark:bg-gray-900 bg-[#eee7d8] dark:text-white  text-neutral-800 rounded-md shadow-md  transition duration-300 dark:hover:hover:bg-[#0db196] hover:bg-[#0db196]">
            <span className="text-xl tracking-wider font-VALORANT uppercase">
              Porcentaje de victorias
            </span>
            <p className="dark:text-white text-neutral-800 mt-2 font-semibold text-2xl">
              {stats?.winrate ? stats?.winrate+'%' : "N/A"}
            </p>
          </div>
          <div className="flex flex-col items-center justify-center w-full h-56 border-2 border-rose-600 dark:bg-gray-900 bg-[#eee7d8] dark:text-white  text-neutral-800 rounded-md shadow-md  transition duration-300 dark:hover:hover:bg-[#0db196] hover:bg-[#0db196]">
            <span className="text-xl tracking-wider font-VALORANT uppercase">
              Porcentaje de derrotas
            </span>
            <p className="dark:text-white text-neutral-800 mt-2 font-semibold text-2xl">
              {stats?.loss ? ((stats?.loss*100)/stats?.gamesplayed).toFixed(2)+'%' : "N/A"}
            </p>
          </div>
        </div>
  
        <img
          src={agenteData.fullPortrait}
          alt={agenteData.displayName}
          width={1280}
          height={720}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10 pointer-events-none"
        />
      </main>
    </div>
  );
}
