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
    if (!this.newTodo) { //as a safety check, if no todo item (or empty string) we dont want to add it as an empty todo list
      return;
    }
    TodoService
      .create({
        title: this.newTodo,
        completed: false
      })
      .then(function (response) { //the response object will be newly created todo item
        ctrl.list.unshift(response); //will give as a dynamic id from the server
        ctrl.newTodo = ''; //initialize the new todo as an empty value again once it has been successfully added
        //once the item has been added we want to clear the todo
    });
  };

  this.removeTodo = function (item, index) {
    TodoService
      .remove(item)
      .then(function (response) {
        ctrl.list.splice(index, 1); //if the request was unsuccessful we dont want to remove it from the user point of view
      //so they might think it is deleted even when it hasnt
      //so we should only update the view when the response is successful
      });
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