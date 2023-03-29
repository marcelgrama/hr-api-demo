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
  // Get the job and freelancer ID from the request body
  const jobId = req.params.id;
  const freelancerId = req.body.freelancerId;

  // Find the job and freelancer in the database
  JobsModel.findByPk(jobId)
    .then((job) => {
      if (!job) {
        return res.status(400).send({ message: 'Job not found' });
      }

      FreelancerModel.findByPk(freelancerId)
        .then((freelancer) => {
          if (!freelancer) {
            return res.status(400).send({ message: 'Freelancer not found' });
          }

          // Apply the freelancer to the job
          job
            .addFreelancer(freelancer)
            .then(() =>
              res.send({ message: 'Freelancer successfully applied to job' })
            )
            .catch((error) =>
              res
                .status(500)
                .send({ message: 'Failed to apply freelancer to job', error })
            );
        })
        .catch((error) =>
          res.status(500).send({ message: 'Failed to find freelancer', error })
        );
    })
    .catch((error) =>
      res.status(500).send({ message: 'Failed to find job', error })
    );
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
