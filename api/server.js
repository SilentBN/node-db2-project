const express = require("express");
const carsRouter = require("./cars/cars-router");
const rateLimit = require("express-rate-limit");

const server = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again after 15 minutes",
});

server.use(limiter);

server.use(express.json());

server.use("/api/cars", carsRouter);

server.use((err, req, res, next) => {
  // eslint-disable-line
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
});

module.exports = server;
