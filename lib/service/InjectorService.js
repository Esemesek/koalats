import IoCService from './IoCService';
var InjectorServiceService = /** @class */ (function () {
    function InjectorServiceService() {
    }
    InjectorServiceService.get = function (name) { return IoCService.getInstance().getComponent(name); };
    return InjectorServiceService;
}());
export default InjectorServiceService;
//# sourceMappingURL=InjectorService.js.map