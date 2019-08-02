const express = require("express"); // importing a CommonJS module

const hubsRouter = require("./hubs/hubs-router.js");
const helmet = require("helmet"); //yarn added helmet for better security
const morgan = require("morgan"); // added morgan

const server = express();

server.use(morgan("dev")); // make sure to use it
server.use(express.json());
server.use("/api/hubs", hubsRouter); // handled by middle wear in the hubsRouter
server.use(helmet()); // make sure I use it
server.use(addName);
server.use(gateKeeper);

server.get("/", (req, res) => {
  const nameInsert = req.name ? ` ${req.name}` : "";

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

function addName(req, res, next) {
  req.name = "Paul";
  next();
}

function gateKeeper(req, res, next) {
  const seconds = new Date().getSeconds();

  if (seconds % 3 === 0) {
    res.staus(403).json({ message: "Nope" });
  } else {
    next();
  }
}

module.exports = server;
