'use strict';

angular.module('interventions').config(
  function ($provide) {

    $provide.decorator('Conversation', function ($delegate, $rootScope, $q, Message, User, UserAuth, Benevole, SearchFieldQueryBuilder) {

      var Conversation = $delegate;

      Conversation.post('create', function (next) {
        $rootScope.$broadcast('Conversation:new:currentUser', this);
        next();
      });

      Conversation.search = function (params) {
        var query = {};
        if (_.isString(params)) {
          query = SearchFieldQueryBuilder.build(params);
        } else  {
          _.assign(query, params.title ? SearchFieldQueryBuilder.build(params.title) : undefined, _.omit(params, 'title'));
        }
        return Conversation.find(query);
      };

      Conversation.getNbNewMessages = function () {
        var currentUser = UserAuth.getCurrentUser();
        return Conversation.find({
          participants: currentUser._id,
          archived: false,
          type: {
            $ne: 'intervention'
          }
        }).then(function (conversations) {
          return Message.count({
            conversation: {
              $in: _.map(conversations, '_id')
            },
            readBy: {
              $ne: currentUser._id
            }
          });
        });
      };

      Conversation.prototype.toString = function () {
        return this.title;
      };

      Conversation.prototype.getParticipants = function () {
        return Benevole.find({
          _id: {
            $in: this.participants
          }
        });
      };

      Conversation.prototype.hasParticipants = function () {
        return this.participants.length !== 0;
      };

      Conversation.prototype.getMessages = function () {
        return Message.find({
          conversation: {
            $in: this._id
          }
        });
      };

      Conversation.prototype.archive = function () {
        return _.assign(this, {
          archived: true
        }).save().then(function (conversation) {
          $rootScope.$broadcast('Conversation:archived', conversation);
        });
      };

      /////////

      /*Conversation.post('find', function (next) {

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
      });

      //

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
        };*/

      return Conversation;

    });
  });
