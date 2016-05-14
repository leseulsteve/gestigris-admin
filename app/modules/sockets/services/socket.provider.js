'use strict';

angular.module('sockets').provider('SocketFactory',
  function () {

    var routes = [];

    return {

      addRoute: function (route) {
        routes.push(route);
      },

      $get: function ($rootScope, Socket) {

        return {
          initSockets: function (apiUrl, token) {

            _.forEach(routes, function (route) {
              var socket = new Socket({
                apiUrl: apiUrl,
                namespace: route,
                token: token
              });
              socket.initialize().then(function () {
                _.forEach(['created', 'updated', 'removed'], function (eventName) {
                  socket.on(eventName, function (data) {
                    $rootScope.$broadcast('Socket:' + route + ':' + eventName, data);
                  });
                });
              });
            });

          }
        };
      }
    };
  });
