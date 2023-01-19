import express from 'express';
// import { FreelancerModel } from '../models/Freelancer.js';
import authMiddleware from '../utils/middlewares/authMiddleware';
const router = express.Router();

// Get all freelancers
router.get('/', authMiddleware, async (req, res) => {
  try {
    // const freelancers = await FreelancerModel.findAll();
    res.json({ sal: 'sal' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// // Get a specific freelancer
// router.get('/:id', async (req, res) => {
//   try {
//     const freelancer = await FreelancerModel.findByPk(req.params.id);
//     if (!freelancer) {
//       res.status(404).json({ error: 'Freelancer not found' });
//     } else {
//       res.json(freelancer);
//     }
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// router.post('/:id/hire', async (req, res) => {
//   try {
//     const freelancer = await FreelancerModel.findByPk(req.params.id);
//     if (!freelancer) {
//       res.status(404).json({ error: 'Freelancer not found' });
//       return;
//     }

//     freelancer.status = 'hired';
//     await freelancer.save();
//     res.json({ message: 'Freelancer successfully hired' });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// router.patch('/:id', async (req, res) => {
//   try {
//     const freelancer = await FreelancerModel.findByPk(req.params.id);
//     if (!freelancer) {
//       res.status(404).json({ error: 'Freelancer not found' });
//       return;
//     }

//     await freelancer.update(req.body);
//     res.json({
//       message: 'Freelancer profile successfully updated',
//       freelancer,
//     });
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// router.post('/', async (req, res) => {
//   try {
//     const {
//       name,
//       email,
//       linkedin_profile_link,
//       status,
//       availability,
//       skill_level,
//       profile_description,
//       location,
//       desired_rate,
//       years_of_experience,
//       phone,
//       main_skills,
//       profile_photo,
//       working_experience,
//     } = req.body;

//     const user = await UserModel.findOne({ where: { email } });
//     if (!user) {
//       throw new Error('User not found');
//     }

//     const freelancer = await Freelancer.create({
//       name,
//       email: user.email,
//       linkedin_profile_link,
//       status,
//       availability,
//       skill_level,
//       profile_description,
//       location,
//       desired_rate,
//       years_of_experience,
//       phone,
//       main_skills,
//       profile_photo,
//       working_experience,
//     });

//     res.send(freelancer);
//   } catch (error) {
//     res.status(400).send({ error: error.message });
//   }
// });
// export default router;
