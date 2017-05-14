export default class BooksService {
    static get $name() {
        return 'BooksService';
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

    getBooks(page, pageSize, query) {
        const request = {
            page: page ? page : 0,
            pageSize: pageSize,
            query: query
        };
        return this.$http.get(`${this.API_BASE_URL}/api/books/search`, {params: request}).then(this.getComplete).catch((error) => {
            this.$log.error('Request Failed with error:', error.data);
            return this.$q.reject(error.data);
        });
    }


    getBook(bookId) {
        return this.$http.get(`${this.API_BASE_URL}/api/books/${bookId}`).then(this.getComplete).catch((error) => {
            this.$log.error('Request Failed with error:', error.data);
            return this.$q.reject(error.data);
        });
    }

    getStocks(bookId) {
        return this.$http.get(`${this.API_BASE_URL}/api/book-stocks/${bookId}`).then(this.getComplete).catch((error) => {
            this.$log.error('Request Failed with error:', error.data);
            return this.$q.reject(error.data);
        });
    }

    stockPickedUp(stock) {
        return this.$http.post(`${this.API_BASE_URL}/api/book-stocks/picked-up/${stock.id}`, {}).then(this.getComplete).catch((error) => {
            this.$log.error('Request Failed with error:', error.data);
            return this.$q.reject(error.data);
        });

    }

    stockReturned(stock) {
        return this.$http.post(`${this.API_BASE_URL}/api/book-stocks/returned/${stock.id}`, {}).then(this.getComplete).catch((error) => {
            this.$log.error('Request Failed with error:', error.data);
            return this.$q.reject(error.data);
        });
    }

    increaseStock(bookId) {
        return this.$http.post(`${this.API_BASE_URL}/api/book-stocks/add/${bookId}`, {}).then(this.getComplete).catch((error) => {
            this.$log.error('Request Failed with error:', error.data);
            return this.$q.reject(error.data);
        });
    }

    decreaseStock(bookId) {
        return this.$http.delete(`${this.API_BASE_URL}/api/book-stocks/${bookId}`).then(this.getComplete).catch((error) => {
            this.$log.error('Request Failed with error:', error.data);
            return this.$q.reject(error.data);
        });
    }

    getAllBooks() {
        const request = {
            page: 0,
            pageSize: 1000
        };
        return this.$http.get(`${this.API_BASE_URL}/api/books`, {params: request}).then(this.getComplete).catch(() => {
            return this.$q.reject('Fetching books Failed!');
        });
    }

    createBook(bookModel) {
        return this.$http.put(`${this.API_BASE_URL}/api/books`, bookModel).then(this.getComplete).catch((error) => {
            this.$log.error('Request Failed with error:', error.data);
            return this.$q.reject(error.data);
        });
    }

    updateBook(bookModel) {
        return this.$http.post(`${this.API_BASE_URL}/api/books/${bookModel.id}`, bookModel).then(this.getComplete).catch((error) => {
            this.$log.error('Request Failed with error:', error.data);
            return this.$q.reject(error.data);
        });
    }

    deleteBook(bookId) {
        return this.$http.delete(`${this.API_BASE_URL}/api/books/${bookId}`).catch((error) => {
            this.$log.error('Request Failed with error:', error.data);
            return this.$q.reject(error.data);
        });
    }

    getComplete(response) {
        return response.data;
    }

}