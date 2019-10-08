import { helper } from "@ember/component/helper";
import { eq } from "ember-fill-up/definitions";

export function fillUpEq([value], { label }) {
  return eq(value, label);
}

export default helper(fillUpEq);
