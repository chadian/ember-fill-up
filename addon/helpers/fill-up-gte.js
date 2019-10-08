import { helper } from "@ember/component/helper";
import { gte } from "ember-fill-up/definitions";

export function fillUpGte([value], { label }) {
  return gte(value, label);
}

export default helper(fillUpGte);
