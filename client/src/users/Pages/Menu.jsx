import React, { useEffect, useState } from 'react'
import backGroundFruit from '../../assets/images/backgroundFruit.svg'
import underline from "../../assets/images/underline.svg"
import {faSquare} from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { 
  faMagnifyingGlass,
  faCartPlus
 } from '@fortawesome/free-solid-svg-icons';
import ReservationCard from '../Components/ReservationCard';
import MenuItem from '../Components/MenuItem';
import MenuLink from "../Components/MenuLink"

export default function Menu() {
  const [categorySelected, setCategorySelected] = useState("Plats Principaux");
  const [menu, setMenu] = useState(null);
  const [search, setSearch] = useState("");
  const [matcingItems, setMatchingItems] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try{
        const response = await fetch("http://localhost:3000/api/menu/all"
        )
        const menu = await response.json()
        setMenu(menu);
        localStorage.setItem("menu", JSON.stringify(menu));
      }
      catch(error){
        console.log(error)
      }
    }

    fetchMenu();

  }, [])

  const handleSearch = (e) => {
    setSearch(prev => e.target.value);
  }

  useEffect(() => {
    if (menu){
      setMatchingItems(menu.filter(dish => dish.name.toLocaleLowerCase().trim().includes(search.toLocaleLowerCase().trim())))
    }    
  }, [search])

  useEffect(() => {
    console.log(matcingItems);
  }, [matcingItems])

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
            className='flex items-center bg-third text-white px-5 py-3 rounded-md mt-5 mx-auto
            sm:mb-[4.2rem] sm:max-w-[25rem] z-30'>

            <input 
            onChange={handleSearch}
            value={search}
            className='bg-third outline-none text-md placeholder:font-semibold placeholder:text-[17px] placeholder:text-[#ffffffb3] z-30 w-[80%]' 
            type="text" 
            placeholder="Rechercher un plat"/>

            <FontAwesomeIcon
            className='ml-auto text-1xl cursor-pointer z-30'
            icon={faMagnifyingGlass} />

          </div>

          <div id='menu-items' className='flex flex-col sm:grid grid-cols-2 gap-y-7 gap-x-6 mt-5'>

            {

                matcingItems.length === 0 ?

                menu && menu.map((dish) => {
                  if (dish.category.toLocaleLowerCase().trim() === categorySelected.toLocaleLowerCase().trim()){
                    return (<MenuItem key={dish.name} image={dish.image} title={dish.name} description={dish.description} price={dish.min_price}/>)
                  }
                })

                :
                
                matcingItems.map((item) => {
                  return (<MenuItem key={item.name} image={item.image} title={item.name} description={item.description} price={item.min_price}/>)
                })
               
            }
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
