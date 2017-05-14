import AdminTemplate from "./admin.component.tpl.html";
import AdminController from "./admin.controller";

export default {
    $name: 'admin',
    template: AdminTemplate,
    controllerAs: 'vm',
    controller: AdminController
};

