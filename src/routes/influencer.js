import express from 'express';
import InfluencerController from '../controllers/influencer';

const router = express.Router();

const influencerController = new InfluencerController();

router.get('/', (req, res) => influencerController.list(req, res));

export default router;