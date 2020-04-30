import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

import User from '../models/User';

const {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
} = process.env;

passport.use(new GoogleStrategy(
    {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: '/signup/callback/google',
    },
    (accessToken, refreshToken, profile, cb) => {
        const { emails = [], displayName } = profile;
        const email = emails[0] && emails[0].value;

        if (!email) {
            return cb(null, { profile });
        }

        return User.findOrCreate({
            where: {
                email,
                provider: 'google',
            },
            defaults: {
                name: displayName,
            },
        }).then((user) => {
            cb(null, { profile, dbUser: user[0] });
        }).catch((err) => {
            cb(err);
        });
    },
));

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((obj, cb) => {
    cb(null, obj);
});

export default passport;
