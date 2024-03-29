import React from 'react'
import Image from 'next/image'
import { GlobeAltIcon,MenuIcon,UserCircleIcon,UsersIcon,SearchIcon } from '@heroicons/react/solid'
import {useState} from 'react';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { useRouter } from 'next/router';


function Header({placeholder}) {
  const [searchInput, setSearchInput] = useState('')
  const [startDate,setStartDate]= useState(new Date())
  const [endDate,setEndDate]= useState(new Date())
  const [numberOfGuests,setNumberOfGuests]=useState(1)
  const router = useRouter();

  const handleSelect = (range) =>{
    setStartDate(range.selection.startDate)
    setEndDate(range.selection.endDate)
  }

  const resetInput =()=>{
    setSearchInput('')
  }

  const search=()=>{
    router.push({
      pathname: '/search',
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        numberOfGuests,

      }
    })
    
  }

  const selectionRange = {
    startDate:startDate,
    endDate:endDate,
    key: 'selection'
  }

  console.log(searchInput)
  return (
    <header className='sticky top-0 z-50 grid grid-cols-3 bg-white shadow-md p-5 md:px-10'>
        {/* Left */}
        <div onClick={()=>router.push('/')} className='relative flex items-center h-10 cursor-pointer my-auto'>
          <Image 
          src='https://links.papareact.com/qd3' 
          layout='fill'
          objectFit='contain'
          objectPosition='left'
          />
        </div>

        {/* Middle */}
        <div className='flex items-center rounded-full md:border-2 py-2 md:shadow-sm'>
          <input 
           value={searchInput}
           onChange={(e)=> setSearchInput(e.target.value)}
           className='pl-5 bg-transparent outline-none flex-grow text-sm text-gray-600 placeholder-gray-400' type="text" placeholder={placeholder ||'Start your search'} />
          <SearchIcon onClick={search} className='hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer mx-2'/>
        </div>

        {/* Right */}
        <div className='flex items-center space-x-4 text-gray-500 justify-end'>
          <p className='hidden md:inline cursor-pointer'>Become a host</p>
          <GlobeAltIcon className='h-8 cursor-pointer'/>
          <div className='flex items-center space-x-2 border-2 p-2 rounded-full'>
            <MenuIcon className='h-6'/>
            <UserCircleIcon className='h-6'/>
          </div>
        </div>
        {searchInput && 
          <div className='flex flex-col col-span-3 mx-auto'>
            <DateRangePicker 
             ranges={[selectionRange]}
             minDate={new Date()}
             rangeColors={['#FD5861']}
             onChange={handleSelect}
            />
            <div className='flex items-center border-b mb-4'>
              <h2 className='text-2xl flex-grow font-semibold'>Number of Guests </h2>
              <UsersIcon className='h-5'/>
              <input 
               value={numberOfGuests}
               onChange={(e)=>setNumberOfGuests(e.target.value)}
               min={1}
               type="number" 
               className='w-12 pl-2 text-lg outline-none text-red-400'/>
            </div>
            <div className='flex'>
              <button onClick={resetInput} className='flex-grow text-gray-500'>Cancel</button>
              <button onClick={search} className='flex-grow text-red-400'>Search</button>
            </div>
          </div>
        }
    </header>
  )
}

export default Header