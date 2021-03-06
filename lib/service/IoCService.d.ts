export interface ConstructorMap {
    [name: string]: {
        componentConstructor: any;
        dependencies: Array<string>;
    };
}
export default class IoCService {
    private static instance;
    private registeredComponents;
    private components;
    constructor();
    static getInstance: () => default;
    startContainer: () => void;
    registerComponent: (name: string, componentConstructor: any, dependencies: string[]) => void;
    getComponent: (name: string) => any;
    private createDependencies;
    private createNodeDependencies;
    private createDependency;
    private getDependenciesFromContainer;
    private areDepsCyclic;
    private isCycleInNode;
}
