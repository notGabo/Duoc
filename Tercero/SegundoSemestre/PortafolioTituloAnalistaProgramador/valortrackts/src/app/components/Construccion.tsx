import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';

const Construccion = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col items-center text-rose-600 transition duration-300 hover:scale-110 hover:text-[#0db196]">
        <ExclamationTriangleIcon className="h-20 w-20" />
        <p className="font-VALORANT text-center xl:text-5xl lg:text-xl md:text-lg sm:text-base">
          Pagina en construccion
        </p>
      </div>
    </div>
  );
};

export default Construccion;
