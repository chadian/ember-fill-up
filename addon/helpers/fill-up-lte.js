import { helper } from "@ember/component/helper";
import { lte } from "ember-fill-up/definitions";

export function fillUpLte([value], { label }) {
  return lte(value, label);
}

export default helper(fillUpLte);
