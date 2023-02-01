import express from 'express';
import { FreelancerTableForNotifications } from '../models/FreelancerTableForNotifications.js'; // import the User model
import bcrypt from 'bcryptjs'; // import the bcrypt library for password hashing
import authMiddleware from '../utils/middlewares/authMiddleware';
import mondaySdk from 'monday-sdk-js';
import request from 'request';

const router = express.Router();

router.get('/sync-monday-rds', async (req, res) => {
  try {
    // Monday init

    const token = process.env.PUBLIC_MONDAY_ACCESS_TOKEN;
    const monday = mondaySdk();
    monday.setToken(token);
    let page = 1;

    const boardID = process.env.PUBLIC_BOARD_FREELANCERS;
    // This object contains both freelanccers and partners monday fields
    // You can add them in one place, it wont show if it doesent exists
    const objKeys = {
      email: 'email',
      text1: 'phone',
      text17: 'skills',
      pulse_id: 'id',
    };
    const mondayKeys = Object.keys(objKeys).join();
    console.log(token, 'intra[][]]');
    const freelancerID = [''].join(); // You can pass the id's in this array to filter the exact user

    const response = await monday
      .api(
        `
			query { boards (ids: [ ${boardID} ]) { 
					items ( 
							limit: 1000, 
							${freelancerID ? '' : 'page:' + page + ''}
							${freelancerID ? 'ids:[' + freelancerID + ']' : ''} ) {
						id
						name
						column_values(ids: [ ${mondayKeys} ]) 
				  { text id }
				}
			  }
			}`
      )
      .catch((e) => {
        console.log(e, 'err');
      });

    const { items } = response.data.boards[0];

    items.forEach(async (element) => {
      let newObj = {};
      newObj.id = element.id;
      newObj.name = element.name;
      newObj.subscribed = true;
      newObj.phone = element.column_values[1].text;
      newObj.user_email = element.column_values[0].text;
      newObj.main_skills = element.column_values[2].text;
      const user = await FreelancerTableForNotifications.create({
        id: newObj.id,
        user_email: newObj.user_email,
        name: newObj.name,
        subscribed: newObj.subscribed,
        phone: newObj.phone,
        main_skills: newObj.main_skills,
      }).catch((e) => {
        console.log(e, 'eeeee------');
      });

      console.log(newObj, 'new[][][');
    });
    // return the created user object
    res.send(items);
  } catch (err) {
    res.status(500).send({ message: err });
  }
});

router.get('/start-campaign', async (req, res) => {
  try {
    request(
      {
        method: 'POST',
        url: 'https://api2.autopilothq.com/v1/list/contactlist_8f846520-2444-48a6-a672-f979d6ad2af8/contact/gramamarcel01@gmail.com',
        headers: {
          autopilotapikey: '42a6981cc95842aaa27c54564eda851f',
        },
      },
      function (error, response, body) {
        console.log('Status:', response.statusCode);
        console.log('Headers:', JSON.stringify(response.headers));
        console.log('Response:', body);
      }
    );
  } catch (err) {
    res.status(500).send({ message: 'Register failed!' });
  }
});

export default router;
