import CircularDependencyError from './error/CircularDependencyError';
import ComponentAlreadyExistError from './error/ComponentAlreadyExistError';
import ComponentNotFoundError from './error/ComponentNotFoundError';
var ComponentContainer = /** @class */ (function () {
    function ComponentContainer() {
        var _this = this;
        this.registeredComponents = {};
        this.components = {};
        this.startContainer = function () {
            if (_this.areDepsCyclic()) {
                throw new CircularDependencyError();
            }
            _this.createDependencies();
        };
        this.registerComponent = function (name, componentConstructor, dependencies) {
            if (_this.registeredComponents[name] !== undefined) {
                throw new ComponentAlreadyExistError(name);
            }
            _this.registeredComponents[name] = {
                componentConstructor: componentConstructor,
                dependencies: dependencies,
            };
        };
        this.getComponent = function (name) {
            var component = _this.components[name];
            if (component === undefined) {
                throw new ComponentNotFoundError(name);
            }
            return component;
        };
        this.createDependencies = function () { return Object.keys(_this.registeredComponents).forEach(_this.createDependency); };
        this.createNodeDependencies = function (key) {
            _this.registeredComponents[key].dependencies.forEach(_this.createDependency);
        };
        this.createDependency = function (dep) {
            if (_this.components[dep] === undefined) {
                if (_this.registeredComponents[dep].dependencies.length > 0) {
                    _this.createNodeDependencies(dep);
                }
                _this.components[dep] = new ((_a = _this.registeredComponents[dep].componentConstructor).bind.apply(_a, [void 0].concat(_this.getDependenciesFromContainer(_this.registeredComponents[dep].dependencies))))();
            }
            var _a;
        };
        this.getDependenciesFromContainer = function (dependencies) {
            return dependencies.map(_this.getComponent);
        };
        this.areDepsCyclic = function () {
            return Object.keys(_this.registeredComponents).some(function (key) {
                return _this.registeredComponents[key].dependencies.includes(key)
                    || _this.isCycleInNode(key, _this.registeredComponents[key].dependencies);
            });
        };
        this.isCycleInNode = function (key, dependencies) {
            return dependencies.some(function (dep) {
                if (_this.registeredComponents[dep] === undefined) {
                    throw new ComponentNotFoundError(dep);
                }
                return dependencies.includes(key)
                    || _this.isCycleInNode(key, _this.registeredComponents[dep].dependencies);
            });
        };
        return ComponentContainer.instance;
    }
    ComponentContainer.instance = new ComponentContainer();
    ComponentContainer.getInstance = function () { return ComponentContainer.instance; };
    return ComponentContainer;
}());
export default ComponentContainer;
//# sourceMappingURL=ComponentContainer.js.map