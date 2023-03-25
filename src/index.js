const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const userRoutes = require("./routes/user");
const morgan = require("morgan");

const app = express();

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

// configuracion del puerto
app.set("port", process.env.PORT || 3000);
/*
 Tambien se puede colocar de esta manera
 const port = process.env.PORT || 3000
*/

app.listen(app.get("port"), () => {
  console.log("listening on port", app.get("port"));
});

// Routes
app.use("/", userRoutes);

// mongodb conexion
mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("connected to MongoDB"))
  .catch((err) => console.error(err));

/* Prueba de ejemplo*/
// app.get("/",(req,res)=>{
//     res.send("Hola a todos desde el puerto principal")
// })
