function TodoController(TodoService) {
  const ctrl = this;
  this.newTodo = '';
  this.list = [];

  function getTodos() { //in runtime we want to get all of our todos
    TodoService
      .retrieve()
      .then(function (response) {
        ctrl.list = response; //first 10 items from a todo API
      });
  }

  this.addTodo = function () {
    this.list.unshift({
      title: this.newTodo,
      completed: false
    });
    this.newTodo = ''; //once the item has been added we want to clear the todo
  };
  this.removeTodo = function (item, index) {
    this.list.splice(index, 1);
  };

  this.updateTodo = function (item, index) {
    TodoService
      .update(item);
  };

  this.getRemaining = function () {
    return this.list.filter(function (item) {
      return !item.completed;
    });
  };

  getTodos(); //we need to call this in the runtime to bound it to the Controller Object
}

angular
  .module('app')
  .controller('TodoController', TodoController);