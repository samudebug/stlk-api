import express from 'express';
import authenticate from '../util/auth';
import authRoutes from './auth';
import influencerRoute from './influencer';

const router = express.Router();

router.get('/', (req, res) => {res.send({message: 'App is Running!'})});
router.use((req, res, next) => {
    authenticate(req, res, next);
});
router.use('/auth', authRoutes);
router.use('/influencers', influencerRoute);

export default router;