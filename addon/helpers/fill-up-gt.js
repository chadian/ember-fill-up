import { helper } from '@ember/component/helper';
import { gt } from 'ember-fill-up/definitions';

export function fillUpGt([value], { dimension } = {}) {
  return gt(value, { dimension });
}

export default helper(fillUpGt);
