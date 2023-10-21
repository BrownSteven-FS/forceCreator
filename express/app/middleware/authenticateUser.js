const passport = require("passport");

// Middleware so we can provide json responses for better error handling & ux
const authenticateUser = (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    req.user = user;
    return next();
  })(req, res, next);
};

module.exports = authenticateUser;
