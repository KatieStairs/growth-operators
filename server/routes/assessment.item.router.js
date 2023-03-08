const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();


router.get('/', rejectUnauthenticated, (req, res) => {
    pool.query(`
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
    JOIN "tags" ON "tags_assessment_items"."assessment_item_id" = "tags"."id";
      `).then((result) => {
      res.send(result.rows);
    }).catch((error) => {
      console.log('Error in GET * assessment answers', error)
      res.sendStatus(500);
    });
  });

// Should this be by assessment ID?
/** ---------- GET ASSESSMENT BY CLIENT ID ---------- **/

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


/** ---------- POST ASSESSMENT BY ASSESSMENT ID ---------- **/
router.post('/:id', rejectUnauthenticated, (req, res) => {
    // console.log('POST Assessment, req.params: ', req.params);
    // console.log('POST Assessment, req.body: ', req.body);
    const sqlQuery = `
        INSERT INTO "assessment_items"
            ("assessment_id", 
            "bucket_id", 
            "function_id", 
            "subfunction_id", 
            "level_rating", 
            "findings", 
            "impact", 
            "recommendations", 
            "phase")
        VALUES
        ($1,$2,$3,$4,$5,$6,$7,$8,$9);`;
    const sqlValues = [
        req.params.id, req.body.bucket_id, req.body.function_id, 
        req.body.subfunction_id, req.body.level_rating, req.body.findings, 
        req.body.impact, req.body.recommendations, req.body.phase
    ];
    pool.query(sqlQuery,sqlValues)
    .then((results) => {
        // console.log('Success in POST /assessment/:id!');
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log('Error in POST /assessment/:id: ', error);
        res.sendStatus(500);
    })
})

module.exports = router;