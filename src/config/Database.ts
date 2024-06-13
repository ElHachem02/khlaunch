import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('database_name', 'username', 'password', {
    host: 'localhost',
    dialect: 'mysql', 
    logging: true, //todo, remove once done debugging
});

export default sequelize;
