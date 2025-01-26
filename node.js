require('dotenv').config()
const express = require('express');
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const verifyToken = require('./middlewares/authMiddleware'); //Middleware

const { Client } = require('pg');

const app = express()
// Database connection configuration
const dbConfig = {
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: process.env.DB_NAME,
};
const JWT_SECRET = process.env.SECRET;


// Create a new PostgreSQL client
const client = new Client(dbConfig);

// Connect to the database
client
    .connect()
	.then(() => {
		console.log('Connected to PostgreSQL database');
	})
	.catch((err) => {
		console.error('Error connecting to PostgreSQL database', err);
	});



app.use(express.static('web'))
app.use(express.json());

app.get("/sign-up", (req, resp) =>{
    resp.sendFile(path.join(__dirname, 'web', 'sign-up.html'));
})
app.get("/login", (req, resp) =>{
    resp.sendFile(path.join(__dirname, 'web', 'login.html'));
})
app.get("/profile", (req, resp) =>{
    resp.sendFile(path.join(__dirname, 'web', 'profile.html'));
})

app.post("/api/register", async (req, resp) =>{
    const { first_name, last_name, email, password } = req.body; // From json

    if (!first_name || !last_name || !email || !password) {
        return resp.status(400).json({ error: 'All fields are required'});
    }

    try {
        // Hashing password
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = 'INSERT INTO users (first_name, last_name, email, password) VALUES ($1, $2, $3, $4)';
        const values = [first_name, last_name, email, hashedPassword];

        await client.query(query, values);

        resp.status(201).json({
            message: 'User registered successfully'
        });
    } catch (err) {
        console.error('Error registering user', err);
        resp.status(500).json({ error: 'Internal Server Error' });
    }
})

app.post("/api/login", async (req, resp) =>{
    const { email, password } = req.body; 
	if (!email) {
        return resp.status(400).json({ error: 'Email is required'});
    }
	if (!password) {
        return resp.status(400).json({ error: 'Password is required'});
    }

	try {
        const query = 'SELECT * FROM users WHERE email = $1';
        const values = [email];
        const result = await client.query(query, values);

        if (result.rows.length === 0) {
            return resp.status(401).json({ error: 'email does not exists'});
        }

		const user = result.rows[0];

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return resp.status(401).json({ error: 'Wrong password' });
        }

        const token = jwt.sign(
            {
                email: user.email,
            },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        resp.status(200).json({
            message: 'Login successful',
            token: token,
        });
	}catch(error){
		console.error('Error during login', error);
        resp.status(500).json({ error: 'Internal Server Error' });
	}
})

app.get('/api/profile/info', verifyToken, async (req, res) => {
    try {
        const userEmail = req.email; // email from middleware
        const user = await client.query('SELECT first_name, last_name, email FROM users WHERE email = $1', [userEmail]);

        if (user.rows.length === 0) {
            return res.status(404).json({ error: 'User not found' });
        }

        res.json(user.rows[0]); // Отправляем данные пользователя клиенту
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});


app.listen("8080", () =>{
    console.log("ListenAndServe: http://localhost:8080/")
})