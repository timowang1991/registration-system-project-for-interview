import express from 'express';
import passport from '../auth/passport';

const router = express.Router();

router.get('/callback/google', passport.authenticate('google', { failureRedirect: '/signup/google' }),
    (req, res) => {
        res.redirect('/');
    });

router.get('/callback/facebook', passport.authenticate('facebook', { failureRedirect: '/signup/facebook' }),
    (req, res) => {
        res.redirect('/');
    });

export default router;
