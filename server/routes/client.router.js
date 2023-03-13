const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/all', (req, res) => {
  const sqlQuery = `
  SELECT * FROM "client"
  ORDER BY "company_name" ASC;
  `;
  pool.query(sqlQuery)
  .then((response) => {
    console.log(response.rows);
    res.send(response.rows);
  })
  .catch((error) => {
    console.error('Error in GET /client/all: ', error);
    res.sendStatus(500);
  })
});

router.get('/overview', (req, res) => {
  console.log("hello you are in client overview route in server!", req.query);
  const clientId = parseInt(req.query.clientId);
  console.log ("This is the client id: ", clientId)
  // const sqlQuery = `
  // SELECT * FROM "client"
  // ORDER BY "company_name" ASC;
  // `;
  // pool.query(sqlQuery)
  // .then((response) => {
  //   console.log(response.rows);
  //   res.send(response.rows);
  // })
  // .catch((error) => {
  //   console.error('Error in GET /client/all: ', error);
  //   res.sendStatus(500);
  // })
});

router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;