import Component from '@ember/component';
import faker from 'faker';
import layout from '../templates/components/github-card';

const repoUsers = [
  'ambitious-fox',
  'sneaky-snake',
  'excited-kitty',
  'smart-elephant',
  'curious-cat',
  'pondering-puppy',
  'diabolical-donkey',
  'mischievous-monkey'
];

const repoNames = [
  'million-dollar-idea',
  'fantastic-data',
  'beautiful-api',
  'sloppy-script',
  'company-secrets',
  'first-repo',
  'sample-app',
  'pretty-prototype'
];

const repoDescriptions = [
  'This project will probably be the next big thing',
  'BETA! Try at your own risk',
  'Deprecated! Please check the readme for alternatives',
  'Stable & ready for production use',
  'will fill this out one day',
  'wip',
  'The solution you have been waiting for',
  'Built by the City of Copenhagen'
];

const repoLanguages = ['javascript', 'elixir', 'ruby', 'rust', 'go'];

export default Component.extend({
  layout,

  tagName: '',

  repo: null,

  init() {
    this._super(...arguments);

    this.repo = {
      name: faker.random.arrayElement(repoNames),
      user: faker.random.arrayElement(repoUsers),
      description: faker.random.arrayElement(repoDescriptions),
      commits: faker.random.number({ min: 2, max: 1500, precision: 1 }),
      forks: faker.random.number({ min: 2, max: 10, precision: 1 }),
      stars: faker.random.number({ min: 2, max: 30000, precision: 1 }),
      language: faker.random.arrayElement(repoLanguages),
      updatedDate: faker.date.past()
    };
  }
});
