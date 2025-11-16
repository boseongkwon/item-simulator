import express from 'express';
import { PORT } from './constants/env.js';
import errorHandler from './middlewares/error-handler.js';
import usersRouter from './routes/users.js';
import charactersRouter from './routes/characters.js';
import itemsRouter from './routes/items.js';

const app = express();

app.use(express.json());
app.use('/api', [usersRouter, charactersRouter, itemsRouter]);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
