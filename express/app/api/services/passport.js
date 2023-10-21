const passport = require("passport");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const JwtStrategy = require("passport-jwt").Strategy;
const LocalStrategy = require("passport-local");
const User = require("../models/userModel");

const config = require("../config");

const localOptions = {
  usernameField: "email",
};

const verifyPassword = async (user, password) => {
  return new Promise((resolve, reject) => {
    user.comparePassword(password, (error, isMatch) => {
      if (error) {
        reject(error);
      } else {
        resolve(isMatch);
      }
    });
  });
};

const localStrategy = new LocalStrategy(localOptions, async function (
  email,
  password,
  done
) {
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return done(null, false, { message: "User not found" });
    }

    const isMatch = await verifyPassword(user, password);
    if (!isMatch) {
      return done(null, false, { message: "Incorrect password" });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
});

const jwtOptions = {
  secretOrKey: config.secret,
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
};

const jwtAuthenticate = new JwtStrategy(jwtOptions, async function (
  payload,
  done
) {
  try {
    const user = await User.findById(payload.sub);
    if (user) {
      done(null, user);
    } else {
      done(null, false);
    }
  } catch (error) {
    done(error, false);
  }
});

passport.use(localStrategy);
passport.use(jwtAuthenticate);
