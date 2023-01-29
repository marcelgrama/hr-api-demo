import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import { SkillModel } from './Skills.js';

const FreelancerModel = sequelize.define('freelancer', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    autoIncrement: true,
  },
  user_email: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: 'users',
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
    type: DataTypes.STRING,
    allowNull: false,
    get() {
      return this.getDataValue('main_skills').split(';');
    },
    set(val) {
      this.setDataValue('main_skills', val.join(';'));
    },
  },
  profile_photo: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  working_experience: {
    type: DataTypes.STRING,
    get: function () {
      return JSON.parse(this.getDataValue('working_experience'));
    },
    set: function (val) {
      return this.setDataValue('working_experience', JSON.stringify(val));
    },
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

FreelancerModel.belongsToMany(SkillModel, { through: 'freelancerSkills' });

// (async () => {
//   await FreelancerModel.sync({ alter: true });
// })();

export { FreelancerModel };
