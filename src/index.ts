import dotenv from 'dotenv';
dotenv.config()

import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { optimizelyInstance, activate, Args } from './optimizely'
import graphqlHTTP from './graphql'

const app: Application = express();
app.use(cors())

app.use('/graphql', graphqlHTTP);

app.use('/rest/', (req: Request, res: Response) => {
  const { userId, experimentKey } = req.query
  const data = activate({ userId, experimentKey } as Args)

  return res.status(200).send({
    data
  });
});


optimizelyInstance.onReady().then(() => console.log('Optimizely SDK is ready'));
app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}!`));
