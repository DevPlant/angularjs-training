import login from "./components/login.component";

export default ['$stateProvider', function ($stateProvider) {
    $stateProvider.state("default.login", {
        url: "/login",
        component: login.$name
    });
}];