const express = require('express');

const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const pool = require('../modules/pool');
const router = express.Router();

router.post('/', (req, res) => {
    const newCompany = req.body;
    console.log('in client assessment router, newCompany:', newCompany);
    const queryText = `
    INSERT INTO "client_assessments"
    ("client_id", "engagement_date", "status")
    VALUES
    ('7', '03-10-2023' 'Edit in Progress');
    
      `;
    const queryValues = [
      newCompany.companyName,
      newCompany.contactPerson,
      newCompany.emailInput,
      newCompany.date,
      newCompany.userId
    ];
    pool.query(queryText, queryValues)
      .then(() => { res.sendStatus(201); })
      .catch((err) => {
        console.log('Error completing POST newCompany query', err);
        res.sendStatus(500);
      });
  });

  module.exports = router;