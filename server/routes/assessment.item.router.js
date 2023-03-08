const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/:id', rejectUnauthenticated, (req, res) => {
    const idOfAssessment = req.params.id;
    console.log('in GET by client_id', idOfAssessment)
    const sqlText = `
        SELECT 
	        "buckets"."name" AS "bucket_name",
	        "assessment_items"."level_rating", 
	        "assessment_items"."phase",
	        "functions"."name" AS "function_name",
	        "subfunctions"."name" AS "subfunction_name",
	        "tags"."name" AS "tag_name",
            "findings",
            "impact",
            "recommendations"
        FROM "assessment_items" 
        JOIN "client_assessments" ON "client_id" = "client_assessments"."client_id"
        JOIN "buckets" ON "bucket_id" = "buckets"."id"
        JOIN "functions" ON "function_id" = "functions"."id"
        JOIN "subfunctions" ON "subfunction_id" = "subfunctions"."id"
        JOIN "tags_assessment_items" ON "assessment_items"."id" = "tags_assessment_items"."assessment_item_id"
        JOIN "tags" ON "tags_assessment_items"."assessment_item_id" = "tags"."id"
        WHERE "assessment_id" = $1;
    `
    const sqlValues = [idOfAssessment];
    pool.query(sqlText, sqlValues)
        .then((dbRes) => {
            res.send(dbRes.rows[0])
        })
        .catch((dbErr) => {
            console.log('Error in Edit Assessment GET', dbErr);
            res.sendStatus(500);
        })
});

module.exports = router;