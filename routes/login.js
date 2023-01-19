import express from 'express';
import { UserModel } from '../models/User.js'; // import the User model
import bcrypt from 'bcrypt'; // import the bcrypt library for password hashing
import jwt from 'jsonwebtoken';
import pick from 'lodash/pick.js';
import omit from 'lodash/omit.js';

const router = express.Router();

router.post('/', async (req, res) => {
  try {
    // get the email and password from the request body
    const expiresIn = Math.floor(Date.now() / 1000) + 60 * 60; // 1 hour in seconds

    const { email, password } = req.body;

    // find the user with the matching email
    const user = await UserModel.findOne({ where: { email } });
    // if no user is found, return an error
    if (!user) {
      return res.status(400).send({ error: 'Invalid email or password' });
    }

    // compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.dataValues.password);

    // if the passwords don't match, return an error
    if (!isMatch) {
      return res.status(400).send({ error: 'Invalid email or password' });
    }
    const options = {
      // expiresIn: '1h',
    };
    const dataInToken = pick(user.dataValues, [
      'email',
      'firstName',
      'lastName',
      'role',
    ]);
    // generate the bearer token using the jsonwebtoken library
    const token = jwt.sign(
      { ...dataInToken, exp: Math.floor(Date.now() / 1000) + expiresIn },
      process.env.JWT_SECRET,
      options
    );

    // set the bearer token as a cookie using the cookie-parser middleware
    res.cookie('user_auth_token_v1', token, { secure: true });

    // if the email and password are correct, return the user object
    res.send({
      authToken: token,
      ...omit(user.dataValues, ['createdAt', 'updatedAt', 'password']),
    });
  } catch (err) {
    res.status(500).send({ message: err });
  }
});

export default router;
