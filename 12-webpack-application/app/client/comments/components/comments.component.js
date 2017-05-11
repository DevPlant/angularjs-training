import CommentsController from './comments.controller';

export default {
    $name: 'comments',
    template: require('./comments.component.tpl.html'),
    bindings: {
        user: '<',
        post: '<'
    },
    controllerAs: 'vm',
    controller: CommentsController
};





