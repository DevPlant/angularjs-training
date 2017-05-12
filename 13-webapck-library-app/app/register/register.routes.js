import register from "./components/register.component";

export default ['$stateProvider', function ($stateProvider) {
    $stateProvider.state("default.register", {
        url: "/register",
        component: register.$name
    });
}];