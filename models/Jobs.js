import { Sequelize, DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import { FreelancerModel } from './Freelancer.js';

const JobsModel = sequelize.define('jobs', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    defaultValue: Sequelize.UUIDV4,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.ENUM,
    values: ['Open', 'Closed', 'Hold'],
    allowNull: false,
    validate: {
      isIn: {
        args: [['Open', 'Closed', 'Hold']],
        msg: 'The status field must be either "open", "pending", or "closed".',
      },
    },
  },
  description: {
    type: DataTypes.TEXT,
  },
  proposed_developers: {
    type: DataTypes.INTEGER,
    allowNull: false,
    get() {
      const proposedDevsIds = this.getDataValue('proposed_developers');

      return String(proposedDevsIds)
        .split('')
        .map((proposedDevsIds) => {
          return Number(proposedDevsIds);
        });
    },
    set(val) {
      this.setDataValue('proposed_developers', val.join(';'));
    },
    references: {
      model: 'freelancers',
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
    type: DataTypes.STRING,
    allowNull: false,
    get() {
      return this.getDataValue('main_technologies').split(';');
    },
    set(val) {
      this.setDataValue('main_technologies', val.join(';'));
    },
  },
  start_date: {
    type: DataTypes.DATE,
  },
});

// In the Job model
JobsModel.belongsToMany(FreelancerModel, { through: 'jobApplications' });

// (async () => {
//   await JobsModel.sync({ alter: true }).catch((err) => {
//     console.log(err);
//   });
// })();

export { JobsModel };
