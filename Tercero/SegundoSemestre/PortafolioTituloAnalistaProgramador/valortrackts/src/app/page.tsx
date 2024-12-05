"use client"
import Carrusel from "./components/Carrusel";
import HomeBody from "./components/homeBody";
import Image from "next/image";
import App from "./components/Swipper";
import SearchBar from "./components/Searchbar";

const home = () => {
  return (
    <div >
        <SearchBar/>
        <App/>
        {/* <Carrusel /> */}
        <HomeBody />
    </div>
  );
};

export default home;