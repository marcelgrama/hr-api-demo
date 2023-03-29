import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const FreelancerSkillsModel = sequelize.define('freelancerSkills', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    autoIncrement: true,
  },
  skillId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'skills',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  freelancerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'freelancers',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  },
  yearsOfExperience: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
});

(async () => {
  await FreelancerSkillsModel.sync({ alter: true }).catch((err) => {
    console.log(err);
  });
})();

export { FreelancerSkillsModel };
