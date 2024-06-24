import React from 'react'

const Forecast = () => {

    const data = [1, 2, 3, 4, 5]
    return (
        <div>
            <div className='flex text-2xl text-white mt-16'>
                <p>3 hour forecast</p>
               
                </div>
                <hr className='my-1'/>
                <div className='flex flex-row mt-3 justify-between items-center'>
                {data.map((data, index) =>
                (
                    <div key={index} className='flex justify-center items-center flex-col text-white '>
                        <p>Wed</p>
                        <img src='http://openweathermap.org/img/wn/01d@2x.png' alt='Emoji' className='w-12 my-1'></img>
                    </div>

                ))}


            </div>
        </div>
    )
}

export default Forecast