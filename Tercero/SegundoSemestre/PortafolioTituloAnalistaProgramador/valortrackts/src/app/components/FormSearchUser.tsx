// import SearchIcon from "@/components/icons/SearchIcon";

const FormSearchUser = () => {
    return (
    <form className="flex flex-wrap gap-2 items-center justify-center bg-gray-900	p-2 rounded-xl">
    {/* <span className="min-w-[20px]">
      <SearchIcon 
        className="fill-rose-600" />
      </span> */}
    <input 
      type="text" 
      placeholder="Buscar jugador..."
      className="bg-transparent text-white flex-1 p-2 rounded-lg h-14 placeholder-rose-600 focus: outline-none focus:ring-2 focus:ring-rose-600"
    />
    <button className="bg-rose-600 rounded-lg py-4 px-4 font-bold">Buscar</button>
  </form>
    );
}
export default FormSearchUser;