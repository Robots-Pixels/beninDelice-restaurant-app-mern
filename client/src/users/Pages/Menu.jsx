import React, { useEffect, useState } from 'react'
import backGroundFruit from '../../assets/images/backgroundFruit.svg'
import underline from "../../assets/images/underline.svg"
import ignamePilée from '../../assets/images/ignamePilée.webp';
import amiwo from '../../assets/images/amiwo.jpg';
import wassa from '../../assets/images/wassa.jpeg';
import {faSquare} from "@fortawesome/free-solid-svg-icons"
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { 
  faMagnifyingGlass,
  faCartPlus
 } from '@fortawesome/free-solid-svg-icons';
import ReservationCard from '../Components/ReservationCard';
import MenuItem from '../Components/MenuItem';
import MenuLink from "../Components/MenuLink"

export default function Menu() {

  // const handleSearchBarToogle = () => {
  //   const searchBar = document.querySelector('#search input');
  //   const serchIcon = document.querySelector('#search svg');
  //   searchBar.classList.toggle('hidden');
  //   serchIcon.classList.toggle('hidden');
  // }

  const [categorySelected, setCategorySelected] = useState("Plats principaux");

  return (
    <main className="overflow-hidden">

      <div className='w-40 absolute top-[7rem] left-[-3rem] rotate-[80deg] sm:w-56 sm:top-[6rem] sm:left-[-4rem] md:w-[24rem] md:h-[24rem] md:top-[7rem] md:left-[-10rem]'>
        <img className='md:w-[40rem] md:h-[20rem]' src={backGroundFruit}/>
      </div>

      <div className='w-40  absolute top-[7rem] right-[-2rem] transform scale-y-[-1] rotate-[100deg] sm:w-56 sm:top-[6rem] sm:right-[-4rem] md:w-[24rem] md:h-[24rem] md:top-[4rem] md:right-[6rem]'>
        <img className="translate-y-3 md:w-[30rem] md:h-[50rem]" src={backGroundFruit}/>
      </div>

      <section id='titre' className='relative mx-auto flex flex-col items-center mb-[-3rem] sm:mb-[-3rem] md:mb-[-3rem]'>

        <h1 className='text-5xl text-center font-island mt-10 sm:text-7xl md:text-9xl'>
          Le Menu
        </h1>

        <img className='
        w-48 h-36 mt-[-52px] bg-opacity-90 
        sm:w-60 sm:h-40 sm:mt-[-60px]
        md:w-[30rem] md:h-60 md:mt-[-100px]' src={underline}/>

      </section>
      
      <section id='filtres' className='w-full flex justify-center items-center'>

        <ul className='flex text-center text-[1.1rem] font-medium flex-col text-third items-center gap-y-2 z-10
        sm:flex-row sm:gap-x-10 sm:capitalize sm:text-xl md:text-3xl
        '>

          <MenuLink categorySelected={categorySelected} setCategorySelected={setCategorySelected}>Plats principaux</MenuLink>
          <MenuLink categorySelected={categorySelected} setCategorySelected={setCategorySelected}>Entrées</MenuLink>
          <MenuLink categorySelected={categorySelected} setCategorySelected={setCategorySelected}>Desserts</MenuLink>
          <MenuLink categorySelected={categorySelected} setCategorySelected={setCategorySelected}>Boissons</MenuLink>

        </ul>

      </section>

      <section id='menu' className='px-2 max-w-6xl mx-auto mb-5 sm:mt-[4rem]'>

        <div className="mx-auto px-7 max-w-xl sm:max-w-7xl">

          <div id='search'
            className='flex items-center bg-third text-white px-5 py-3 rounded-md mt-5 cursor-pointer mx-auto
            sm:mb-[4.2rem] sm:max-w-[25rem]'>

            <input className='bg-third outline-none text-md placeholder:font-semibold placeholder:text-[17px] placeholder:text-[#ffffffb3]' type="text" placeholder="Rechercher un plat"/>

            <FontAwesomeIcon
            className='ml-auto text-1xl'
            icon={faMagnifyingGlass} />

          </div>

          <div id='menu-items' className='flex flex-col sm:grid grid-cols-2 gap-y-7 gap-x-6 mt-5'>

            <MenuItem image={ignamePilée} title="Igname pilée" description="Un plat emblématique du Bénin, combinant la douceur de l’igname pilée avec une sauce arachide onctueuse et riche en saveurs locales." price="5000"/>

            <MenuItem image={amiwo} title="Amiwô" description="Un plat béninois authentique à base de riz ou de pâte de maïs, cuisiné avec une sauce tomate riche en épices locales, souvent accompagné de viande ou de poisson pour une explosion de saveurs traditionnelles." price="5000"/>
            
            <MenuItem image={wassa} title="Wassa-Wassa" description="Un plat traditionnel à base de semoule de manioc, souvent accompagné de légumes sautés, de poisson ou de viande, et relevé par des épices locales pour une expérience culinaire authentiquement béninoise." price="5000"/>

            <MenuItem image={ignamePilée} title="Igname pilée" description="Un plat emblématique du Bénin, combinant la douceur de l’igname pilée avec une sauce arachide onctueuse et riche en saveurs locales." price="5000"/>

          </div>

        </div>

      </section>

      <div className='relative mx-auto flex flex-col items-center mb-[-3rem] sm:mb-[-3rem] md:mb-[-5rem]'>
        <img className='
        w-48 h-36 mt-[-52px] bg-opacity-90 
        sm:w-60 sm:h-40 sm:mt-[-60px]
        md:w-[30rem] md:h-60 md:mt-[-100px]' src={underline}/>

      </div>

      <div className='max-w-xl mx-auto px-2 md:px-4 mb-10'>
        <h1 className='text-[1.25rem] text-center italic mt-3 
        sm:text-[2.5rem]
        bg-primary text-white rounded-md py-2 sm:py-0'>
          Prets à Vous Régaler ?
        </h1>
      </div>

      <ReservationCard />

      <div className="relative w-full">
                <hr />
            <FontAwesomeIcon
                className="absolute top-1/2 left-1/2 text-[#FFF] text-sm rotate-[45deg] transform -translate-x-1/2 -translate-y-1/2"
                icon={faSquare}
            />
      </div>

    </main>
  )
}
