'use strict';

angular.module('core').directive('emailValidation',
  function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, elem, attr, ngModel) {

        function validate(value) {
          return _.isUndefined(value) || value === '' || !_.isNull(value.match(/^.+@.+\..+$/));
        }

        ngModel.$parsers.unshift(function (value) {
          ngModel.$setValidity('emailValidation', validate(value));
          return value;
        });

        ngModel.$formatters.unshift(function (value) {
          ngModel.$setValidity('emailValidation', validate(value));
          return value;
        });
      }
    };
  });
