export default class BooksService {
    static get $name() {
        return 'BooksService';
    }

    static get BASE_URL() {
        return 'http://localhost:9000';
    }


    static get $inject() {
        return ['$http', '$log', '$q'];
    }

    constructor($http, $log, $q) {

        this.$http = $http;
        this.$log = $log;
        this.$q = $q;
    }

    getBooks(page, pageSize, query) {
        const request = {
            page: page ? page : 0,
            pageSize: pageSize,
            query: query
        };
        return this.$http.get(BooksService.BASE_URL + "/api/books/search", {params: request}).then((response) => {
            console.log(response);
            return response.data;
        }).catch(() => {
            return this.$q.reject('Fetching books Failed!');
        });
    }


}