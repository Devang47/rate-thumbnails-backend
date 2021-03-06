import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import connectToDb from './db/connect.js';
import router from './routes/Video.js';

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/', router);

app.all('*', (req, res) => {
  res.status(405).send('not a valid route');
});

const port = process.env.URI || 8080

const start = async () => {
  try {
    await connectToDb(port);
    app.listen(process.env.PORT, () => {
      console.log('Listening on PORT: ' + port);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
