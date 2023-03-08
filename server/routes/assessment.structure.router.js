const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');


/** ---------- GET USER ID/AUTHENTICATE ---------- **/
router.get('/profile/:id', rejectUnauthenticated, (req, res) => {
  res.send(req.user);
});

/** ---------- GET ALL BUCKETS ---------- **/
router.get('/', rejectUnauthenticated, (req, res) => {
  // console.log('Req.body: ', req.body);
  const sqlQuery =`
  SELECT 
    "name", 
    "bucket_index", 
    "id"
  FROM "buckets"
  ORDER BY "bucket_index" ASC;`;
  pool.query(sqlQuery)
  .then((results) => {
    // console.log('Success in GET /buckets! Results.rows: ', results.rows);
    res.send(results.rows);
  })
  .catch((error) => {
    console.log('Error in GET /buckets: ', error);
    res.sendStatus(500);
  })
});

/** ---------- GET FUNCTIONS BY BUCKET ID ---------- **/
router.get('/:id/functions', rejectUnauthenticated, (req, res) => {
  // console.log('Req.params: ', req.params);
  const sqlQuery =`
  SELECT 
    "functions"."name", 
    "functions"."function_index",
    "buckets"."name" AS "bucket_name"
  FROM "functions"
  JOIN "buckets"
    ON "functions"."bucket_id"="buckets"."id"
  WHERE "functions"."bucket_id"=$1
  ORDER BY "functions"."function_index" ASC;`;
  const sqlValues = [req.params.id];
  pool.query(sqlQuery, sqlValues)
  .then((results) => {
    // console.log('Success in GET /buckets/:id/functions! Results.rows: ', results.rows);
    res.send(results.rows);
  })
  .catch((error) => {
    console.log('Error in GET /buckets/:id/functions: ', error);
    res.sendStatus(500);
  })
});

/** ---------- GET SUBFUNCTIONS BY FUNCTION ID ---------- **/
router.get('/functions/:id/subfunctions', rejectUnauthenticated, (req, res) => {
  // console.log('Req.params: ', req.params);
  const sqlQuery =`
  SELECT 
    "subfunctions"."name", 
    "subfunctions"."subfunction_index", 
    "subfunctions"."level_rating_criteria",
    "functions"."name" AS "function_name",
    "functions"."function_index",
    "buckets"."name" AS "bucket_name",
    "buckets"."bucket_index"
  FROM "subfunctions"
  JOIN "functions"
    ON "subfunctions"."function_id"="functions"."id"
  JOIN "buckets"
    ON "functions"."bucket_id"="buckets"."id"
  WHERE "function_id"=$1
  ORDER BY "subfunction_index" ASC;`;
  const sqlValues = [req.params.id];
  pool.query(sqlQuery, sqlValues)
  .then((results) => {
    // console.log('Success in GET /functions/:id/subfunctions! Results.rows: ', results.rows);
    res.send(results.rows);
  })
  .catch((error) => {
    console.log('Error in GET /functions/:id/subfunctions: ', error);
    res.sendStatus(500);
  })
});

module.exports = router;