import express from 'express';
import UserDatabase from './userdb.js';
import database from './database.js';
import CredentialsValidation from './CredentialsValidation.js';

const app = express();
app.use(express.json());
app.use('/', express.static('./public', { extensions: ['html'] }));

app.post('/api/sign-up',async (request, response) => {
  const user_data = request.body;
  try{
  const check_validation = await CredentialsValidation (user_data.username, user_data.password);
   await UserDatabase.raw(`insert into user (username , password) values ('${user_data.username}','${user_data.password}')`);
    const result = await UserDatabase.raw(`select * from user order by id desc limit 1`);
    response.status(200);
    response.json(result);
  }
  catch(error){
    response.status(404);
    response.json(error.message);
  }
});

app.post('/api/sign-in',async (request, response) => {
  const user_data = request.body;
  const result = await UserDatabase.raw(`select username from user where username='${user_data.username}' and password='${user_data.password}'`);
  if (result.length != 0){
    response.status(200);
    response.json(result[0]);
  }
  else {
    response.status(404);
    response.json('User not found! Username or password invalid!');
  } 
});

app.post('/api/trip', async (request, response) => {
  const data_trip = request.body;
  await database.raw(`insert into trips (date , vacation, days, rating )
  values ('${data_trip.date}','${data_trip.vacation}',${data_trip.days},${data_trip.rating})`);
  const result = await database.raw(`select * from trips order by id desc limit 1`);
  response.status(200);
  response.json(result);
});

app.get('/api/trip/:id', async (request, response) => {
  const id = request.params.id;
  const result = await database.raw(`select * from trips where id = ${id}`);
  if(result.length !== 0) {
    response.status(200);
    response.json(result);  
  }
  else {
    response.status(404);
    response.json(`The trip with id = ${id} NOT FOUND!`);
  }  
});

app.get('/api/trip', async (request, response) => {
  const result = await database.raw(`select * from trips`);
  response.status(200);
  response.json(result);
});

app.put('/api/trip/:id', async (request, response) => {
  const id = request.params.id;
  const data_trip = request.body;
  await database.raw(`update trips set date ='${data_trip.date}', vacation ='${data_trip.vacation}', days = ${data_trip.days}, rating = ${data_trip.rating} where id=${id} `);
  const result = await database.raw(`select * from trips where id=${id}`);
  // while (data_trip.property = trips.property) {
  //  `date ='${data_trip.date}';
  //   vacation ='${data_trip.vacation}';
  //   days = ${data_trip.days};
  //   rating = ${data_trip.rating}`
  // };
  response.status(200);
  response.json(result); 
});

app.delete('/api/trip/:id', async (request, response) => {
  const id = request.params.id;
  const result = await database.raw(`delete from trips where id=${id}`);
  if(result.length !== 0) {
    response.status(200);
    response.json(true);  
  }
  else {
    response.status(404);
    response.json(`The trip with id = ${id} does not exist!`);
  }
});
 
const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});