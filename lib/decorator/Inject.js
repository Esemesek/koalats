import ComponentContainer from '../ComponentContainer';
var Inject = function (name) { return function (target, key) {
    var get = function () { return ComponentContainer.getInstance().getComponent(name); };
    Reflect.defineProperty(target, key, {
        get: get,
    });
}; };
export default Inject;
//# sourceMappingURL=Inject.js.map