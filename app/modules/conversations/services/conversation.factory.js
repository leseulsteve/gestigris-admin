'use strict';

angular.module('conversations').factory('Conversation',
  function ($q, Schema, Message, User, UserAuth, Moment, Benevole) {

    /*var Conversation = new Schema('conversation');

    Conversation.post('find', function (next) {

      if (this.messages) {
        for (var i = 0; i < this.messages.length; i++) {
          this.messages[i] = new Message(this.messages[i]);
          this.messages[i].author = new User(this.messages[i].author);
          this.messages[i].created.date = new Moment(this.messages[i].created.date);
        }
      }

      if (this.participants) {
        for (var j = 0; j < this.participants.length; j++) {
          this.participants[j] = new User(this.participants[j]);
        }
      }

      next();
    });*/

    var Conversation = function (params) {
      _.assign(this, params);
      this.messages = [];
    };

    Conversation.findById = function () {

      return Benevole.find().then(function (benevoles) {
        return new Conversation({
          participants: _.take(benevoles, 7)
        });
      });
    };

    //

    Conversation.prototype.getMessages = function () {
      return this.messages;
    };

    Conversation.prototype.hasNewMessages = function () {

      var currentUser = UserAuth.getCurrentUser(),
        lastVisit = new Date(currentUser.getLastVisit()),
        lastMessage = this.getLastMessage();

      return lastMessage && new Date(lastMessage.created.date) > lastVisit && lastMessage.author._id !== currentUser._id;
    };

    Conversation.prototype.getLastMessage = function () {
      return _.last(_.sortBy(this.messages, function (message) {
        return new Date(message.created.date);
      }));
    };

    Conversation.prototype.getParticipants = function () {
      return this.participants;
    };

    Conversation.getFromTeam = function () {
      return Conversation.find({
        type: 'equipe'
      });
    };

    Conversation.getGeneral = function () {
      return Conversation.find({
        type: 'general'
      });
    };

    Conversation.prototype.getTitle = function () {
      return this.title;
    };

    return Conversation;

  });
