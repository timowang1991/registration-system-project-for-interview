import Sequelize from 'sequelize';
import sequelize from '../db/sequelize';

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

export default User;
