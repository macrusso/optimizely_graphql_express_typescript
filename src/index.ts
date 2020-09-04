import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import optimizelySDK, { Client } from '@optimizely/optimizely-sdk';

dotenv.config()
const PORT = process.env.PORT;
const optimizelyClientInstance: Client = optimizelySDK.createInstance({
  sdkKey: process.env.SDK_KEY
});

const app: Application = express();
app.use(cors())

const schema = buildSchema(`
  type Query {
    getVariation(userId: String!): String
  }
`);

interface Args {
  userId: string
}

const root = {
  getVariation: (args: Args) => {
    const variation = optimizelyClientInstance.activate('local_test_experiment', args.userId);
    console.log(variation);

    if (variation === 'variation_1') {
      return 'variation_1'
    } else if (variation === 'variation_2') {
      return 'variation_2'
    } else {
      return 'default'
    }
  },
};

app.use('/graphql', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true,
}));

optimizelyClientInstance.onReady().then(() => {
  console.log('Optimizely SDK is ready')
});

app.use('/rest/:userId', (req: Request, res: Response) => {
  const variation = optimizelyClientInstance.activate('local_test_experiment', req.params.userId);
  console.log(variation);

  if (variation === 'variation_1') {
    return res.status(200).send({
      data: 'variation_1'
    });
  } else if (variation === 'variation_2') {
    return res.status(200).send({
      data: 'variation_2'
    });
  } else {
    return res.status(200).send({
      data: 'default'
    });
  }


});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}!`));
