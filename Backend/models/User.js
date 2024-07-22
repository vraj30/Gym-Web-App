import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: function() {
      // Require password only if it's not a Google OAuth user
      return !this.googleId; // this.googleId should be set when logging in via Google
    }
  },
  googleId: {
    type: String
    // No 'required' property here because it's only used for Google OAuth users
  }
});

const User = mongoose.model('User', UserSchema);
export default User;
