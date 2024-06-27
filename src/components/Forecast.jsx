import React from 'react'

const Forecast = ({ title, data }) => {
    if (!data || data.length === 0) {
        return <div>No forecast data available</div>;
    }
    return (
        <div>
            <div className='flex text-2xl text-white mt-16'>
                <p>{title}</p>

            </div>
            <hr className='my-1' />
            <div className='flex flex-row mt-3 justify-between items-center'>
                {data.map((d, index) =>
                (
                    <div key={index} className='flex justify-center items-center flex-col text-white '>
                        <p>{d.title}</p>
                        <img src={d.icon} alt='icon-img' className='w-12 my-1'></img>
                        <p>{`${d.temp.toFixed()}`}</p>
                    </div>

                ))}
            </div>
        </div>
    )
}

export default Forecast