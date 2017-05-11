import PostsController from "./posts.controller";

export default {
    $name: 'posts',
    template: require('./posts.component.tpl.html'),
    bindings: {
        user: '<'
    },
    controllerAs: 'vm',
    controller: PostsController
};

