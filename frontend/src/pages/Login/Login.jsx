import React, { useState, useEffect } from 'react';
import './Login.css';
import Navbar from '../../components/Navbar/Navbar';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [signState, setSignState] = useState("Zaloguj się");
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [selectedCity, setSelectedCity] = useState('Miasto');
  const [cities, setCities] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState('Państwo');
  const [countries, setCountries] = useState([]);

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

  const handleCitySelect = (city) => {
    setSelectedCity(city);
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        setError(null);
        setEmail('');  
        setPassword('');  
        window.location.href = "/";  
      } else {
        setError(data.error);
        setSuccess(null);
      }
    } catch (error) {
      setError('Coś poszło nie tak, spróbuj ponownie.');
      setSuccess(null);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/register', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ 
          firstName, 
          lastName, 
          email, 
          password,
          phone, 
          address, 
          city: selectedCity, 
          country: selectedCountry
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(data.message);
        setError(null);
        setFirstName('');
        setLastName('');
        setEmail('');
        setPassword('');
        setPhone('');
        setAddress('');
        setSelectedCity('Miasto');
        setSelectedCountry('Państwo');
        window.location.href = "/"; 
      } else {
        setError(data.error);
        setSuccess(null);
      }
    } catch (error) {
      setError('Coś poszło nie tak, spróbuj ponownie.');
      setSuccess(null);
    }
  };

  return (
    <div className='login'>
      <Navbar />

      <div className="login-form">
        {signState === "Zarejestruj się" ? (
          <>
            <h1>{signState} aby kontynuować</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <form onSubmit={handleRegister}> {}
              <input 
                type="text" 
                placeholder="Twoje imię" 
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <input 
                type="text" 
                placeholder="Nazwisko" 
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />

              <input 
                type="tel" 
                placeholder="Numer telefonu"
                value={phone}
                onChange={(e)=> setPhone(e.target.value)} 
              />
              <input 
                type="text" 
                placeholder='Adres' 
                value={address} 
                onChange={(e) => setAddress(e.target.value)} 
              />
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

          <input 
            type="email" 
            placeholder='E-mail' 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="password" 
            placeholder='Hasło' 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
          <button className="login-button" type="submit">{signState}</button>

          <div className="form-help">
            <div className="remember">
              <input type="checkbox" />
              <label htmlFor="">Zapamiętaj mnie</label>
            </div>
            <p>Potrzebujesz pomocy?</p>
          </div>
        </form>
      </>
        ) : (
          <>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {success && <p style={{ color: 'green' }}>{success}</p>}
            <h1>{signState} aby kontynuować</h1>
            <form onSubmit={handleLogin}> {}
              <input 
                type="email" 
                placeholder='E-mail' 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
              />
              <input 
                type="password" 
                placeholder='Hasło' 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
              />
              <button className="login-button" type="submit">{signState}</button>

              <div className="form-help">
                <div className="remember">
                  <input type="checkbox" />
                  <label htmlFor="">Zapamiętaj mnie</label>
                </div>
                <p>Potrzebujesz pomocy?</p>
              </div>
            </form>
          </>
        )}
        <div className="form-switch">
          {signState === "Zaloguj się" ? (
            <p>Nowy na motomoto? <span onClick={() => setSignState("Zarejestruj się")}>Zarejestruj się!</span></p>
          ) : (
            <p>Masz już konto? <span onClick={() => setSignState("Zaloguj się")}>Zaloguj się!</span></p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
