import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config()

const app: Application = express();
app.use(cors())

const PORT: string = process.env.PORT || '';

app.use('/', (req: Request, res: Response) => {
  res.status(200).send({
    data: 'Hello World'
  });
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}!`));
