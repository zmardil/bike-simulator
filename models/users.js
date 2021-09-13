import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
});

const User = mongoose.model("user", UserSchema);

export default User;
