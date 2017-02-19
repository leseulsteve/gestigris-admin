'use strict';

angular.module('core').service('SearchFieldQueryBuilder',
  function () {

    function getRegex(term) {
      return {
        'searchField': {
          $regex: '\\b' + _.deburr(term).toLowerCase() // \\b car l'expression doit représenter le début d'un mot
        }
      };
    }

    this.build = function (expression) {
      var splittedSearchTermsString = expression.split(' ');

      return splittedSearchTermsString.length === 1 ? getRegex(_.first(splittedSearchTermsString)) : {
        $and: _.map(splittedSearchTermsString, getRegex)
      };
    };
  });
