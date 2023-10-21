const express = require("express");
const app = express();
const path = require("path");
const middleware = require("./middleware");
const unitRouter = require("./api/routes/unitRoutes");
const authRouter = require("./api/routes/authRoutes");

require("./api/services/passport");

middleware(app);

app.use("/api_v1/units", unitRouter);
app.use("/api_v1/auth", authRouter);

// Add our react build
app.use(express.static(path.join(__dirname, "../../reactjs/dist")));

app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../reactjs/dist", "index.html"));
});

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
