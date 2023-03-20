import { useSelector } from 'react-redux';
import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';

function Intro () {
  const companyName = useSelector(store => store.presentation.operatorInputs.company_name)
  return (
    <section>
      <h2>nextLEVEL<small>&reg;</small> Assessment</h2>
      <h4>{companyName}</h4>
    </section>
  )
};

export default Intro;