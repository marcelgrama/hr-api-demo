import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const UserModel = sequelize.define('user', {
  email: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
  },
  firstname: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  lastname: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  role: {
    type: DataTypes.ENUM,
    values: ['Freelancer', 'Agency', 'Company', 'Admin'],
    validate: {
      isIn: {
        args: [['Freelancer', 'Agency', 'Company', 'Admin']],
        msg: 'The status field must be either "open", "pending", or "closed".',
      },
    },
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  verificationToken: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  verifiedEmail: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },

  createdAt: {
    type: DataTypes.TIME,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
  updatedAt: {
    type: DataTypes.TIME,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
});

// (async () => {
//   await UserModel.sync({ alter: true }).catch((err) => {
//     console.log(err);
//   });
// })();

export { UserModel };
