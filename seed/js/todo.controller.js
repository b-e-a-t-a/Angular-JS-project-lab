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
    if (!item.title) { //if the string is empty
      // if (user removes the string after double clicking) we want to delete it, we dont want to send back empty todo list
      this.removeTodo(item, index);//reusing the above this.removeTodo function inside updateTodo function
      return; //we will return fromthis function, which means TodoService.update(item) will never gets called
    }
    TodoService
      .update(item);
  };

  this.getRemaining = function () {
    return this.list.filter(function (item) {
      return !item.completed;
    });
  };


  this.toggleState = function (item) {
    TodoService
      .update(item) //if we mark an item is complete with them want to updated saved on a server, so we can pass in an item
      .then(function () {
        //if we updated todo item everything works fine, we then do nothing
      }, function () {
        //if sth went wrong we want to set the state back to its original state
        //eg. item.completed has been marked to true, we then want to set it back to false because sth went wrong on a server side
        item.completed = !item.completed;
      });
  }

  getTodos(); //we need to call this in the runtime to bound it to the Controller Object
}

angular
  .module('app')
  .controller('TodoController', TodoController);