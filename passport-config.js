import User from "./models/users.js";
import passportLocal from "passport-local";
import bcrypt from "bcrypt";
import credentials from "./credentials.js";

const LocalStrategy = passportLocal.Strategy;

export default (passport) => {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      if (email === credentials.email && password === credentials.password) {
        return done(null, email);
      }
      return done(null, false);
    })
  );

  passport.serializeUser((email, cb) => {
    cb(null, email);
  });

  passport.deserializeUser((email, cb) => {
    cb(null, email);
  });
};
