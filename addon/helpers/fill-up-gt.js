import { helper } from '@ember/component/helper';
import { gt } from 'ember-fill-up/definitions';

export function fillUpGt([value]) {
  return gt(value);
}

export default helper(fillUpGt);
