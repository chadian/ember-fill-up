import { helper } from "@ember/component/helper";
import { between } from "ember-fill-up/definitions";

export function fillUpBetween([leftBound, rightBound], { label }) {
  return between(leftBound, rightBound, label);
}

export default helper(fillUpBetween);
