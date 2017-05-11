import user from "./components/user.component";

export default ['$stateProvider', function ($stateProvider) {
    $stateProvider.state("default.users", {
        url: "/users",
        component: user.$name
    });
}]