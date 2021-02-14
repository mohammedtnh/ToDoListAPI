const express = require("express");
const db = require("./db/models");
const taskRouts = require("./routes/tasks");
const PORT = 8000;
const app = express();
const cors = require("cors");

//Middleware
app.use(express.json());
app.use(cors());

//Routs
app.use("/tasks", taskRouts);

//Handle 404
app.use((req, res, next) => {
  const error = new Error("Path Not Found");
  error.status = 404;
  next(error);
});

//Handle Error
app.use((err, req, res, next) => {
  res.status(err.status ?? 500);
  res.json({ message: err.message ?? "Internal Server Error" });
});

//Sync DB and listen to port
const run = async () => {
  try {
    await db.sequelize.sync({ alter: true });
    console.log("Connection to the database successful!");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
  }

  await app.listen(PORT, () => {
    console.log(`The application is running on localhost:${PORT}`);
  });
};

run();
