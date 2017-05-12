export default class ToolbarController {

    static get $inject() {
        return ['AuthenticationService', '$state'];
    }

    constructor(AuthenticationService, $state) {
        this.AuthenticationService = AuthenticationService;
        this.principal = null;
        this.$state = $state;
    }

    $onInit() {
        this.AuthenticationService.getPrincipal().then((principal) => {
            this.principal = principal;
        }).catch(()=>{
            this.principal = null;
        })
    }

    logout() {
        this.AuthenticationService.logout();
        this.principal = null;
        this.$state.go("default.books",{}, {reload: true});
    }

}
