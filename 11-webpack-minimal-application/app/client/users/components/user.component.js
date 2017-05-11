import UserController from "./user.controller";

export default {
    $name: 'users',
    template: require('./user.component.tpl.html'),
    controllerAs: 'vm',
    controller: UserController
};

