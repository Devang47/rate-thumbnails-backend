import express from 'express';
import dotenv from 'dotenv';
import { createVideoModel, getRandomVideo, getTopVideos, getVideoInfo, incrementVideoScore } from '../controllers/Video.js';

const router = express.Router();
dotenv.config();

const checkKey = (req, res, next) => {
    let key = req.query.key
    if (key !== process.env.KEY) {
        res.status(401).send('Invalid key!!').end()
        return
    }
    next()
}

router.route('/getinfo').post(checkKey, getVideoInfo);
router.route('/create').post(checkKey, createVideoModel)
router.route('/getrandom').get(checkKey, getRandomVideo)
router.route('/leaderboard').get(checkKey, getTopVideos)
router.route('/score/:id').get(checkKey, incrementVideoScore)

export default router;
