export default class AuthorService {
    static get $name() {
        return 'AuthorService';
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

    getAllAuthors() {

        return this.$http.get(`${this.API_BASE_URL}/api/author`).then(this.getComplete).catch((error) => {
            this.$log.error('Request Failed with error:', error.data);
            return this.$q.reject(error.data);
        });
    }


    createAuthor(authorModel) {
        return this.$http.put(`${this.API_BASE_URL}/api/author`, authorModel).then(this.getComplete).catch((error) => {
            this.$log.error('Request Failed with error:', error.data);
            return this.$q.reject(error.data);
        });
    }

    updateAuthor(authorModel) {
        return this.$http.post(`${this.API_BASE_URL}/api/author/${authorModel.id}`, authorModel).then(this.getComplete).catch((error) => {
            this.$log.error('Request Failed with error:', error.data);
            return this.$q.reject(error.data);
        });
    }

    deleteAuthor(authorId) {
        return this.$http.delete(`${this.API_BASE_URL}/api/author/${authorId}`).catch((error) => {
            this.$log.error('Request Failed with error:', error.data);
            return this.$q.reject(error.data);
        });
    }

    getComplete(response) {
        return response.data;
    }

}