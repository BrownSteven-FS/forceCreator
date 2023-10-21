const passport = require("passport");

const authenticateJWT = (req, res, next) => {
  passport.authenticate("jwt", { session: false }, function (err, user, info) {
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

module.exports = authenticateJWT;
