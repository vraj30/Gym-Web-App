import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import session from 'express-session';
import User from './models/User.js';
import Enroll from './models/Enroll.js';
import { sendEmail } from './utils/sendEmail.js';
import authMiddleware from './middleware/authMiddleware.js';
import serviceAccount from './firebaseAdminsdk.json' assert { type: 'json' };  
import admin from 'firebase-admin';
import crypto from 'crypto';



dotenv.config({ path: "./config.env" });

const app = express();
const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET;

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ["GET", "POST", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"],
}));
app.use(express.urlencoded({ extended: true }));
app.use(session({ secret: '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', resave: false, saveUninitialized: false }));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('User MongoDB connected'))
  .catch(err => console.log(err));

const enrollmentsConnection = mongoose.createConnection(process.env.MONGODB_ENROLL, { useNewUrlParser: true, useUnifiedTopology: true });
enrollmentsConnection.on('connected', () => {
  console.log('Enrollments MongoDB connected');
});
enrollmentsConnection.on('error', (err) => {
  console.log('Enrollments MongoDB connection error:', err);
});

// Routes

// Register Route


app.post('/register', async (req, res) => {
  const { name, email, password, repeatPassword } = req.body;

  if (password !== repeatPassword) {
    return res.status(400).json({ msg: "Passwords do not match" });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const verificationToken = crypto.randomBytes(32).toString('hex');

    user = new User({
      name,
      email,
      password,
      verificationToken
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();

    // Send verification email with a plain text URL
    const verificationUrl = `https://power-house-gym-v1b7.onrender.com/verify/${verificationToken}`;
    await sendEmail({
      email,
      subject: "Verify your email address",
      message: `Please verify your email by visiting the following link: ${verificationUrl}`,
      type: 'verification', 
    });

    res.status(201).json({ msg: "User registered successfully. Please check your email for verification." });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});
//Verify Email Route
app.get('/verify/:token', async (req, res) => {
  const { token } = req.params;
  console.log(`Verifying token: ${token}`);

  try {
    // Find the user with the matching verification token
    const user = await User.findOne({ verificationToken: token });
    
    if (!user) {
      console.log('Invalid token or token has already been used');
      return res.status(400).json({ msg: 'Invalid token or token has already been used' });
    }

    // Check if the user is already verified
    if (user.verified) {
      console.log('User already verified');
      return res.status(400).json({ msg: 'Email already verified. Please log in.' });
    }

    // Mark the user as verified and clear the token
    user.verified = true;
    user.verificationToken = null; // Invalidate the token
    await user.save();

    console.log('Email verified successfully');
    res.status(200).json({ msg: 'Email verified successfully. You can now log in.' });
  } catch (err) {
    console.error('Server error:', err.message);
    res.status(500).json({ msg: 'Server error. Please try again later.' });
  }
});


// Login Route
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    if (!user.verified) {
      return res.status(400).json({ msg: "Please verify your email before logging in" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Fetch User Data Route
app.get('/api/users/me', authMiddleware, async (req, res) => {
  try {
   // console.log('User ID from token:', req.user.id); // Debug: Check the user ID
    const user = await User.findById(req.user.id).select('-password');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    //console.log('Fetched user data:', user); // Debug: Check the fetched user data
    res.json(user);
  } catch (err) {
    console.error('Server Error:', err.message);
    res.status(500).send('Server Error');
  }
});

// Email Route
app.post("/send/mail", async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "Please fill in all the required fields!",
    });
  }

  try {
    await sendEmail({
      email: "infernot03@gmail.com",
      subject: "GYM WEBSITE CONTACT",
      message,
      userEmail: email,
    });

    res.status(200).json({
      success: true,
      message: `Hey ${name}, Your Message Has Been Sent Successfully`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});

// Google Auth Routes
app.post('/auth/google', async (req, res) => {
  const { token } = req.body;
  //console.log("Server-side Token:", token); // Log token for debugging

  try {
    const decodedToken = await admin.auth().verifyIdToken(token);
    const { uid, email, name } = decodedToken;

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ name, email, googleId: uid });
      await user.save();
    }

    const payload = {
      user: {
        id: user.id
      }
    };

    jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token });
    });
  } catch (err) {
    console.error('Google Auth Error:', err);
    res.status(500).send('Server error');
  }
});
// Enrollment Route
app.post('/api/enroll', async (req, res) => {
  const { name, email, mobile, planType } = req.body;

  if (!name || !email || !mobile || !planType) {
    return res.status(400).json({
      success: false,
      message: "Please fill in all the required fields!",
    });
  }

  try {
    const newEnroll = new Enroll({
      name,
      mobile,
      planType
    });

    await newEnroll.save();

    // Send email notification
    await sendEmail({
      email: "infernot03@gmail.com",
      subject: "New Enrollment",
      message: `Name: ${name}\nMobile: ${mobile}\nPlan Type: ${planType}`, 
      userEmail: email, 
    });

    res.status(201).json({ msg: "Enrollment successful" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
