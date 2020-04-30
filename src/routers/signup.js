import express from 'express';
import passport from '../auth/passport';

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/facebook', passport.authenticate('facebook'));

export default router;
