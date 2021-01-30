import express from 'express';
import authenticate from '../util/auth';
import getUserDoc from '../util/getUserDoc';
import authRoutes from './auth';
import influencerRoute from './influencer';
import twitterRoute from './twitter';

const router = express.Router();

router.get('/', (req, res) => {res.send({message: 'App is Running!'})});
router.use('/twitter', twitterRoute);
router.use((req, res, next) => {
    authenticate(req, res, next);
});
router.use('/auth', authRoutes);
router.use((req, res, next) => {
    getUserDoc(req, res, next);
})
router.use('/influencers', influencerRoute);

export default router;