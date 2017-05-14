import StorageService from "./storage.service";
export default class AuthenticationService {
    static get $name() {
        return 'AuthenticationService';
    }


    static get $inject() {
        return ['$http', '$log', '$q', '$state', 'StorageService', 'API_BASE_URL'];
    }

    constructor($http, $log, $q, $state, StorageService, API_BASE_URL) {
        this.$http = $http;
        this.$log = $log;
        this.$q = $q;
        this.$state = $state;
        this.API_BASE_URL = API_BASE_URL;
        this.StorageService = StorageService;
        this.principal = this.getPrincipal();
    }


    logout() {
        this.StorageService.removeToken();
        this.principal = null;
    }

    getPrincipal() {
        if (!this.principal) {
            if (this.StorageService.getToken() != null) {
                return this.$http.get(`${this.API_BASE_URL}/api/user-management/self`).then((response) => {
                    this.principal = response.data;
                    return this.principal
                }).catch(() => {
                    return this.$q.reject(null);
                });
            }
        } else {
            return this.$q.resolve(this.principal);
        }
        return this.$q.reject();
    }

    register(registrationModel) {
        return this.$http.post(`${this.API_BASE_URL}/api/user-management/register`, registrationModel).then((response) => {
            return true;
        }).catch(() => {
            return this.$q.reject('Registration failed!');
        });
    }

    login(username, password) {

        const headers = {
            "Authorization": "Basic " + btoa("devplant-backend:devplant-backend-secret"),
            "Content-Type": "application/x-www-form-urlencoded"
        };

        const request = {
            username: username,
            password: password,
            grant_type: "password"
        };

        const req = {
            method: 'POST',
            url: `${this.API_BASE_URL}/oauth/token`,
            headers: headers,
            transformRequest: function (obj) {
                const str = [];
                for (let p in obj)
                    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
                return str.join("&");
            },
            data: request
        };


        return this.$http(req).then((response) => {
            this.StorageService.setToken(response.data);
            return this.$http.get(`${this.API_BASE_URL}/api/user-management/self`).then((response) => {
                this.principal = response.data;
                return this.principal
            }).catch(() => {
                return this.$q.reject('Fetching principal Failed!');
            });
        }).catch(() => {
            return this.$q.reject('Login Failed!');
        });
    }

}