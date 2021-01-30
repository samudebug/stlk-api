import express from 'express';
import InfluencerController from '../controllers/influencer';

const router = express.Router();

const influencerController = new InfluencerController();

router.get('/', (req, res) => influencerController.list(req, res));
router.get('/:influencerId', (req, res) => influencerController.get(req, res));
router.post('/', (req, res) => influencerController.create(req, res));

router.put('/:influencerId/socialMedia', (req, res) => influencerController.addSocialMedia(req, res));

export default router;