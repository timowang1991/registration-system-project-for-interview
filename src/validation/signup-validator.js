function validateEmailFormat(email) {
    // eslint-disable-next-line
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(email);
}

function validateEmail(req, res, next) {
    const { email } = req.body;
    if (!validateEmailFormat(email)) {
        return res.status(400).send({
            error: 'email format error',
        });
    }
    return next();
}

function validatePassword(req, res, next) {
    const { password, confirmPassword } = req.body;

    if (password.length < 8) {
        return res.status(400).send({
            error: 'password length should not be less than 8',
        });
    }

    if (confirmPassword !== password) {
        return res.status(400).send({
            error: 'confirm password and password are mismatched',
        });
    }

    return next();
}

export default [validateEmail, validatePassword];
