import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';

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
        console.log('====== accessToken', accessToken);
        console.log('====== refreshToken', refreshToken);
        console.log('====== profile', profile);
        cb(null, profile);
    },
));

passport.serializeUser((user, cb) => {
    cb(null, user);
});

passport.deserializeUser((obj, cb) => {
    cb(null, obj);
});

export default passport;
