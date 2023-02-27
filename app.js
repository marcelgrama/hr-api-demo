import express from 'express';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js';
import routes from './routes/index.js';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import session from 'express-session';
import cookies from 'cookie-parser';
import swaggerJson from './swagger_output.json';
import cors from 'cors';

dotenv.config();

const app = express();
const port = process.env.PORT || 80;
app.use(cookies());

const corsOptions = {
  origin: true,
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
  methods: ['POST', 'GET', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.set('trust proxy', 1); // trust first proxy

app.use(express.json());

app.use(bodyParser.json());
app.use('/api', routes);

// Set up routes
app.get('/', (req, res) => {
  res.send({ message: 'it works!' });
});

app.use('/api-docs', swaggerUi.serve, async (_req, res) =>
  res.send(swaggerUi.generateHTML(swaggerJson))
);
app.use('/docs', swaggerUi.serve, async (_req, res) =>
  res.send(swaggerUi.generateHTML(swaggerJson))
);

app.listen(port, () =>
  console.log(`Freelancing Agency listening on port ${port}!`)
);
