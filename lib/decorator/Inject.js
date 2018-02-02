import IoCService from '../service/IoCService';
var Inject = function (name) { return function (target, key) {
    var get = function () { return IoCService.getInstance().getComponent(name); };
    Reflect.defineProperty(target, key, {
        get: get,
    });
}; };
export default Inject;
//# sourceMappingURL=Inject.js.map