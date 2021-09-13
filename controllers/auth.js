import User from "../models/users.js";
import bcrypt from "bcrypt";
import passport from "passport";

export const register = async (req, res) => {
  const { email, password } = req.body;
  try {
    User.findOne({ email }, async (err, doc) => {
      if (err) throw err;
      console.log(doc);
      if (doc) res.status(400).json({ message: "User already exists." });
      if (!doc) {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User(
          {
            email,
            password: hashedPassword,
          },
          {}
        );
        const user = await newUser.save();
        res.status(200).json(user);
      }
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

export const login = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.status(400).send("No User Exists");
    else {
      req.logIn(user, (err) => {
        if (err) throw err;
        res.status(200).send("Successfully Authenticated");
      });
    }
  })(req, res, next);
};

export const logout = (req, res) => {
  if (req.isAuthenticated()) {
    req.logout();
    return res.sendStatus(200);
  }
  res.sendStatus(400);
};

export const getAuth = (req, res) => {
  if (req.isAuthenticated()) {
    return res.sendStatus(200);
  }
  res.sendStatus(400);
};
