const { checkDB, syncModels } = require("./database/index");
const { setRelations } = require("./database/models");
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

require("dotenv").config();

//para no tener las funciones sueltas hacemos una funcion para meterlas todas
async function connectDB() {
  await checkDB(); //chequeamos conexion con la BD
  //setRelations();
  await syncModels(); //sincronizamos los cambios con la BD
}

//creamos function para lanzar el servidor
function launchServer() {
  const app = express()
    .use(cors())
    .use(morgan("dev"))
    .use(express.json())
    .use("/api", require("./api/routes/index"))
    .listen(process.env.SRV_PORT, () => {
      console.log("Servidor de express a la escucha en el puerto " + process.env.SRV_PORT);
    });
}

async function startAPI() {
  await connectDB();
  launchServer();
}

startAPI();
