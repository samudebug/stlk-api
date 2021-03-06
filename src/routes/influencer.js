import express from 'express';
import InfluencerController from '../controllers/influencer';
import TwitterService from '../services/twitter';
import MessagingService from '../services/messaging';
import SocialMediaService from '../services/socialMedia';
const router = express.Router();
const messagingService = new MessagingService();
const twitterService = new TwitterService();
const socialMediaService = new SocialMediaService(twitterService);
const influencerController = new InfluencerController(twitterService, messagingService, socialMediaService);

router.get('/', (req, res) => influencerController.list(req, res));
router.get('/:influencerId', (req, res) => influencerController.get(req, res));
router.post('/', (req, res) => influencerController.create(req, res));

router.put('/:influencerId/socialMedia', (req, res) => influencerController.addSocialMedia(req, res));

export default router;