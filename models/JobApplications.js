import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const JobApplicationsModel = sequelize.define('jobApplications', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    autoIncrement: true,
  },
  jobId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'jobs',
      key: 'id',
    },
  },
  freelancerId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'freelancers',
      key: 'id',
    },
  },
  application_status: {
    type: DataTypes.ENUM,
    values: ['pending', 'approved', 'rejected'],
    defaultValue: 'pending',
    allowNull: false,
    validate: {
      isIn: {
        args: [['pending', 'approved', 'rejected']],
        msg: 'The status field must be either "open", "pending", or "closed".',
      },
    },
  },
  date_applied: {
    type: DataTypes.DATE,
    allowNull: true,
    defaultValue: DataTypes.NOW,
  },
});
// (async () => {
//   await JobApplicationsModel.sync({ alter: true }).catch((err) => {
//     console.log(err);
//   });
// })();

// await JobFreelancer.sync();

export { JobApplicationsModel };
