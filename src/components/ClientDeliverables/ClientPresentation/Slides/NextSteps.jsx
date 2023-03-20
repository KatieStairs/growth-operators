import { useSelector } from 'react-redux';
import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';

function NextSteps () {
  const operatorInputs = useSelector(store => store.presentation.operatorInputs)
  return (
    <>
      <section>
        {operatorInputs.next_steps}
      </section>
      <section>
        {operatorInputs.future_state}
      </section>
    </>
  )
};

export default NextSteps;