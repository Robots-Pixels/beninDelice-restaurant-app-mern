import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
import { 
    faCartPlus
   } from '@fortawesome/free-solid-svg-icons';
  
export default function MenuItem({image, title, description, price}) {
    return (
        <div className='rounded-md bg-[#D3D3D3] object-cover overflow-hidden w-full sm:bg-transparent sm:flex sm:items-center sm:max-h-[15rem]'>

            <div style={{backgroundImage: `url(${image})`}} className='w-full aspect-[4/3] bg-cover bg-center min-h-[180px]
                sm:rounded-md sm:aspect-[1/1]'>
            </div>

            <div className='p-3 flex flex-col justify-between sm:px-3 sm:py-0 gap-y-3 w-full h-full'>

                <h2 className='text-xl font-semibold'>
                    {title}
                </h2>

                <p className='text-md text-third line-clamp-3 sm:line-clamp-2 md:line-clamp-3'>
                    {description}
                </p>
                <p className='text-md font-medium text-third'>
                    À partir de {price} FCFA
                </p>

                <div className='flex gap-3 w-full'>
                    <button className='bg-primary text-white px-4 py-2 rounded-md w-[20%] flex items-center justify-center'>
                        <FontAwesomeIcon icon={faCartPlus} />
                    </button>

                    <button className='bg-third text-white px-4 py-2 rounded-md w-full flex items-center justify-center'>
                        Commander maintenant
                    </button>
                </div>

            </div>

        </div>
    )
}
