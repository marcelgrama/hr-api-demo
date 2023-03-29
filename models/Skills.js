import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const SkillModel = sequelize.define('skills', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// (async () => {
//   await SkillModel.sync({ alter: true }).catch((err) => {
//     console.log(err);
//   });
// })();

export { SkillModel };
