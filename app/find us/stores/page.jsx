// StoreComponent.jsx
import React from 'react';
import './store.module.css';

const StoreComponent = () => {
    // Example store information
    const stores = [
        {
            name: 'IMM',
            address: '2 Jurong East Street 21 #02-50\nSingapore, 609601',
            closingTime: 'Closes at 10:00 PM'
        },
        {
            name: 'Paragon',
            address: '290 Orchard Road #04-42 \nSingapore, 238859',
            closingTime: 'Closes at 09:30 PM'
        },
        {
            name: 'Orchard Road',
            address: '268 Orchard Road #01-01/#02-01/#03-01 \nSingapore, 238856',
            closingTime: 'Closes at 10:00 PM'
        },
        {
            name: 'Vivo',
            address: '1 Harbourfront Walk #01-58/60/63/96/97 \nSingapore, 098585',
            closingTime: 'Closes at 09:30 PM'
        },
        {
            name: 'Bugis',
            address: '200 Victoria Street #01-112 \nSingapore, 188021',
            closingTime: 'Closes at 09:30 PM'
        },
        {
            name: 'Suntec',
            address: '3 Temasek Boulevard #01-375/376/377 \nSingapore, 038983',
            closingTime: 'Closes at 09:30 PM'
        },
        {
            name: 'Jewel',
            address: '78 Airport Boulevard #02-232/233 \nSingapore, 819666',
            closingTime: 'Closes at 10:00 PM'
        },
    ];

    return (
        <div className="store-container">
            <h2>Stores:</h2>
            <div className="scrollable-area" id="scrollableArea">
                {stores.map((store, index) => (
                    <div className="store-item" key={index}>
                        <h3>{store.name}</h3>
                        <p>{store.address}</p>
                        <p className="closing-time">{store.closingTime}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StoreComponent;
