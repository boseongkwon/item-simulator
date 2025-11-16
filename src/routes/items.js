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

    return res.status(200).json({ success: true, message: 'updated successfully' });
  } catch (err) {
    return next(err);
  }
});

export default router;
