import Sequelize from 'sequelize';
import mysql2 from 'mysql2';

export default new Sequelize('main', 'admin', 'Ambalaj123!?', {
  host: 'database-2.cp0mlsldpt24.eu-west-1.rds.amazonaws.com',
  dialect: 'mysql',
  operatorsAliases: false,
  dialectModule: mysql2,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
});
