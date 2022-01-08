const http = require("http");
const express = require("express");
const cors = require("cors");
require("colors");

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 8000;

app.use(cors());

const UsersRepository = require("./repositories/UsersRepository.pg");
const usersController = require("./controllers/users.controller");
const usersBusiness = require("./buisness/users.business");
const userRoutes = require("./routes/users.route");
const usersRepository = new UsersRepository();

// ============================================================================================================================================================================
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const path = require("path");
// ============================================================================================================================================================================

// ============================================================================================================================================================================
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// ============================================================================================================================================================================

app.use(
  "/users",
  userRoutes(express, usersController(usersBusiness(usersRepository)))
);

server.listen(port, () => {
  var desc = "Adresse du serveur: ";
  var adresse = ` http://localhost:${port}`.green.bold;
  console.log(
    `################################################################`.yellow
      .bold
  );
  console.log(desc + adresse);
  console.log(
    `################################################################`.yellow
      .bold
  );
});

module.exports = app;
