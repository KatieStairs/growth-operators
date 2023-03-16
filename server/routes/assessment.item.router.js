const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();


/** ---------- GET ASSESSMENT BY ASSESSMENT ID ---------- **/
router.get('/:id', rejectUnauthenticated, (req, res) => {
    const idOfAssessment = req.params.id;
    // console.log('in GET by assessment_id', idOfAssessment)
    const sqlText = `
        SELECT
            "assessment_id",
            "client_assessments"."client_id", 
            "assessment_items"."bucket_id",
            "client"."company_name" AS "company_name",
            "buckets"."name" AS "bucket_name",
            "assessment_items"."level_rating", 
            "functions"."id" AS "function_id",
            "functions"."name" AS "function_name",
            "subfunctions"."id" AS "subfunction_id",
            "subfunctions"."name" AS "subfunction_name",
            "tags"."name" AS "tag_name",
            "tags_assessment_items"."tag_id" AS "tag_id",
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
        JOIN "client" ON "client_assessments"."client_id" = "client"."id"
        WHERE "assessment_id" = $1;
    `
    const sqlValues = [idOfAssessment];
    pool.query(sqlText, sqlValues)
        .then((dbRes) => {
            res.send(dbRes.rows[0])
            // console.log(dbRes.rows[0])
        })
        .catch((dbErr) => {
            console.log('Error in Edit Assessment GET', dbErr);
            res.sendStatus(500);
        })
});


/** ---------- POST ASSESSMENT ANSWERS BY ASSESSMENT ID ---------- **/
router.post('/:id', rejectUnauthenticated, (req, res) => {
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
            ($1,$2,$3,$4,$5,$6,$7,$8,$9)
        RETURNING "id";`;
    const sqlValues = [
        req.body.assessment_id, req.body.bucket_id, req.body.function_id, 
        req.body.subfunction_id, req.body.level_rating, req.body.findings, 
        req.body.impact, req.body.recommendations, req.body.phase
    ];
    pool.query(sqlQuery,sqlValues)
    .then((results) => {
        const newAssessmentItemID = results.rows[0].id;
        const sqlTagQuery = `
        INSERT INTO "tags_assessment_items"
            ("assessment_item_id", "tag_id")
        VALUES
            ($1, $2)`;
        const sqlTagValues = [newAssessmentItemID, req.body.tag_id]
        pool.query(sqlTagQuery, sqlTagValues)
        .then((results) => {
            res.sendStatus(201);
        })
        .catch((error) => {
            console.log('Error in POST /assessment/:id (tags): ', error);
            res.sendStatus(500);
        })
    })
    .catch((error) => {
        console.log('Error in POST /assessment/:id: ', error);
        res.sendStatus(500);
    })
})


/** ---------- POST HEADLINE --------- **/
router.post('/', rejectUnauthenticated, (req, res) => {
    // console.log('***** req.params.id', req.params);
    // console.log('***** req.body.headline', req.body);
    const sqlQuery = `
        INSERT INTO "buckets_headlines"
            ("assessment_id", 
            "bucket_id", 
            "headline_text")
        VALUES
        ($1, $2, $3);
    `;
    const sqlValues = [req.body.assessment_id, req.body.bucket_id, req.body.headline_text]
    pool.query(sqlQuery, sqlValues)
    .then((response) => {
        res.sendStatus(201);
    })
    .catch((error) => {
        console.log('Error in post headline by id', error);
        res.sendStatus(500);
    })
})

/** ---------- PUT ASSESSMENT EDITS BY ASSESSMENT ID---------- **/

router.put('/:id', rejectUnauthenticated, (req, res) => {
    // const idToUpdate = req.params.id;
    // console.log('PUT ASSESSMENT ID, req.body', req.params.id, req.body)
    const sqlText = `
      UPDATE "assessment_items"
        SET 
        "bucket_id"=$1, 
        "function_id"=$2, 
        "subfunction_id"=$3, 
        "level_rating"=$4, 
        "findings"=$5, 
        "impact"=$6, 
        "recommendations"=$7, 
        "phase"=$8
        WHERE "assessment_id"=$9;
    `;
    const sqlValues = [
        req.body.bucket_id, req.body.function_id, 
        req.body.subfunction_id, req.body.level_rating, req.body.findings, 
        req.body.impact, req.body.recommendations, req.body.phase, req.params.id
    ];
    pool.query(sqlText, sqlValues)
      .then((result) => {
        res.sendStatus(200);
      })
      .catch((error) => {
        console.log('Error in put edit assessment db query', error)
        res.sendStatus(500);
      });
  });

module.exports = router;