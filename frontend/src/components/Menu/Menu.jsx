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
    <div className='menu-container'>
    <div className="menu-background">
        <div className="menu-content">
        <div className="menu-row">
            <div className="menu-column menu-column-full">
            <div className="menu-button-group">
                <button type="button" className="menu-button"> 
                Osobowe
                </button>
                <button type="button" className="menu-button"> 
                Motocykle
                </button>
            </div>

            <div className="menu-row menu-padding">
                <div className="menu-column menu-column-half">
                <div className="menu-dropdown">
                    <button className="menu-dropdown-toggle" type="button">
                    {selectedBrand}
                    </button>
                    <ul className="menu-dropdown-menu scrollable-menu">
                    {brands.map((brand, index) => (
                        <li key={index} className="menu-dropdown-item" onClick={() => handleBrandSelect(brand.BrandName)}>
                        {brand.BrandName}
                        </li>
                    ))}
                    </ul>
                </div>
                </div>
                <div className="menu-column menu-column-half">
                <div className="menu-dropdown">
                    <button className="menu-dropdown-toggle" type="button">
                    {selectedModel}
                    </button>
                    <ul className="menu-dropdown-menu scrollable-menu">
                    {selectedBrand === 'Marka pojazdu' ? (
                        <li className="menu-dropdown-item disabled">
                        Wybierz markę pojazdu
                        </li>
                    ) : models.length === 0 ? (
                        <li className="menu-dropdown-item disabled">
                        Brak modeli do wyboru
                        </li>
                    ) : (
                        models.map((model, index) => (
                        <li key={index} className="menu-dropdown-item" onClick={() => handleModelSelect(model.ModelName)}>
                            {model.ModelName}
                        </li>
                        ))
                    )}
                    </ul>
                </div>
                </div>
            </div>

            <div className="menu-row menu-padding">
                <div className="menu-column menu-column-quarter">
                <div className="menu-dropdown">
                    <button className="menu-dropdown-toggle" type="button">
                    {selectedPrice}
                    </button>
                    <ul className="menu-dropdown-menu scrollable-menu">
                    <li className="menu-dropdown-item" onClick={() => handlePriceSelect('2000')}>2000</li>
                    <li className="menu-dropdown-item" onClick={() => handlePriceSelect('3000')}>3000</li>
                    <li className="menu-dropdown-item" onClick={() => handlePriceSelect('5000')}>5000</li>
                    <li className="menu-dropdown-item" onClick={() => handlePriceSelect('10000')}>10000</li>
                    <li className="menu-dropdown-item" onClick={() => handlePriceSelect('15000')}>15000</li>
                    <li className="menu-dropdown-item" onClick={() => handlePriceSelect('20000')}>20000</li>
                    <li className="menu-dropdown-item" onClick={() => handlePriceSelect('30000')}>30000</li>
                    <li className="menu-dropdown-item" onClick={() => handlePriceSelect('40000')}>40000</li>
                    <li className="menu-dropdown-item" onClick={() => handlePriceSelect('50000')}>50000</li>
                    <li className="menu-dropdown-item" onClick={() => handlePriceSelect('65000')}>65000</li>
                    <li className="menu-dropdown-item" onClick={() => handlePriceSelect('85000')}>85000</li>
                    <li className="menu-dropdown-item" onClick={() => handlePriceSelect('100000')}>100000</li>
                    <li className="menu-dropdown-item" onClick={() => handlePriceSelect('200000')}>200000</li>
                    <li className="menu-dropdown-item" onClick={() => handlePriceSelect('1000000')}>1000000</li>
                    <li className="menu-dropdown-item" onClick={() => handlePriceSelect('7500000')}>7500000</li>
                    </ul>
                </div>
                </div>
                <div className="menu-column menu-column-quarter">
                <div className="menu-dropdown">
                    <button className="menu-dropdown-toggle" type="button">
                    {selectedYear}
                    </button>
                    <ul className="menu-dropdown-menu scrollable-menu">
                    {years.map((year, index) => (
                        <li key={index} className="menu-dropdown-item" onClick={() => handleYearSelect(year)}>
                        {year}
                        </li>
                    ))}
                    </ul>
                </div>
                </div>
                <div className="menu-column menu-column-quarter">
                <div className="menu-dropdown">
                    <button className="menu-dropdown-toggle" type="button">
                    {selectedCarBody}
                    </button>
                    <ul className="menu-dropdown-menu scrollable-menu">
                    {carBodies.length === 0 ? (
                        <li className="menu-dropdown-item disabled">
                        Brak typów nadwozia
                        </li>
                    ) : (
                        carBodies.map((carBody, index) => (
                        <li key={index} className="menu-dropdown-item" onClick={() => handleCarBodySelect(carBody.CarBodyName)}>
                            {carBody.CarBodyName}
                        </li>
                        ))
                    )}
                    </ul>
                </div>
                </div>
                <div className="menu-column menu-column-quarter">
                <div className="menu-dropdown">
                    <button className="menu-dropdown-toggle" type="button">
                    {selectedFuel}
                    </button>
                    <ul className="menu-dropdown-menu scrollable-menu">
                    {fuels.length === 0 ? (
                        <li className="menu-dropdown-item disabled">
                        Brak typów paliwa
                        </li>
                    ) : (
                        fuels.map((fuel, index) => (
                        <li key={index} className="menu-dropdown-item" onClick={() => handleFuelSelect(fuel.FuelName)}>
                            {fuel.FuelName}
                        </li>
                        ))
                    )}
                    </ul>
                </div>
                </div>
            </div>

            <div className="menu-row">
                <div className="menu-column menu-column-full">
                <button type="button" className="menu-show-button">
                    Pokaż
                </button>
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
