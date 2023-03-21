import { useSelector } from 'react-redux';
import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import SlideHeader from './SlideHeader';

function NextSteps () {
  const operatorInputs = useSelector(store => store.presentation.operatorInputs)
  return (
    <>
      <section>
        <SlideHeader title={'Next Steps'} />
        {operatorInputs.next_steps}
      </section>
      <section>
        <SlideHeader title={'The Future is Bright!'} />
        {operatorInputs.future_state}
      </section>
    </>
  )
};

export default NextSteps;