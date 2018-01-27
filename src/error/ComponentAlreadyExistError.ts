export default class ComponentAlreadyExistError extends Error {
  constructor(name: string) {
    super(`Component '${name}' already exists in container`);
  }
}
