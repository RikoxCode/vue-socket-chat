const express = require('express');
const socket = require('socket.io');
const cors = require('cors');
const { initSocketServer } = require('./socketServer');
require('dotenv').config();

// App setup
const app = express();

app.use(cors({
  origin: "*", // Passe dies an deine Vue-URL an (Vite Standard-Port)
  credentials: true // Falls Cookies oder Auth-Header verwendet werden
}));
app.use(express.json());

const server = app.listen(4000, () => {
  console.log('listening for requests on port 4000');
});

// Socket setup
const io = socket(server, {
  cors: {
    origin: "http://localhost:5173", // Ersetze dies mit der URL deines Vue-Frontends (Standard: Vite Port 5173)
    methods: ["GET", "POST"],
    credentials: true
  }
});


initSocketServer(io);
