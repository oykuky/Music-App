// import mongoose from "mongoose";


// const userSchema = new mongoose.Schema(
//   {
//     username: {
//       type: String,
//       required: true,
//       unique: true,
//       min: 3,
//       max: 20,
//     },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       max: 50,
//     },
//     password: {
//       type: String,
//     },
//   },
//   { timestamps: true }
// );

// const User =  mongoose.models?.User || mongoose.model("User",userSchema)

// export default User;


import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.models?.User || mongoose.model('User', UserSchema);
export default User;