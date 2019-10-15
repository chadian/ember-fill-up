import { helper } from '@ember/component/helper';
import { gte } from 'ember-fill-up/definitions';

export function fillUpGte([value], { dimension } = {}) {
  return gte(value, { dimension });
}

export default helper(fillUpGte);
