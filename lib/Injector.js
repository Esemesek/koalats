import ComponentContainer from './ComponentContainer';
var Injector = /** @class */ (function () {
    function Injector() {
    }
    Injector.get = function (name) { return ComponentContainer.getInstance().getComponent(name); };
    return Injector;
}());
export default Injector;
//# sourceMappingURL=Injector.js.map