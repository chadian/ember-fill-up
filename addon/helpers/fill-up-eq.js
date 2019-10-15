import { helper } from '@ember/component/helper';
import { eq } from 'ember-fill-up/definitions';

export function fillUpEq([value], { dimension } = {}) {
  return eq(value, { dimension });
}

export default helper(fillUpEq);
