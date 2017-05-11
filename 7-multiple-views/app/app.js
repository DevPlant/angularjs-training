(function () {
    'use strict';

    angular.module('DevPlantApp', ['ngRoute']).config(function ($routeProvider, $locationProvider) {

        $locationProvider.html5Mode(true).hashPrefix("*");

        $routeProvider
            .when('/users', {
                templateUrl: 'users/users.html',
                controller: 'UserController',
                controllerAs: 'vm'
            })
            .when('/users/:userId/posts', {
                templateUrl: 'posts/posts.html',
                controller: 'PostsController',
                controllerAs: 'vm',
                resolve: {
                    user: function (DataService, $route, $location) {
                        return DataService.getUser($route.current.params.userId).catch(() => {
                            $location.url('/users');
                        });
                    }
                }
            })
            .when('/users/:userId/posts/:postId/comments', {
                templateUrl: 'comments/comments.html',
                controller: 'CommentsController',
                controllerAs: 'vm',
                resolve: {
                    user: function (DataService, $route, $location) {
                        return DataService.getUser($route.current.params.userId).catch(() => {
                            $location.url('/users');
                        });
                    },
                    post: function (DataService, $route, $location) {
                        return DataService.getPost($route.current.params.postId).catch(() => {
                            $location.url('/users');
                        });
                    }
                }

            }).otherwise({redirectTo: '/users'});
    });

})();