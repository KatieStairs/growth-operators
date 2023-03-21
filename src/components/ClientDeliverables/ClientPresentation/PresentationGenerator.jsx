import { React, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from "react-router-dom";
import Reveal from 'reveal.js/dist/reveal.esm.js';

import './Presentation.css';
import Intro from './Slides/Intro';
import Agenda from './Slides/Agenda';
import Objectives from './Slides/Objectives';
import ESMethodologyDef from './Slides/ESMethodologyDef';
import ESMethodologyStatic from './Slides/ESMethodologyStatic';
import HighlightsOfFindings from './Slides/HighlightsOfFindings';
import ExecutiveSummary from "./Slides/ExecutiveSummary";
import OrganizationalEffectiveness from "./Slides/BucketSlides/OrganizationalEffectiveness";
import EmployeeEngagement from "./Slides/BucketSlides/EmployeeEngagement";
import TrainingDevelopment from "./Slides/BucketSlides/TrainingDevelopment";
import BenefitsCompensation from "./Slides/BucketSlides/BenefitsCompensation";
import RecruitingStaffing from "./Slides/BucketSlides/RecruitingStaffing";
import HRISPayrollCompliance from "./Slides/BucketSlides/HRISPayrollCompliance";
import FocusAreas from "./Slides/FocusAreas";
import NextSteps from "./Slides/NextSteps";
import ThankYou from "./Slides/ThankYou";

function PresentationGenerator () {
const dispatch = useDispatch();
const params = useParams();

  useEffect(() => {
    dispatch({
      type: 'SAGA/GET_PRESENTATION_DATA',
      payload: params.assessment_id
    });
    let deck = new Reveal({
      disableLayout: true,
    })
    deck.initialize();
  }, []);


  return (
    <div className="reveal">
      <div className="slides">
        <Intro />
        <Agenda />
        <Objectives />
        <ESMethodologyDef />
        <ESMethodologyStatic />
        <ExecutiveSummary />
        <HighlightsOfFindings />
        {/* <OrganizationalEffectiveness /> */}
        {/* <EmployeeEngagement /> */}
        {/* <TrainingDevelopment /> */}
        {/* <BenefitsCompensation /> */}
        {/* <RecruitingStaffing /> */}
        {/* <HRISPayrollCompliance /> */}
        <FocusAreas />
        <NextSteps />
        <ThankYou />
      </div>
    </div>
  );
};



export default PresentationGenerator;