'use strict';

angular.module('sockets').factory('Socket',
  function ($q, socketFactory) {

    var Socket = function (params) {
      this.isAuthenticated = false;
      this.ioSocket = io(params.apiUrl + '/' + params.namespace);
      this.token = params.token;
    };

    Socket.prototype.initialize = function () {

      var that = this;

      var deffered = $q.defer();

      this.socket = socketFactory({
        ioSocket: this.ioSocket
      });

      this.socket.on('connect', function () {
        console.log('socket connect');
        that.socket.emit('authenticate', {
          token: that.token
        });
      });

      this.socket.on('authenticated', function () {
        that.isAuthenticated = true;
        deffered.resolve();
        console.log('socket is jwt authenticated');
      });

      this.socket.on('unauthorized', function () {
        deffered.reject();
        console.log('socket unauthorized');
      });

      return deffered.promise;
    };

    Socket.prototype.on = function (eventName, cb) {
      this.socket.on(eventName, function (data) {
        cb(data);
      });
    };

    return Socket;

  });
