import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { CLIENT_URL } from './lib/env';

import { toNodeHandler } from "better-auth/node";
import { auth } from './lib/auth';

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors({
  origin:CLIENT_URL!,
  credentials:true
}));

app.all("/api/auth/{*any}", toNodeHandler(auth))
// application routes
// app.use('/api/v1', router);

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from Apollo Gears World!');
});

export default app;
