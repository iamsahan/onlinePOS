import jwt from "jsonwebtoken";
import User from "./../models/userModel.js";
import { promisify } from "util";
import catchAsync from "./../utils/catchAsync.js";
import AppError from "./../utils/appError.js";

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

export const signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create(req.body);

  createSendToken(newUser, 201, res);
});

export const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Enter email and Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError("Invalid Email or Password", 401));
  }

  const token = signToken(user._id);

  res.status(200).json({
    status: "success",
    token,
  });
});

export const protect = catchAsync(async (req, res, next) => {
  // check token
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return next(new AppError("You are not logged in", 400));
  }

  // verify token
  const decode = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // check user exist
  const currentUser = await User.findById(decode.id);

  if (!currentUser) {
    return next(new AppError("No user belongs to this token", 401));
  }

  // check if user changed password after the token issued
  if (currentUser.changePasswordAfter(decode.iat)) {
    return next(new AppError("User recently changed password", 401));
  }

  req.user = currentUser;

  next();
});

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new AppError("You have no permissions to perform this!", 401));
    }
    next();
  };
};
