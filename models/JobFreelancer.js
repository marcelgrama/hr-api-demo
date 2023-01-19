import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const JobFreelancer = sequelize.define('jobFreelancer', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  jobId: DataTypes.INTEGER,
  freelancerId: DataTypes.INTEGER,
});

// await JobFreelancer.sync();

export { JobFreelancer };
