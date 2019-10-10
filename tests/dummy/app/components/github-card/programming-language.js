import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../../templates/components/github-card/programming-language';

export default Component.extend({
  layout,

  tagName: '',

  language: '',

  languageColor: computed('language', function() {
    const languageColorMap = {
      javascript: 'yellow',
      elixir: 'purple',
      ruby: 'red',
      rust: 'darkred',
      go: 'teal'
    };

    return languageColorMap[this.language] || 'silver';
  }),

  languageLabel: computed('language', function() {
    let language = this.language.toUpperCase();

    if (language === "JAVASCRIPT") {
      return "JS";
    }

    return language;
  })
});
