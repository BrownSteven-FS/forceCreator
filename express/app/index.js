const express = require("express");
const app = express();
// const path = require("path");
const middleware = require("./middleware");
const unitRouter = require("./api/routes/unitRoutes");

middleware(app);

app.get("/", (req, res) => {
  res.status(200).json({ message: "Service is up!" });
});

app.use("/api_v1/units", unitRouter);

// add middleware to handle errors and bad url paths
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

app.use((err, req, res, next) => {
  const { message, status } = err;
  res.status(500 || status).json({
    error: { message, status },
    method: req.method,
  });
  next();
});

module.exports = app;
