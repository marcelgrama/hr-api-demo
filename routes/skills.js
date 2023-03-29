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

router.post('/', async (req, res) => {
  try {
    const skills = req.body.skills;

    const newSkills = [];

    for (let i = 0; i < skills.length; i++) {
      const [skillItem, created] = await SkillModel.findOrCreate({
        where: { name: skills[i] },
        defaults: { name: skills[i] },
      });
      newSkills.push(skillItem.dataValues.name);
    }

    res.send({ message: 'Skills added successfully', skills: newSkills });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'An error occurred while adding skills' });
  }
});

export default router;
