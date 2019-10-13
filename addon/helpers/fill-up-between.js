import { helper } from "@ember/component/helper";
import { between } from "ember-fill-up/definitions";

export function fillUpBetween([leftBound, rightBound]) {
  return between(leftBound, rightBound);
}

export default helper(fillUpBetween);
