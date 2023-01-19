import express from 'express';
import { UserModel } from '../models/User.js'; // import the User model
import bcrypt from 'bcrypt'; // import the bcrypt library for password hashing
import authMiddleware from '../utils/middlewares/authMiddleware';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    // get the email, password, and role from the request body
    const { email, password, role, firstname, lastname } = req.body;

    // check if the email is already in use
    const existingUser = await UserModel.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).send({ error: 'Email is already in use' });
    }

    // hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new user with the provided email, hashed password, and role
    const user = await UserModel.create({
      email,
      password: hashedPassword,
      role,
      firstname,
      lastname,
    });

    // return the created user object
    res.send(user);
  } catch (err) {
    res.status(500).send({ message: 'Register failed!' });
  }
});

export default router;
