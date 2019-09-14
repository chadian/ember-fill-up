import EmberObject from "@ember/object";
import ModifierManager from 'ember-fill-up/-modifier-manager';
import { setModifierManager } from "@ember/modifier";

export default setModifierManager(
  owner => new ModifierManager(owner),
  EmberObject.extend({})
);