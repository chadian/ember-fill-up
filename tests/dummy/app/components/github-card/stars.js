import Component from '@ember/component';
import { computed } from '@ember/object';
import layout from '../../templates/components/github-card/stars';

export default Component.extend({
  layout,

  tagName: '',

  stars: 0,

  formattedStars: computed('stars', function() {
    const stars = this.stars;

    if (stars > 1000) {
      return Math.round((stars / 1000) * 100) / 100 + 'k';
    }

    return stars;
  })
});
