import { helper } from '@ember/component/helper';
import { lt } from 'ember-fill-up/definitions';

export function fillUpLt([value], { dimension } = {}) {
  return lt(value, { dimension });
}

export default helper(fillUpLt);
