const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/** ---------- GET ASSESSMENT STRENGTH TAGS BY ID ---------- **/
router.get('/strengths/:id', (req, res) => {
  const queryText = `
  SELECT
    "buckets"."name" AS "bucket_name",
    "subfunctions"."id" AS "subfunction_id",
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
      console.error('Error completing presentation.router /strengths GET', error);
      res.sendStatus(500);
    });
});

/** ---------- GET ASSESSMENT OPPORTUNITIES TAGS BY ID ---------- **/
router.get('/opportunities/:id', (req, res) => {
  const queryText = `
  SELECT
    "buckets"."name" AS "bucket_name",
    "subfunctions"."id" AS "subfunction_id",
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
      console.error('Error completing presentation.router /opportunities GET', error);
      res.sendStatus(500);
    });
});

/** ---------- GET ASSESSMENT SUMMARY RATINGS BY ID (FOR GRAPH) ---------- **/
router.get('/summary-ratings/:id', (req, res) => {
  const queryText = `
  SELECT
    SUM("level_rating") FILTER (WHERE "bucket_id" = 1) AS "organizational_effectiveness_rating",
    SUM("level_rating") FILTER (WHERE "bucket_id" = 2) AS "employee_engagement_rating",
    SUM("level_rating") FILTER (WHERE "bucket_id" = 3) AS "training_development_rating",
    SUM("level_rating") FILTER (WHERE "bucket_id" = 4) AS "benefits_compensation_rating",
    SUM("level_rating") FILTER (WHERE "bucket_id" = 5) AS "recruiting_staffing_rating",
    SUM("level_rating") FILTER (WHERE "bucket_id" = 6) AS "hris_payroll_compliance_rating"
  FROM "assessment_items"
  WHERE "assessment_id" = $1;
  `;
  pool.query(queryText, [req.params.id])
    .then((response) => {
      res.send(response.rows[0]);
    })
    .catch((error) => {
      console.error('Error completing presentation.router /summary-ratings GET', error);
      res.sendStatus(500);
    });
});

/** ---------- GET BUCKET 1 ASSESSMENT DATA BY ID ---------- **/
router.get('/bucket-1/data/:id', (req, res) => {
  const queryText = `
  SELECT
    "buckets_headlines"."headline_text",
    SUM("assessment_items"."level_rating")
      FILTER (WHERE "assessment_items"."function_id" = 1)
      AS "mission_vision_values_rating",
    SUM("assessment_items"."level_rating")
      FILTER (WHERE "assessment_items"."function_id" = 2)
      AS "business_goals_org_alignment_rating",
    SUM("assessment_items"."level_rating")
      FILTER (WHERE "assessment_items"."function_id" = 3)
      AS "workflow_procedures_structures_systems_rating",
    SUM("assessment_items"."level_rating")
      FILTER (WHERE "assessment_items"."function_id" = 4)
      AS "succession_planning_rating"
  FROM "assessment_items"
  JOIN "buckets_headlines"
    ON "assessment_items"."bucket_id" = "buckets_headlines"."bucket_id"
  WHERE "assessment_items"."assessment_id" = $1
    AND "assessment_items"."bucket_id" = 1
    AND "buckets_headlines"."assessment_id" = $1
  GROUP BY "buckets_headlines"."headline_text";
  `;
  pool.query(queryText, [req.params.id])
    .then((response) => {
      res.send(response.rows[0]);
    })
    .catch((error) => {
      console.error('Error completing presentation.router /bucket-1/data GET', error);
      res.sendStatus(500);
    });
});

/** ---------- GET BUCKET 2 ASSESSMENT DATA BY ID ---------- **/
router.get('/bucket-2/data/:id', (req, res) => {
  const queryText = `
  SELECT
    "buckets_headlines"."headline_text",
    SUM("assessment_items"."level_rating")
      FILTER (WHERE "assessment_items"."function_id" = 1)
      AS "employee_communication_rating",
    SUM("assessment_items"."level_rating")
      FILTER (WHERE "assessment_items"."function_id" = 2)
      AS "measurement_rating",
    SUM("assessment_items"."level_rating")
      FILTER (WHERE "assessment_items"."function_id" = 3)
      AS "problem_resolution_rating",
    SUM("assessment_items"."level_rating")
      FILTER (WHERE "assessment_items"."function_id" = 4)
      AS "retention_planning_analysis_rating",
    SUM("assessment_items"."level_rating")
      FILTER (WHERE "assessment_items"."function_id" = 5)
      AS "recognition_rating",
    SUM("assessment_items"."level_rating")
      FILTER (WHERE "assessment_items"."function_id" = 6)
      AS "charitable_giving_rating",
    SUM("assessment_items"."level_rating")
      FILTER (WHERE "assessment_items"."function_id" = 7)
      AS "health_wellness_rating",
    SUM("assessment_items"."level_rating")
      FILTER (WHERE "assessment_items"."function_id" = 8)
      AS "diversity_equity_inclusion_rating"
  FROM "assessment_items"
  JOIN "buckets_headlines"
    ON "assessment_items"."bucket_id" = "buckets_headlines"."bucket_id"
  WHERE "assessment_items"."assessment_id" = $1
    AND "assessment_items"."bucket_id" = 2
    AND "buckets_headlines"."assessment_id" = $1
  GROUP BY "buckets_headlines"."headline_text";
  `;
  pool.query(queryText, [req.params.id])
    .then((response) => {
      res.send(response.rows[0]);
    })
    .catch((error) => {
      console.error('Error completing presentation.router /bucket-2/data GET', error);
      res.sendStatus(500);
    });
});

/** ---------- GET BUCKET 3 ASSESSMENT DATA BY ID ---------- **/
router.get('/bucket-3/data/:id', (req, res) => {
  const queryText = `
  SELECT
    "buckets_headlines"."headline_text",
    SUM("assessment_items"."level_rating")
      FILTER (WHERE "assessment_items"."function_id" = 1)
      AS "company_wide_compliance_rating",
    SUM("assessment_items"."level_rating")
      FILTER (WHERE "assessment_items"."function_id" = 2)
      AS "employee_resources_rating",
    SUM("assessment_items"."level_rating")
      FILTER (WHERE "assessment_items"."function_id" = 3)
      AS "new_hire_orientation_onboarding_rating",
    SUM("assessment_items"."level_rating")
      FILTER (WHERE "assessment_items"."function_id" = 4)
      AS "training_tools_rating",
    SUM("assessment_items"."level_rating")
      FILTER (WHERE "assessment_items"."function_id" = 5)
      AS "assessment_tracking_measurement_rating"
  FROM "assessment_items"
  JOIN "buckets_headlines"
    ON "assessment_items"."bucket_id" = "buckets_headlines"."bucket_id"
  WHERE "assessment_items"."assessment_id" = $1
    AND "assessment_items"."bucket_id" = 3
    AND "buckets_headlines"."assessment_id" = $1
  GROUP BY "buckets_headlines"."headline_text";
  `;
  pool.query(queryText, [req.params.id])
    .then((response) => {
      res.send(response.rows[0]);
    })
    .catch((error) => {
      console.error('Error completing presentation.router /bucket-3/data GET', error);
      res.sendStatus(500);
    });
});

/** ---------- GET BUCKET 4 ASSESSMENT DATA BY ID ---------- **/
router.get('/bucket-4/data/:id', (req, res) => {
  const queryText = `
  SELECT
    "buckets_headlines"."headline_text",
    SUM("assessment_items"."level_rating")
      FILTER (WHERE "assessment_items"."function_id" = 1)
      AS "compensation_plan_philosophy_rating",
    SUM("assessment_items"."level_rating")
      FILTER (WHERE "assessment_items"."function_id" = 2)
      AS "benefits_strategy_rating",
    SUM("assessment_items"."level_rating")
      FILTER (WHERE "assessment_items"."function_id" = 3)
      AS "enrollment_rating",
    SUM("assessment_items"."level_rating")
      FILTER (WHERE "assessment_items"."function_id" = 4)
      AS "employee_education_rating",
    SUM("assessment_items"."level_rating")
      FILTER (WHERE "assessment_items"."function_id" = 5)
      AS "administer_benefit_comp_plans_rating",
    SUM("assessment_items"."level_rating")
      FILTER (WHERE "assessment_items"."function_id" = 6)
      AS "compliance_rating"
  FROM "assessment_items"
  JOIN "buckets_headlines"
    ON "assessment_items"."bucket_id" = "buckets_headlines"."bucket_id"
  WHERE "assessment_items"."assessment_id" = $1
    AND "assessment_items"."bucket_id" = 4
    AND "buckets_headlines"."assessment_id" = $1
  GROUP BY "buckets_headlines"."headline_text";
  `;
  pool.query(queryText, [req.params.id])
    .then((response) => {
      res.send(response.rows[0]);
    })
    .catch((error) => {
      console.error('Error completing presentation.router /bucket-4/data GET', error);
      res.sendStatus(500);
    });
});

/** ---------- GET BUCKET 5 ASSESSMENT DATA BY ID ---------- **/
router.get('/bucket-5/data/:id', (req, res) => {
  const queryText = `
  SELECT
    "buckets_headlines"."headline_text",
    SUM("assessment_items"."level_rating")
      FILTER (WHERE "assessment_items"."function_id" = 1)
      AS "team_rationalization_synergies_rating",
    SUM("assessment_items"."level_rating")
      FILTER (WHERE "assessment_items"."function_id" = 2)
      AS "selection_process_design_rating",
    SUM("assessment_items"."level_rating")
      FILTER (WHERE "assessment_items"."function_id" = 3)
      AS "staffing_execution_admin_rating"
  FROM "assessment_items"
  JOIN "buckets_headlines"
    ON "assessment_items"."bucket_id" = "buckets_headlines"."bucket_id"
  WHERE "assessment_items"."assessment_id" = $1
    AND "assessment_items"."bucket_id" = 5
    AND "buckets_headlines"."assessment_id" = $1
  GROUP BY "buckets_headlines"."headline_text";
  `;
  pool.query(queryText, [req.params.id])
    .then((response) => {
      res.send(response.rows[0]);
    })
    .catch((error) => {
      console.error('Error completing presentation.router /bucket-5/data GET', error);
      res.sendStatus(500);
    });
});

/** ---------- GET BUCKET 6 ASSESSMENT DATA BY ID ---------- **/
router.get('/bucket-6/data/:id', (req, res) => {
  const queryText = `
  SELECT
    "buckets_headlines"."headline_text",
    SUM("assessment_items"."level_rating")
      FILTER (WHERE "assessment_items"."function_id" = 1)
      AS "federal_state_local_requirements_rating",
    SUM("assessment_items"."level_rating")
      FILTER (WHERE "assessment_items"."function_id" = 2)
      AS "employee_handbook_rating",
    SUM("assessment_items"."level_rating")
      FILTER (WHERE "assessment_items"."function_id" = 3)
      AS "employee_data_rating",
    SUM("assessment_items"."level_rating")
      FILTER (WHERE "assessment_items"."function_id" = 4)
      AS "unemployment_rating",
    SUM("assessment_items"."level_rating")
      FILTER (WHERE "assessment_items"."function_id" = 5)
      AS "hr_legal_risk_management_rating",
    SUM("assessment_items"."level_rating")
      FILTER (WHERE "assessment_items"."function_id" = 6)
      AS "payroll_rating",
    SUM("assessment_items"."level_rating")
      FILTER (WHERE "assessment_items"."function_id" = 7)
      AS "ethics_corp_governance_rating",
    SUM("assessment_items"."level_rating")
      FILTER (WHERE "assessment_items"."function_id" = 8)
      AS "safety_workers_compensation_rating",
    SUM("assessment_items"."level_rating")
      FILTER (WHERE "assessment_items"."function_id" = 9)
      AS "labor_relations_rating",
    SUM("assessment_items"."level_rating")
      FILTER (WHERE "assessment_items"."function_id" = 10)
      AS "safety_policies_rating"
  FROM "assessment_items"
  JOIN "buckets_headlines"
    ON "assessment_items"."bucket_id" = "buckets_headlines"."bucket_id"
  WHERE "assessment_items"."assessment_id" = $1
    AND "assessment_items"."bucket_id" = 6
    AND "buckets_headlines"."assessment_id" = $1
  GROUP BY "buckets_headlines"."headline_text";
  `;
  pool.query(queryText, [req.params.id])
    .then((response) => {
      res.send(response.rows[0]);
    })
    .catch((error) => {
      console.error('Error completing presentation.router /bucket-6/data GET', error);
      res.sendStatus(500);
    });
});

/** ---------- GET BUCKET 1 ASSESSMENT TAGS BY ID ---------- **/
router.get('/bucket-1/tags/:id', (req, res) => {
  const queryText = `
  SELECT
    "tags"."id"
      AS "tag_id",
      "buckets"."name"
        AS "bucket_name",
      "subfunctions"."function_name",
      "subfunctions"."id"
      	AS "subfunction_id",
      "assessment_items"."level_rating",
      "assessment_items"."findings",
      "assessment_items"."impact",
      "assessment_items"."recommendations"
      FROM "assessment_items"
  JOIN "subfunctions"
    ON "subfunctions"."id" = "assessment_items"."subfunction_id"
  JOIN "buckets"
    ON "buckets"."id" = "assessment_items"."bucket_id"
  JOIN "tags_assessment_items"
    ON "tags_assessment_items"."assessment_item_id" = "assessment_items"."id"
  JOIN "tags"
    ON "tags_assessment_items"."tag_id" = "tags"."id"
  WHERE "tags_assessment_items"."tag_id" = 1
    AND "buckets"."id" = 1
    AND "assessment_items"."assessment_id" = $1
  OR "tags_assessment_items"."tag_id" = 2
    AND "buckets"."id" = 1
    AND "assessment_items"."assessment_id" = $1;
  `;
  pool.query(queryText, [req.params.id])
    .then((response) => {
      res.send(response.rows);
    })
    .catch((error) => {
      console.error('Error completing presentation.router /bucket-1/tags GET', error);
      res.sendStatus(500);
    });
});

/** ---------- GET BUCKET 2 ASSESSMENT TAGS BY ID ---------- **/
router.get('/bucket-2/tags/:id', (req, res) => {
  const queryText = `
  SELECT
    "tags"."id"
      AS "tag_id",
    "buckets"."name"
      AS "bucket_name",
    "subfunctions"."function_name",
    "subfunctions"."id"
      AS "subfunction_id",
    "assessment_items"."level_rating",
    "assessment_items"."findings",
    "assessment_items"."impact",
    "assessment_items"."recommendations"
    FROM "assessment_items"
  JOIN "subfunctions"
    ON "subfunctions"."id" = "assessment_items"."subfunction_id"
  JOIN "buckets"
    ON "buckets"."id" = "assessment_items"."bucket_id"
  JOIN "tags_assessment_items"
    ON "tags_assessment_items"."assessment_item_id" = "assessment_items"."id"
  JOIN "tags"
    ON "tags_assessment_items"."tag_id" = "tags"."id"
  WHERE "tags_assessment_items"."tag_id" = 1
    AND "buckets"."id" = 2
    AND "assessment_items"."assessment_id" = $1
  OR "tags_assessment_items"."tag_id" = 2
    AND "buckets"."id" = 2
    AND "assessment_items"."assessment_id" = $1;
  `;
  pool.query(queryText, [req.params.id])
    .then((response) => {
      res.send(response.rows);
    })
    .catch((error) => {
      console.error('Error completing presentation.router /bucket-2/tags GET', error);
      res.sendStatus(500);
    });
});

/** ---------- GET BUCKET 3 ASSESSMENT TAGS BY ID ---------- **/
router.get('/bucket-3/tags/:id', (req, res) => {
  const queryText = `
    SELECT
      "tags"."id"
        AS "tag_id",
      "buckets"."name"
        AS "bucket_name",
      "subfunctions"."function_name",
      "subfunctions"."id"
        AS "subfunction_id",
      "assessment_items"."level_rating",
      "assessment_items"."findings",
      "assessment_items"."impact",
      "assessment_items"."recommendations"
      FROM "assessment_items"
    JOIN "subfunctions"
      ON "subfunctions"."id" = "assessment_items"."subfunction_id"
    JOIN "buckets"
      ON "buckets"."id" = "assessment_items"."bucket_id"
    JOIN "tags_assessment_items"
      ON "tags_assessment_items"."assessment_item_id" = "assessment_items"."id"
    JOIN "tags"
      ON "tags_assessment_items"."tag_id" = "tags"."id"
    WHERE "tags_assessment_items"."tag_id" = 1
      AND "buckets"."id" = 3
      AND "assessment_items"."assessment_id" = $1
    OR "tags_assessment_items"."tag_id" = 2
      AND "buckets"."id" = 3
      AND "assessment_items"."assessment_id" = $1;
  `;
  pool.query(queryText, [req.params.id])
    .then((response) => {
      res.send(response.rows);
    })
    .catch((error) => {
      console.error('Error completing presentation.router /bucket-3/tags GET', error);
      res.sendStatus(500);
    });
});

/** ---------- GET BUCKET 4 ASSESSMENT TAGS BY ID ---------- **/
router.get('/bucket-4/tags/:id', (req, res) => {
  const queryText = `
  SELECT
    "tags"."id"
      AS "tag_id",
    "buckets"."name"
      AS "bucket_name",
    "subfunctions"."function_name",
    "subfunctions"."id"
      AS "subfunction_id",
    "assessment_items"."level_rating",
    "assessment_items"."findings",
    "assessment_items"."impact",
    "assessment_items"."recommendations"
    FROM "assessment_items"
  JOIN "subfunctions"
    ON "subfunctions"."id" = "assessment_items"."subfunction_id"
  JOIN "buckets"
    ON "buckets"."id" = "assessment_items"."bucket_id"
  JOIN "tags_assessment_items"
    ON "tags_assessment_items"."assessment_item_id" = "assessment_items"."id"
  JOIN "tags"
    ON "tags_assessment_items"."tag_id" = "tags"."id"
  WHERE "tags_assessment_items"."tag_id" = 1
    AND "buckets"."id" = 4
    AND "assessment_items"."assessment_id" = $1
  OR "tags_assessment_items"."tag_id" = 2
    AND "buckets"."id" = 4
    AND "assessment_items"."assessment_id" = $1;
  `;
  pool.query(queryText, [req.params.id])
    .then((response) => {
      res.send(response.rows);
    })
    .catch((error) => {
      console.error('Error completing presentation.router /bucket-4/tags GET', error);
      res.sendStatus(500);
    });
});

/** ---------- GET BUCKET 5 ASSESSMENT TAGS BY ID ---------- **/
router.get('/bucket-5/tags/:id', (req, res) => {
  const queryText = `
  SELECT
    "tags"."id"
      AS "tag_id",
    "buckets"."name"
      AS "bucket_name",
    "subfunctions"."function_name",
    "subfunctions"."id"
      AS "subfunction_id",
    "assessment_items"."level_rating",
    "assessment_items"."findings",
    "assessment_items"."impact",
    "assessment_items"."recommendations"
    FROM "assessment_items"
  JOIN "subfunctions"
    ON "subfunctions"."id" = "assessment_items"."subfunction_id"
  JOIN "buckets"
    ON "buckets"."id" = "assessment_items"."bucket_id"
  JOIN "tags_assessment_items"
    ON "tags_assessment_items"."assessment_item_id" = "assessment_items"."id"
  JOIN "tags"
    ON "tags_assessment_items"."tag_id" = "tags"."id"
  WHERE "tags_assessment_items"."tag_id" = 1
    AND "buckets"."id" = 5
    AND "assessment_items"."assessment_id" = $1
  OR "tags_assessment_items"."tag_id" = 2
    AND "buckets"."id" = 5
    AND "assessment_items"."assessment_id" = $1;
  `;
  pool.query(queryText, [req.params.id])
    .then((response) => {
      res.send(response.rows);
    })
    .catch((error) => {
      console.error('Error completing presentation.router /bucket-5/tags GET', error);
      res.sendStatus(500);
    });
});

/** ---------- GET BUCKET 6 ASSESSMENT TAGS BY ID ---------- **/
router.get('/bucket-6/tags/:id', (req, res) => {
  const queryText = `
  SELECT
    "tags"."id"
      AS "tag_id",
    "buckets"."name"
      AS "bucket_name",
    "subfunctions"."function_name",
    "subfunctions"."id"
      AS "subfunction_id",
    "assessment_items"."level_rating",
    "assessment_items"."findings",
    "assessment_items"."impact",
    "assessment_items"."recommendations"
    FROM "assessment_items"
  JOIN "subfunctions"
    ON "subfunctions"."id" = "assessment_items"."subfunction_id"
  JOIN "buckets"
    ON "buckets"."id" = "assessment_items"."bucket_id"
  JOIN "tags_assessment_items"
    ON "tags_assessment_items"."assessment_item_id" = "assessment_items"."id"
  JOIN "tags"
    ON "tags_assessment_items"."tag_id" = "tags"."id"
  WHERE "tags_assessment_items"."tag_id" = 1
    AND "buckets"."id" = 6
    AND "assessment_items"."assessment_id" = $1
  OR "tags_assessment_items"."tag_id" = 2
    AND "buckets"."id" = 6
    AND "assessment_items"."assessment_id" = $1;
  `;
  pool.query(queryText, [req.params.id])
    .then((response) => {
      res.send(response.rows);
    })
    .catch((error) => {
      console.error('Error completing presentation.router /bucket-6/tags GET', error);
      res.sendStatus(500);
    });

  // Is this supposed to be nested...?  
  /** ---------- GET ASSESSMENT FINAL INPUTS BY ID ---------- **/
  router.get('/operator-inputs/:id', (req, res) => {
    const queryText = `
    SELECT
      "client_assessments"."next_steps",
      "client_assessments"."future_state",
      "client"."company_name"
      FROM "client_assessments"
    JOIN "client"
      ON "client_assessments"."client_id" = "client"."id"
    WHERE "client_assessments"."id" = $1;
      `;
    pool.query(queryText, [req.params.id])
      .then((response) => {
        res.send(response.rows[0]);
      })
      .catch((error) => {
        console.error('Error completing presentation.router /operator-inputs GET', error);
        res.sendStatus(500);
      });
  });
});

  module.exports = router;