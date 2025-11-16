import express from 'express';
import { itemModifyingShcema, itemSchema } from '../utils/joi.js';
import prisma from '../utils/prisma.js';
import flatten from '../utils/flatten.js';

const router = express.Router();

router.post('/items', async (req, res, next) => {
  try {
    const { code, name, stats, price } = req.body;

    // validate input
    const { error: validationError, value: validated } = itemSchema.validate({
      code,
      name,
      stats,
      price,
    });
    if (validationError) {
      return res.status(422).json({ success: false, message: validationError.message });
    }

    // the unique constraint on 'code' and 'name' will be handled in the error handler

    // flatten data
    const data = flatten(validated);

    // create item
    await prisma.item.create({ data });

    return res.status(201).json({ success: true, message: 'created successfully' });
  } catch (err) {
    return next(err);
  }
});

router.patch('/items/:code', async (req, res, next) => {
  try {
    const { name, stats } = req.body;
    const code = +req.params.code;

    // validate input
    const { error: validationError, value: validated } = itemModifyingShcema.validate({
      name,
      stats,
    });
    if (validationError) {
      return res.status(422).json({ success: false, message: validationError.message });
    }

    // flatten data
    const data = flatten(validated);

    // update item information
    await prisma.item.update({ where: { code }, data });

    // if the item doesn't exist, it will be handled in the error handler

    return res.status(200).json({ success: true, message: 'updated successfully' });
  } catch (err) {
    return next(err);
  }
});

router.get('/items', async (req, res, next) => {
  try {
    // find items
    const items = await prisma.item.findMany({ select: { code: true, name: true, price: true } });

    return res.status(200).json({ success: true, message: 'fetched successfully', data: items });
  } catch (err) {
    return next(err);
  }
});

router.get('/items/:code', async (req, res, next) => {
  try {
    const code = +req.params.code;

    const item = await prisma.item.findUnique({
      where: { code },
      select: { code: true, name: true, health: true, power: true, price: true },
    });
    if (!item) {
      return res.status(404).json({ success: false, message: 'item not found' });
    }

    const data = {
      code: item.code,
      name: item.name,
      stats: { health: item.health, power: item.power },
      price: item.price,
    };

    return res.status(200).json({ success: true, message: 'fetched successfully', data });
  } catch (err) {
    return next(err);
  }
});

export default router;
