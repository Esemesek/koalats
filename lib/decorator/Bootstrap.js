import ComponentContainer from '../ComponentContainer';
var Bootstrap = function (target) {
    if (target.initialize instanceof Function) {
        target.initialize();
    }
    ComponentContainer.getInstance().startContainer();
    target.main();
};
export default Bootstrap;
//# sourceMappingURL=Bootstrap.js.map