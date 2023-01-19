import express from 'express';
import { SkillModel } from '../models/Skills.js';
const router = express.Router();

// Get all skills
router.get('/', async (req, res) => {
  try {
    const skills = await SkillModel.findAll();
    res.json(skills);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
