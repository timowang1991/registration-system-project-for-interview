import express from 'express';
import passport from '../auth/passport';

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile'] }));

router.get('/callback/google', passport.authenticate('google', { failureRedirect: '/signup/google' }),
    (req, res) => {
        console.log('======= req', req);
        res.redirect('/');
    });

export default router;
