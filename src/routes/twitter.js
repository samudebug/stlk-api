import express from 'express';
import TwitterService from '../services/twitter';
import TwitterController from '../controllers/twitter';

const router = express.Router();

const service = new TwitterService();

const controller = new TwitterController(service);

router.get('/search',(req, res) => controller.search(req, res));

export default router;