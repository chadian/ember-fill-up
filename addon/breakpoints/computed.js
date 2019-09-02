import SizeProperty from '../-property';
import { definitionClassNames } from './definitions';

export default function breakpointClassNames(...definitions) {
  return new SizeProperty(
    ({ offsetWidth }) => definitionClassNames(offsetWidth, definitions)
  );
}
