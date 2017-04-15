'use strict';

angular.module('core')

.service('SearchFieldQueryBuilder',
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
  })

.service('SearchQueryBuilder',
  function (SearchFieldQueryBuilder, Moment) {

    function cleanQuery(query) {

      var newQuery = {};

      _.forOwn(query, function (value, key) {

        if (!_.isObject(value)) {
          newQuery[key] = value;

        } else {

          _.forEach(_.keys(value), function (nestedKey) {

            if (_.includes(['gte', 'lte', 'in', 'or'], nestedKey)) {
              var val = nestedKey === 'lte' ? new Moment(value[nestedKey]).endOf('day').toDate() : value[nestedKey];
              _.merge(newQuery, _.set({}, key + '.$' + nestedKey, val));

            } else {
              var newKey = key + '.' + nestedKey;
              if (_.get(query, newKey)) {
                newQuery[newKey] = value[nestedKey];
              }
            }
          });
        }
      });

      if (query.searchTerm) {
        _.assign(newQuery, SearchFieldQueryBuilder.build(query.searchTerm));
      }

      console.log(newQuery);
      return _.omit(newQuery, 'searchTerm');
    }

    this.build = function (params) {
      return _.isString(params) ? SearchFieldQueryBuilder.build(params) : cleanQuery(params);
    };
  });
