import Component from '@ember/component';
import { computed } from '@ember/object';
import faker from 'faker';
import { gt, between } from 'ember-fill-up/definitions';
import layout from '../templates/components/article';

const blogTitles = [
  'Hello World!',
  'The Sky is Falling!',
  'Person wins a million dollars!',
  'Javascript is dead!',
  'Javascript is alive!!',
  'Ember Strikes Back!',
  'Javascript community unites, embraces tradeoffs',
  'Copenhagen — World\'s Most Beauitful City',
  'EmberFest 2019, a conference to remember!'
];

export default Component.extend({
  layout,

  tagName: '',

  title: '',
  author: '',
  date: '',
  post: '',

  formattedDate: computed('date', function() {
    return this.date.toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }),

  init() {
    this._super(...arguments);

    this.set('breakpoints', [
      between(550, 700, "medium"),
      gt(700, "large"),
    ]);

    this.set("title", faker.random.arrayElement(blogTitles));
    this.set("date", faker.date.past());
    this.set('author', faker.name.findName());
    this.set('post', faker.lorem.paragraphs(2));
  }
});
