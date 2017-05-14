import admin from "./components/admin.component";

configureState.$inject = ['$stateProvider'];
function configureState($stateProvider) {

    $stateProvider.state("default.admin", {
        url: "/admin/:activeTab",
        component: admin.$name,
        resolve: {
            principal: resolvePrincipal
        }
    });

    resolvePrincipal.$inject = ['AuthenticationService', '$q', '$state'];
    function resolvePrincipal(AuthenticationService, $q, $state) {
        return AuthenticationService.getPrincipal().then((principal) => {
            if (principal.admin) {
                return principal;
            } else {
                $state.go("default.books");
                return $q.reject('not admin');
            }
        }).catch((error) => {
            $state.go("default.login");
            return $q.reject('not signed in');
        });
    }

}

export default configureState;