export default class RegisterController {

    static get $inject() {
        return ['AuthenticationService', '$state'];
    }

    constructor(AuthenticationService, $state) {
        this.AuthenticationService = AuthenticationService;
        this.$state = $state;
        this.model = {};
    }

    $onInit() {
    }

    register() {
        this.AuthenticationService.register(this.model).then(() => {
            this.AuthenticationService.login(this.model.email, this.model.password).then(() => {
                this.$state.go("default.books", {}, {reload: true});
            });
        }).catch(() => {
            this.error = true;
        });
    }


};