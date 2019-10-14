import { helper } from '@ember/component/helper';
import { lte } from 'ember-fill-up/definitions';

export function fillUpLte([value]) {
  return lte(value);
}

export default helper(fillUpLte);
