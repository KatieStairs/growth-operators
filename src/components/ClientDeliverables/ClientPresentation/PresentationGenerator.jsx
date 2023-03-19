import { React, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import Reveal from 'reveal.js/dist/reveal.esm.js';

import './Presentation.css';

import Intro from './Slides/Intro';
import Agenda from './Slides/Agenda';
import Objectives from './Slides/Objectives';
import BucketDefinitions from './Slides/BucketDefinitions';
import HighlightsOfFindings from './Slides/HighlightsOfFindings';
import ExecutiveSummary from "./Slides/ExecutiveSummary";
import FindingsByBucket from "./Slides/FindingsByBucket";
import FocusAreas from "./Slides/FocusAreas";
import NextSteps from "./Slides/NextSteps";
import ThankYou from "./Slides/ThankYou";

function PresentationGenerator () {
const dispatch = useDispatch();
const params = useParams();

  const data = useSelector((store) => store.presentation);

  useEffect(() => {
    dispatch({
      type: 'SAGA/GET_PRESENTATION_DATA',
      payload: params.assessment_id
    });
    let deck = new Reveal({
    })
    deck.initialize();
  }, []);


  return (
    <div className="reveal">
      <div className="slides">
        <Intro
        companyName = {data.operatorInputs.company_name}
        />
        <Agenda />
        <Objectives />
        <BucketDefinitions />
        <ExecutiveSummary
        summaryRatings = {data.summaryRatings}
        />
        <HighlightsOfFindings
        strengths = {data.strengthTags}
        opportunities = {data.opportunityTags}
        />
        <FindingsByBucket
        bucketData = {data.bucketData}
        bucketTags = {data.bucketTags}
        />
        <FocusAreas
        opportunities = {data.opportunityTags}
        />
        <NextSteps
        operatorInputs = {data.operatorInputs}
        />
        <ThankYou />
      </div>
    </div>
  );
};



export default PresentationGenerator;