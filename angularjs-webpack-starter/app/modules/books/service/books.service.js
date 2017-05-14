export default class BooksService {

    static get $inject() {
        return ['$q', '$http'];
    }

    static get $name() {
        return "BooksService";
    }

    constructor($q, $http) {
        this.$q = $q;
        this.$http = $http;
        this.API_URL = "http://178.63.82.71:9010/api";
    }

    getBooks() {
        const myParams = {
            page: 0,
            pageSize: 100
        };
        return this.$http.get(`${this.API_URL}/books`,{params: myParams}).then((response) => {
            console.log('getBooks Response is',response);
            return response.data.content;
        })
    }


    getAuthors() {
        return this.$http.get(`${this.API_URL}/author`).then((response) => {
            console.log('getAuthors Response is',response);
            return response.data;
        });
    }

    createAuthor(author){
        return this.$http.put(`${this.API_URL}/author`,author).then((response) => {
            console.log('createAuthor Response is',response);
            return response.data;
        });
    }

    deleteAuthor(authorId){
        return this.$http.delete(`${this.API_URL}/author/${authorId}`).then((response) => {
            console.log('deleteAuthor Response is',response);
            return response.data;
        });
    }

}