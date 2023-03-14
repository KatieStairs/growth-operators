import Reveal from 'reveal.js';
import Markdown from 'reveal.js/plugin/markdown/markdown.esm.js';
import '/node_modules/reveal.js/dist/reveal.css';
import '/node_modules/reveal.js/dist/theme/moon.css';

function IntroSlide () {
  
}

let deck = new Reveal({
   plugins: [ Markdown ]
})
deck.initialize();