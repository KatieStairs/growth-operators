const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

/** ---------- GET DASHBOARD INFO BY USER ID ---------- **/

router.get('/', rejectUnauthenticated, (req, res) => {
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
            res.send(dbRes.rows)
        })
        .catch((dbErr) => {
            console.log('Error in GET user Dashboard', dbErr);
            res.sendStatus(500);
        })
});

module.exports = router;