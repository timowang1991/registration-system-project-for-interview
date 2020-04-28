import Sequelize from 'sequelize';
import sequelize from '../db/sequelize';

const User = sequelize.define('user', {
    email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false,
    },
    password: {
        type: Sequelize.STRING,
    },
    name: {
        type: Sequelize.STRING,
    },
    coupon: {
        type: Sequelize.STRING,
    },
});

export default User;
