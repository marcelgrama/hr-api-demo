import express from 'express';
import freelancersRoutes from './freelancers.js';
import jobsRoutes from './jobs.js';
import skillsRoutes from './skills.js';
import loginRoutes from './login.js';
import registerRoutes from './register.js';
// import campaignRoutes from './campaign.js';

const router = new express.Router();

router.use('/freelancers', freelancersRoutes);
router.use('/jobs', jobsRoutes);
router.use('/skills', skillsRoutes);
router.use('/login', loginRoutes);
router.use('/register', registerRoutes);
// router.use('/campaign', campaignRoutes);

export default router;
