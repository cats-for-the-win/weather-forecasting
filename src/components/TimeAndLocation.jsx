import React from 'react'

const TimeAndLocation = () => {
  return (
    <div className='flex flex-col '>
    <div className='flex items-center justify-center my-6'>
        <p className='text-white text-xl'>
            Tuesday, 14 May 2024 | Local time : 22:32
        </p>

    </div>
    <div className='flex items-center justify-center my-2'>
    <p className='text-white text-3xl font-medium'>
            Ottawa, Canada
        </p>
        </div>
    </div>
  )
}

export default TimeAndLocation