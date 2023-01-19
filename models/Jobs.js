import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const JobsModel = sequelize.define('jobs', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.ENUM,
    values: ['Open', 'Closed'],
  },
  description: {
    type: DataTypes.TEXT,
  },
  proposed_developers: {
    type: DataTypes.ARRAY(DataTypes.UUID),
    references: {
      model: 'freelancer',
      key: 'id',
    },
  },
  company: {
    type: DataTypes.STRING,
  },
  budget: {
    type: DataTypes.FLOAT,
  },
  main_technologies: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  start_date: {
    type: DataTypes.DATE,
  },
});
// await JobsModel.sync();

export { JobsModel };
