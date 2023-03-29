import { FreelancerModel } from './Freelancer.js';
import { SkillModel } from './Skills.js';
import { JobsModel } from './Jobs.js';

FreelancerModel.belongsToMany(SkillModel, { through: 'FreelancerSkills' });
SkillModel.hasMany(FreelancerModel, { through: 'FreelancerSkills' });
// In the Job model
JobsModel.belongsToMany(FreelancerModel, { through: 'JobFreelancer' });

// In the Freelancer model
FreelancerModel.belongsToMany(JobsModel, { through: 'JobFreelancer' });

// Now you can use the `addFreelancer` method on a job instance to associate a freelancer with that job
JobsModel.addFreelancer(freelancer);

FreelancerModel.addSkills(newSkills);
