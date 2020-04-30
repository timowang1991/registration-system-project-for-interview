import express from 'express';
import passport from '../auth/passport';
import signupValidator from '../validation/signup-validator';

const router = express.Router();

router.post('/', signupValidator, (req, res) => {
    // const { email, password, name } = req.body;

    res.send('ok');
});

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/facebook', passport.authenticate('facebook'));

export default router;
