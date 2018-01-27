export default class CircularDependencyError extends Error {
  constructor() {
    super('There is cycle in dependencies');
  }
}
