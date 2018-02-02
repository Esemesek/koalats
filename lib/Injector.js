import IoCService from './service/IoCService';
var InjectorService = /** @class */ (function () {
    function InjectorService() {
    }
    InjectorService.get = function (name) { return IoCService.getInstance().getComponent(name); };
    return InjectorService;
}());
export default InjectorService;
//# sourceMappingURL=InjectorService.js.map