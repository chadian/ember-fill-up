import { helper } from '@ember/component/helper';
import { lt } from 'ember-fill-up/definitions';

export function fillUpLt([value]) {
  return lt(value);
}

export default helper(fillUpLt);
