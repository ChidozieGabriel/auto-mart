import express from 'express';
import { check } from 'express-validator';
import UserController from '../../controllers/UserController';

const router = express.Router();
router.post(
  '/signup',
  [
    check('email', 'Invalid email address').isEmail(),
    check('password', 'Password must be at least 5 characters long').isLength({ min: 5 }),
  ],
  UserController.signUp,
);
router.post('/signin', UserController.signIn);

export default router;
