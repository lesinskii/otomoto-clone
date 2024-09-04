import React, { useState, useEffect } from 'react';
import './SellerAd.css';
import Navbar from '../../components/Navbar/Navbar';
import { useNavigate } from 'react-router-dom';

const SellerAd = () => {
  const navigate = useNavigate(); 


  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('Marka pojazdu');
  const [selectedModel, setSelectedModel] = useState('Model pojazdu');
  const [selectedPrice, setSelectedPrice] = useState(''); 
  const [isFocusedPrice, setIsFocusedPrice] = useState(false);
  const [selectedYear, setSelectedYear] = useState('Rok produkcji'); 
  const [carBodies, setCarBodies] = useState([]);
  const [selectedCarBody, setSelectedCarBody] = useState('Typ nadwozia');
  const [fuels, setFuels] = useState([]);
  const [selectedFuel, setSelectedFuel] = useState('Typ paliwa');
  const [selectedMileage,setSelectedMileage]= useState('');
  const [isFocusedMileage, setIsFocusedMileage] = useState(false);
  const [selectedCity,setSelectedCity]=useState('Miasto sprzedaży');
  const [cities,setCities]=useState([]);
  const [selectedCountry,setSelectedCountry]=useState('Kraj pochodzenia');
  const [countries,setCountries]=useState([]);
  const [selectedVIN,setSelectedVIN]=useState('');
  const [isFocusedVIN, setIsFocusedVIN] = useState(false);
  const [selectedDamage,setSelectedDamage]=useState('Uszkodzenia');
  const [damages,setDamages]=useState([]);
  const [selectedFuelConsumption,setSelectedFuelConsumption]=useState('');
  const [isFocusedFuelConsumption, setIsFocusedFuelConsumption] = useState(false);
  const [selectedFuelConsumptionCity,setSelectedFuelConsumptionCity]=useState('');
  const [isFocusedFuelConsumptionCity, setIsFocusedFuelConsumptionCity] = useState(false);



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

  useEffect(() => {
    fetch('http://localhost:3000/getCity')
      .then(response => response.json())
      .then(data => setCities(data))
      .catch(error => console.error('Error fetching cities:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/getCountry')
      .then(response => response.json())
      .then(data => setCountries(data))
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  useEffect(() => {
    fetch('http://localhost:3000/getDamage')
      .then(response => response.json())
      .then(data => setDamages(data))
      .catch(error => console.error('Error fetching damages:', error));
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

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };
  
  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
  };

  const handleDamageSelect = (damage) => {
    setSelectedDamage(damage);
  };

  const handleFuelSelect = (fuel) => {
    setSelectedFuel(fuel);
  };

  const handleModelSelect = (model) => {
    setSelectedModel(model);
  };

  const handleYearSelect = (year) => {
    setSelectedYear(year);
  };

  const handleVINSelect = (vin) => {
    setSelectedVIN(vin.target.value);
  };
  const handleFocusVIN = () => {
    setIsFocusedVIN(true);
  };

  const handleBlurVIN = () => {
    if (!selectedVIN) {
      setIsFocusedVIN(false);
    }
  };

  const handleMileageSelect = (mileage) => {
    setSelectedMileage(mileage.target.value);
  };
  const handleFocusMileage = () => {
    setIsFocusedMileage(true);
  };

  const handleBlurMileage = () => {
    if (!selectedMileage) {
      setIsFocusedMileage(false);
    }
  };

  const handlePriceSelect = (price) => {
    setSelectedPrice(price.target.value);
  };
  const handleFocusPrice = () => {
    setIsFocusedPrice(true);
  };

  const handleBlurPrice = () => {
    if (!selectedPrice) {
      setIsFocusedPrice(false);
    }
  };

  const handleFuelConsumptionSelect = (fuelConsumption) => {
    setSelectedFuelConsumption(fuelConsumption.target.value);
  };
  const handleFocusFuelConsumption = () => {
    setIsFocusedFuelConsumption(true);
  };

  const handleBlurFuelConsumption = () => {
    if (!selectedFuelConsumption) {
      setIsFocusedFuelConsumption(false);
    }
  };

  const handleFuelConsumptionCitySelect = (fuelConsumptionCity) => {
    setSelectedFuelConsumptionCity(fuelConsumptionCity.target.value);
  };
  const handleFocusFuelConsumptionCity = () => {
    setIsFocusedFuelConsumptionCity(true);
  };

  const handleBlurFuelConsumptionCity = () => {
    if (!selectedFuelConsumptionCity) {
      setIsFocusedFuelConsumptionCity(false);
    }
  };

  const handleAddAdClick = () => {
    console.log('Numer VIN zapisany:', selectedVIN);
    console.log('Przebieg zapisany:', selectedMileage);

  };

  const years = [];
  for (let year = 2024; year >= 1990; year -= 1) {
    years.push(year);
  }

  return (
    <div className='seller-ad'>
        <Navbar />


        <div className='container'>
        <h1>Dodaj ogłoszenie</h1>
        <p>Nie jesteś zalogowany? <span className="login-button" onClick={() => navigate('/login')}>Zaloguj się!</span></p>
        <div className="background">
            <div className="content">
            <div className="row">
                <div className="column column-full">
                <div className="button-group">
                    <button type="button" className="button"> 
                    Osobowe
                    </button>
                    <button type="button" className="button"> 
                    Motocykle
                    </button>
                </div>

                <div className="row padding">
                    <div className="column column-half">
                    <div className="dropdown">
                        <button className="dropdown-toggle" type="button">
                        {selectedBrand}
                        </button>
                        <ul className="dropdown-menu scrollable-menu">
                        {brands.map((brand, index) => (
                            <li key={index} className="dropdown-item" onClick={() => handleBrandSelect(brand.BrandName)}>
                            {brand.BrandName}
                            </li>
                        ))}
                        </ul>
                    </div>
                    </div>
                    <div className="column column-half">
                    <div className="dropdown">
                        <button className="dropdown-toggle" type="button">
                        {selectedModel}
                        </button>
                        <ul className="dropdown-menu scrollable-menu">
                        {selectedBrand === 'Marka pojazdu' ? (
                            <li className="dropdown-item disabled">
                            Wybierz markę pojazdu
                            </li>
                        ) : models.length === 0 ? (
                            <li className="dropdown-item disabled">
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

                <div className="row menu-padding">
                    <div className="column column-quarter">
                        <input
                            type="text"
                            value={selectedPrice}
                            onChange={handlePriceSelect}
                            onFocus={handleFocusPrice}
                            onBlur={handleBlurPrice}
                            className={`button-input ${isFocusedPrice ? 'focused' : ''}`}
                            placeholder="Cena (PLN)"
                        />
                    </div>
                    <div className="column column-quarter">
                    <div className="dropdown">
                        <button className="dropdown-toggle" type="button">
                        {selectedYear}
                        </button>
                        <ul className="dropdown-menu scrollable-menu">
                        {years.map((year, index) => (
                            <li key={index} className="dropdown-item" onClick={() => handleYearSelect(year)}>
                            {year}
                            </li>
                        ))}
                        </ul>
                    </div>
                    </div>
                    <div className="column column-quarter">
                    <div className="dropdown">
                        <button className="dropdown-toggle" type="button">
                        {selectedCarBody}
                        </button>
                        <ul className="dropdown-menu scrollable-menu">
                        {carBodies.length === 0 ? (
                            <li className="dropdown-item disabled">
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
                    <div className="column column-quarter">
                    <div className="dropdown">
                        <button className="dropdown-toggle" type="button">
                        {selectedFuel}
                        </button>
                        <ul className="dropdown-menu scrollable-menu">
                        {fuels.length === 0 ? (
                            <li className="dropdown-item disabled">
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

                <div className="row padding">
                        <div className="column column-quarter">
                        <div className='dropdown'>
                            <button className="dropdown-toggle" type="button">
                                {selectedCity}
                            </button>
                            <ul className="dropdown-menu scrollable-menu">
                            {cities.length === 0 ? (
                                <li className="dropdown-item disabled">
                                Brak miast
                                </li>
                            ) : (
                                cities.map((city, index) => (
                                <li key={index} className="dropdown-item" onClick={() => handleCitySelect(city.CityName)}>
                                    {city.CityName}
                                </li>
                                ))
                            )}
                            </ul>
                        </div>
                        </div>
                        
                        <div className="column column-quarter">
                        <div className='dropdown'>
                            <button className="dropdown-toggle" type="button">
                                {selectedCountry}
                            </button>
                            <ul className="dropdown-menu scrollable-menu">
                            {countries.length === 0 ? (
                                <li className="dropdown-item disabled">
                                Brak państw
                                </li>
                            ) : (
                                countries.map((country, index) => (
                                <li key={index} className="dropdown-item" onClick={() => handleCountrySelect(country.CountryName)}>
                                    {country.CountryName}
                                </li>
                                ))
                            )}
                            </ul>
                        </div>
                        </div>
                        
                        <div className="column column-quarter">
                            <input
                                type="text"
                                value={selectedMileage}
                                onChange={handleMileageSelect}
                                onFocus={handleFocusMileage}
                                onBlur={handleBlurMileage}
                                className={`button-input ${isFocusedMileage ? 'focused' : ''}`}
                                placeholder="Przebieg (km)"
                            />
                        </div>

                        <div className="column column-quarter">
                            <input
                                type="text"
                                value={selectedVIN}
                                onChange={handleVINSelect}
                                onFocus={handleFocusVIN}
                                onBlur={handleBlurVIN}
                                className={`button-input ${isFocusedVIN ? 'focused' : ''}`}
                                placeholder="VIN"
                            />
                        
                        </div>


                </div>

                <div className="row padding">
                        <div className="column column-one-third">
                        <div className='dropdown'>
                            <button className="dropdown-toggle" type="button">
                                {selectedDamage}
                            </button>
                            <ul className="dropdown-menu scrollable-menu">
                            {damages.length === 0 ? (
                                <li className="dropdown-item disabled">
                                Brak wyboru
                                </li>
                            ) : (
                                damages.map((damage, index) => (
                                <li key={index} className="dropdown-item" onClick={() => handleDamageSelect(damage.DamageName)}>
                                    {damage.DamageName}
                                </li>
                                ))
                            )}
                            </ul>
                        </div>
                        </div>
                        
                        <div className="column column-one-third">
                            <input
                                type="text"
                                value={selectedFuelConsumption}
                                onChange={handleFuelConsumptionSelect}
                                onFocus={handleFocusFuelConsumption}
                                onBlur={handleBlurFuelConsumption}
                                className={`button-input ${isFocusedFuelConsumption ? 'focused' : ''}`}
                                placeholder="Spalanie (L)"
                            />
                        </div>
                        
                        <div className="column column-one-third">
                            <input
                                type="text"
                                value={selectedFuelConsumptionCity}
                                onChange={handleFuelConsumptionCitySelect}
                                onFocus={handleFocusFuelConsumptionCity}
                                onBlur={handleBlurFuelConsumptionCity}
                                className={`button-input ${isFocusedFuelConsumptionCity ? 'focused' : ''}`}
                                placeholder="Spalanie w mieście (L)"
                            />
                        </div>

                </div>


                <div className="row">
                    <div className="column column-full">
                    <button type="button" className="show-button " onClick={handleAddAdClick}>
                        Dodaj ogłoszenie
                    </button>
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

export default SellerAd;
