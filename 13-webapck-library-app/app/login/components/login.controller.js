export default class LoginController {

    static get $inject() {
        return ['AuthenticationService', '$state'];
    }

    constructor(AuthenticationService, $state) {
        this.AuthenticationService = AuthenticationService;
        this.$state = $state;
        this.username = null;
        this.password = null;
        this.error = false;
    }

    $onInit() {
    }

    login() {
        this.AuthenticationService.login(this.username, this.password).then(() => {
            this.$state.go("default.books",{}, {reload: true});
        }).catch(() => {
            this.username = null;
            this.password = null;
            this.error = true;
        });
    }

};