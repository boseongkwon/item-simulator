import express from 'express';
import { signupSchema } from '../utils/joi.js';
import bcrypt from 'bcrypt';
import { BCRYPT_SALT_ROUNDS } from '../constants/env.js';
import prisma from '../utils/prisma.js';

const router = express.Router();

router.post('/sign-up', async (req, res, next) => {
  try {
    const { username, password, confirmPassword, name } = req.body;

    // validate input
    const { error: validationError, value: validated } = signupSchema.validate({
      username,
      password,
      name,
    });
    if (validationError) {
      return res.status(422).json({ success: false, message: validationError.message });
    }

    // compare password and confirmPassword
    if (password !== confirmPassword) {
      return res.status(422).json({ success: false, message: 'passwords do not match' });
    }

    // the unique constraint on 'username' will be handled in the error handler

    // hash password
    const hashedPassword = await bcrypt.hash(validated.password, BCRYPT_SALT_ROUNDS);

    // create user
    const user = await prisma.user.create({
      data: {
        username: validated.username,
        password: hashedPassword,
        name: validated.name,
      },
      select: {
        username: true,
        name: true,
        createdAt: true,
      },
    });

    return res.status(201).json({ success: true, message: 'signed up successfully', data: user });
  } catch (err) {
    return next(err);
  }
});

export default router;
