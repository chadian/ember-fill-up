import { helper } from '@ember/component/helper';
import { gte } from 'ember-fill-up/definitions';

export function fillUpGte([value]) {
  return gte(value);
}

export default helper(fillUpGte);
