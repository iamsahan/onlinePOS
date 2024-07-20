import jwt from 'jsonwebtoken';
import User from '../models/userModel';

const jwtSecret = 'your_jwt_secret';

const signToken = (id) => {
  return jwt.sign({ id }, jwtSecret, {
    expiresIn: '90d',
  });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  // Check if email and password exist
  if (!email || !password) {
    return res.status(400).json({
      status: 'fail',
      message: 'Please provide email and password!',
    });
  }

  // Check if user exists and password is correct
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({
      status: 'fail',
      message: 'Incorrect email or password',
    });
  }

  // If everything is okay, send token to client
  const token = signToken(user._id);

  res.status(200).json({
    status: 'success',
    token,
  });
};
