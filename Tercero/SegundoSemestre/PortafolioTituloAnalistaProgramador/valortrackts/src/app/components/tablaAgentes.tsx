"use client"
import { ChevronUpDownIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import {Card,Typography,CardBody,Avatar} from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { CgSpinnerAlt } from "react-icons/cg";

const TABLE_HEAD = ["Nombre de agente", "Rol", "Descripción",  "Popularidad %", "Winrate %", "Lossrate %" ];

type Agentes = {
  uuid: string;
  displayIconSmall: string;
  displayName: string;
  role: {
    displayName: string;
  };
  description: string;
  totalmatch: number;
  agentname: string;
  timespicked: number;
  pickrate: number;
  gamesplayed: number;
  wins: number;
  loss: number;
  winrate: number;
};

export function getUuidAgenteFromClick(uuid: string) {
  return uuid;
}

export default function TablaAgentes() {

  const [agentes, setAgentes] = useState<Agentes[]>([]);

  useEffect(() => { 
    const urlAgentesData = '/api/agentes'
    const urlAgentesStats = 'https://g722d0e58d6fa66-clasesdb.adb.sa-santiago-1.oraclecloudapps.com/ords/valortrack/api/v1/agentdata/'
    const fetchAgentes = async () => {
      try{
        const responseData = await fetch(urlAgentesData);
        const responseStats = await fetch(urlAgentesStats);

        const data = await responseData.json();
        const stats = await responseStats.json();

        const agentes = data.data.map((agente: Agentes) => {
          const statsAgente = stats.items.find((statsAgente: any) => statsAgente.agentname === agente.displayName);
          return {
            ...agente,
            ...statsAgente,
          };
        });
        setAgentes(agentes);
      } catch (error) {
        console.log(error)
      }
     }
    fetchAgentes();
  }, []);



  if (!agentes.length){
    return (
      <div>
        <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center text-rose-600 transition duration-300 hover:scale-110 hover:text-[#0db196]">
        <CgSpinnerAlt className="animate-spin h-32 w-32 text-rose-600" />
        </div>
      </div>
      </div>
    )
  }

  // if agentes.length 
  if (agentes.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center text-rose-600 transition duration-300 hover:scale-110 hover:text-[#0db196]">
          <CgSpinnerAlt className="animate-spin h-32 w-32 text-rose-600" />
          <p className="text-rose-600">No se encontraron agentes. Problema en servidor</p>
        </div>
      </div>
    );
  }

  return (
    <Card className="m-5 dark:bg-gray-900 bg-[#EEE7D8]">
      <CardBody className="border rounded-xl border-rose-600">
        <table className=" border-rose-600 w-full table-auto text-left ">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="dark:text-white text-black cursor-pointer border-rose-600 p-4 w-[20%]"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between font-normal leading-none opacity-70"
                  >
                    {head}{" "}
                    {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {agentes.map(( agente, index) => {
              const isLast = index === agentes.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-rose-600 ";

              return (
                <tr key={index}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Avatar src={agente.displayIconSmall} alt={agente.agentname} size="sm" />
                      <div className="flex flex-col">
                        <Typography variant="small" color="blue-gray" className="dark:text-white text-black font-normal">
                          {/* link with displayname name as href */}
                          <Link href={`/agentes/${agente.uuid}`}>
                            {agente.displayName}
                          </Link>
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="dark:text-white text-black font-normal opacity-70"
                        >
                          {agente.uuid}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex flex-col">
                      <Typography variant="small" color="blue-gray" className="dark:text-white text-black font-normal">
                        {agente.role.displayName}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="dark:text-white text-black font-normal">
                      {agente.description}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="dark:text-white text-black font-normal">
                      {agente.pickrate ? agente.pickrate : 0}%
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="dark:text-white text-black font-normal">
                      {agente.winrate ? agente.winrate: 0}%
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="dark:text-white text-black font-normal">
                      {agente.loss ? (agente.loss*100 / agente.gamesplayed).toFixed(2)+'%' : '0%'}
                    </Typography>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
    </Card>
  );
}