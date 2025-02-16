import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faSquare} from "@fortawesome/free-solid-svg-icons"


export default function ReservationCard() {
  return (
    <section className='bg-[#402e32b3] flex mx-auto w-full sm:px-4'>
    <div className='flex mx-auto w-full p-2 pt-14
    sm:pt-16 sm:max-w-6xl 
    '>
        <div className='flex mx-auto flex-col w-full 
                        sm:flex-row sm:max-w-6xl sm:pb-12
                        '>

            <div className='bg-third p-4 rounded-lg shadow-lg text-white border-black border-4 text-center
            sm:w-3/5
            sm:border-[8px] sm:rounded-[20px] sm:rounded-r-none sm:px-16 sm:py-8 sm:border-r-0 md:px-20'>
                <h2 className='text-3xl font-semibold sm:text-5xl'>Reservation en ligne</h2>

                <p className='text-sm mb-4 sm:text-base sm:mt-3'>Contactez-nous au <span className='text-black'>+229 01 40 82 04 93</span> <br className='sm:hidden'/>
                ou remplissez le formulaire suivant
                </p>

                <form className='space-y-4'>

                <div className='flex flex-col gap-4 sm:grid sm:grid-cols-2'>
                    <div className='flex flex-col space-y-2'>
                        <input type='text' id='nom' placeholder='Nom' required className='px-2 py-1 border border-gray-300 rounded' />
                    </div>

                    <div className='flex flex-col space-y-2'>
                        <input type='text' id='prenom' required placeholder='Prénom' className='px-2 py-1 border border-gray-300 rounded' />
                    </div>
                </div>

               
                <div className='flex flex-col gap-4 sm:grid sm:grid-cols-2'>
                    <div className='flex flex-col space-y-2'>
                        <input type='tel' id='phone' required 
                        placeholder='Téléphone'
                        className='px-2 py-1 border border-gray-300 rounded' />
                    </div>

                    <div className='flex flex-col space-y-2'>
                        <input type='email' id='email'
                        placeholder='Email' className='px-2 py-1 border border-gray-300 rounded' />
                    </div>
                </div>
                
                <div className='flex flex-col gap-4 sm:grid sm:grid-cols-3 sm:gap-3'>
                    <div className='flex flex-col space-y-2'>
                        <input type='date' id='date' required className='px-2 py-1 border border-gray-300 rounded w-full text-black' />
                    </div>

                    <div className='flex flex-col space-y-2'>
                        <input  type='time' id='heure' required className='px-2 py-1 border bg-white border-gray-300 rounded w-full text-black' />
                    </div>

                    <div className='flex flex-col space-y-2'>
                        <input type='number' id='invites' required className='px-2 py-1 border border-gray-300 rounded' placeholder='Nombre de personnes' />
                    </div>
                </div>


                <div className='flex flex-col space-y-2 text-gray-400 rounded mb-2'>

                    <select id="special" className='px-2 py-1 rounded'>
                        <option>Occasion spéciale ?</option>
                        <option value="anniversaire">Anniversaire</option>
                        <option value="réunion">Réunion d'affaire</option>
                        <option value="romantique">Diner Romantique</option>
                    </select>

                </div>

                <div className='flex flex-col space-y-2 text-black rounded mb-2'>
                    <textarea type='text' id='message'  placeholder='Restrictions alimentaires ?' className='px-2 py-1 border border-gray-300 rounded' />
                </div>


                <div className='flex flex-col space-y-2 text-black rounded mb-2'>
                    <textarea type='text' id='restriction' placeholder='Message particulier ?' className='px-2 py-1 border border-gray-300 rounded' />
                </div>

                <button className='bg-primary text-white px-2 py-1 rounded hover:bg-opacity-85 w-full sm:text-2xl'>Réserver</button>
                </form>

            </div>

            <div className='sm:border-black sm:border-[8px] sm:rounded-[20px] sm:rounded-l-none sm:border-l-0 sm:py-8 sm:w-2/5'>
                <div className='p-4 text-white text-center sm:py-0'>
                <h2 className='text-3xl font-semibold mb-2 sm:text-5xl sm:mb-4'>Contactez Nous</h2>

                <p className='text-sm mb-2 sm:text-xl sm:mb-4'>
                    Requetes de réservation
                </p>

                <h3 className='text-black text-2xl mb-2 sm:text-3xl sm:font-semibold sm:mb-8'>+229 01 40 82 04 93</h3>
                </div>
                
                <div className="relative w-full mb-4 sm:mb-16">
                <FontAwesomeIcon
                    className="absolute top-1/2 left-1/2 text-[#d3d3d3] text-sm rotate-[45deg] transform -translate-x-1/2 -translate-y-1/2 sm:text-2xl"
                    icon={faSquare}
                />
                </div>

                <p className='text-lg font-medium text-white mb-2 text-center sm:text-xl sm:mb-4'>
                    Horaires d'ouverture
                </p>

                <p className='text-sm mb-4 text-white text-center sm:text-[1rem] sm:mb-8'>
                    Du Lundi au Samedi <br />
                    09h - 23h
                </p>


                <div className="relative w-full mb-8 sm:mb-16">
                <FontAwesomeIcon
                    className="absolute top-1/2 left-1/2 text-[#d3d3d3] text-sm rotate-[45deg] transform -translate-x-1/2 -translate-y-1/2 sm:text-2xl"
                    icon={faSquare}
                />
                </div>

                <p className='text-lg font-medium text-white mb-2 text-center sm:text-xl sm:mb-4'>
                    Localisation
                </p>

                <p className='text-sm mb-10 text-white text-center sm:text-[1rem] sm:mb-8'>
                    BeninDelice, Rue de la Marina <br />
                    Cotonou, Benin
                </p>

                </div>

        </div>

    </div>
    </section>

  )
}
