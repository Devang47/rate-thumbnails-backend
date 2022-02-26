import express from 'express';
import dotenv from 'dotenv';
import Video from '../models/Video.js';
import { createVideoModel, getRandomVideo, getTopVideos, getVideoInfo, incrementVideoScore } from '../controllers/Video.js';

const router = express.Router();
dotenv.config();

router.route('/getinfo').post(getVideoInfo);
router.route('/create').post(createVideoModel)
router.route('/getrandom').get(getRandomVideo)
router.route('/leaderboard').get(getTopVideos)
router.route('/score/:id').get(incrementVideoScore)

export default router;
