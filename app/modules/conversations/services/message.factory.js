'use strict';

angular.module('conversations').factory('Message',
  function (Schema, User, UserAuth, Moment, $q) {

    /*var Message = new Schema('conversation/:conversation/message');

    Message.post('find', function (next) {
      this.author = new User(this.author);
      this.created.date = new Moment(this.created.date);
      next();
    });*/

    var Message = function (params) {
      _.assign(this, params);
    };

    Message.create = function (params) {
      var deffered = $q.defer();
      deffered.resolve(new Message(params));
      return deffered.promise;
    };

    Message.prototype.getAuthor = function () {
      return this.author;
    };

    Message.prototype.getDate = function () {
      return this.created.date;
    };

    var currentUser = UserAuth.getCurrentUser();

    Message.prototype.currentUserIsAuthor = function () {
      return currentUser.equals(this.getAuthor());
    };

    return Message;

  });
