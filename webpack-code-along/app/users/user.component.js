import UserController from "./user.controller";
import UserTemplate from "./user.template.html";

export default {
    $name: "userComponent",
    controller: UserController,
    template: UserTemplate,
    controllerAs: "userCtrl"
}
