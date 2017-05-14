import BooksComponent from "./books-component/books.component";

configureState.$inject = ['$stateProvider'];
function configureState($stateProvider) {

    $stateProvider.state("books", {
        url: "/books",
        component: BooksComponent.$name
    });
}

export default configureState;