"use client";
import { select } from "@material-tailwind/react";
import { useState } from "react";
import { Card, Typography, CardBody, Avatar } from "@material-tailwind/react";
import Link from "next/link";

const TABLE_HEAD = [
  "Ranking region",
  "NombreJugador",
  "Puntuacion",
  "Victorias",
  "Tier",
];

export default function JugadoresPage() {
  interface IPlayer {
    PlayerCardID: string;
    TitleID: string;
    IsBanned: boolean;
    IsAnonymized: boolean;
    puuid: string;
    gameName: string;
    tagLine: string;
    leaderboardRank: number;
    rankedRating: number;
    numberOfWins: number;
    competitiveTier: number;
  }
  [];

  const [players, setPlayers] = useState<IPlayer[]>([]);
  const [table, setTable] = useState(<></>);

  console.log(players);

  const url = "https://api.henrikdev.xyz/valorant/v1/leaderboard/";

  const handleChange = async (e: any) => {
    const response = await fetch(url + e.target.value, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "HDEV-e1eee469-4509-4f2e-81ad-aec389814f5c",
      },
    });

    const data = await response.json();
    const top50 = data.slice(0, 50);
    setPlayers(top50);
  };

  if (players.length === 0) {
    return (
      <div>
        <div className="flex justify-center">
          <button
            className="bg-rose-600 dark:text-white text-black rounded-xl hover:bg-emerald-500 transition duration-300 px-2 m-2 "
            onClick={handleChange}
            value="eu"
          >
            Europa
          </button>
          <button
            className="bg-rose-600 dark:text-white text-black rounded-xl hover:bg-emerald-500 transition duration-300 px-2 m-2 "
            onClick={handleChange}
            value="na"
          >
            Norte America
          </button>
          <button
            className="bg-rose-600 dark:text-white text-black rounded-xl hover:bg-emerald-500 transition duration-300 px-2 m-2 "
            onClick={handleChange}
            value="ap"
          >
            Asia Pacific
          </button>
          <button
            className="bg-rose-600 dark:text-white text-black rounded-xl hover:bg-emerald-500 transition duration-300 px-2 m-2 "
            onClick={handleChange}
            value="kr"
          >
            Corea
          </button>
          <button
            className="bg-rose-600 dark:text-white text-black rounded-xl hover:bg-emerald-500 transition duration-300 px-2 m-2 "
            onClick={handleChange}
            value="br"
          >
            Brasil
          </button>
          <button
            className="bg-rose-600 dark:text-white text-black rounded-xl hover:bg-emerald-500 transition duration-300 px-2 m-2 "
            onClick={handleChange}
            value="latam"
          >
            Latino America
          </button>
        </div>
        <div className="flex items-center justify-center h-screen">
          <div className="flex flex-col items-center text-rose-600 transition duration-300 hover:scale-110 hover:text-[#0db196]">
            <p className="font-VALORANT text-center xl:text-5xl lg:text-xl md:text-lg sm:text-base">
              Por favor, seleccione una region
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-center">
        <button
          className="bg-rose-600 dark:text-white text-black rounded-xl hover:bg-emerald-500 transition duration-300 px-2 m-2 "
          onClick={handleChange}
          value="eu"
        >
          Europa
        </button>
        <button
          className="bg-rose-600 dark:text-white text-black rounded-xl hover:bg-emerald-500 transition duration-300 px-2 m-2 "
          onClick={handleChange}
          value="na"
        >
          Norte America
        </button>
        <button
          className="bg-rose-600 dark:text-white text-black rounded-xl hover:bg-emerald-500 transition duration-300 px-2 m-2 "
          onClick={handleChange}
          value="ap"
        >
          Asia Pacific
        </button>
        <button
          className="bg-rose-600 dark:text-white text-black rounded-xl hover:bg-emerald-500 transition duration-300 px-2 m-2 "
          onClick={handleChange}
          value="kr"
        >
          Corea
        </button>
        <button
          className="bg-rose-600 dark:text-white text-black rounded-xl hover:bg-emerald-500 transition duration-300 px-2 m-2 "
          onClick={handleChange}
          value="br"
        >
          Brasil
        </button>
        <button
          className="bg-rose-600 dark:text-white text-black rounded-xl hover:bg-emerald-500 transition duration-300 px-2 m-2 "
          onClick={handleChange}
          value="latam"
        >
          Latino America
        </button>
      </div>

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
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {players.map((player,index) => {
                       const isLast = index === players.length - 1;
                       const classes = isLast ? "p-4" : "p-4 border-b border-rose-600 ";
              return(
   

              <tr key={player.PlayerCardID} className="border-rose-600">
                <td className={classes}>
                  <Typography variant="h6" className="font-semibold">
                    {player.leaderboardRank}
                  </Typography>
                </td>
                <td className={classes}>
                <Typography variant="small" color="blue-gray" className="dark:text-white text-black font-normal">
                          
                          <Link href={`/jugadores/${player.puuid}`}>
                            {player.gameName}#{player.tagLine}
                          </Link>
                        </Typography>
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="dark:text-white text-black font-normal opacity-70"
                        >
                          {player.puuid}
                        </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="h6" className="font-semibold">
                    {player.rankedRating}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="h6" className="font-semibold">
                    {player.numberOfWins}
                  </Typography>
                </td>
                <td className={classes}>
                  <Typography variant="h6" className="font-semibold">
                    {player.competitiveTier}
                  </Typography>
                </td>
              </tr>
              )
            })}
          </tbody>
        </table>
        </CardBody>
      </Card>
    </div>
  );
}
