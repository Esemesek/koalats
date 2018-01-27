var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var ComponentAlreadyExistError = /** @class */ (function (_super) {
    __extends(ComponentAlreadyExistError, _super);
    function ComponentAlreadyExistError(name) {
        return _super.call(this, "Component '" + name + "' already exists in container") || this;
    }
    return ComponentAlreadyExistError;
}(Error));
export default ComponentAlreadyExistError;
//# sourceMappingURL=ComponentAlreadyExistError.js.map