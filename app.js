import express from 'express';
import mysql from 'mysql';
import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js';
// import routes from './routes/index.js';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import session from 'express-session';
import cookies from 'cookie-parser';
// var hike = require('./routes/hike');
// import swaggerJson from './swagger_output.json';

dotenv.config();

// import('./models/relationships.js');
// import { Freelancer } from './models/Freelancer.js';
// // Replace with your own AWS access keys
// AWS.config.update({
//   accessKeyId: 'AKIAUAG6V5L252C4GTRD',
//   secretAccessKey: 'ZX7t1TH/nn3V53EdTpSqGRvCy6CatCxc1QypvVrn',
//   region: 'eu-west-1',
// });
const app = express();
const port = process.env.port || 80;

const db = mysql.createConnection({
  host: 'database-2.cp0mlsldpt24.eu-west-1.rds.amazonaws.com',
  port: '3306',
  user: 'admin',
  password: 'Ambalaj123!?',
  name: 'database-2',
});
// Connect to Amazon RDS instance
// const rds = new AWS.RDS({ apiVersion: '2014-10-31' });
// const dbParams = {
//   DBInstanceIdentifier: 'database-1',
// };
// rds.describeDBInstances(dbParams, (err, data) => {
//   if (err) console.log(err, err.stack);
//   else {
//     console.log(data, 'data[]][][');
//     const endpoint = data.DBInstances[0].Endpoint.Address;
//     const connection = mysql.createConnection({
//       host: 'database-1.cp0mlsldpt24.eu-west-1.rds.amazonaws.com',
//       port: '3306',
//       user: 'marcelgrama',
//       password: 'Ambalaj123!?',
//       database: 'database-1',
//     });

//     connection.connect((err) => {
//       if (err) console.log(err);
//       else console.log('Connected to Amazon RDS');
//     });
//   }
// });
// sequelize.connect((err) => {
//   if (err) console.log(err);
//   else {
//     console.log('Connected to Amazon RDS');
//     // if (err) throw err;

//     // db.query('CREATE DATABASE IF NOT EXISTS main;');
//     db.query('USE main;');
//     // db.query(
//     //   'CREATE TABLE IF NOT EXISTS users(id int NOT NULL AUTO_INCREMENT, username varchar(30), email varchar(255), age int, PRIMARY KEY(id));',
//     //   function (error, result, fields) {
//     //     console.log(result);
//     //   }
//     // );
//     // db.end();
//   }
// });
app.use(cookies());

app.use(express.json());

app.use(bodyParser.json());
// app.use('/api', routes);

// Set up routes
app.get('/', (req, res) => {
  console.log('it works');
  res.send({ message: 'it works!' });
});
// app.get('/hikes', hike.index);
// app.post('/add_hike', hike.add_hike);
// app.use('/api-docs', swaggerUi.serve, async (_req, res) =>
//   res.send(swaggerUi.generateHTML(swaggerJson))
// );
// app.use('/docs', swaggerUi.serve, async (_req, res) =>
//   res.send(swaggerUi.generateHTML(swaggerJson))
// );
// app.get('/freelancers', (req, res) => {
//   // Query the database for a list of freelancers
// });

app.listen(port, () =>
  console.log('Freelancing Agency listening on port 3000!')
);