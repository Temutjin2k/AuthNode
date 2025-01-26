require('dotenv').config()
const express = require('express');
const path = require('path');

const app = express()
const { Client } = require('pg');

// Database connection configuration
const dbConfig = {
	user: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	host: process.env.DB_HOST,
	port: process.env.DB_PORT,
	database: process.env.DB_NAME,
};

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
app.get("/sign-up", (req, resp) =>{
    resp.sendFile(path.join(__dirname, 'web', 'sign-up.html'));
})
app.get("/login", (req, resp) =>{
    resp.sendFile(path.join(__dirname, 'web', 'login.html'));
})
app.get("/profile", (req, resp) =>{
    resp.sendFile(path.join(__dirname, 'web', 'profile.html'));
})

app.post("api/register", (req, resp) =>{
    
})

app.post("api/login", (req, resp) =>{
    
})

app.listen("8080", () =>{
    console.log("ListenAndServe: http://localhost:8080/")
})