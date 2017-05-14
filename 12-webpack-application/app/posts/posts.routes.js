import posts from "./components/posts.component";

configureState.$inject = ['$stateProvider'];
function configureState($stateProvider) {

    $stateProvider.state("default.posts", {
        url: "/users/:userId/posts",
        component: posts.$name,
        resolve: {
            user: ['DataService', '$stateParams',
                function ($stateParams, DataService) {
                console.log($stateParams);
                console.log(DataService);
                return $stateParams.getUserOrRedirect(DataService.userId);
            }]
        }
    });


}

export default configureState;