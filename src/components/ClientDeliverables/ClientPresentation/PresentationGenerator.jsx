import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import '/node_modules/reveal.js/dist/reveal.css';
import '/node_modules/reveal.js/dist/theme/moon.css';

function PresentationGenerator () {
  <div className="reveal">
    <div className="slides">
      <section>Intro Slide (company name)</section>
      <section>Agenda (static)</section>
      <section>Objectives of this Assessment (static)</section>
      <section>Methodology 'Fun Facts' (???)</section>
      <section>Bucket Definitions(static)</section>
      <section>Highlights of Findings Title Page (static)</section>
      <section>Top Strengths (subf. with Strength tag)</section>
      <section>Top Opportunities (subf. with Opportunity tag)</section>
      <section>Findings by Topic Title Page (static)</section>
      <section>Executive Summary (Avg of function scores, grouped by bucket for radar chart)</section>
      <section>Org Eff Slide (Subf. with Quick Win/Fire Drill tags)</section>
      <section>Emp Eng Slide (Subf. with Quick Win/Fire Drill tags)</section>
      <section>Train/Dev Slide (Subf. with Quick Win/Fire Drill tags)</section>
      <section>Ben/Comp Slide (Subf. with Quick Win/Fire Drill tags)</section>
      <section>Recr/Staff Slide (Subf. with Quick Win/Fire Drill tags)</section>
      <section>HRIS/Pay/Compl Slide (Subf. with Quick Win/Fire Drill tags)</section>
      <section>Top Priority Focus Areas/Recommendations (???)</section>
      <section>The Future Is Bright (Operator input fields)</section>
      <section>Next Steps (Operator input fields)</section>
      <section>Thank You (static)</section>
      <section></section>
    </div>
  </div>
}

let deck = new Reveal({
   plugins: [ Markdown ]
})
deck.initialize();

export default PresentationGenerator;