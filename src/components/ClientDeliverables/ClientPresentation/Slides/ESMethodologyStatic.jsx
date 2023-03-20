import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import SlideHeader from './SlideHeader';

function ESMethodologyStatic () {
  const title = 'Executive Summary';
  return (
    <>
      <section>
      <SlideHeader title={title} />
        <div>
          <p className="page-sub-heading">
            <strong>Growth Operators</strong> Assessment Methodology
          </p>
          <p className="static-methodology-content">
            {/* Growth Operators was engaged by the company to perform a review of six key functional areas.<br/><br/><br/> */}
            <p className="content-p"><strong>Work Performed</strong><br/><br/>
            Within each of the six areas outlined previously, Growth Operators conducted interviews with key members of the management team as well as reviewing
            certain key information provided. Critical to the process, is gaining an understanding of the company's policy and procedures in each of the
            functional areas. After reviewing the information obtained during these interviews and in reviewing information provided by management, Growth
            Operators performed an assessment for each of the functional areas outlined previously.
            </p>
            <p className="content-p"><strong>Management Cooperation</strong><br/>
            It should be noted that management's cooperation throughout the process is a critical component in forming a proper assessment. Transparency and
            full disclosure are essential to this process. It was our impression that management was fully cooperative throughout this engagement.
            </p>
          </p>
                </div>
      </section>

    </>
  )
};

export default ESMethodologyStatic;