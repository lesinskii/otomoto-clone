import React, { useState, useEffect } from 'react';
import './Menu.css';

const Menu = () => {
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('Marka pojazdu');
  const [selectedModel, setSelectedModel] = useState('Model pojazdu');
  const [selectedPrice, setSelectedPrice] = useState('Cena'); 
  const [selectedYear, setSelectedYear] = useState('Rok produkcji'); 
  const [carBodies, setCarBodies] = useState([]);
  const [selectedCarBody, setSelectedCarBody] = useState('Typ nadwozia');
  const [fuels, setFuels] = useState([]);
  const [selectedFuel, setSelectedFuel] = useState('Typ paliwa'); 

  useEffect(() => {
    fetch('http://localhost:3000/getBrands')
      .then(response => response.json())
      .then(data => setBrands(data))
      .catch(error => console.error('Error fetching brands:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/getFuel')
      .then(response => response.json())
      .then(data => setFuels(data))
      .catch(error => console.error('Error fetching fuels:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/getCarBody')
      .then(response => response.json())
      .then(data => setCarBodies(data))
      .catch(error => console.error('Error fetching car bodies:', error));
  }, []);

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    setSelectedModel('Model pojazdu'); 
    fetch('http://localhost:3000/getModels', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ brand }),
    })
      .then(response => response.json())
      .then(data => setModels(data))
      .catch(error => console.error('Error fetching models:', error));
  };

  const handleCarBodySelect = (carBody) => {
    setSelectedCarBody(carBody);
  };

  const handleFuelSelect = (fuel) => {
    setSelectedFuel(fuel);
  };

  const handleModelSelect = (model) => {
    setSelectedModel(model);
  };

  const handlePriceSelect = (price) => {
    setSelectedPrice(price);
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
  };

  const years = [];
  for (let year = 2024; year >= 1990; year -= 1) {
    years.push(year);
  }

  return (
    <div className='menu'>
      <div className="background-div">
        <div className="container text-center">
          <div className="row">
            <div className="col bg-white">
              <div className="row">
                <div className="col-6 p-0">
                  <button type="button" className="btn w-100 h-100"> 
                    Osobowe
                  </button>
                </div>
                <div className="col-6 p-0">
                  <button type="button" className="btn w-100 h-100"> 
                    Motocykle
                  </button>
                </div>
              </div>

              <div className="row p-4">
                <div className="col-6 p-0">
                  <div className="dropdown w-100 h-100">
                    <button className="btn w-100 h-100 dropdown-toggle" type="button">
                      {selectedBrand}
                    </button>
                    <ul className="dropdown-menu w-100 scrollable-menu">
                      {brands.map((brand, index) => (
                        <li key={index} className="dropdown-item" onClick={() => handleBrandSelect(brand.BrandName)}>
                          {brand.BrandName}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="col-6 p-0">
                  <div className="dropdown w-100 h-100">
                    <button className="btn w-100 h-100 dropdown-toggle" type="button">
                      {selectedModel}
                    </button>
                    <ul className="dropdown-menu w-100">
                      {selectedBrand === 'Marka pojazdu' ? (
                        <li className="dropdown-item" style={{ color: '#6c757d' }}>
                          Wybierz markę pojazdu
                        </li>
                      ) : models.length === 0 ? (
                        <li className="dropdown-item" style={{ color: '#6c757d' }}>
                          Brak modeli do wyboru
                        </li>
                      ) : (
                        models.map((model, index) => (
                          <li key={index} className="dropdown-item" onClick={() => handleModelSelect(model.ModelName)}>
                            {model.ModelName}
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="row p-4">
                <div className="col-3 p-0">
                  <div className="dropdown w-100 h-100">
                    <button className="btn w-100 h-100 dropdown-toggle" type="button">
                      {selectedPrice}
                    </button>
                    <ul className="dropdown-menu w-100">
                      <li className="dropdown-item" onClick={() => handlePriceSelect('2000')}>2000</li>
                      <li className="dropdown-item" onClick={() => handlePriceSelect('3000')}>3000</li>
                      <li className="dropdown-item" onClick={() => handlePriceSelect('5000')}>5000</li>
                      <li className="dropdown-item" onClick={() => handlePriceSelect('10000')}>10000</li>
                      <li className="dropdown-item" onClick={() => handlePriceSelect('15000')}>15000</li>
                      <li className="dropdown-item" onClick={() => handlePriceSelect('20000')}>20000</li>
                      <li className="dropdown-item" onClick={() => handlePriceSelect('30000')}>30000</li>
                      <li className="dropdown-item" onClick={() => handlePriceSelect('40000')}>40000</li>
                      <li className="dropdown-item" onClick={() => handlePriceSelect('50000')}>50000</li>
                      <li className="dropdown-item" onClick={() => handlePriceSelect('65000')}>65000</li>
                      <li className="dropdown-item" onClick={() => handlePriceSelect('85000')}>85000</li>
                      <li className="dropdown-item" onClick={() => handlePriceSelect('100000')}>100000</li>
                      <li className="dropdown-item" onClick={() => handlePriceSelect('200000')}>200000</li>
                      <li className="dropdown-item" onClick={() => handlePriceSelect('1000000')}>1000000</li>
                      <li className="dropdown-item" onClick={() => handlePriceSelect('7500000')}>7500000</li>
                    </ul>
                  </div>
                </div>
                <div className="col-3 p-0">
                  <div className="dropdown w-100 h-100">
                    <button className="btn w-100 h-100 dropdown-toggle" type="button">
                      {selectedYear}
                    </button>
                    <ul className="dropdown-menu w-100">
                      {years.map((year, index) => (
                        <li key={index} className="dropdown-item" onClick={() => handleYearSelect(year)}>
                          {year}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="col-3 p-0">
                  <div className="dropdown w-100 h-100">
                    <button className="btn w-100 h-100 dropdown-toggle" type="button">
                      {selectedCarBody}
                    </button>
                    <ul className="dropdown-menu w-100 scrollable-menu">
                      {carBodies.length === 0 ? (
                        <li className="dropdown-item" style={{ color: '#6c757d' }}>
                          Brak typów nadwozia
                        </li>
                      ) : (
                        carBodies.map((carBody, index) => (
                          <li key={index} className="dropdown-item" onClick={() => handleCarBodySelect(carBody.CarBodyName)}>
                            {carBody.CarBodyName}
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                </div>
                <div className="col-3 p-0">
                  <div className="dropdown w-100 h-100">
                    <button className="btn w-100 h-100 dropdown-toggle" type="button">
                      {selectedFuel}
                    </button>
                    <ul className="dropdown-menu w-100 scrollable-menu">
                      {fuels.length === 0 ? (
                        <li className="dropdown-item" style={{ color: '#6c757d' }}>
                          Brak typów paliwa
                        </li>
                      ) : (
                        fuels.map((fuel, index) => (
                          <li key={index} className="dropdown-item" onClick={() => handleFuelSelect(fuel.FuelName)}>
                            {fuel.FuelName}
                          </li>
                        ))
                      )}
                    </ul>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Menu;
