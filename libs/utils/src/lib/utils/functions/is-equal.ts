export function isEqual(object: object, objectToCompare: object): boolean {
  return JSON.stringify(object) === JSON.stringify(objectToCompare);
}
