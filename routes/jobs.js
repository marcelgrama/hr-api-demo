import express from 'express';
import { JobsModel } from '../models/Jobs.js';
import { FreelancerModel } from '../models/Freelancer.js';

const router = express.Router();

// Get all jobs
router.get('/', async (req, res) => {
  try {
    const jobs = await JobsModel.findAll();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get a specific job
router.get('/:id', async (req, res) => {
  try {
    const job = await JobsModel.findByPk(req.params.id);
    if (!job) {
      res.status(404).json({ error: 'Job not found' });
    } else {
      res.json(job);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const job = await JobsModel.create(req.body);
    res.json({ message: 'Job successfully posted', job });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/:id/apply', async (req, res) => {
  try {
    const job = await JobsModel.findByPk(req.params.id);
    if (!job) {
      res.status(404).json({ error: 'Job not found' });
      return;
    }

    const freelancerId = req.body.freelancerId;
    const freelancer = await FreelancerModel.findByPk(freelancerId);
    if (!freelancer) {
      res.status(404).json({ error: 'Freelancer not found' });
      return;
    }

    await job.addFreelancer(freelancer);
    res.json({ message: 'Freelancer successfully applied to the job' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const job = await JobsModel.findByPk(req.params.id);
    if (!job) {
      res.status(404).json({ error: 'Job not found' });
      return;
    }

    await job.update(req.body);
    res.json({ message: 'Job successfully updated', job });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/:id/freelancers', async (req, res) => {
  try {
    const job = await JobsModel.findByPk(req.params.id, {
      include: [
        {
          model: FreelancerModel,
          as: 'freelancers',
        },
      ],
    });
    if (!job) {
      res.status(404).json({ error: 'Job not found' });
      return;
    }

    res.json({ freelancers: job.freelancers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
export default router;
