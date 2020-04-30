import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import generator from 'generate-password';

import User from '../models/User';

const {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,

    FACEBOOK_CLIENT_ID,
    FACEBOOK_CLIENT_SECRET,
} = process.env;

passport.use(new GoogleStrategy(
    {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/callback/google',
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
                coupon: generator.generate({
                    length: 6,
                    numbers: true,
                }).toUpperCase(),
            },
        }).then(([user]) => {
            cb(null, { profile, dbUser: user });
        }).catch((err) => {
            cb(err);
        });
    },
));

passport.use(new FacebookStrategy(
    {
        clientID: FACEBOOK_CLIENT_ID,
        clientSecret: FACEBOOK_CLIENT_SECRET,
        callbackURL: '/auth/callback/facebook',
    },
    (accessToken, refreshToken, profile, cb) => {
        const { email, displayName } = profile;
        if (!email) {
            return cb(null, { profile });
        }

        return User.findOrCreate({
            where: {
                email,
                provider: 'facebook',
            },
            defaults: {
                name: displayName,
                coupon: generator.generate({
                    length: 6,
                    numbers: true,
                }).toUpperCase(),
            },
        }).then(([user]) => {
            cb(null, { profile, dbUser: user });
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
