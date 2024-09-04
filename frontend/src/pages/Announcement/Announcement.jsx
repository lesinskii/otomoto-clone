import React, { useState, useEffect } from 'react';
import './Announcement.css';
import Navbar from '../../components/Navbar/Navbar';

const Announcement = () => {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('http://localhost:3000/getViewAllAutos');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Fetched cars data:', data);
        setCars(data);
      } catch (error) {
        console.error('Error fetching cars:', error);
        setError('Error fetching data');
      }
    };

    fetchCars();
  }, []);

  return (
    <div className='announcement'>
      <Navbar />

      <div className="car-list">
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {cars.length === 0 ? (
          <p>No cars available</p>
        ) : (
          cars.map((car) => (
            <div key={car.id} className="car-item">
              <h3>{car.make} {car.model}</h3>
              <p>Typ: {car.type}</p>
              <p>Paliwo: {car.fuel}</p>
              <p>Skrzynia biegów: {car.transmission}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Announcement;
