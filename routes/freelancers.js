import express from 'express';
import { FreelancerModel } from '../models/Freelancer.js';
import { UserModel } from '../models/User.js';
import { SkillModel } from '../models/Skills.js';
import { Sequelize, DataTypes } from 'sequelize';

import authMiddleware from '../utils/middlewares/authMiddleware.js';
const router = express.Router();

// Get freelancers by multiple ids

router.get('/many', async (req, res) => {
  try {
    const freelancerIds = req.query.ids;
    const arrayOfIds = JSON.parse(
      freelancerIds.replace(/\(/g, '[').replace(/\)/g, ']')
    );

    console.log(typeof arrayOfIds);
    if (!Array.isArray(arrayOfIds)) {
      return res.status(400).send({ message: 'Ids must be an array' });
    }

    const freelancers = await FreelancerModel.findAll({
      where: {
        id: {
          [Sequelize.Op.in]: arrayOfIds,
        },
      },
    });

    if (!freelancers) {
      return res.status(400).send({ message: 'No freelancers found' });
    }

    res.send({ freelancers });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ message: 'An error occurred while getting freelancers' });
  }
});

// Get all freelancers
router.get('/', async (req, res) => {
  try {
    const freelancers = await FreelancerModel.findAll();
    res.json(freelancers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific freelancer
router.get('/:id', async (req, res) => {
  try {
    const freelancer = await FreelancerModel.findByPk(req.params.id);
    if (!freelancer) {
      res.status(404).json({ error: 'Freelancer not found' });
    } else {
      res.json(freelancer);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:id/hire', async (req, res) => {
  try {
    const freelancer = await FreelancerModel.findByPk(req.params.id);
    if (!freelancer) {
      res.status(404).json({ error: 'Freelancer not found' });
      return;
    }

    freelancer.status = 'hired';
    await freelancer.save();
    res.json({ message: 'Freelancer successfully hired' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const freelancer = await FreelancerModel.findByPk(req.params.id);
    if (!freelancer) {
      res.status(404).json({ error: 'Freelancer not found' });
      return;
    }

    await freelancer.update(req.body);
    res.json({
      message: 'Freelancer profile successfully updated',
      freelancer,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const {
      name,
      email,
      linkedin_profile_link,
      status,
      availability,
      skill_level,
      profile_description,
      location,
      desired_rate,
      years_of_experience,
      phone,
      main_skills,
      profile_photo,
      working_experience,
    } = req.body;

    const user = await UserModel.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }
    const {
      dataValues: { email: userEmail },
    } = user;

    const freelancer = await FreelancerModel.create({
      name,
      user_email: userEmail,
      linkedin_profile_link,
      status,
      availability,
      skill_level,
      profile_description,
      location,
      desired_rate,
      years_of_experience,
      phone,
      main_skills,
      profile_photo,
      working_experience,
    });

    res.send(freelancer);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
});

router.post('/:freelancerId/skills', async (req, res) => {
  try {
    const { freelancerId, skills } = req.body;
    const freelancer = await FreelancerModel.findByPk(freelancerId);
    if (!freelancer) {
      return res.status(400).send({ message: 'Freelancer not found' });
    }

    for (let i = 0; i < skills.length; i++) {
      const skill = await SkillModel.findOne({
        where: { name: skills[i].name },
      });
      if (!skill) {
        return res
          .status(400)
          .send({ message: `Skill "${skills[i].name}" not found` });
      }
      await freelancer.addSkills(skill);
    }

    res.send({ message: 'Skills added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'An error occurred while adding skills' });
  }
});

export default router;
