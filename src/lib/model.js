import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  userId: { 
    type: String, 
    required: true, 
    unique: true,
    default: function() {
      return this._id.toString();
    }
  },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  favorites: [{
    id: Number,
    title: String,
    artist: {
      name: String
    },
    album: {
      cover: String
    },
    preview: String
  }]
});

const User = mongoose.models?.User || mongoose.model('User', UserSchema);
export default User;