import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const FreelancerTableForNotifications = sequelize.define(
  'freelancerTableForNotifications',
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    user_email: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'Doe',
    },
    subscribed: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true,
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
        this.setDataValue('main_skills', val);
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
  }
);

// (async () => {
//   await FreelancerTableForNotifications.sync({ alter: true });
// })();

export { FreelancerTableForNotifications };
