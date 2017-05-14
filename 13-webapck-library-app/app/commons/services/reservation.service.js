export default class ReservationService {
    static get $name() {
        return 'ReservationService';
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

    myReservations() {
        return this.$http.get(`${this.API_BASE_URL}/api/books/reservations/mine`).then(this.getComplete).catch((error) => {
            this.$log.error('Request Failed with error:', error.data);
            return this.$q.reject(error.data);
        });
    }


    makeReservation(reservationModel) {
        return this.$http.post(`${this.API_BASE_URL}/api/books/reservations/new`, reservationModel).then(this.getComplete).catch((error) => {
            this.$log.error('Request Failed with error:', error.data);
            return this.$q.reject(error.data);
        });
    }


    cancelReservation(bookStockId) {
        return this.$http.delete(`${this.API_BASE_URL}/api/books/reservations/${bookStockId}`).then(this.getComplete).catch((error) => {
            this.$log.error('Request Failed with error:', error.data);
            return this.$q.reject(error.data);
        });
    }

    checkAvailability(bookId){
        return this.$http.get(`${this.API_BASE_URL}/api/books/reservations/check-availability/${bookId}`).then(this.getComplete).catch((error) => {
            this.$log.error('Request Failed with error:', error.data);
            return this.$q.reject(error.data);
        });
    }


    getComplete(response) {
        return response.data;
    }

}