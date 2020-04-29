import express from 'express';
import bodyParser from 'body-parser';
import passport from './auth/passport';
import './db/sequelize';

import signup from './routers/signup';
import login from './routers/login';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());

app.use('/signup', signup);
app.use('/login', login);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log('Example app listening on port 3000!');
});
