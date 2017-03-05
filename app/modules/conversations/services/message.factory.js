'use strict';

angular.module('conversations').factory('Message',
  function (Schema, UserAuth, Moment) {

    var Message = new Schema('message');

    Message.post('find', function (next) {
      this.createdAt = new Moment(this.createdAt);
      next();
    });

    var currentUser = UserAuth.getCurrentUser();

    Message.prototype.currentUserIsAuthor = function () {
      return currentUser._id === this.author;
    };

    return Message;

  });
