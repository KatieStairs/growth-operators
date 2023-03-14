import { React, useEffect } from 'react';
import Reveal from 'reveal.js/dist/reveal.esm.js';
import './Presentation.css';

function PresentationGenerator () {

  useEffect(() => {
    let deck = new Reveal({
   })
   deck.initialize();
  }, []);

  return (
    <>
      <div className="reveal">
        <div className="slides">
          <section>
          <h2>nextLEVEL<small>&reg;</small> Assessment</h2>
          <h4>Company Name</h4>
          </section>

          <section>
          Agenda (static)
          </section>

          <section>
          <h2>Objectives of this Assessment:</h2>
          <p>1. Assess your current HR practices compared to HR industry best practices</p>
          <p>2. Develop and share actionable recommendations</p>
          <p>3. Prioritize potential work to address top areas of concern</p>
          <p>4. Provide insights into potential HR capabilities for the future</p>
          </section>

          <section>
          Methodology 'Fun Facts' (stretch)
          </section>
          
          <section>
          <h3>Bucket Definitions</h3>
          <small><p><b>Organizational Effectiveness</b> is the extent to which the structure, roles, responsibilities and workflows within the organization correspond to the operations and central mission of the organization.  Also encompasses the level of process documentation that is present.</p>
          <br/>
          <p><b>Employee Engagement</b> assesses the extent to which the organization supports employee feedback mechanisms, employee involvement, recognition, wellness initiatives and other aspects of a human-centered community.</p>
          <br/>
          <p><b>Training & Development</b> considers the organization’s execution of programs and processes related to training, leadership development, career mobility and knowledge management.</p></small>
          </section>

          <section>
          <h3>Bucket Definitions</h3>
          <small><p><b>Benefits & Compensation</b> addresses the use of compensation tools, benefits offerings and the extent to which these are administered in compliance with local regulations and other requirements.</p>
          <br/>
          <p><b>Recruiting & Staffing</b> assesses the effectiveness of the recruitment and onboarding processes for filling immediate job openings as well as anticipated skill gaps.</p>
          <br/>
          <p><b>HRIS, Payroll & Compliance</b> uncovers potential areas of concern related to critical HR processes like payroll, systems audits, employment law, safety and labor relations.</p></small>
          </section>

          <section>
          <h1>Highlights of Findings</h1>
          </section>

          <section>
          Top Strengths (subf. with Strength tag)
          </section>

          <section>
          Top Opportunities (subf. with Opportunity tag)
          </section>

          <section>
          <h1>Findings by Topic</h1>
          </section>

          <section>
          Executive Summary (Avg of function scores, grouped by bucket for radar chart)
          </section>

          <section>
          Org Eff Slide (Subf. with Quick Win/Fire Drill tags)
          </section>

          <section>
          Emp Eng Slide (Subf. with Quick Win/Fire Drill tags)
          </section>

          <section>
          Train/Dev Slide (Subf. with Quick Win/Fire Drill tags)
          </section>

          <section>
          Ben/Comp Slide (Subf. with Quick Win/Fire Drill tags)
          </section>

          <section>
          Recr/Staff Slide (Subf. with Quick Win/Fire Drill tags)
          </section>

          <section>
          HRIS/Pay/Compl Slide (Subf. with Quick Win/Fire Drill tags)
          </section>

          <section>
          Top Priority Focus Areas/Recommendations (???)
          </section>

          <section>
          The Future Is Bright (Operator input fields)
          </section>

          <section>
          Next Steps (Operator input fields)
          </section>

          <section>
          <h1>Thank you</h1>
          </section>
        </div>
      </div>
    </>
  );
};



export default PresentationGenerator;