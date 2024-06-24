import { TiWeatherDownpour } from "react-icons/ti";
import { FaThermometerEmpty } from "react-icons/fa";
import { BiSolidDropletHalf } from "react-icons/bi";
import { FaWind } from "react-icons/fa";
import { GiSunrise, GiSunset } from "react-icons/gi";
import { MdKeyboardArrowUp, MdKeyboardArrowDown } from "react-icons/md";
import React from 'react';

const TempAndDetails = () => {
  const VDetails = [
    {
      id: 1,
      icon: FaThermometerEmpty,
      title: "Real Feel",
      value: "22°"
    },
    {
      id: 2,
      icon: BiSolidDropletHalf,
      title: "Precipitation",
      value: "22°"
    },
    {
      id: 3,
      icon: FaWind,
      title: "Wind Speed",
      value: "22°"
    }
  ];

  const HDetails = [
    {
      id: 1,
      icon: GiSunrise,
      title: "Sunrise",
      value: "05:23"
    },
    {
      id: 2,
      icon: GiSunset,
      title: "Sunset",
      value: "19:23"
    },
    {
      id: 3,
      icon: MdKeyboardArrowUp,
      title: "High",
      value: "25°C"
    },
    {
      id: 4,
      icon: MdKeyboardArrowDown,
      title: "Low",
      value: "15°C"
    },

  ];

  return (
    <div>
      <div className="flex items-center justify-center">
        <p className='text-blue-200 text-xl font-medium my-6'>
          Rain
        </p>
      </div>
      <div className="flex items-center justify-between">
        <TiWeatherDownpour size={40} className="text-white" />
        <p className='text-white text-5xl font-medium ml-28'>22°C</p>
        
        <div className="flex flex-col space-y-3 items-start">
          {VDetails.map(({ id, icon: Icon, title, value }) => (
            <div key={id} className="flex items-center font-thin justify-center">
              <Icon size={20} className="mr-1 text-white" />
              <p className="text-white">
                {`${title}: ${value}`}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex flex-row space-x-12 items-center justify-center mt-20">
        {HDetails.map(({ id, icon: Icon, title, value }) => (
          <div key={id} className="flex items-center justify-around text-white">
            <Icon size={20} className="mr-1 text-white" />
            {`${title}: ${value}`}
          </div>
        ))}
      </div>
    </div>
  );
}

export default TempAndDetails;
