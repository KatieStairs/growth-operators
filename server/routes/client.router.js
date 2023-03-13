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
// added rejectUnauthenticated, -adam
router.get('/all', rejectUnauthenticated, (req, res) => {
  const sqlQuery = `
  SELECT
    "client"."id",
    "client"."company_name",
    "client"."contact_name",
    "client"."contact_email",
    MAX("client_assessments"."engagement_date") as "engagement_date",
    STRING_AGG(DISTINCT "user"."name", ', ') as "operators"
	FROM "client"
	JOIN "user_client" ON "client"."id" = "user_client"."client_id"
	JOIN "user" ON "user_client"."user_id" = "user"."id"
	JOIN "client_assessments" ON "client"."id" = "client_assessments"."client_id"
	GROUP BY
		"client"."id",
		"client"."company_name",
		"client"."contact_name",
		"client"."contact_email"
	ORDER BY "client"."company_name" ASC;
  `;
  pool.query(sqlQuery)
  .then((response) => {
    res.send(response.rows);
  })
  .catch((error) => {
    console.error('Error in GET /client/all: ', error);
    res.sendStatus(500);
  })
});
// POST to create new client AND new client assessment AND user_client!  Yeah boi!
router.post('/', rejectUnauthenticated, (req, res) => {
  console.log(req);
  const userId = req.user.id;
  const newCompany = req.body;
  // console.log('in client router, newCompany:', newCompany);
  // console.log('in client router, userID:', userId);
  const queryText = `
  INSERT INTO "client" 
  ("company_name", "contact_name", "contact_email")
  VALUES 
  ($1, $2, $3)
  RETURNING id;
    `;
  const queryValues = [
    newCompany.companyName,
    newCompany.contactPerson,
    newCompany.emailInput
  ];
  pool.query(queryText, queryValues)
    .then((result) => { 
      // We need the id of the newly created company/client
      // console.log('client post id:', result.rows[0].id);
      const newCompanyId = result.rows[0].id;

      const insertClientAssessment = `
        INSERT INTO "client_assessments"
        ("client_id", "engagement_date", "status")
        VALUES
        ( $1, $2, $3)
        RETURNING id;
        `;
      pool.query(insertClientAssessment,[newCompanyId, newCompany.date, 'Edit in Progress'])
      .then((result) => {
        const newClientAssessments = result.rows[0].id;
        // console.log('client_assessments id:', newClientAssessments);
        const insertUserClient = `
          INSERT INTO "user_client" 
          ("user_id", "client_id")
          VALUES 
          ($1, $2);
          `
      pool.query(insertUserClient, [userId, newCompanyId])
      }).then((result, newClientAssessments) =>{
        const insertClientAssessment = `
      INSERT INTO "assessment_items"
      ("assessment_id", "bucket_id", "function_id", "subfunction_id", "level_rating", "findings", "impact", "recommendations", "phase")
      VALUES
      ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        `
        console.log('newClientAssessments:', newClientAssessments);
        const assessmentValues = [
          newClientAssessments,
          '',
          '',
          '',
          '',
          '',
          '',
          '',
          ''
        ];
        pool.query(insertClientAssessment, assessmentValues)
      }).then((response) => {
        res.sendStatus(201);
      })
     }).catch((err) => {
      console.log('Error completing POST newCompany query', err);
      res.sendStatus(500);
    });
});
// res.sendStatus(201);
// added rejectUnauthenticated, -adam
router.put('/:id', rejectUnauthenticated, (req, res) => {
  const client = req.body;
  const sqlQuery = `
  UPDATE "client"
    SET
    "company_name" = $1,
    "contact_name" = $2,
    "contact_email"= $3
    WHERE "id" = $4;
  `;
  const sqlValues = [client.company_name, client.contact_name, client.contact_email, client.id];
  pool.query(sqlQuery, sqlValues)
  .then((response) => {
    res.sendStatus(201);
  })
  .catch((error) => {
    console.error('Error in PUT /client/:id:', error);
  });
});
// added rejectUnauthenticated, -adam
router.delete('/:id', rejectUnauthenticated, (req, res) => {
  const sqlQuery = `
  DELETE FROM "client"
    WHERE "id" = $1
  `;
  pool.query(sqlQuery, [req.params.id])
  .then((response) => {
    res.sendStatus(205);
  })
  .catch((error) => {
    console.error('Error in DELETE /client/:id:', error);
  });
});

module.exports = router;