import comments from "./components/comments.component";

export default ['$stateProvider', function ($stateProvider) {
    $stateProvider.state("default.comments", {
        url: "/posts/:userId/comments/:postId",
        component: comments.$name,
        resolve: {
            user: ['DataService', '$stateParams', '$state', function (DataService, $stateParams, $state) {
                return DataService.getUser($stateParams.userId).catch(() => {
                    $state.go("default.users");
                });
            }],
            post: ['DataService', '$stateParams', '$state', function (DataService, $stateParams, $state) {
                return DataService.getPost($stateParams.postId).catch(() => {
                    $state.go("default.users");
                });
            }]
        }
    });
}];