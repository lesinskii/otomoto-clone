import React, { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../../assets/logo.png';
import heart_logo from '../../assets/heart.png';
import person_logo from '../../assets/person.png';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userID, setUserID] = useState(null);
  const [userInfoVisible, setUserInfoVisible] = useState(false);
  const [userInfo, setUserInfo] = useState(null);  // Nowy stan do przechowywania danych użytkownika
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const response = await fetch('http://localhost:3000/session', {
          method: 'GET',
          credentials: 'include'
        });
        const data = await response.json();
        if (data.loggedIn) {
          setLoggedIn(true);
          setUserID(data.userID);
        } else {
          setLoggedIn(false);
          setUserID(null);
        }
      } catch (error) {
        console.error('Error checking session:', error);
      }
    };

    checkSession();
  }, []);

  const fetchUserInfo = async () => {
    try {
      const response = await fetch(`http://localhost:3000/userInfo?userid=${userID}`, {
        method: 'GET',
        credentials: 'include'
      });
      const data = await response.json();
      setUserInfo(data);  // Ustawienie informacji o użytkowniku
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const handleUserInfoToggle = () => {
    if (loggedIn) {
      if (!userInfoVisible) {
        fetchUserInfo();  // Pobierz dane użytkownika, jeśli menu nie jest widoczne
      }
      setUserInfoVisible(!userInfoVisible);
    } else {
      navigate('/login');
    }
  };

  return (
    <div className='navbar'>
      <div className="navbar-left">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <div className="navbar-right">
        <img src={heart_logo} alt="" className='icons' />
        <p className="out-button" onClick={() => navigate('/')}>Obserwowane</p>
        <img src={person_logo} alt="" className='icons' />
        <b>
          <p className="out-button" onClick={handleUserInfoToggle}>
            {loggedIn ? `Zalogowano` : 'Zaloguj się | Zarejestruj się'}
          </p>
        </b>
        {userInfoVisible && userInfo && (
          <div className="user-info">
            <p>Imię i Nazwisko: {userInfo.FullName}</p>
            <p>Email: {userInfo.Email}</p>
            <p>Telefon: {userInfo.Phone}</p>
            <p>Kraj: {userInfo.CountryName}</p>
            <p>Miasto: {userInfo.CityName}</p>
            <p>Adres: {userInfo.Adress}</p>
            <div className="logout-button-container">

              <button className="logout-button" onClick={async () => {
                try {
                  await fetch('http://localhost:3000/logout', {
                    method: 'POST',
                    credentials: 'include'
                  });
                  setLoggedIn(false);
                  setUserID(null);
                  setUserInfoVisible(false);
                  navigate('/');
                } catch (error) {
                  console.error('Error during logout:', error);
                }
              }}>
                Wyloguj się
              </button>
            </div>
          </div>
        )}
        <button type="button" id="start_selling_button" className='selling_button' onClick={() => navigate('/sellerad')}>
          + Zacznij sprzedawać
        </button>
      </div>
    </div>
  );
};

export default Navbar;
