import books from "./components/books.component";

configureState.$inject = ['$stateProvider'];
function configureState($stateProvider) {

    $stateProvider.state("default.books", {
        url: "/books",
        component: books.$name
    });
}

export default configureState;