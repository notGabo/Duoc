"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

const SearchBar = () => {
  interface BasicAccountData {
    name: string;
    puiid: string;
    region: string;
    tag: string;
  }

  const [loading, setLoading] = useState(false); //
  const [searchQuery, setSearchQuery] = useState("");
  const [searchMessage, setSearchMessage] = useState(<></>);
  const router = useRouter();

  const handleInputChange = (event: any) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    const riotname = searchQuery.split("#")[0];
    const riottag = searchQuery.split("#")[1];
    const urlToGetData =
      "https://api.henrikdev.xyz/valorant/v1/account/" +
      riotname +
      "/" +
      riottag;
    const fetchAccountData = async () => {
      try {
        const response = await fetch(urlToGetData);
        const data = await response.json();
        const accountData: BasicAccountData = {
          name: data.data.name,
          puiid: data.data.puuid,
          region: data.data.region,
          tag: data.data.tag,
        };
        console.log(accountData);
        router.push("/jugadores/" + accountData.puiid);
      } catch (error) {
        console.log(error);
        setSearchMessage(
          <p className="bg-red-500 dark:text-white text-black mb-1 p-2 rounded-xl">No se encontró el jugador</p>
        );
      }
    };
    fetchAccountData();
  };

  return (
    <div>
      <div className="mt-9 mb-3 ml-9 mr-9 flex sm:flex-wrap md:flex-wrap">
        <input
          type="text"
          className="flex-1 px-4 py-2 rounded-lg dark:bg-gray-900 bg-[#eee7d8] dark:text-white text-black focus:outline-none focus:ring focus:border-rose-600 focus:ring-rose-600 transition active:border-rose-600"
          placeholder="Player#LAS"
          value={searchQuery}
          onChange={handleInputChange}
          style={{ marginRight: "1rem" }}
        />

        <button
          className="lg:w-1/12 md:4/12 transition rounded-lg bg-rose-600 dark:text-gray-900  text-white hover:bg-green-600   focus:outline-none focus:ring focus:border-rose-600"
          onClick={handleSearch}
        >
          Buscar
        </button>
      </div>
      <div className="flex justify-center">{searchMessage}</div>
    </div>
  );
};
export default SearchBar;
