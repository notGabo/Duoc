import Construccion from "../components/Construccion";
import TablaAgentes from "../components/tablaAgentes";

const agentes = () => {
  return (
     
    <>
      { /*  <Construccion /> */ }
      {/* do a title using a font called font-VALORANT and center it */}
      <div className="flex flex-col items-center justify-center">
        <h1 className="m-7 font-VALORANT text-4xl text-center text-rose-600 transition duration-300 dark:hover:text-white hover:text-green-500 cursor-default">Agentes</h1>
      </div>
      <TablaAgentes/>  
    </>
    );
};
  
export default agentes;