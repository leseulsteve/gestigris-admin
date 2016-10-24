'use strict';

var sortedPush = function (collection, item, predicate) {
  if (_.isFunction(predicate)) {
    collection.splice(_.sortedIndexBy(collection, item, predicate), 0, item);
    return collection;
  }
  if (_.isUndefined(predicate)) {
    collection.splice(_.sortedIndex(collection, item), 0, item);
    return collection;
  }
  if (_.isString(predicate)) {
    collection.splice(_.sortedIndexBy(collection, item, function (o) {
      return o[predicate];
    }), 0, item);
    return collection;
  }
};

_.mixin({
  'sortedPush': sortedPush
});
