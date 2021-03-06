import express from 'express';
import authRoutes from './authRoutes';
import carRoutes from './carRoutes';
import orderRoutes from './orderRoutes';
import flagRoutes from './flagRoutes';
import JwtHandler from '../../helpers/JwtHandler';

const router = express.Router();

router.get('/', (req, res) => res.json({
  message: "Welcome to Auto-Mart API version 1.0. Access API docs through '/api-docs'",
}));
router.use('/auth', authRoutes);
router.use('/car', carRoutes);
router.use('/order', JwtHandler.authorize, orderRoutes);
router.use('/flag', JwtHandler.authorize, flagRoutes);

export default router;
