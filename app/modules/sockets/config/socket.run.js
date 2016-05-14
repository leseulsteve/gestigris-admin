 'use strict';

 angular.module('interventions').run(
   function ($rootScope, $window, SocketFactory) {

     $rootScope.$on('UserAuth:signin:success', function () {
       SocketFactory.initSockets('http://localhost:9001/sockets', $window.localStorage.getItem('token'));
     });

     if ($rootScope.currentUser.isAuthentified()) {
       SocketFactory.initSockets('http://localhost:9001/sockets', $window.localStorage.getItem('token'));
     }
   });
