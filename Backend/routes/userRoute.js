import express from 'express';
import { signUp, login } from '../controllers/authController.js';
import { getAllUsers, createUser, getUser, updateUser, deleteUser } from '../controllers/userController.js';

const router = express.Router();

router.route('/signup').post(signUp);

router.route('/login').post(login);

// router.route('/forgotPassword').post(forgotPassword);

// router.route('/resetPassword/:otp').patch(resetPassword);

// router.use(protect);

// router.route('/updateMyPassword').patch(updatePassword);

// router.route('/updateMe').patch(updateMe);

// router.route('/deleteMe').patch(deleteMe);

// router.use(authController.restrictTo('admin'));

// router
//   .route('/')
//   .get(getAllUsers)
//   .post(createUser);

// router
//   .route('/:id')
//   .get(getUser)
//   .patch(updateUser)
//   .delete(deleteUser);

export default router;
