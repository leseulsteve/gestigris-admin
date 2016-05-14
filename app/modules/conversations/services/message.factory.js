'use strict';

angular.module('conversations').factory('Message',
  function (Schema, User, UserAuth, Moment) {

    var Message = new Schema('conversation/:conversation/message');

    Message.post('find', function (next) {
      this.author = new User(this.author);
      this.created.date = new Moment(this.created.date);
      next();
    });

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
