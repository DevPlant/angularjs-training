(function () {
    'use strict';

    angular.module('DevPlantApp').controller("TodosController", TodosController);

    function TodosController(DataService, user) {

        const vm = this;

        vm.user = user;
        vm.todos = [];

        this.todoStatusChanged = todoStatusChanged;

        onInit();

        function onInit() {
            getUserTodos(vm.user.id);
        }

        function getUserTodos(userId) {

            return DataService.getUserTodos(userId).then(function (todos) {
                vm.todos = todos;
            });
        }

        function todoStatusChanged(todo) {
            DataService.updateTodoStatus(todo).then(function (todo) {
                alert('Todo changed successfully!');
            });
        }

    }
})();