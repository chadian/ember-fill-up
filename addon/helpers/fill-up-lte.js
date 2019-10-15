import { helper } from '@ember/component/helper';
import { lte } from 'ember-fill-up/definitions';

export function fillUpLte([value], { dimension } = {}) {
  return lte(value, { dimension });
}

export default helper(fillUpLte);
