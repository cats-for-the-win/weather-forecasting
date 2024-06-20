import React from 'react'
import { BiCurrentLocation } from "react-icons/bi"
import { FaSearch } from "react-icons/fa";
const SearchInput = () => {
  return (
    <div className='flex justify-center my-6 space-x-4'>
        <input type='text' placeholder='search by city...' className='text-gray-500 text-xl font-light p-2 capitalize placeholder:lowercase'>
        </input>
        <FaSearch size={30} className='cursor-pointer text-white pt-2 hover:scale-125 transition ease-out'/>
        <BiCurrentLocation size={35} className='cursor-pointer text-white  pt-1 hover:scale-125 transition ease-out'/>
        
    </div>
  )
}

export default SearchInput