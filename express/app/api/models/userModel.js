const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");

const validateEmail = (email) => {
  const regex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  return regex.test(email);
};

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: {
      type: String,
      unique: true,
      lowercase: true,
      required: "Email address is required",
      validate: [validateEmail, "Email Invalid"],
    },
    password: {
      type: String,
      required: true,
    },
    refreshTokens: [
      {
        token: { type: String },
        createdAt: { type: Date, default: Date.now, expires: "7d" },
      },
    ],
  },
  {
    toObject: {
      transform: function (doc, ret) {
        const id = ret._id.toString();
        delete ret._id;
        delete ret.__v;
        delete ret.password;
        delete ret.refreshTokens;
        return {
          id,
          ...ret,
        };
      },
    },
    timestamps: true,
  }
);

UserSchema.index({ email: 1 });

UserSchema.pre("save", function (next) {
  const user = this;
  if (user.isNew || user.isModified("password")) {
    // run hashing and salting
    bcrypt.genSalt(10, (error, salt) => {
      if (error) {
        return next(error);
      }
      bcrypt.hash(user.password, salt, null, (error, hash) => {
        if (error) {
          return next(error);
        }
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

UserSchema.methods.comparePassword = function (candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function (error, isMatch) {
    if (error) {
      return callback(error);
    }
    callback(null, isMatch);
  });
};

const User = mongoose.model("User", UserSchema);

module.exports = User;
