import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import SlideHeader from './SlideHeader';

function ThankYou () {
  return (
    <section>
      <SlideHeader title={'Thank you!'} />
    </section>
  )
};

export default ThankYou;