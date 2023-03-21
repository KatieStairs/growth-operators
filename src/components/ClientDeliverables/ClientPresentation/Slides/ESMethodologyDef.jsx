import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import SlideHeader from './SlideHeader';

function ESMethodologyDef () {
  const title = 'Executive Summary';
  return (
    <>
      <section>
      <SlideHeader title={title} />
        <div>
          <p className="page-sub-heading">
            <strong>Assessment Methodology:</strong> Key Functional Areas
          </p>
          <p className="bucket-definitions">
            {/* Growth Operators was engaged by the company to perform a review of six key functional areas.<br/><br/> */}
            <ol>
              <li>
              <strong>Organizational Effectiveness</strong> is the extent to which the structure, roles, responsibilities and workflows within the organization correspond to the operations and central mission of the organization.  Also encompasses the level of process documentation that is present.
              </li><br/>
              <li>
              <strong>Employee Engagement</strong> assesses the extent to which the organization supports employee feedback mechanisms, employee involvement, recognition, wellness initiatives and other aspects of a human-centered community.
                </li><br/>
                <li>
                <strong>Training & Development</strong> considers the organization’s execution of programs and processes related to training, leadership development, career mobility and knowledge management.
                </li><br/>
                <li>
                <strong>Benefits & Compensation</strong> addresses the use of compensation tools, benefits offerings and the extent to which these are administered in compliance with local regulations and other requirements.
                </li><br/>
                <li>
                <strong>Recruiting & Staffing</strong> assesses the effectiveness of the recruitment and onboarding processes for filling immediate job openings as well as anticipated skill gaps.
                </li><br/>
                <li>
                <strong>HRIS, Payroll & Compliance</strong> uncovers potential areas of concern related to critical HR processes like payroll, systems audits, employment law, safety and labor relations.
                </li>
            </ol>
          </p>
                </div>
      </section>

    </>
  )
};

export default ESMethodologyDef;