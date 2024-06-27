import React from 'react'

const TimeAndLocation = ({ weather: { formattedLocalTime, name, country } }) => {
  return (
    <div className='flex flex-col '>
      <div className='flex items-center justify-center my-6'>
        <p className='text-white text-xl'>
          {formattedLocalTime}
        </p>

      </div>
      <div className='flex items-center justify-center my-2'>
        <p className='text-white text-3xl font-medium'>
          {`${name},${country}`}
        </p>
      </div>
    </div>
  )
}

export default TimeAndLocation