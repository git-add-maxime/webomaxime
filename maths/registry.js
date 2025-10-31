// maths/registry.js
const REGISTRY = [];

// exports NOMMÉS (pas de default)
export function registerExercises(list) {
  REGISTRY.push(...list);
}

export function getAllExercises() {
  return REGISTRY.slice();
}
