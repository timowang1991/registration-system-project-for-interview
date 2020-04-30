import Sequelize from 'sequelize';
import jwt from 'jsonwebtoken';
import sequelize from '../db/sequelize';

const { JWT_SECRET } = process.env;

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    email: {
        type: Sequelize.STRING,
        unique: 'email_type',
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
    },
    provider: {
        type: Sequelize.ENUM('email', 'google', 'facebook'),
        unique: 'email_type',
        allowNull: false,
    },
    name: {
        type: Sequelize.STRING,
    },
    coupon: {
        type: Sequelize.STRING,
    },
});

User.prototype.generateAuthToken = function generateAuthToken() {
    const user = this;
    const token = jwt.sign(
        {
            id: user.id,
        },
        JWT_SECRET,
    ).toString();

    return token;
};

export default User;
