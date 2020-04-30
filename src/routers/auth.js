import express from 'express';
import passport from '../auth/passport';

const router = express.Router();

router.get('/callback/google', passport.authenticate('google', { failureRedirect: '/signup/google' }),
    (req, res) => {
        const user = req.user.dbUser;
        res.header({ token: user.generateAuthToken() }).send('google authentication complete');
    });

router.get('/callback/facebook', passport.authenticate('facebook', { failureRedirect: '/signup/facebook' }),
    (req, res) => {
        const user = req.user.dbUser;
        res.header({ token: user.generateAuthToken() }).send('facebook authentication complete');
    });

export default router;
