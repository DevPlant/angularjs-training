export default class UserService {
    static get $name() {
        return 'UserService';
    }

    static get $inject() {
        return ['$http', '$log', '$q', 'API_BASE_URL'];
    }

    constructor($http, $log, $q, API_BASE_URL) {

        this.$http = $http;
        this.$log = $log;
        this.$q = $q;
        this.API_BASE_URL = API_BASE_URL;
    }

    getAllUsers() {
        return this.$http.get(`${this.API_BASE_URL}/api/user-management`).then(this.getComplete).catch(() => {
            return this.$q.reject('Fetching users Failed!');
        });
    }


    getComplete(response) {
        return response.data;
    }

}