import CircularDependencyError from '../error/CircularDependencyError';
import ComponentAlreadyExistError from '../error/ComponentAlreadyExistError';
import ComponentNotFoundError from '../error/ComponentNotFoundError';

interface ComponentMap {
  [name: string]: Object;
}

export interface ConstructorMap {
  [name: string]: {
    componentConstructor: any;
    dependencies: Array<string>;
  }
}

export default class IoCService {
  private static instance = new IoCService();
  private registeredComponents: ConstructorMap = {};
  private components: ComponentMap = {};

  constructor() {
    return IoCService.instance;
  }

  public static getInstance = (): IoCService => IoCService.instance;

  public startContainer = () => {
    if (this.areDepsCyclic()) {
      throw new CircularDependencyError();
    }

    this.createDependencies();
  }

  public registerComponent = (name: string, componentConstructor: any, dependencies: Array<string>): void => {
    if (this.registeredComponents[name] !== undefined) {
      throw new ComponentAlreadyExistError(name);
    }

    this.registeredComponents[name] = {
      componentConstructor,
      dependencies,
    };
  }

  public getComponent = (name: string): any => {
    const component = this.components[name];
    if (component === undefined) {
      throw new ComponentNotFoundError(name);
    }

    return component;
  }

  private createDependencies = () => Object.keys(this.registeredComponents).forEach(this.createDependency);

  private createNodeDependencies = (key: string) => {
    this.registeredComponents[key].dependencies.forEach(this.createDependency)
  }

  private createDependency = (dep: string) => {
    if (this.components[dep] === undefined) {
      if (this.registeredComponents[dep].dependencies.length > 0) {
        this.createNodeDependencies(dep);
      }

      this.components[dep] = new this.registeredComponents[dep].componentConstructor(
        ...this.getDependenciesFromContainer(this.registeredComponents[dep].dependencies)
      );
    }
  }

  private getDependenciesFromContainer = (dependencies: string[]) => {
    return dependencies.map(this.getComponent);
  }

  private areDepsCyclic = () => {
    return Object.keys(this.registeredComponents).some((key: string) => {
      return this.registeredComponents[key].dependencies.includes(key)
        || this.isCycleInNode(key, this.registeredComponents[key].dependencies);
    })
  }

  private isCycleInNode = (key: string, dependencies: string[]): boolean => {
    return dependencies.some((dep: string) => {
      if (this.registeredComponents[dep] === undefined) {
        throw new ComponentNotFoundError(dep);
      }

      return dependencies.includes(key)
        || this.isCycleInNode(key, this.registeredComponents[dep].dependencies);
    });
  }
}
