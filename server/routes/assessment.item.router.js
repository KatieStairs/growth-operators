const express = require('express');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();


/** ---------- GET ASSESSMENT BY ASSESSMENT ID ---------- **/
router.get('/:id', rejectUnauthenticated, (req, res) => {
    const idOfAssessment = req.params.id;
    const sqlText = `
        SELECT
            "client"."company_name",
            "assessment_items"."id",
            "assessment_items"."bucket_id",
            "buckets"."bucket_index",
            "buckets"."name" AS "bucket_name",
            "assessment_items"."function_id",
            "functions"."function_index",
            "functions"."name" AS "function_name",
            "assessment_items"."subfunction_id",
            "subfunctions"."subfunction_index",
            "subfunctions"."name" AS "subfunction_name",
            "assessment_items"."level_rating",
            "assessment_items"."findings",
            "assessment_items"."impact",
            "assessment_items"."recommendations",
            "assessment_items"."phase",
            "tags_assessment_items"."tag_id"
        FROM "assessment_items" 
        JOIN "client_assessments" 
            ON "assessment_items"."assessment_id" = "client_assessments"."id"
        JOIN "buckets" 
            ON "assessment_items"."bucket_id" = "buckets"."id"
        JOIN "functions" 
            ON "assessment_items"."function_id" = "functions"."id"
        JOIN "subfunctions" 
            ON "assessment_items"."subfunction_id" = "subfunctions"."id"
        JOIN "client" 
            ON "client_assessments"."client_id" = "client"."id"
        JOIN "tags_assessment_items" 
            ON "assessment_items"."id" = "tags_assessment_items"."assessment_item_id"
        WHERE "assessment_items"."assessment_id" = $1
        ORDER BY "bucket_index" ASC, "function_index" ASC, "subfunction_index" ASC;`;
    const sqlValues = [idOfAssessment];
    pool.query(sqlText, sqlValues)
        .then((dbRes) => {
            res.send(dbRes.rows)
        })
        .catch((dbErr) => {
            console.log('Error in Edit Assessment GET', dbErr);
            res.sendStatus(500);
        })
});


/** ---------- GET BUCKET HEADLINES BY ASSESSMENT ID ---------- **/
router.get('/:id/headlines', rejectUnauthenticated, (req, res) => {
    const sqlQuery = `
        SELECT * 
        FROM "buckets_headlines" 
        WHERE "buckets_headlines"."assessment_id" = $1
        ORDER BY "bucket_id" ASC;`;
    const sqlValues = [req.params.id];
    pool.query(sqlQuery, sqlValues)
        .then((response) => {
            res.send(response.rows);
        })
        .catch((error) => {
            console.log('Error in Edit Assessment GET', error);
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
            "phase",
            "findings", 
            "impact", 
            "recommendations")
        VALUES
            ($1,$2,$3,$4,$5,$6,$7,$8,$9)
        RETURNING "id";`;
    const sqlValues = [
        req.body.assessment_id, req.body.bucket_id, req.body.function_id, 
        req.body.subfunction_id, req.body.level_rating, req.body.phase, req.body.findings, 
        req.body.impact, req.body.recommendations
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

/** ---------- POST ASSESSMENT SLIDE INPUTS BY ASSESSMENT ID ---------- **/
router.post('/slide/:id', rejectUnauthenticated, (req, res) => {
    console.log('Req.body: ', req.body)
    const sqlQuery = `
        INSERT INTO "assessment_items"
            ("assessment_id", "next_steps", "future_state")
        VALUES
            ($1,$2,$3);`;
    const sqlValues = [req.body.assessment_id, req.body.next_steps, req.body.future_state];
    pool.query(sqlQuery,sqlValues)
    .then((results) => {
        res.sendStatus(201);
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
    console.log('PUT ASSESSMENT ID, req.body', req.params.id, req.body)
    const sqlText = `
      UPDATE "assessment_items"
        SET 
        "level_rating"=$1, 
        "findings"=$2, 
        "impact"=$3, 
        "recommendations"=$4
        WHERE "assessment_id"=$5 AND "subfunction_id"=$6
        RETURNING "id";
    `;
    const sqlValues = [req.body.level_rating, req.body.findings, 
        req.body.impact, req.body.recommendations,
        req.params.id, req.body.subfunction_id 
    ];
    pool.query(sqlText, sqlValues)
      .then((result) => {
        let assessmentItemID = result.rows[0].id;
        const newSqlText = `
        UPDATE "tags_assessment_items"
        SET 
            "tag_id" = $2
        WHERE "assessment_item_id" = $1;
        `;
        const newSqlValues = [assessmentItemID, req.body.tags_id]
        pool.query(newSqlText, newSqlValues)
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('Error in PUT tags router: ', error)
            res.sendStatus(500);
        })

      })
      .catch((error) => {
        console.log('Error in put edit assessment db query', error)
        res.sendStatus(500);
      });
  });

module.exports = router;