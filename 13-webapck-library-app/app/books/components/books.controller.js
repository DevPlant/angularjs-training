export default class BooksController {

    static get $inject() {
        return ['BooksService', 'AuthenticationService', 'ReservationService', '$mdDialog'];
    }

    constructor(BooksService, AuthenticationService, ReservationService, $mdDialog) {
        this.BooksService = BooksService;
        this.AuthenticationService = AuthenticationService;
        this.ReservationService = ReservationService;
        this.$mdDialog = $mdDialog;
        this.principal = null;
        this.reservations = [];
        this.now = new Date();

    }

    $onInit() {
        this.BooksService.getBooks().then((books) => {
            this.books = books;
        });

        this.AuthenticationService.getPrincipal().then((principal) => {
            this.principal = principal;
            this.ReservationService.myReservations().then((reservations) => {
                this.reservations = reservations;
            });
        }).catch((e) => {
            this.principal = null;
        });


    }

    checkAvailability(book) {
        this.ReservationService.checkAvailability(book.id).then((response) => {
            book.available = response;
            book.checked = true;
        });
    }

    haveReservation(book) {
        if (this.principal) {
            for (let res of this.reservations) {
                if (res.bookId == book.id) {
                    return true;
                }
            }
            return false;
        } else {
            return false;
        }
    }

    makeReservation(book) {
        this.ReservationService.makeReservation({bookId: book.id, pickupTimestamp: book.pickupDate.getTime()}).then(() => {
            this.ReservationService.myReservations().then((reservations) => {
                this.reservations = reservations;
            });
        }).catch((error)=>{
            this.showErrorDialog(error);
        })
    }

    cancelReservation(book) {
        let bookStockId = null;
        for (let res of this.reservations) {
            if (res.bookId == book.id) {
                bookStockId = res.id;
            }
        }
        if (bookStockId) {
            this.ReservationService.cancelReservation(bookStockId).then(() => {
                book.checked = false;
                book.available = false;
                book.pickupDate = null;
                this.ReservationService.myReservations().then((reservations) => {
                    this.reservations = reservations;
                });
            });
        }
    }

    showErrorDialog(error) {
        this.$mdDialog.show(
            this.$mdDialog.alert()
                .clickOutsideToClose(true)
                .title('Warning')
                .textContent(error.message ? error.message : 'Action Failed!')
                .ok('Ok')
        );
    }

}
