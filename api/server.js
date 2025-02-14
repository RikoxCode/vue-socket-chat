const express = require('express');
const { Server } = require('socket.io');
const cors = require('cors');
const { initSocketServer } = require('./socketServer');
require('dotenv').config();

// App setup
const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
};

app.use(cors(corsOptions));

app.use(express.json());

const server = app.listen(4000, () => {
  console.log('listening for requests on port 4000');
});

// Socket setup
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true
  }
});

initSocketServer(io);
