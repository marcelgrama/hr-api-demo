import express from 'express';
import { UserModel } from '../models/User.js'; // import the User model
import bcrypt from 'bcryptjs'; // import the bcrypt library for password hashing
import authMiddleware from '../utils/middlewares/authMiddleware';
import crypto from 'crypto';
import nodemailer from 'nodemailer';

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

    // Generate a random verification token
    const verificationToken = crypto.randomBytes(20).toString('hex');

    // hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // create a new user with the provided email, hashed password, and role
    const user = await UserModel.create({
      email,
      password: hashedPassword,
      role,
      firstname,
      lastname,
      verificationToken,
      verifiedEmail,
    });

    try {
      // Only needed if you don't have a real mail account for testing
      let testAccount = await nodemailer.createTestAccount();

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user, // generated ethereal user
          pass: testAccount.pass, // generated ethereal password
        },
      });
      // Send the verification email
      const verificationLink = `${req.protocol}://${req.get(
        'host'
      )}/verify-email/${verificationToken}`;
      const mailOptions = {
        from: 'noreply@example.com',
        to: email,
        subject: 'Please verify your email address',
        text: `Please click on this link to verify your email address: ${verificationLink}`,
      };
      // send mail with defined transport object
      let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>', // sender address
        to: 'marcel.grama@baza7.ro', // list of receivers
        subject: 'Verification Email', // Subject line
        text: `Please click on this link to verify your email address: ${verificationLink}`, // plain text body
        html: '<b>Hello world?</b>', // html body
      });
      console.log('Message sent: %s', info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    } catch (e) {
      console.log(e, 'error transporter[]][]');
    }
    // return the created user object
    res.send({
      message: `User registered successfully. Please check your email to verify your account., ${nodemailer.getTestMessageUrl(
        info
      )}`,
    });
  } catch (err) {
    res.status(500).send({ message: 'Register failed!', err });
  }
});

router.get('/verify-email/:verificationToken', async (req, res) => {
  try {
    const { verificationToken } = req.params;

    // Find the user with the matching verification token
    const user = await UserModel.findOne({ where: { verificationToken } });
    if (!user) {
      return res.status(400).json({ message: 'Invalid verification token' });
    }

    // Update the user record to mark the email as verified
    user.verifiedEmail = true;
    user.verificationToken = null;
    await user.save();

    res.json({ message: 'Email verified successfully. You can now log in.' });
  } catch (err) {}
});

export default router;
