function TodoService($http) {
  const prefix = 'https://cors-anywhere.herokuapp.com/';
  const API = '//jsonplaceholder.typicode.com/todos/';

  function create() {}
  function retrieve() {
    return $http.get(prefix + API).then(function (response) {
      return response.data.splice(0, 10); // to grab 1-10 items in array
    });
  }

  function update(todo) { //todo object passed to us
    return $http.put(prefix + API + todo.id).then(function (response) {
      return response.data; //we dont have to keep reference to response.data in a Controller, we can use it elsewhere
    });
  }

  function remove(todo) {
    return $http.delete(prefix + API + todo.id).then(function (response) {
      return response.data;
    });
  }

  return { //CRUD operations
    create: create,
    retrieve: retrieve,
    update: update,
    remove: remove,
  };
}

angular
  .module('app')
  .factory('TodoService', TodoService);