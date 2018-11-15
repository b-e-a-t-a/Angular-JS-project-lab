function TodoController() {
  this.newTodo = '';
  this.list = [{
    title: 'First todo item!',
    completed: true
  },{
    title: 'Second todo item!',
    completed: false
  },{
    title: 'Third todo item!',
    completed: false
  }];
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
}

angular
  .module('app')
  .controller('TodoController', TodoController);