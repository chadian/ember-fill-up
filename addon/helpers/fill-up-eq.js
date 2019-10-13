import { helper } from "@ember/component/helper";
import { eq } from "ember-fill-up/definitions";

export function fillUpEq([value]) {
  return eq(value);
}

export default helper(fillUpEq);
