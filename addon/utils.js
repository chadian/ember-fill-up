export let gt = (a, b) => Number(a) > Number(b);
export let lt = (a, b) => Number(a) < Number(b);
export let gte = (a, b) => Number(a) >= Number(b);
export let lte = (a, b) => Number(a) <= Number(b);
export let eq = (a, b) => Number(a) === Number(b);

let sort = arr => arr.sort((a, b) => Number(a) - Number(b));

export function betweenRightClosed(value, a, b) {
  let [leftBound, rightBound] = sort([a, b]);
  return gte(value, leftBound) && lt(value, rightBound);
}

export function betweenLeftClosed(value, a, b) {
  let [leftBound, rightBound] = sort([a, b]);
  return gt(value, leftBound) && lte(value, rightBound);
}

export function betweenClosed(value, a, b) {
  let [leftBound, rightBound] = sort([a, b]);
  return gt(value, leftBound) && lt(value, rightBound);
}

export function betweenOpen(value, a, b) {
  let [leftBound, rightBound] = sort([a, b]);
  return gte(value, leftBound) && lte(value, rightBound);
}
