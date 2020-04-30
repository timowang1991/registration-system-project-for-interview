import express from 'express';
import generator from 'generate-password';
import passport from '../auth/passport';
import signupValidator from '../validation/signup-validator';
import User from '../models/User';

const router = express.Router();

router.post('/', signupValidator, async (req, res) => {
    const { email, password, name } = req.body;

    let user;

    try {
        user = await User.create({
            email,
            password,
            name,
            provider: 'email',
            coupon: generator.generate({
                length: 6,
                numbers: true,
            }).toUpperCase(),
        });
    } catch (error) {
        return res.status(500).send({
            error: `unable to create User: ${error.message}`,
        });
    }

    const token = user.generateAuthToken();

    return res.header({ token }).send('email signup complete');
});

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/facebook', passport.authenticate('facebook'));

export default router;
