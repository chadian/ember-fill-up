import { helper } from '@ember/component/helper';
import { gt } from 'ember-fill-up/definitions';

export function fillUpGt([value], { label }) {
  return gt(value, label);
}

export default helper(fillUpGt);