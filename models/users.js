import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  isApproved: { type: Boolean, default: false },
});

const User = mongoose.model("user", UserSchema);

export default User;
