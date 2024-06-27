import React from 'react';

const Topbuttons = ({setQuery}) => {

    const cities = [
        {
            id: 1,
            name: "New York"
        },
        {
            id: 2,
            name: "London"
        },
        {
            id: 3,
            name: "Delhi"
        },
        {
            id: 4,
            name: "Tokyo"
        }
    ];
    return (
        <div className="flex items-center justify-around my-6">
            {cities.map((city) => (
                <button 
                    key={city.id}
                    className="text-xl font-medium text-white hover:text-blue-900 px-3 py-2 rounded transition easein"  onClick={() => setQuery(city.name)}>
                    {city.name}
                    
                </button>
            ))}

        </div>
    );
};

export default Topbuttons;