import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const FreelancerModel = sequelize.define('freelancer', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
  },
  user_email: {
    type: DataTypes.STRING,
    references: {
      model: 'user',
      key: 'email',
    },
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: 'Doe',
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
    defaultValue: true,
  },
  availability: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 10,
  },
  skill_level: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 5,
  },
  profile_description: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: 'Doe',
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'aaasd',
  },
  desired_rate: {
    type: DataTypes.FLOAT,
    allowNull: true,
    defaultValue: 0,
  },
  linkedin_profile_link: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'asd',
  },
  years_of_experience: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 1,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: '0742350070',
  },
  main_skills: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    allowNull: true,
    defaultValue: ['Doe'],
  },
  profile_photo: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'Doe',
  },
  working_experience: {
    type: DataTypes.ARRAY(DataTypes.JSON),
    allowNull: true,
    defaultValue: [{ data: 'sal' }],
  },
  createdAt: {
    type: DataTypes.TIME,
    allowNull: true,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: DataTypes.TIME,
    allowNull: true,
    defaultValue: Sequelize.NOW,
  },
});
// await FreelancerModel.sync();

export { FreelancerModel };
