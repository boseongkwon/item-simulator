import express from 'express';
import authenticator from '../middlewares/authenticator.js';
import { characterSchema } from '../utils/joi.js';
import prisma from '../utils/prisma.js';

const router = express.Router(``);

router.post('/characters', authenticator, async (req, res, next) => {
  try {
    const { name } = req.body;
    const userId = req.user.id;

    // validate input
    const { error: validationError, value: validated } = characterSchema.validate({ name });
    if (validationError) {
      return res.status(422).json({ success: false, message: validationError.message });
    }

    // the unique constraint on 'name' will be handled in the error handler

    // create character
    const character = await prisma.character.create({
      data: {
        name: validated.name,
        userId,
        health: 500,
        power: 100,
        money: 10000,
      },
      select: { id: true },
    });

    return res
      .status(201)
      .json({ success: true, message: 'created successfully', data: character });
  } catch (err) {
    return next(err);
  }
});

export default router;
