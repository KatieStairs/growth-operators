import React, { useEffect } from 'react';
import {
  HashRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

import Nav from '../Nav/Nav';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import AboutPage from '../AboutPage/AboutPage';
import ClientOverview from '../ClientOverview/ClientOverview';
import PresentationGenerator from '../ClientDeliverables/ClientPresentation/PresentationGenerator';
import ClientReport from '../ClientDeliverables/ClientReport/ClientReport';
import Dashboard from '../Dashboard/Dashboard';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import AllClients from '../AllClients/AllClients';
import AssessmentForm from '../Assessment/AssessmentForm/AssessmentForm';
import AssessmentEdit from '../Assessment/AssessmentEdit/AssessmentEdit';
import AssessmentAnswers from '../Assessment/AssessmentAnswers/AssessmentAnswers';
import AssessmentReview from '../Assessment/AssessmentReview/AssessmentReview';


import 'bootstrap';
import './App.css';

function App() {
  const dispatch = useDispatch();

  const user = useSelector(store => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
    dispatch({ type: 'SAGA/GET_ALL_CLIENTS' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        {/* <Nav /> */}
        <Switch>
          {/* Visiting localhost:3000 will redirect to localhost:3000/home */}
          <Redirect exact from="/" to="/login" />

          {/* Visiting localhost:3000/about will show the about page. */}
          <Route
            // shows AboutPage at all times (logged in or not)
            exact
            path="/about"
          >
            {/* <AboutPage /> */}
          </Route>

          {/* For protected routes, the view could show one of several things on the same route.
            Visiting localhost:3000/user will show the UserPage if the user is logged in.
            If the user is not logged in, the ProtectedRoute will show the LoginPage (component).
            Even though it seems like they are different pages, the user is always on localhost:3000/user */}

            <ProtectedRoute
          exact
          path="/dashboard"
          >
            <Dashboard />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows ClientReport else shows LoginPage
            exact
            path="/all-clients"
          >
            <AllClients />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows ClientOverview else shows LoginPage
            exact
            path="/client-overview/:client-id"
          >
            <ClientOverview />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows ClientPresentation else shows LoginPage
            exact
            path="/presentation/"
          >
            <PresentationGenerator />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows ClientReport else shows LoginPage
            exact
            path="/client-report"
          >
            {/* <ClientReport /> */}
          </ProtectedRoute>

          <Route
            exact
            path="/login"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect to the /user page
              <Redirect to="/dashboard" />
              :
              // Otherwise, show the login page
              <LoginPage />
            }
          </Route>

          {/* <Route
            exact
            path="/registration"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/dashboard" />
              :
              // Otherwise, show the registration page
              <RegisterPage />
            }
          </Route> */}

          {/* <Route
            exact
            path="/dashboard"
          >
            {user.id ?
              // If the user is already logged in, 
              // redirect them to the /user page
              <Redirect to="/dashboard" />
              :
              // Otherwise, show the Landing page
              <Dashboard />
            }
          </Route> */}

          <ProtectedRoute
            exact
            path="/dashboard"
          >
            <Dashboard />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows AllClients else shows LoginPage
            exact
            path="/all-clients"
          >
             <AllClients /> 
           </ProtectedRoute> 

          <ProtectedRoute
            // logged in shows the Assessment Form page else shows LoginPage
            exact
            path="/assessment-form/:bucket_id/:function_id"
          >
            <AssessmentForm />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows the Assessment Edit page else shows LoginPage
            exact
            path="/assessment-edit/:id"
          >
            <AssessmentEdit />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows the Assessment Answers page else shows LoginPage
            exact
            path="/assessment-answers"
          >
            <AssessmentAnswers />
          </ProtectedRoute>

          <ProtectedRoute
            // logged in shows the Assessment Review page else shows LoginPage
            exact
            path="/assessment-review"
          >
            {/* <AssessmentReview /> */}
          </ProtectedRoute>

          <ProtectedRoute
          exact
          path="/dashboard"
          >
            <Dashboard />
          </ProtectedRoute>

          {/* If none of the other routes matched, we will show a 404. */}
          {/* <Route>
            <h1>404</h1>
          </Route> */}
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
