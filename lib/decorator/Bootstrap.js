import IoCService from '../service/IoCService';
var Bootstrap = function (target) {
    if (target.initialize instanceof Function) {
        target.initialize();
    }
    IoCService.getInstance().startContainer();
    target.main();
};
export default Bootstrap;
//# sourceMappingURL=Bootstrap.js.map