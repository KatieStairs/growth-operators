const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

const {
  rejectUnauthenticated,
} = require('../modules/authentication-middleware');

/** ---------- GET ALL TAGS ---------- **/
router.get('/tags', rejectUnauthenticated, (req, res) => {
  const sqlQuery =`
  SELECT 
    "name", 
    "id"
  FROM "tags"
  ORDER BY "id" ASC;`;
  pool.query(sqlQuery)
  .then((results) => {
    res.send(results.rows);
  })
  .catch((error) => {
    console.log('Error in GET /structure/tags: ', error);
    res.sendStatus(500);
  })
});

/** ---------- GET ALL BUCKETS ---------- **/
router.get('/buckets', rejectUnauthenticated, (req, res) => {
  const sqlQuery =`
  SELECT 
    "name", 
    "bucket_index", 
    "id"
  FROM "buckets"
  ORDER BY "bucket_index" ASC;`;
  pool.query(sqlQuery)
  .then((results) => {
    res.send(results.rows);
  })
  .catch((error) => {
    console.log('Error in GET /structure/buckets: ', error);
    res.sendStatus(500);
  })
});

/** ---------- GET FUNCTIONS BY BUCKET ID ---------- **/
router.get('/buckets/:id/functions', rejectUnauthenticated, (req, res) => {
  const sqlQuery =`
  SELECT 
    "functions"."id", 
    "functions"."name", 
    "functions"."function_index",
    "buckets"."id" AS "bucket_id",
    "buckets"."name" AS "bucket_name"
  FROM "functions"
  JOIN "buckets"
    ON "functions"."bucket_id"="buckets"."id"
  WHERE "functions"."bucket_id"=$1
  ORDER BY "functions"."function_index" ASC;`;
  const sqlValues = [req.params.id];
  pool.query(sqlQuery, sqlValues)
  .then((results) => {
    res.send(results.rows);
  })
  .catch((error) => {
    console.log('Error in GET /structure/buckets/:id/functions: ', error);
    res.sendStatus(500);
  })
});

/** ---------- GET SUBFUNCTIONS BY FUNCTION ID ---------- **/
router.get('/functions/:id/subfunctions', rejectUnauthenticated, (req, res) => {
  const sqlQuery =`
  SELECT 
    "subfunctions"."id", 
    "subfunctions"."name", 
    "subfunctions"."subfunction_index", 
    "subfunctions"."level_criteria_strong",
    "subfunctions"."level_criteria_adequate",
    "subfunctions"."level_criteria_weak",
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
    res.send(results.rows);
  })
  .catch((error) => {
    console.log('Error in GET /structure/functions/:id/subfunctions: ', error);
    res.sendStatus(500);
  })
});

module.exports = router;