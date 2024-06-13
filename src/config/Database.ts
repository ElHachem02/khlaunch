import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('database_name', 'username', 'password', {
    host: 'localhost',
    dialect: 'postgres', // could be 'mysql', 'sqlite', 'mariadb', etc.
    logging: false, // Set to true if you want to see SQL queries in the console
});

export default sequelize;
