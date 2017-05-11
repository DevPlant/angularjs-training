export default ['$urlRouterProvider', '$locationProvider', '$injector', function ($urlRouterProvider, $locationProvider, $injector) {

    $locationProvider.html5Mode(true).hashPrefix("*");

    $urlRouterProvider.otherwise(otherwiseRoute);

    otherwiseRoute.$inject = ['$injector'];
    function otherwiseRoute($injector) {
        $injector.get('$state').go("default.users");
    }

}]
