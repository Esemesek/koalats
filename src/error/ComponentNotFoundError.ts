export default class ComponentNotFoundError extends Error {
  constructor(name: string) {
    super(`Component '${name}' does not exist in container`);
  }
}
