function todoAutofocus () {
  return {
    restrict: 'A',
    scope: false, //allows us to inherit the scope from the current context
    link: function ($scope, $element, $attrs) {
      $scope.$watch($attrs.todoAutofocus, function (newValue, oldValue) {
      //this allows to evaluate the expression and notify us when sth changes
      //we want to watch the value of the attributes, every time it changes we will get notified
      //and because in HTML where any assigning true or false to showEditField we get the value available in here
        if (!newValue) {
          return;
        }
        //if showEditField is true, we then want to focus in the input
        //becasue this watch function evaluates we need to use setTimeout to be able to push this event to the end of call stack
        setTimeout(function () {
          $element[0].focus();
        }, 0);
      });
    }
  };
}

angular
  .module('app')
  .directive('todoAutofocus', todoAutofocus);

//$watch - allows to watch expressions ina a particular scope
//$attrs - it is an object of attributes bound to the element of the directive