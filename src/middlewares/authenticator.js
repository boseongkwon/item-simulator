import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../constants/env.js';

export default async function (req, res, next) {
  try {
    const authorization = req.headers.authorization;

    if (!authorization) {
      return res.status(401).json({ success: false, message: 'missing authorization header' });
    }

    // extract the token
    const [tokenType, accessToken] = authorization.split(' ');

    if (tokenType !== 'Bearer') {
      return res.status(401).json({ success: false, message: 'invalid token type' });
    }

    // verify the token and extract the payload
    const payload = jwt.verify(accessToken, JWT_SECRET_KEY);

    req.user = payload;

    return next();
  } catch (err) {
    switch (err.name) {
      case 'TokenExpiredError':
        return res.status(401).json({ success: false, message: 'token expired' });
      case 'JsonWebTokenError':
        return res.status(401).json({ success: false, message: 'invalid token signature' });
      default:
        break;
    }

    return next(err);
  }
}
