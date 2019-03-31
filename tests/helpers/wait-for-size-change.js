// uses a sensible value for the time change detector
// to be able to notify of the property change after
// detection
const SIZE_CHANGE_WAIT_TIME_IN_MS = 250;

export default () => new Promise(
  resolve => setTimeout(resolve, SIZE_CHANGE_WAIT_TIME_IN_MS)
);
