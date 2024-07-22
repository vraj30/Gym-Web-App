import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import GoogleTokenStrategy from 'passport-google-id-token';
import User from './models/User.js';
import dotenv from 'dotenv';

dotenv.config({ path: "./config.env" });

// Google OAuth 2.0 strategy for web authentication
passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: 'http://localhost:8080/auth/google/callback',
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });
    if (!user) {
      user = new User({
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails[0].value,
      });
      await user.save();
    }
    done(null, user);
  } catch (err) {
    done(err, null);
  }
}));

// Google ID Token strategy for token-based authentication
passport.use(new GoogleTokenStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
}, async (parsedToken, googleId, done) => {
  try {
    let user = await User.findOne({ googleId });
    if (!user) {
      user = new User({
        googleId,
        name: parsedToken.payload.name,
        email: parsedToken.payload.email,
      });
      await user.save();
    }
    done(null, user);
  } catch (err) {
    done(err, null);
  }
}));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
