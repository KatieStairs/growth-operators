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
          <Redirect exact from="/" to="/login" />

          <Route exact path="/about">
            <AboutPage /> {/* shows AboutPage at all times (logged in or not) */}
          </Route>

          {/* If the user is not logged in, the ProtectedRoute will show the LoginPage (component). */}

          <ProtectedRoute exact path="/all-clients">
            <AllClients />
          </ProtectedRoute>

          <ProtectedRoute exact path="/assessment-answers/:id">
            <AssessmentAnswers />
          </ProtectedRoute>

          <ProtectedRoute exact path="/assessment-edit/:id">
            <AssessmentEdit />
          </ProtectedRoute>

          <ProtectedRoute exact path="/assessment-form/:assessment_id/:bucket_id/:function_id">
            <AssessmentForm />
          </ProtectedRoute>

          <ProtectedRoute exact path="/assessment-review/:assessment_id/:bucket_id">
            {/* <AssessmentReview /> */}
          </ProtectedRoute>

          <ProtectedRoute exact path="/client-overview/:client_id" >
            <ClientOverview />
          </ProtectedRoute>

          <ProtectedRoute exact path="/client-report">
            {/* <ClientReport /> */}
          </ProtectedRoute>

          <ProtectedRoute exact path="/dashboard" >
            <Dashboard />
          </ProtectedRoute>

          <ProtectedRoute exact path="/presentation/">
            <PresentationGenerator />
          </ProtectedRoute>

          <Route exact path="/login" >
            {user.id 
            ? <Redirect to="/dashboard" /> // If the user is already logged in, redirect to Dashboard
            : <LoginPage /> // Otherwise, show the login page
            }
          </Route>

          <Route exact path="/registration">
            {user.id 
            ? <Redirect to="/dashboard" /> // If the user is already logged in, redirect to Dashboard
            : <RegisterPage /> // Otherwise, show the registration page
            }
          </Route>

          {/* If none of the other routes matched, we will show a 404. */}
          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
