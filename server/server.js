const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const clientRouter = require('./routes/client.router');
const assessmentStructureRouter = require('./routes/assessment.structure.router');
const assessmentItemRouter = require('./routes/assessment.item.router');
const clientAssessmentRouter = require('./routes/client.assessment.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */

app.use('/api/user', userRouter);
app.use('/api/client', clientRouter);
app.use('/structure', assessmentStructureRouter);
app.use('/assessment', assessmentItemRouter);
app.use('/assessment-item', assessmentItemRouter);
app.use('/client-assessment', clientAssessmentRouter);



// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
