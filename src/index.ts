import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import optimizelySDK, { Client } from '@optimizely/optimizely-sdk';

dotenv.config()
const PORT = process.env.PORT;
const optimizelyClientInstance: Client = optimizelySDK.createInstance({
  sdkKey: process.env.SDK_KEY
});

const app: Application = express();
app.use(cors())

optimizelyClientInstance.onReady().then(() => {
  console.log('Optimizely SDK is ready')
});

app.use('/:userId', (req: Request, res: Response) => {
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
