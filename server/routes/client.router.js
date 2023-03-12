const express = require('express');

const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

/** ---------- GET DASHBOARD INFO BY USER ID ---------- **/

router.get('/dashboard', rejectUnauthenticated, (req, res) => {
    const userId = req.user.id;
    // console.log('in GET by client_id', userId)
    const sqlText = `
    SELECT 
        "client_assessments"."id" AS "assessment_id",
        "company_name",
        "status",
        "engagement_date",
        "phase"
    FROM 
	    "client"
    JOIN "user_client" ON "client"."id" = "user_client"."client_id"
    JOIN "user" ON "user"."id" = "user_client"."user_id"
    JOIN "client_assessments" ON "client_assessments"."client_id" = "client"."id"
    JOIN "assessment_items" ON "assessment_items"."assessment_id" = "client_assessments"."id"
    WHERE "user"."id"= $1;
    `
    const sqlValues = [userId];
    pool.query(sqlText, sqlValues)
        .then((dbRes) => {
            console.log('operator dashboard', dbRes.rows);
            res.send(dbRes.rows)
        })
        .catch((dbErr) => {
            console.log('Error in GET user Dashboard', dbErr);
            res.sendStatus(500);
        })
});

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

router.post('/', (req, res) => {
  // POST route code here

});

module.exports = router;