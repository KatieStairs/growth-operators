import { React, useEffect } from 'react';
import { useSelector } from 'react-redux';
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
  const presentationData = useSelector((store) => store.presentation);

  useEffect(() => {
    let deck = new Reveal({
    })
    deck.initialize();
  }, []);

  return (
    <div className="reveal">
      <div className="slides">
        <Intro />
        <Agenda />
        <Objectives />
        <BucketDefinitions/>
        <ExecutiveSummary />
        <HighlightsOfFindings />
        <FindingsByBucket />
        <FocusAreas />
        <NextSteps />
        <ThankYou />
      </div>
    </div>
  );
};



export default PresentationGenerator;