import { helper } from "@ember/component/helper";
import { lt } from "ember-fill-up/definitions";

export function fillUpLt([value], { label }) {
  return lt(value, label);
}

export default helper(fillUpLt);
