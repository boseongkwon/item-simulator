import jwt from 'jsonwebtoken';
import { JWT_SECRET_KEY } from '../constants/env.js';

const authenticator = ({ required = true }) => {
  return async function (req, res, next) {
    try {
      const authorization = req.headers.authorization;

      if (!authorization) {
        //required authenticator
        if (require) {
          return res.status(401).json({ success: false, message: 'missing authorization header' });
        }

        // optional authenticator
        req.user = null;
        return next();
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
  };
};

export const requiredAuth = authenticator({ required: true });
export const optionalAuth = authenticator({ required: false });
