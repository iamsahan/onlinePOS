const express = require("express");

const authController = require("./../controllers/authController");
const userController = require('./../controllers/userController');


const router = express.Router();

router.route("/signup").post(authController.signUp);

router.route("/login").post(authController.login);

router.route('/forgotPassword').post(authController.forgotPassword);

router.route('/resetPassword/:otp').patch(authController.resetPassword);

router.use(authController.protect);

router.route('/updateMyPassword').patch(authController.updatePassword);

router.route('/updateMe').patch(userController.updateMe);

router.route('/deleteMe').patch(userController.deleteMe);

router.use(authController.restrictTo('admin'));

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);


module.exports = router;
