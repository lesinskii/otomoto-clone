const express = require("express");
const mysql = require("mysql2/promise"); 
const cors = require("cors");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const app = express();
const port = 3000;

const dbConfig = {
  host: "127.0.0.1",
  port: 3306,
  user: "root",
  password: "adminadmin",
  database: "motomoto",
};

// Konfiguracja sesji
app.use(cookieParser());
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // true, używane HTTPS
}));

app.use(express.json());
//app.use(cors()); // Włączenie CORS, aby frontend mógł komunikować się z backendem

app.use(cors({
  origin: 'http://localhost:5173', // Adres frontendowy
  credentials: true
}));

app.get('/getBrands', async (req, res) => {
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('SELECT BrandName FROM brand ORDER BY BrandName');
    res.json(rows);
  } catch (error) {
    console.error('Error fetching brands:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
});

app.post("/getModels", async (req, res) => {
  const brand = req.body.brand;
  console.log("Received request for brand:", brand);
  
  let connection;
  try {
    connection = await mysql.createConnection(dbConfig);
    const query = `
      SELECT ModelName 
      FROM model 
      WHERE BrandID = (SELECT BrandID FROM brand WHERE BrandName = ?)
    `;
    const [results] = await connection.execute(query, [brand]);
    res.json(results);
  } catch (error) {
    console.error("Error fetching models:", error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
});


app.get('/getCarBody', async (req, res) => {
    let connection;
    try {
        connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT CarBodyName FROM carbody');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching car bodies:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        if (connection) {
            await connection.end();
        }
    }
});

app.get('/getFuel', async (req, res) => {
    let connection;
    try {
        connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT FuelName FROM fuel');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching fuel:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    } finally {
        if (connection) {
            await connection.end();
        }
    }
});


app.get('/getCity', async (req, res) => {
  let connection;
  try {
      connection = await mysql.createConnection(dbConfig);
      const [rows] = await connection.execute('SELECT CityName FROM cities');
      res.json(rows);
  } catch (error) {
      console.error('Error fetching cities:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  } finally {
      if (connection) {
          await connection.end();
      }
  }
});

app.get('/getCountry', async (req, res) => {
  let connection;
  try {
      connection = await mysql.createConnection(dbConfig);
      const [rows] = await connection.execute('SELECT CountryName FROM countries');
      res.json(rows);
  } catch (error) {
      console.error('Error fetching countries:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  } finally {
      if (connection) {
          await connection.end();
      }
  }
});

app.get('/getDamage', async (req, res) => {
  let connection;
  try {
      connection = await mysql.createConnection(dbConfig);
      const [rows] = await connection.execute('SELECT DamageName FROM damage');
      res.json(rows);
  } catch (error) {
      console.error('Error fetching damages:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  } finally {
      if (connection) {
          await connection.end();
      }
  }
});

app.get('/getViewAllAutos', async (req, res) => {
  let connection;
  try {
      connection = await mysql.createConnection(dbConfig);
      const [rows] = await connection.execute('SELECT * FROM viewallautos');
      res.json(rows);
  } catch (error) {
      console.error('Error fetching autos:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  } finally {
      if (connection) {
          await connection.end();
      }
  }
});

app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  let connection;

  try {
    connection = await mysql.createConnection(dbConfig);

    // Sprawdź, czy użytkownik istnieje
    const [userExists] = await connection.execute('SELECT IfEmailExists(?) AS userExists', [email]);

    if (!userExists[0].userExists) {
      return res.status(404).json({ error: 'Użytkownik nie istnieje' });
    }

    // Sprawdź, czy dane logowania są poprawne
    const [isValidUser] = await connection.execute('SELECT ValidateUserCredentials(?, ?) AS userID', [email, password]);

    if (isValidUser[0].userID === 0) {
      return res.status(401).json({ error: 'Niepoprawny e-mail lub hasło' });
    }

    // Ustawienie sesji z userID
    req.session.user = { userID: isValidUser[0].userID };
    console.log('Sesja po zalogowaniu:', req.session);
    res.json({ success: true, message: 'Poprawnie zalogowano' });

  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
});

app.post('/register', async (req, res) => {
  const { firstName, lastName, email,password, phone, address, city, country } = req.body;
  let connection;

  // Sprawdź, czy wszystkie wymagane pola są zdefiniowane
  if (!firstName || !lastName || !email || !password|| !phone || !address || !city || !country) {
    return res.status(400).json({ error: 'Wszystkie pola są wymagane' });
  }

  try {
    connection = await mysql.createConnection(dbConfig);

  
    const [maxUserIdResult] = await connection.execute('SELECT IFNULL(MAX(UserID), 0) + 1 AS newUserId FROM user');
    const newUserId = maxUserIdResult[0].newUserId;


    // Wstawianie nowego użytkownika
    const query = `
      CALL AddUser (?, ?, ?, ?, ?, ?, ?, ?) 
    `;
    await connection.execute(query, [firstName, lastName, email, password, phone, address, city, country]);

    // Ustawienie sesji z userID
    req.session.user = { userID: newUserId };
    console.log('Sesja po rejestracji:', req.session);
    res.json({ success: true, message: 'Poprawnie zarejestrowano' });

  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
});




app.get('/userInfo', async (req, res) => {
  const { userid } = req.query;
  let connection;

  try {
    connection = await mysql.createConnection(dbConfig);
    const [rows] = await connection.execute('CALL GetUserInfo(?);', [userid]);

    if (rows.length > 0) {
      const userInfo = rows[0][0];  // Zwraca pierwszy wiersz i pierwszy zestaw wyników
      res.json(userInfo);
    } else {
      res.status(404).json({ error: 'User not found' });
    }

  } catch (error) {
    console.error('Error fetching user info:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
});

app.post('/logout', (req, res) => {
  // Zniszcz sesję użytkownika
  req.session.destroy(err => {
    if (err) {
      console.error('Error destroying session:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    // Wyślij odpowiedź z sukcesem
    res.clearCookie('connect.sid'); // Opcjonalnie: wyczyść ciasteczka sesji
    res.json({ success: true, message: 'Poprawnie wylogowano' });
  });
});



// Endpoint sprawdzający sesję
app.get('/session', (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, userID: req.session.user.userID });
  } else {
    res.json({ loggedIn: false });
  }
});


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
