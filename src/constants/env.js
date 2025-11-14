import dotenv from 'dotenv';

dotenv.config();

export const PORT = +process.env.PORT || 3000;
export const BCRYPT_SALT_ROUNDS = +process.env.BCRYPT_SALT_ROUNDS || 10;
export const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
export const ACCESS_TOKEN_TTL = process.env.ACCESS_TOKEN_TTL || '15m';
