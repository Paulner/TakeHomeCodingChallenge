import express from 'express';
import userRoutes from './user.route';

const router = express.Router();

router.use('/users', userRoutes);
/// console.log("INDEX TEST")

export default router;