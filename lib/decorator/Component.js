import ComponentContainer from '../ComponentContainer';
var Component = function (_a) {
    var name = _a.name, _b = _a.dependencies, dependencies = _b === void 0 ? [] : _b;
    return function (target) {
        ComponentContainer.getInstance().registerComponent(name, target, dependencies);
    };
};
export default Component;
//# sourceMappingURL=Component.js.map