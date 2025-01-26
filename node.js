require('dotenv').config()
const express = require('express');
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

app.get("/", (req, resp) =>{
    resp.json({msg:"hello"})
})