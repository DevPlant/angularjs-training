import AuthenticationService from "./services/authentication.service";
import BooksService from "./services/books.service";
import StorageService from "./services/storage.service";
import config from "./commons.module.config";

export default angular.module('commonsModule', [])
    .service(AuthenticationService.$name, AuthenticationService)
    .service(BooksService.$name,BooksService)
    .service(StorageService.$name, StorageService).config(config).name;