import User from '../models/user.model.js';
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret_key';
const TOKEN_EXPIRATION = '1h';

export const signup = async (req, res, next) => {
  console.log("Connecting User...");
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next(errorHandler(409, 'User already exists'));
    }

    const hashedPassword = await bcryptjs.hash(password, 10); // Use async hashing
    const newUser = new User({ username, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error("Signup Error:", error);
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, 'Invalid credentials'));

    const validPassword = await bcryptjs.compare(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, 'Invalid credentials'));

    const token = jwt.sign({ id: validUser._id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });
    const { password: hashedPassword, ...rest } = validUser._doc;
    const expiryDate = new Date(Date.now() + 3600000);

    res
      .cookie('access_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        expires: expiryDate,
      })
      .status(200)
      .json(rest);
  } catch (error) {
    console.error("Signin Error:", error);
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });
      const { password: hashedPassword, ...rest } = user._doc;
      const expiryDate = new Date(Date.now() + 3600000);

      res
        .cookie('access_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    } else {
      const generatedPassword = bcryptjs.genSaltSync(8); // Generate a random salt for a unique password
      const hashedPassword = await bcryptjs.hash(generatedPassword, 10);
      const username =
        req.body.name.split(' ').join('').toLowerCase() +
        Math.random().toString(36).substring(2, 8);

      const newUser = new User({
        username,
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      });
      await newUser.save();

      const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: TOKEN_EXPIRATION });
      const { password: hashedPassword2, ...rest } = newUser._doc;
      const expiryDate = new Date(Date.now() + 3600000);

      res
        .cookie('access_token', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          sameSite: 'strict',
          expires: expiryDate,
        })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    console.error("Google Authentication Error:", error);
    next(error);
  }
};

export const signout = (req, res) => {
  res
    .clearCookie('access_token', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    })
    .status(200)
    .json({ message: 'Signout successful!' });
};
