const express = require('express');

const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.get('/assessments/:id', rejectUnauthenticated, (req, res) => {
    const queryText = `
    SELECT
      "client_assessments"."id",
      "client"."company_name",
      "client_assessments"."engagement_date",
      "client_assessments"."status"
    FROM "client_assessments"
    JOIN "client" ON "client_assessments"."client_id" = "client"."id"
    WHERE "client_assessments"."client_id" = $1;
      `;
    pool.query(queryText, [req.params.id])
      .then((response) => {
        res.send(response.rows);
      })
      .catch((error) => {
        console.log('Error completing presentation.router /assessments GET', error);
        res.sendStatus(500);
      });
  });

  router.get('/headlines/:id', rejectUnauthenticated, (req, res) => {
    const queryText = `
    SELECT
      "bucket_id",
      "headline_text"
      FROM "buckets_headlines"
      WHERE "assessment_id" = $1;
      `;
    pool.query(queryText, [req.params.id])
      .then((response) => {
        res.send(response.rows);
      })
      .catch((error) => {
        console.log('Error completing presentation.router /headlines GET', error);
        res.sendStatus(500);
      });
  });

  router.get('/headlines/:id', rejectUnauthenticated, (req, res) => {
    const queryText = `
    SELECT
      "bucket_id",
      "headline_text"
      FROM "buckets_headlines"
      WHERE "assessment_id" = $1;
      `;
    pool.query(queryText, [req.params.id])
      .then((response) => {
        res.send(response.rows);
      })
      .catch((error) => {
        console.log('Error completing presentation.router /headlines GET', error);
        res.sendStatus(500);
      });
  });

  router.get('/strengths/:id', rejectUnauthenticated, (req, res) => {
    const queryText = `
    SELECT
      "buckets"."name" AS "bucket_name",
      "subfunctions"."function_name",
      "assessment_items"."level_rating",
      "assessment_items"."findings",
      "assessment_items"."impact"
      FROM "assessment_items"
    JOIN "subfunctions" ON "subfunctions"."id" = "assessment_items"."subfunction_id"
    JOIN "buckets" ON "buckets"."id" = "assessment_items"."bucket_id"
    JOIN "tags_assessment_items" ON "tags_assessment_items"."assessment_item_id" = "assessment_items"."id"
    WHERE "tags_assessment_items"."tag_id" = 3 AND "assessment_items"."assessment_id" = $1;
      `;
    pool.query(queryText, [req.params.id])
      .then((response) => {
        res.send(response.rows);
      })
      .catch((error) => {
        console.log('Error completing presentation.router /strengths GET', error);
        res.sendStatus(500);
      });
  });

  router.get('/opportunities/:id', rejectUnauthenticated, (req, res) => {
    const queryText = `
    SELECT
      "buckets"."name" AS "bucket_name",
      "subfunctions"."function_name",
      "assessment_items"."level_rating",
      "assessment_items"."findings",
      "assessment_items"."impact",
      "assessment_items"."recommendations"
      FROM "assessment_items"
    JOIN "subfunctions" ON "subfunctions"."id" = "assessment_items"."subfunction_id"
    JOIN "buckets" ON "buckets"."id" = "assessment_items"."bucket_id"
    JOIN "tags_assessment_items" ON "tags_assessment_items"."assessment_item_id" = "assessment_items"."id"
    WHERE "tags_assessment_items"."tag_id" = 4 AND "assessment_items"."assessment_id" = $1;
      `;
    pool.query(queryText, [req.params.id])
      .then((response) => {
        res.send(response.rows);
      })
      .catch((error) => {
        console.log('Error completing presentation.router /opportunities GET', error);
        res.sendStatus(500);
      });
  });

  router.get('/quick-wins/:id', rejectUnauthenticated, (req, res) => {
    const queryText = `
    SELECT
      "buckets"."name" AS "bucket_name",
      "subfunctions"."function_name",
      "assessment_items"."level_rating",
      "assessment_items"."findings",
      "assessment_items"."impact",
      "assessment_items"."recommendations"
      FROM "assessment_items"
    JOIN "subfunctions" ON "subfunctions"."id" = "assessment_items"."subfunction_id"
    JOIN "buckets" ON "buckets"."id" = "assessment_items"."bucket_id"
    JOIN "tags_assessment_items" ON "tags_assessment_items"."assessment_item_id" = "assessment_items"."id"
    WHERE "tags_assessment_items"."tag_id" = 1 AND "assessment_items"."assessment_id" = $1;
      `;
    pool.query(queryText, [req.params.id])
      .then((response) => {
        res.send(response.rows);
      })
      .catch((error) => {
        console.log('Error completing presentation.router /quick-wins GET', error);
        res.sendStatus(500);
      });
  });

  router.get('/fire-drills/:id', rejectUnauthenticated, (req, res) => {
    const queryText = `
    SELECT
      "buckets"."name" AS "bucket_name",
      "subfunctions"."function_name",
      "assessment_items"."level_rating",
      "assessment_items"."findings",
      "assessment_items"."impact",
      "assessment_items"."recommendations"
      FROM "assessment_items"
    JOIN "subfunctions" ON "subfunctions"."id" = "assessment_items"."subfunction_id"
    JOIN "buckets" ON "buckets"."id" = "assessment_items"."bucket_id"
    JOIN "tags_assessment_items" ON "tags_assessment_items"."assessment_item_id" = "assessment_items"."id"
    WHERE "tags_assessment_items"."tag_id" = 2 AND "assessment_items"."assessment_id" = $1;
      `;
    pool.query(queryText, [req.params.id])
      .then((response) => {
        res.send(response.rows);
      })
      .catch((error) => {
        console.log('Error completing presentation.router /fire-drills GET', error);
        res.sendStatus(500);
      });
  });

  module.exports = router;