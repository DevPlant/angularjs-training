import posts from "./components/posts.component";

export default ['$stateProvider', function ($stateProvider) {

    $stateProvider.state("default.posts", {
        url: "/posts/:userId",
        component: posts.$name,
        resolve: {
            user: ['DataService', '$stateParams', '$state',function (DataService, $stateParams, $state) {
                return DataService.getUser($stateParams.userId).catch(() => {
                    $state.go("default.users");
                });
            }]
        }
    });

}]