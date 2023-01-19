import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const SkillModel = sequelize.define('skill', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
  },
  years_of_experience: {
    type: DataTypes.INTEGER,
  },
});

// await SkillModel.sync();

export { SkillModel };
