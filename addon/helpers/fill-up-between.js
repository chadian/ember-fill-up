import { helper } from '@ember/component/helper';
import { between } from 'ember-fill-up/definitions';

export function fillUpBetween([leftBound, rightBound], { dimension } = {}) {
  return between(leftBound, rightBound, { dimension });
}

export default helper(fillUpBetween);
