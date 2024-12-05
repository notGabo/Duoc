"use client";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { CgSpinnerAlt } from "react-icons/cg";

interface Jugador {
    name: string;
    puiid: string;
    region: string;
    tag: string;
    card: {
        small: string;
        large: string;
        wide: string;
    }
    stats:{
        meta:{
            map:{
                name: ""
            },
        },
        mode: "",
        started_at: "",
        region: "",
        cluster: "",
        stats:{
            team: "",
            level: 0,
            character: {
                name: "",
            },
            tier: 0,
            score: 0,
            kills: 0,
            deaths: 0,
            assists: 0,
            shots:{
                head: number,
                body: number,
                leg: number,
            },
            damage : {
                made: 0,
                received: 0,
            },
        },
        teams:{
            red: 0,
            blue: 0
        }
    }[]
}


export default function Jugador() {  
    const pathname = usePathname();
    const extractedUuid = pathname.split("/")[2];
    const [jugador, setJugador] = useState<Jugador | null>(null);

    interface BasicAccountData {
        name: string;
        puiid: string;
        region: string;
        tag: string;
        card: {
            small: string;
            large: string;
            wide: string;
        }
      }

    type PlayerStats = {
            meta:{
                map:{
                    name: ""
                },
            },
            mode: "",
            started_at: "",
            region: "",
            cluster: "",
            stats:{
                team: "",
                level: 0,
                character: {
                    name: "",
                },
                tier: 0,
                score: 0,
                kills: 0,
                deaths: 0,
                assists: 0,
                shots:{
                    head: 0,
                    body: 0,
                    leg: 0,
                },
                damage : {
                    made: 0,
                    received: 0,
                },
            },
            teams:{
                red: 0,
                blue: 0
            }
        }[]
    
    useEffect(() => {
        const fetchJugador = async () => {
            try {
                const responseAccountData = await fetch('https://api.henrikdev.xyz/valorant/v1/by-puuid/account/'+extractedUuid,{   
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'HDEV-e1eee469-4509-4f2e-81ad-aec389814f5c' 
                    },
                });
                const data = await responseAccountData.json();
                const accountData: BasicAccountData = {
                    name: data.data.name,
                    puiid: data.data.puuid,
                    region: data.data.region,
                    tag: data.data.tag,
                    card: {
                        small: data.data.card.small,
                        large: data.data.card.large,
                        wide: data.data.card.wide,
                    }
                }
                const responsePlayerStats = await fetch('https://api.henrikdev.xyz/valorant/v1/by-puuid/lifetime/matches/'+accountData.region+'/'+accountData.puiid,{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'HDEV-e1eee469-4509-4f2e-81ad-aec389814f5c'
                    },
                });
                const dataPlayerStats = await responsePlayerStats.json();
                const playerStats: PlayerStats = dataPlayerStats.data;
                setJugador({
                    name: accountData.name,
                    puiid: accountData.puiid,
                    region: accountData.region,
                    tag: accountData.tag,
                    card: {
                        small: accountData.card.small,
                        large: accountData.card.large,
                        wide: accountData.card.wide,
                    },
                    stats: playerStats
                });
            } catch (error) {
                console.log(error);
            }
        }
        fetchJugador();

    }, []);

    if (!jugador) {
        return (
          <div className="flex items-center justify-center h-screen">
            <div className="flex flex-col items-center text-rose-600 transition duration-300 hover:scale-110 hover:text-[#0db196]">
              <CgSpinnerAlt className="animate-spin h-32 w-32 text-rose-600" />
            </div>
          </div>
        );
      }
    return(
    <div className="container mx-auto">
    <div className="flex items-center justify-center mt-8 transition duration-300 hover:scale-[1.247]">
      <img src={jugador.card.small} alt="Player Card" className="h-32 w-32 rounded-full" />
    </div>

    <div className="mt-4 text-center transition duration-300 hover:text-emerald-400">
      <h1 className="text-4xl font-VALORANT">{jugador.name}</h1>
      <p className="text-gray-500 font-VALORANT">#{jugador.tag}</p>
    </div>

    <div className="flex items-center justify-center mt-5">
          <h1 className="text-2xl font-VALORANT text-rose-600 transition duration-300 hover:text-[#0db196]">
            Estadisticas
          </h1>
    </div>

    <div className="grid grid-cols-1 gap-6 mt-4 md:grid-cols-2 mb-5">

    <div className="flex flex-col items-center justify-center w-full h-56 border-2 border-rose-600 dark:bg-gray-900 bg-[#eee7d8] dark:text-white  text-neutral-800 rounded-md shadow-md  transition duration-300 dark:hover:hover:bg-[#0db196] hover:bg-[#0db196]">
            <span className="text-xl tracking-wider font-VALORANT uppercase">
              Total de Kills
            </span>
            <p className="dark:text-white text-neutral-800 mt-2 font-semibold text-2xl ">
              {/* {sumar todas las kills} */}
              {jugador.stats.reduce((acc, stat) => acc + stat.stats.kills, 0)}
            </p>
    </div>

    <div className="flex flex-col items-center justify-center w-full h-56 border-2 border-rose-600 dark:bg-gray-900 bg-[#eee7d8] dark:text-white  text-neutral-800 rounded-md shadow-md  transition duration-300 dark:hover:hover:bg-[#0db196] hover:bg-[#0db196]">
            <span className="text-xl tracking-wider font-VALORANT uppercase">
              Total de Deaths
            </span>
            <p className="dark:text-white text-neutral-800 mt-2 font-semibold text-2xl ">
              {/* {sumar todas las kills} */}
              {jugador.stats.reduce((acc, stat) => acc + stat.stats.deaths, 0)}
            </p>
    </div>

    <div className="flex flex-col items-center justify-center w-full h-56 border-2 border-rose-600 dark:bg-gray-900 bg-[#eee7d8] dark:text-white  text-neutral-800 rounded-md shadow-md  transition duration-300 dark:hover:hover:bg-[#0db196] hover:bg-[#0db196]">
            <span className="text-xl tracking-wider font-VALORANT uppercase">
              Total de Assists
            </span>
            <p className="dark:text-white text-neutral-800 mt-2 font-semibold text-2xl ">
              {/* {sumar todas las kills} */}
              {jugador.stats.reduce((acc, stat) => acc + stat.stats.assists, 0)}
            </p>
    </div>

    <div className="flex flex-col items-center justify-center w-full h-56 border-2 border-rose-600 dark:bg-gray-900 bg-[#eee7d8] dark:text-white  text-neutral-800 rounded-md shadow-md  transition duration-300 dark:hover:hover:bg-[#0db196] hover:bg-[#0db196]">
            <span className="text-xl tracking-wider font-VALORANT uppercase">
              KDA
            </span>
            <p className="dark:text-white text-neutral-800 mt-2 font-semibold text-2xl ">
              {/* CALCULAR KDA */}
              { (( jugador.stats.reduce((acc, stat) => acc + stat.stats.kills, 0) + jugador.stats.reduce((acc, stat) => acc + stat.stats.assists, 0) ) / jugador.stats.reduce((acc, stat) => acc + stat.stats.deaths, 0)).toFixed(2) }
            </p>
    </div>

    <div className="flex flex-col items-center justify-center w-full h-56 border-2 border-rose-600 dark:bg-gray-900 bg-[#eee7d8] dark:text-white  text-neutral-800 rounded-md shadow-md  transition duration-300 dark:hover:hover:bg-[#0db196] hover:bg-[#0db196]">
            <span className="text-xl tracking-wider font-VALORANT uppercase">
              Tiros totales dados
            </span>
            <p className="dark:text-white text-neutral-800 mt-2 font-semibold text-2xl ">
              {/* Sumar todos los tiros dados */}
              { jugador.stats.reduce((acc, stat) => acc + stat.stats.shots.body, 0) + jugador.stats.reduce((acc, stat) => acc + stat.stats.shots.head, 0) + jugador.stats.reduce((acc, stat) => acc + stat.stats.shots.leg, 0) }
            </p>
    </div>

    <div className="flex flex-col items-center justify-center w-full h-56 border-2 border-rose-600 dark:bg-gray-900 bg-[#eee7d8] dark:text-white  text-neutral-800 rounded-md shadow-md  transition duration-300 dark:hover:hover:bg-[#0db196] hover:bg-[#0db196]">
            <span className="text-xl tracking-wider font-VALORANT uppercase">
            tiros en la cabeza
            </span>
            <p className="dark:text-white text-neutral-800 mt-2 font-semibold text-2xl ">
              {  
                jugador.stats.reduce((acc, stat) => acc + stat.stats.shots.head, 0) 
              }
            </p>
    </div>

    <div className="flex flex-col items-center justify-center w-full h-56 border-2 border-rose-600 dark:bg-gray-900 bg-[#eee7d8] dark:text-white  text-neutral-800 rounded-md shadow-md  transition duration-300 dark:hover:hover:bg-[#0db196] hover:bg-[#0db196]">
            <span className="text-xl tracking-wider font-VALORANT uppercase">
            tiros en la torzo
            </span>
            <p className="dark:text-white text-neutral-800 mt-2 font-semibold text-2xl ">
              {  
                jugador.stats.reduce((acc, stat) => acc + stat.stats.shots.body, 0) 
              }
            </p>
    </div>

    <div className="flex flex-col items-center justify-center w-full h-56 border-2 border-rose-600 dark:bg-gray-900 bg-[#eee7d8] dark:text-white  text-neutral-800 rounded-md shadow-md  transition duration-300 dark:hover:hover:bg-[#0db196] hover:bg-[#0db196]">
            <span className="text-xl tracking-wider font-VALORANT uppercase">
            tiros en los pies
            </span>
            <p className="dark:text-white text-neutral-800 mt-2 font-semibold text-2xl ">
              {  
                jugador.stats.reduce((acc, stat) => acc + stat.stats.shots.leg, 0) 
              }
            </p>
    </div>

    
    <div className="flex flex-col items-center justify-center w-full h-56 border-2 border-rose-600 dark:bg-gray-900 bg-[#eee7d8] dark:text-white  text-neutral-800 rounded-md shadow-md  transition duration-300 dark:hover:hover:bg-[#0db196] hover:bg-[#0db196]">
            <span className="text-xl tracking-wider font-VALORANT uppercase">
              Porcentaje de tiros en la cabeza
            </span>
            <p className="dark:text-white text-neutral-800 mt-2 font-semibold text-2xl ">
              {/* Calcular porcentaje de tiros en la cabeza */}
              {  
                ((jugador.stats.reduce((acc, stat) => acc + stat.stats.shots.head, 0) * 100) / (jugador.stats.reduce((acc, stat) => acc + stat.stats.shots.body, 0) + jugador.stats.reduce((acc, stat) => acc + stat.stats.shots.head, 0) + jugador.stats.reduce((acc, stat) => acc + stat.stats.shots.leg, 0))).toFixed(2) + '%'
              }
            </p>
    </div>

    <div className="flex flex-col items-center justify-center w-full h-56 border-2 border-rose-600 dark:bg-gray-900 bg-[#eee7d8] dark:text-white  text-neutral-800 rounded-md shadow-md  transition duration-300 dark:hover:hover:bg-[#0db196] hover:bg-[#0db196]">
            <span className="text-xl tracking-wider font-VALORANT uppercase">
              Porcentaje de tiros en el torso
            </span>
            <p className="dark:text-white text-neutral-800 mt-2 font-semibold text-2xl ">
              {/* Calcular porcentaje de tiros en el torso*/}
              {  
                ((jugador.stats.reduce((acc, stat) => acc + stat.stats.shots.body, 0) * 100) / (jugador.stats.reduce((acc, stat) => acc + stat.stats.shots.body, 0) + jugador.stats.reduce((acc, stat) => acc + stat.stats.shots.head, 0) + jugador.stats.reduce((acc, stat) => acc + stat.stats.shots.leg, 0))).toFixed(2) + '%'
              }
            </p>
    </div>

    <div className="flex flex-col items-center justify-center w-full h-56 border-2 border-rose-600 dark:bg-gray-900 bg-[#eee7d8] dark:text-white  text-neutral-800 rounded-md shadow-md  transition duration-300 dark:hover:hover:bg-[#0db196] hover:bg-[#0db196]">
            <span className="text-xl tracking-wider font-VALORANT uppercase">
                Porcentaje de tiros en los pies
            </span>
            <p className="dark:text-white text-neutral-800 mt-2 font-semibold text-2xl ">
                {/* Calcular porcentaje de tiros en los pies */}
                {
                    ((jugador.stats.reduce((acc, stat) => acc + stat.stats.shots.leg, 0) * 100) / (jugador.stats.reduce((acc, stat) => acc + stat.stats.shots.body, 0) + jugador.stats.reduce((acc, stat) => acc + stat.stats.shots.head, 0) + jugador.stats.reduce((acc, stat) => acc + stat.stats.shots.leg, 0))).toFixed(2) + '%'
                }
            </p>
    </div>

    <div className="flex flex-col items-center justify-center w-full h-56 border-2 border-rose-600 dark:bg-gray-900 bg-[#eee7d8] dark:text-white  text-neutral-800 rounded-md shadow-md  transition duration-300 dark:hover:hover:bg-[#0db196] hover:bg-[#0db196]">
            <span className="text-xl tracking-wider font-VALORANT uppercase">
                dmg total hecho
            </span>
            <p className="dark:text-white text-neutral-800 mt-2 font-semibold text-2xl ">
                {/* Sumar todo el daño hecho */}
                {
                    jugador.stats.reduce((acc, stat) => acc + stat.stats.damage.made, 0)
                }
            </p>
    </div>

    <div className="flex flex-col items-center justify-center w-full h-56 border-2 border-rose-600 dark:bg-gray-900 bg-[#eee7d8] dark:text-white  text-neutral-800 rounded-md shadow-md  transition duration-300 dark:hover:hover:bg-[#0db196] hover:bg-[#0db196]">
            <span className="text-xl tracking-wider font-VALORANT uppercase">
                dmg total recibido
            </span>
            <p className="dark:text-white text-neutral-800 mt-2 font-semibold text-2xl ">
                {/* Sumar todo el daño recibido */}
                {
                    jugador.stats.reduce((acc, stat) => acc + stat.stats.damage.received, 0)
                }
            </p>
    </div>

    <div className="flex flex-col items-center justify-center w-full h-56 border-2 border-rose-600 dark:bg-gray-900 bg-[#eee7d8] dark:text-white  text-neutral-800 rounded-md shadow-md  transition duration-300 dark:hover:hover:bg-[#0db196] hover:bg-[#0db196]">
            <span className="text-xl tracking-wider font-VALORANT uppercase">
                Promedio por partidas en dmg hecho
            </span>
            <p className="dark:text-white text-neutral-800 mt-2 font-semibold text-2xl ">
                {
                    (jugador.stats.reduce((acc, stat) => acc + stat.stats.damage.made, 0) / jugador.stats.length).toFixed(2)
                }
            </p>
    </div>

    <div className="flex flex-col items-center justify-center w-full h-56 border-2 border-rose-600 dark:bg-gray-900 bg-[#eee7d8] dark:text-white  text-neutral-800 rounded-md shadow-md  transition duration-300 dark:hover:hover:bg-[#0db196] hover:bg-[#0db196]">
            <span className="text-xl tracking-wider font-VALORANT uppercase">
                Promedio por partidas en dmg recibido
            </span>
            <p className="dark:text-white text-neutral-800 mt-2 font-semibold text-2xl ">
                {
                    (jugador.stats.reduce((acc, stat) => acc + stat.stats.damage.received, 0) / jugador.stats.length).toFixed(2)
                }
            </p>
    </div>

    </div>

    <div className="flex items-center justify-center mt-5">
          <h1 className="text-2xl font-VALORANT text-rose-600 transition duration-300 hover:text-[#0db196]">
            Tabla de ultimas partidas
          </h1>
    </div>

    <div className=" mb-5 mt-5  flex flex-col items-center justify-center w-full h-96 border-2 border-rose-600 dark:bg-gray-900 bg-[#eee7d8] dark:text-white  text-neutral-800 rounded-md shadow-md overflow-y-scroll transition duration-300 dark:hover:hover:bg-[#0db196] hover:bg-[#0db196]">
        <div className="flex flex-row items-center justify-center w-full h-16 border-b-2 border-rose-600 dark:bg-gray-900 bg-[#eee7d8] dark:text-white  text-neutral-800 rounded-md shadow-md overflow-y-scroll transition duration-300 dark:hover:hover:bg-[#0db196] hover:bg-[#0db196]">
            <div className="flex flex-row items-center justify-center w-1/6 h-full">
                <span className="text-xl tracking-wider font-VALORANT uppercase">
                    Mapa
                </span>
            </div>
            <div className="flex flex-row items-center justify-center w-1/6 h-full">
                <span className="text-xl tracking-wider font-VALORANT uppercase">
                    Asesinatos
                </span>
            </div>
            <div className="flex flex-row items-center justify-center w-1/6 h-full">
                <span className="text-xl tracking-wider font-VALORANT uppercase">
                    Muertes
                </span>
            </div>
            <div className="flex flex-row items-center justify-center w-1/6 h-full">
                <span className="text-xl tracking-wider font-VALORANT uppercase">
                    Asistencias
                </span>
            </div>
            <div className="flex flex-row items-center justify-center w-1/6 h-full">
                <span className="text-xl tracking-wider font-VALORANT uppercase">
                    KDA
                </span>
            </div>
            <div className="flex flex-row items-center justify-center w-1/6 h-full">
                <span className="text-xl tracking-wider font-VALORANT uppercase">
                    Dmg hecho
                </span>
            </div>
            <div className="flex flex-row items-center justify-center w-1/6 h-full">
                <span className="text-xl tracking-wider font-VALORANT uppercase">
                    Dmg recibido
                </span>
            </div>
        </div>
        <div className="flex flex-col items-center justify-center w-full h-80 overflow-y-scroll">
            {
                jugador.stats.slice(1,10).map((stat) => (
                    <div className="flex flex-row items-center justify-center w-full h-16 border-b-2 border-rose-600 dark:bg-gray-900 bg-[#eee7d8] dark:text-white  text-neutral-800 rounded-md shadow-md overflow-y-scroll transition duration-300 dark:hover:hover:bg-[#0db196] hover:bg-[#0db196]">
                        <div className="flex flex-row items-center justify-center w-1/6 h-full">
                            <span className="text-xl tracking-wider font-VALORANT uppercase">
                                {stat.meta.map.name}
                            </span>
                        </div>
                        <div className="flex flex-row items-center justify-center w-1/6 h-full">
                            <span className="text-xl tracking-wider font-VALORANT uppercase">
                                {stat.stats.kills}
                            </span>
                        </div>
                        <div className="flex flex-row items-center justify-center w-1/6 h-full">
                            <span className="text-xl tracking-wider font-VALORANT uppercase">
                                {stat.stats.deaths}
                            </span>
                        </div>
                        <div className="flex flex-row items-center justify-center w-1/6 h-full">
                            <span className="text-xl tracking-wider font-VALORANT uppercase">
                                {stat.stats.assists}
                            </span>
                        </div>
                        <div className="flex flex-row items-center justify-center w-1/6 h-full">
                            <span className="text-xl tracking-wider font-VALORANT uppercase">
                                {/* { calcular kda } */}
                                {  
                                    ((stat.stats.kills + stat.stats.assists) / stat.stats.deaths).toFixed(2)
                                }
                            </span>
                        </div>
                        <div className="flex flex-row items-center justify-center w-1/6 h-full">
                            <span className="text-xl tracking-wider font-VALORANT uppercase">
                                {stat.stats.damage.made}
                            </span>
                        </div>
                        <div className="flex flex-row items-center justify-center w-1/6 h-full">
                            <span className="text-xl tracking-wider font-VALORANT uppercase">
                                {stat.stats.damage.received}
                            </span>
                        </div>
                    </div>
                ))
            }
        </div>
        </div>

  </div>
  )

}