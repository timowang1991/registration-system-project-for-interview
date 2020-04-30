import express from 'express';
import passport from '../auth/passport';
import User from '../models/User';

const router = express.Router();

router.post('/', async (req, res) => {
    const { email, password } = req.body;

    let user;

    try {
        user = await User.findOne({
            where: {
                email,
                password,
                provider: 'email',
            },
        });
    } catch (error) {
        return res.status(500).send({
            error: `unable to find user: ${error.message}`,
        });
    }

    if (!user) {
        return res.status(400).send({
            error: 'email or password incorrect',
        });
    }

    const token = user.generateAuthToken();

    return res.header({ token }).send('email login complete');
});

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/facebook', passport.authenticate('facebook'));

export default router;
