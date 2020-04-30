import express from 'express';
import passport from '../auth/passport';

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/callback/google', passport.authenticate('google', { failureRedirect: '/signup/google' }),
    (req, res) => {
        res.redirect('/');
    });

export default router;
