function TodoService($http) {
  const prefix = 'https://cors-anywhere.herokuapp.com/';
  const API = '//jsonplaceholder.typicode.com/todos/';

  function create() {}
  function retrieve() {
    return $http.get(prefix + API).then(function (response) {
      return response.data.splice(0, 10);
    });
  }
  function update() {}
  function remove() {}

  return {
    create: create,
    retrieve: retrieve,
    update: update,
    remove: remove,
  };
}

angular
  .module('app')
  .factory('TodoService', TodoService);