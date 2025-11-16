import express from 'express';
import { signinSchema, signupSchema } from '../utils/joi.js';
import bcrypt from 'bcrypt';
import { ACCESS_TOKEN_TTL, BCRYPT_SALT_ROUNDS, JWT_SECRET_KEY } from '../constants/env.js';
import prisma from '../utils/prisma.js';
import jwt from 'jsonwebtoken';

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

router.post('/sign-in', async (req, res, next) => {
  try {
    const { username, password } = req.body;

    // validate input
    const { error: validationError, value: validated } = signinSchema.validate({
      username,
      password,
    });
    if (validationError) {
      return res.status(422).json({ success: false, message: validationError.message });
    }

    // find user by username
    const user = await prisma.user.findUnique({
      where: { username: validated.username },
      select: { id: true, password: true },
    });

    // verify credentials
    if (!user || !(await bcrypt.compare(validated.password, user.password))) {
      return res.status(401).json({ success: false, message: 'invalid credentials' });
    }

    // issue access token
    const accessToken = jwt.sign({ id: user.id }, JWT_SECRET_KEY, { expiresIn: ACCESS_TOKEN_TTL });

    return res
      .status(200)
      .json({ success: true, message: 'signed in successfully', tokenType: 'Bearer', accessToken });
  } catch (err) {
    return next(err);
  }
});

export default router;
