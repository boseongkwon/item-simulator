import express from 'express';
import { optionalAuth, requiredAuth } from '../middlewares/authenticator.js';
import { characterSchema } from '../utils/joi.js';
import prisma from '../utils/prisma.js';

const router = express.Router(``);

router.post('/characters', requiredAuth, async (req, res, next) => {
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

router.delete('/characters/:id', requiredAuth, async (req, res, next) => {
  try {
    const id = +req.params.id;
    const userId = req.user.id;

    // delete character
    const { count } = await prisma.character.deleteMany({ where: { id, userId } });
    if (!count) {
      return res.status(404).json({ success: false, message: 'character not found' });
    }

    return res.status(200).json({ success: true, message: 'deleted successfully' });
  } catch (err) {
    return next(err);
  }
});

router.get('/characters/:id', optionalAuth, async (req, res, next) => {
  try {
    const id = +req.params.id;
    const userId = req.user?.id;

    // find character by id
    const character = await prisma.character.findUnique({
      where: { id },
      select: {
        userId: true,
        name: true,
        health: true,
        power: true,
        money: true,
      },
    });
    if (!character) {
      return res.status(404).json({ success: false, message: 'character not found' });
    }

    // common data
    const data = {
      name: character.name,
      health: character.health,
      power: character.power,
    };

    // data for the character's owner
    if (userId === character.userId) {
      data['money'] = character.money;
    }

    return res.status(200).json({ success: false, message: 'fetched successfully', data });
  } catch (err) {
    return next(err);
  }
});

export default router;
