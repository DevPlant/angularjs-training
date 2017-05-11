export default class DataService {
    static get $name() {
        return 'DataService';
    }

    static get $inject() {
        return ['$http', '$log', '$q'];
    }

    constructor($http, $log, $q)    {
        this.apiUrl = "https://jsonplaceholder.typicode.com";
        this.$http = $http;
        this.$log = $log;
        this.$q = $q;
    }


    getUser(userId) {
        return this.$http.get(this.apiUrl + "/users/" + userId).then(DataService.getComplete)
            .catch(this.getFailed);
    }


    getUsers() {
        return this.$http.get(this.apiUrl + "/users").then(DataService.getComplete)
            .catch(this.getFailed);
    }


    getPost(postId) {
        return this.$http.get(this.apiUrl + "/posts/" + postId).then(DataService.getComplete)
            .catch(this.getFailed);
    }


    getUserPosts(userId) {
        return this.$http.get(this.apiUrl + "/posts", {params: {userId: userId}}).then(DataService.getComplete)
            .catch(this.getFailed);
    }


    getPostComments(postId) {
        return this.$http.get(this.apiUrl + "/comments", {params: {postId: postId}}).then(DataService.getComplete)
            .catch(this.getFailed);
    }


    static getComplete(response) {
        return response.data;
    }


    getFailed(error) {
        this.$log.error('XHR Failed for getQuote.' + error.data);
        return this.$q.reject('Failed to load data!');

    }


}