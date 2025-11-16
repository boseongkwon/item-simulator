import { Prisma } from '@prisma/client';

export default function (err, req, res, next) {
  console.error(err);

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    switch (err.code) {
      case 'P2002':
        return res
          .status(409)
          .json({ success: false, message: `already exists: ${err.meta?.target.split('_')[1]}` });
      case 'P2025':
        return res
          .status(404)
          .json({ success: false, message: `${err.meta?.modelName} not found` });
      default:
        break;
    }
  }

  return res.status(500).json({ success: false, message: 'internal server error' });
}
