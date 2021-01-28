import express from 'express';
import AuthController from '../controllers/auth';

const router = express.Router();

const authController = new AuthController();

router.get('/login', (req, res) => {authController.login(req, res)});

export default router;