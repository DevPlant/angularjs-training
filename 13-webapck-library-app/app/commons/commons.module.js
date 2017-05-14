import AuthenticationService from "./services/authentication.service";
import BooksService from "./services/books.service";
import AuthorService from "./services/author.service";
import StorageService from "./services/storage.service";
import ReservationService from "./services/reservation.service";
import UserService from "./services/user.service";
import config from "./commons.module.config";

export default angular.module('commonsModule', [])
    .service(AuthenticationService.$name, AuthenticationService)
    .service(BooksService.$name, BooksService)
    .service(AuthorService.$name, AuthorService)
    .service(ReservationService.$name, ReservationService)
    .service(UserService.$name, UserService)
    .service(StorageService.$name, StorageService).config(config).name;