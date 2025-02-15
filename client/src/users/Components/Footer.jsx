import React from 'react'
import { Link } from 'react-router-dom'
import { FaFacebook,
    FaInstagram,
    FaTripadvisor,
    FaCircle,
    FaPhone,
    FaEnvelope
 } from 'react-icons/fa'


export default function Footer() {
  return (

    <div className='mx-auto p-2 pb-10 bg-[#402e32b3]
    sm:p-4'>

        <div className='flex flex-col mx-auto text-center max-w-md sm:flex-row sm:max-w-6xl sm:items-center sm:gap-12 sm:text-start sm:justify-between sm:flex-wrap'>

        <Link to={'/'}>
            <h1 className='text-7xl sm:text-8xl font-island text-white mt-2'>BeninDelice
            </h1>
        </Link>

        <div className='flex flex-col mb-4 sm:hidden'>
            <div className='flex justify-center items-center text-third text-4xl gap-2 mb-3'>

                <FaFacebook/>
                <FaInstagram/>

                <div className='flex flex-col justify-start'>

                    <div className='flex items-center justify-around'>
                        <FaTripadvisor className='text-3xl'/>
                        <p className='text-xl font-semibold'>4,0</p>
                    </div>

                    <div className='flex text-xs gap-1'>
                    <FaCircle/>
                    <FaCircle/>
                    <FaCircle/>
                    <FaCircle/>
                    <FaCircle className='text-[#fff]'/>
                    </div>

                </div>


            </div>

            <div className='text-white flex flex-col mx-auto gap-y-1'>
                    <div className='flex items-center gap-x-1'>
                        <FaPhone className='transform scale-x-[-1] text-third'/>
                        <Link to={"/"}>+229 01 40 82 04 93</Link>
                    </div>

                    <div className='flex items-center gap-x-1'>
                        <FaEnvelope className='text-third'/>
                        <Link to={"/"}>otmartch23@gmail.com</Link>

                    </div>
            </div>

        </div>

        <div className='flex gap-5 text-white max-w-xl px-12 justify-between sm:gap-20'>
            <div>
                <h3 className='text-xl mb-3 font-semibold'>Navigation</h3>
                <ul className='flex flex-col text-[] gap-y-3'>
                    <Link to={"/"}>
                        Accueil
                    </Link>
                    <Link to={"/"}>
                        Nous
                    </Link>
                    <Link to={"/"}>
                        Menu
                    </Link>
                    <Link to={"/"}>
                        Contact
                    </Link>
                    <Link to={"/"}>
                        Commander
                    </Link>
                </ul>
                
            </div>

            <div>
                <h3 className='text-xl mb-3 font-semibold'>Liens Utiles</h3>
                <ul className='flex flex-col text-[] gap-y-3'>
                    <Link to={"/"}>
                        S'inscrire
                    </Link>
                    <Link to={"/"}>
                        Se connecter
                    </Link>
                    <Link to={"/"}>
                        Profile
                    </Link>
                    <Link to={"/"}>
                        Programme de fidélité
                    </Link>
                    <Link to={"/"}>
                        Politique de confidentialité
                    </Link>
                </ul>
                
            </div>
        </div>

        <div className='flex-col mb-4 hidden sm:flex bg-red-'>

            <h3 className='text-xl mb-3 font-semibold text-white'>Suivez Nous</h3>

            <div className='flex justify-center items-center text-third text-4xl gap-2 mb-3'>

                <FaFacebook/>
                <FaInstagram/>

                <div className='flex flex-col justify-start'>

                    <div className='flex items-center justify-around'>
                        <FaTripadvisor className='text-3xl'/>
                        <p className='text-xl font-semibold'>4,0</p>
                    </div>

                    <div className='flex text-xs gap-1'>
                    <FaCircle/>
                    <FaCircle/>
                    <FaCircle/>
                    <FaCircle/>
                    <FaCircle className='text-[#fff]'/>
                    </div>

                </div>


            </div>

            <div className='text-white flex flex-col mx-auto gap-y-1'>
                    <div className='flex items-center gap-x-1'>
                        <FaPhone className='transform scale-x-[-1] text-third'/>
                        <Link to={"/"}>+229 01 40 82 04 93</Link>
                    </div>

                    <div className='flex items-center gap-x-1'>
                        <FaEnvelope className='text-third'/>
                        <Link to={"/"}>otmartch23@gmail.com</Link>

                    </div>
            </div>

        </div>

        </div>


    </div>
  )
}
