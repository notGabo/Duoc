"use client"
import React from 'react';
import Link from 'next/link';
import CrosshairLogo from './icons/CrosshairLogo';

const ENLANCES = [
    {name: 'Duoc UC', Link: 'https://www.duoc.cl/'},
    {name: 'Github', Link: '#'},
    {name: 'Contacto', Link: '#'},
];

const NOSOTROS = [
    {name: 'Alvaro Arenas', Link: 'https://github.com/Alvaro-AAC'},
    {name: 'Gabriel Soto', Link: 'https://github.com/notGabo'},
];

const DOCUMENTACION = [
    {name: 'Repositorio front end', Link: '#'},
    {name: 'Repositorio back end', Link: '#'},
    {name: 'Diagramas', Link: '#'},
];


const Item = ({ Links, titles }: { Links: any[]; titles: string })=> {
    return (
        <ul>
            <h1 className="mb-1 font-semibold">{titles}</h1>
            {
                Links.map((link:any) => (
                    <li key={link.name}>
                        <Link className='text-white animation hover:text-rose-600' href={link.name}>{link.name}</Link>
                    </li>
                ))}
        </ul>
        )
    }

const ItemsContainer = () => {
    return(
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16">
        <Item Links={ENLANCES} titles="Enlances"  />
        <Item Links={NOSOTROS} titles="Nosotros"  />
        <Item Links={DOCUMENTACION} titles="Documentacion"  />
    </div>
    )
}
     


const Footer = () => {
    return (
        // <footer className="fixed left-0 bottom-0  bg-gray-500 text-white">
        <footer className='bg-gray-900 text-white'>
            <div className='md:flex md:justify-between md:items-center sm:px-12 px-4 bg-gray-900 py-7'>
                    <div className="mb-4 lg:-mt-2">
                        <Link
                            className="inline-flex items-center gap-2 text-gray-100 font-bold lg:text-xl md:text-2xl mb:mb-0 mb-6 lg:leading-normal"
                            href="#"
                        >
                                <CrosshairLogo className="fill-white" width={"35px"} />
                                <span className="font-VALORANT">VAlortrack</span>
                        </Link>
                    </div>
                    <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6 sm:px-8 px-5 py-16'>
                        <ItemsContainer/>
                    </div>
            </div>
        </footer>
    )
};

export default Footer;