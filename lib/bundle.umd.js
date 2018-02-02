(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
	typeof define === 'function' && define.amd ? define(['exports'], factory) :
	(factory((global.koalats = {})));
}(this, (function (exports) { 'use strict';

function __extends(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var CircularDependencyError = /** @class */ (function (_super) {
    __extends(CircularDependencyError, _super);
    function CircularDependencyError() {
        return _super.call(this, 'There is cycle in dependencies') || this;
    }
    return CircularDependencyError;
}(Error));

var ComponentAlreadyExistError = /** @class */ (function (_super) {
    __extends(ComponentAlreadyExistError, _super);
    function ComponentAlreadyExistError(name) {
        return _super.call(this, "Component '" + name + "' already exists in container") || this;
    }
    return ComponentAlreadyExistError;
}(Error));

var ComponentNotFoundError = /** @class */ (function (_super) {
    __extends(ComponentNotFoundError, _super);
    function ComponentNotFoundError(name) {
        return _super.call(this, "Component '" + name + "' does not exist in container") || this;
    }
    return ComponentNotFoundError;
}(Error));

var IoCService = /** @class */ (function () {
    function IoCService() {
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
        return IoCService.instance;
    }
    IoCService.instance = new IoCService();
    IoCService.getInstance = function () { return IoCService.instance; };
    return IoCService;
}());

var Bootstrap = function (target) {
    if (target.initialize instanceof Function) {
        target.initialize();
    }
    IoCService.getInstance().startContainer();
    target.main();
};

var Component = function (_a) {
    var name = _a.name, _b = _a.dependencies, dependencies = _b === void 0 ? [] : _b;
    return function (target) {
        IoCService.getInstance().registerComponent(name, target, dependencies);
    };
};

var Inject = function (name) { return function (target, key) {
    var get = function () { return IoCService.getInstance().getComponent(name); };
    Reflect.defineProperty(target, key, {
        get: get,
    });
}; };

var InjectorServiceService = /** @class */ (function () {
    function InjectorServiceService() {
    }
    InjectorServiceService.get = function (name) { return IoCService.getInstance().getComponent(name); };
    return InjectorServiceService;
}());

var index = {
    Bootstrap: Bootstrap,
    Component: Component,
    Inject: Inject,
    InjectorService: InjectorServiceService
};

exports.default = index;

Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=bundle.umd.js.map
