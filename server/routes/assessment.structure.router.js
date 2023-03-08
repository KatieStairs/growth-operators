const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');


/** ---------- GET USER ID/AUTHENTICATE ---------- **/
// router.get('/profile/:id', rejectUnauthenticated, (req, res) => {
//   res.send(req.user);
// });

/** ---------- GET ALL BUCKETS ---------- **/
router.get('/', rejectUnauthenticated, (req, res) => {
  console.log('Req.body: ', req.body);
  const sqlQuery =`
  SELECT "name", "bucket_index", "id"
  FROM "buckets"
  ORDER BY "bucket_index" ASC;`;
  pool.query(sqlQuery)
  .then((results) => {
    console.log('Success in GET /buckets! Results.rows: ', results.rows);
    res.send(results.rows);
  })
  .catch((error) => {
    console.log('Error in GET /buckets: ', error);
    res.sendStatus(500);
  })
});

/** ---------- GET FUNCTIONS BY BUCKET ID ---------- **/
router.get('/:id/functions', rejectUnauthenticated, (req, res) => {
  console.log('Req.params: ', req.params);
  const sqlQuery =`
  SELECT "name", "function_index"
  FROM "functions"
  WHERE "bucket_id"=$1
  ORDER BY "function_index" ASC;`;
  const sqlValues = [req.params.id];
  pool.query(sqlQuery, sqlValues)
  .then((results) => {
    console.log('Success in GET /buckets/:id/functions! Results.rows: ', results.rows);
    res.send(results.rows);
  })
  .catch((error) => {
    console.log('Error in GET /buckets/:id/functions: ', error);
    res.sendStatus(500);
  })
});

/** ---------- GET SUBFUNCTIONS BY FUNCTION ID ---------- **/


module.exports = router;