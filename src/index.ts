import dotenv from 'dotenv';
dotenv.config()

import express, { Application } from 'express';
import cors from 'cors';
import { optimizelyInstance } from './optimizely'
import graphqlHTTP from './graphql'
import restHTTP from './rest'

const app: Application = express();
app.use(cors())

app.use('/graphql', graphqlHTTP);
app.use('/rest/', restHTTP);

optimizelyInstance.onReady().then(() => console.log('Optimizely SDK is ready'));
app.listen(process.env.PORT, () => console.log(`Server is listening on port ${process.env.PORT}!`));
