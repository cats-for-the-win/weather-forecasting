import React from 'react';

const Topbuttons = () => {

    const cities = [
        {
            id: 1,
            name: "tokyo"
        },
        {
            id: 2,
            name: "delhi"
        },
        {
            id: 3,
            name: "sydney"
        },
        {
            id: 4,
            name: "pune"
        }
    ];
    return (
        <div className="flex items-center justify-around my-6">
            {cities.map((city) => (
                <button 
                    key={city.id}
                    className="text-lg font-medium hover:text-gray-50 px-3 py-2 rounded transition easein">
                    {city.name}
                </button>
            ))}

        </div>
    );
};

export default Topbuttons;