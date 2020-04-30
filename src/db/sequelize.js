import Sequelize from 'sequelize';

const {
    MYSQL_USERNAME,
    MYSQL_ROOT_PASSWORD,
    MYSQL_HOSTNAME,
    MYSQL_PORT,
} = process.env;

const sequelize = new Sequelize(`mysql://${MYSQL_USERNAME}:${MYSQL_ROOT_PASSWORD}@${MYSQL_HOSTNAME}:${MYSQL_PORT}/dev`, {
    define: {
        charset: 'utf8',
        dialectOptions: {
            collate: 'utf8_general_ci',
        },
    },
});

sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch((err) => {
        console.error('Unable to connect to the database:', err);
        process.exit(1);
    });

export default sequelize;
