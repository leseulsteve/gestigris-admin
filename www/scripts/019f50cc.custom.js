'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function () {
  // Init module configuration options
  var applicationModuleName = 'angularjsapp';
  var applicationModuleVendorDependencies = [
    'gestigris-common'
  ];

  // Add a new vertical module
  var registerModule = function (moduleName, dependencies) {
    // Create angular module
    angular
      .module(moduleName, dependencies || []);

    // Add the module to the AngularJS configuration file
    angular
      .module(applicationModuleName)
      .requires
      .push(moduleName);
  };

  return {
    applicationModuleName: applicationModuleName,
    applicationModuleVendorDependencies: applicationModuleVendorDependencies,
    registerModule: registerModule
  };
})();
;
'use strict';

angular
  .module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

angular
  .module(ApplicationConfiguration.applicationModuleName)
  .config(['$locationProvider',
    function ($locationProvider) {
      $locationProvider.hashPrefix('!');
    }
  ]);

//Then define the init function for starting up the application
angular
  .element(document)
  .ready(function () {
    if (window.location.hash === '#_=_') {
      window.location.hash = '#!';
    }
    angular
      .bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
  });
;
'use strict';

ApplicationConfiguration.registerModule('benevoles');
;
'use strict';

ApplicationConfiguration.registerModule('core');
;
'use strict';

ApplicationConfiguration.registerModule('dashboard');
;
'use strict';

ApplicationConfiguration.registerModule('interventions', ['navigation']);
;
'use strict';

ApplicationConfiguration.registerModule('messages', ['navigation', 'benevoles']);
;
'use strict';

ApplicationConfiguration.registerModule('navigation');
;
'use strict';

ApplicationConfiguration.registerModule('search');
;
'use strict';

ApplicationConfiguration.registerModule('users');
;
"use strict";

angular.module('core')

.constant('ENV', 'development')

.constant('APP', {name:'Administration',version:'BETA-1'})

;;
'use strict';

angular.module('benevoles').config(
  ['$stateProvider', function ($stateProvider) {

    $stateProvider.

    state('benevoles', {
      url: '/benevoles',
      title: 'Bénévoles',
      templateUrl: 'modules/benevoles/views/benevoles.section.html',
      controller: 'BenevolesSectionController',
      controllerAs: 'benevolesSectionCtrl',
      resolve: {
        benevoles: ['Benevole', function (Benevole) {
          return Benevole.find();
        }]
      },
      toolbar: {
        tools: [{
          icon: 'content:add',
          action: 'addBenevole'
        }]
      }
    });
  }]);
;
'use strict';

angular.module('core').run(
  ['$window', function ($window) {

    var t0 = Number($window.localStorage.unloadEventFlag);
    if (isNaN(t0)) {
      t0 = 0;
    }
    if (new Date().getTime() - t0 > 10 * 1000) {
      // 10 seconds
      $window.localStorage.setItem('lastVisit', new Date());
    }

    $window.addEventListener('beforeunload', function () {
      $window.localStorage.unloadEventFlag = new Date().getTime();
    });

  }]);
;
'use strict';

angular.module('core')
  .config(['$mdThemingProvider', function ($mdThemingProvider) {

    $mdThemingProvider.theme('default')
      .primaryPalette('redGris')
      .accentPalette('orangeGris')
      .warnPalette('vertGris');
  }]);
;
'use strict';

angular.module('dashboard').config(
  ['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider.

    state('home', {
      url: '/',
      title: 'Gestigris',
      templateUrl: 'modules/dashboard/views/dashboard.html',
      controller: 'DashboardController',
      controllerAs: 'dashboardCtrl'
    });
  }]);
;
'use strict';

angular.module('interventions').config(
  ['FabSpeedDialServiceProvider', 'INTERVENTIONS', function (FabSpeedDialServiceProvider, INTERVENTIONS) {

    FabSpeedDialServiceProvider.addItem({
      tooltip: 'plage d\'intervention',
      icon: INTERVENTIONS.ICONS.PLAGE
    });

  }]);
;
'use strict';

angular.module('interventions').constant('INTERVENTIONS', {
  ICONS: {
    PLAGE: 'action:event'
  }
});
;
'use strict';

angular.module('interventions').config(
  ['$stateProvider', function ($stateProvider) {

    $stateProvider.

    state('interventions', {
      url: '/interventions',
      templateUrl: 'modules/interventions/views/interventions.section.html',
      controller: 'InterventionsSectionController',
      controllerAs: 'interventionsSectionCtrl'
    });
  }]);
;
'use strict';

angular.module('messages').config(
  ['FabSpeedDialServiceProvider', 'MESSAGES', function (FabSpeedDialServiceProvider, MESSAGES) {

    FabSpeedDialServiceProvider.addItem({
      tooltip: 'message',
      icon: MESSAGES.ICONS.MESSAGE,
      dialog: {
        templateUrl: 'modules/messages/views/nouveau-message.dialog.html',
        controller: 'NouveauMessageController',
        controllerAs: 'nouveauMessageCtrl'
      }
    });

  }]);
;
'use strict';

angular.module('messages').constant('MESSAGES', {
  ICONS: {
    MESSAGE: 'communication:message'
  }
});
;
'use strict';

angular.module('users')
  .config(['UserAuthProvider', function (UserAuthProvider) {

    UserAuthProvider.config({
      userSchema: 'User',
      loginStateName: 'home'
    });
  }]);
;
'use strict';

angular.module('interventions').factory('Benevole',
  ['$q', '$timeout', function ($q, $timeout) {

    var Benevole = function (params) {
      _.assign(this, params);
      this.fullname = this.toString();
      this.image = 'https://www.govloop.com/wp-content/uploads/avatars/2/3819dcd8c7718dd630a1aaefe12dc925-bpthumb.jpg';
    };

    Benevole.prototype.remove = function () {
      var deffered = $q.defer();
      $timeout(function () {
        deffered.resolve();
      }, 500);
      return deffered.promise;
    };

    Benevole.prototype.sendMessage = function (message) {
      var deffered = $q.defer();
      $timeout(function () {
        deffered.resolve(message);
      }, 500);
      return deffered.promise;
    };

    Benevole.prototype.toString = function () {
      return this.prenom + ' ' + this.nomFamille;
    };

    var benevoles = _.map([{
      _id: 1,
      prenom: 'Steve',
      nomFamille: 'Boisvert',
      role: 'Intervenant'
    }, {
      _id: 2,
      prenom: 'Kevin',
      nomFamille: 'Smith',
      role: 'Intervenant'
    }, {
      _id: 3,
      prenom: 'Steve',
      nomFamille: 'Boisvert',
      role: 'Intervenant'
    }, {
      _id: 4,
      prenom: 'Steve',
      nomFamille: 'Boisvert',
      role: 'Intervenant'
    }, {
      _id: 5,
      prenom: 'Steve',
      nomFamille: 'Boisvert',
      role: 'Intervenant'
    }, {
      _id: 6,
      prenom: 'Steve',
      nomFamille: 'Boisvert',
      role: 'Intervenant'
    }, {
      _id: 7,
      prenom: 'Steve',
      nomFamille: 'Boisvert',
      role: 'Intervenant'
    }, {
      _id: 8,
      prenom: 'Steve',
      nomFamille: 'Boisvert',
      role: 'Intervenant'
    }, {
      _id: 9,
      prenom: 'Steve',
      nomFamille: 'Boisvert',
      role: 'Intervenant'
    }, {
      _id: 10,
      prenom: 'Steve',
      nomFamille: 'Boisvert',
      role: 'Intervenant'
    }, {
      _id: 11,
      prenom: 'Steve',
      nomFamille: 'Boisvert',
      role: 'Intervenant'
    }, {
      _id: 12,
      prenom: 'Steve',
      nomFamille: 'Boisvert',
      role: 'Intervenant'
    }, {
      _id: 13,
      prenom: 'Steve',
      nomFamille: 'Boisvert',
      role: 'Intervenant'
    }], function (benevole) {
      return new Benevole(benevole);
    });

    return {
      find: function () {
        var deffered = $q.defer();
        $timeout(function () {
          deffered.resolve(benevoles);
        }, 1000);
        return deffered.promise;
      },
      findById: function (id) {
        var deffered = $q.defer();
        $timeout(function () {
          deffered.resolve(_.find(benevoles, '_id', id));
        }, 1000);
        return deffered.promise;
      },
      search: function (query) {
        console.log(query);
        var deffered = $q.defer();
        $timeout(function () {
          deffered.resolve(benevoles);
        }, 1000);
        return deffered.promise;
      }
    };

  }]);
;
'use strict';

angular.module('interventions').factory('Intervention',
  ['$q', 'Moment', function ($q, Moment) {

    var Intervention = {};

    Intervention.findByPlageId = function () {
      var deffered = $q.defer();
      deffered.resolve([{
        date: {
          start: new Moment(),
          end: new Moment()
        },
        etablissement: {
          toString: function () {
            return 'École Secondaire de Neufchâtel';
          }
        },
        tags: [{
          name: 'secondaire 3'
        }],
        participants: [{}, {}, {}],
        isBooked: function () {
          return true;
        }
      }, {
        date: {
          start: new Moment(),
          end: new Moment()
        },
        etablissement: {
          toString: function () {
            return 'École Secondaire de Neufchâtel';
          }
        },
        tags: [{
          name: 'secondaire 3'
        }],
        demandes: [{}, {}, {}],
        participants: [{}, {}, {}],
        isBooked: function () {
          return false;
        }
      }, {
        date: {
          start: new Moment(),
          end: new Moment()
        },
        etablissement: {
          toString: function () {
            return 'École Secondaire de Neufchâtel';
          }
        },
        tags: [{
          name: 'secondaire 3'
        }],
        demandes: [{}, {}, {}],
        participants: [{}, {}, {}],
        isBooked: function () {
          return false;
        }
      }, {
        date: {
          start: new Moment(),
          end: new Moment()
        },
        etablissement: {
          toString: function () {
            return 'École Secondaire de Neufchâtel';
          }
        },
        tags: [{
          name: 'secondaire 3'
        }],
        demandes: [{}, {}, {}],
        participants: [{}, {}, {}],
        isBooked: function () {
          return false;
        }
      }]);
      return deffered.promise;
    };

    return Intervention;

  }]);
;
'use strict';

angular.module('interventions').factory('PlageIntervention',
  ['$q', 'Moment', function ($q, Moment) {

    var PlageIntervention = {};

    PlageIntervention.find = function () {
      var deffered = $q.defer();
      deffered.resolve([{
        date: new Moment(),
        etablissement: {
          toString: function () {
            return 'École Secondaire de Neufchâtel';
          }
        }
      }, {
        date: new Moment(),
        etablissement: {
          toString: function () {
            return 'École Secondaire de Neufchâtel';
          }
        }
      }, {
        date: new Moment(),
        etablissement: {
          toString: function () {
            return 'École Secondaire de Neufchâtel';
          }
        }
      }, {
        date: new Moment(),
        etablissement: {
          toString: function () {
            return 'École Secondaire de Neufchâtel';
          }
        }
      }, {
        date: new Moment(),
        etablissement: {
          toString: function () {
            return 'École Secondaire de Neufchâtel';
          }
        }
      }]);
      return deffered.promise;
    };

    return PlageIntervention;

  }]);
;
'use strict';

angular.module('navigation').provider('FabSpeedDialService',
  function () {

    var items = [];

    return {

      addItem: function (item) {
        items.push(item);
      },

      $get: function () {

        var FabSpeedDialService = {};

        FabSpeedDialService.getItems = function () {
          return items;
        };

        return FabSpeedDialService;

      }
    };

  });
;
'use strict';

angular.module('search').service('SearchService',
  ['$q', function ($q) {

    var SearchService = {};

    SearchService.search = function (term) {
      console.log(term);

      var deffered = $q.defer();

      deffered.resolve([{
        description: 'École secondaire Neufchâtel',
        type: 'École',
        icon: 'social:school'
      }, {
        description: 'Vincent Chouinard',
        type: 'Employé',
        icon: 'action:account_circle'
      }, {
        description: '3 Mai 2015 - École secondaire Neufchâtel',
        type: 'Plage d\'interventions',
        icon: 'action:event'
      }, {
        description: '4 Mai 2015 - École secondaire Neufchâtel',
        type: 'Plage d\'interventions',
        icon: 'action:event'
      }]);

      return deffered.promise;

    };

    return SearchService;
  }]);
;
'use strict';

angular.module('users').factory('User',
  ['Schema', '$window', function (Schema, $window) {

    var User = new Schema('user');

    User.post('find', function (next) {
      next();
    });

    User.prototype.toString = function () {
      return this.pseudo;
    };

    User.prototype.getFullName = function () {
      return this.firstname + ' ' + this.lastname;
    };

    User.prototype.getTitle = function () {
      return this.title;
    };

    User.prototype.getLastVisit = function () {
      var lastVisit = $window.localStorage.getItem('lastVisit');
      return lastVisit ? new Date(lastVisit) : undefined;
    };

    User.prototype.equals = function (user) {
      return user.pseudo === this.pseudo;
    };

    return User;

  }]);
;
'use strict';

angular.module('benevoles').directive('benevoleFiche',
  function () {
    return {
      restrict: 'E',
      templateUrl: 'modules/benevoles/views/benevole.fiche.html',
      controller: 'BenevoleFicheController',
      controllerAs: 'benevoleFicheCtrl',
      scope: {
        benevole: '='
      }
    };
  });
;
'use strict';

angular.module('dashboard').directive('dashboardCardContent',
  function () {
    return {
      restrict: 'E',
      compile: function (iElement) {
        iElement.attr('layout', 'column');
        iElement.attr('flex', '');
      }
    };
  });
;
'use strict';

angular.module('dashboard').directive('dashboardCardHeader',
  function () {
    return {
      restrict: 'E',
      compile: function (iElement) {
        iElement.attr('layout', 'row');
        iElement.attr('layout-align', 'start center');
        iElement.find('h3').addClass('md-title');
      }
    };
  });
;
'use strict';

angular.module('dashboard').directive('dashboardCard',
  function () {
    return {
      restrict: 'E',
      scope: {
        expandId: '@'
      },
      templateUrl: 'modules/dashboard/views/dashboard.card.html',
      controller: 'DashboardCardController',
      controllerAs: 'dashboardCardCtrl',
      transclude: true
    };
  });
;
'use strict';

angular.module('dashboard').directive('dashboardFullscreenHeaderCard',
  function () {
    return {
      restrict: 'E',
      templateUrl: 'modules/dashboard/views/dashboard-fullscreen-header.card.html',
      controller: ['$rootScope', function ($rootScope) {
        this.close = function () {
          $rootScope.$broadcast('Dialog:close');
        };
      }],
      controllerAs: 'dashboardFullscreenHeaderCtrl'
    };
  });
;
'use strict';

angular.module('interventions').directive('interventionCard',
  function () {
    return {
      restrict: 'E',
      templateUrl: 'modules/interventions/views/intervention.card.html',
      controller: 'InterventionCardController',
      controllerAs: 'interventionCardCtrl',
      link: function (scope, element) {
        if (scope.intervention.isBooked()) {
          element.addClass('booked');
        }
      }
    };
  });
;
'use strict';

angular.module('interventions').directive('plageIntervention',
  function () {
    return {
      restrict: 'E',
      templateUrl: 'modules/interventions/views/plage-intervention.html',
      controller: 'PlageInterventionController',
      controllerAs: 'plageInterventionCtrl'
    };
  });
;
'use strict';

angular.module('navigation').directive('fabSpeedDial',
  function () {
    return {
      restrict: 'E',
      templateUrl: 'modules/navigation/views/fab-speed-dial.html',
      controller: 'FabSeedDialController',
      controllerAs: 'fabSeedDialCtrl'
    };
  });
;
'use strict';

angular.module('navigation').directive('sidenav',
  function () {
    return {
      restrict: 'E',
      templateUrl: 'modules/navigation/views/sidenav.html',
      controller: 'SidenavController',
      controllerAs: 'sidenavCtrl'
    };
  });
;
'use strict';

angular.module('navigation').directive('toolbar',
  function () {
    return {
      restrict: 'E',
      templateUrl: 'modules/navigation/views/toolbar.html',
      controller: 'ToolbarController',
      controllerAs: 'toolbarCtrl'
    };
  });
;
'use strict';

angular.module('interventions').controller('BenevoleFicheController',
  ['$scope', '$mdDialog', '$mdToast', function ($scope, $mdDialog, $mdToast) {

    var ctrl = this;

    ctrl.sendMessage = function ($event, benevole) {

      $scope.cancelModal = function () {
        $mdDialog.cancel();
      };

      $scope.closeModal = function (form) {
        if (form.$valid) {
          $mdDialog.hide();
        }
      };

      $scope.message = {};

      $mdDialog.show({
        templateUrl: 'modules/benevoles/views/message.dialogue.html',
        parent: angular.element(document.body),
        targetEvent: $event,
        clickOutsideToClose: true,
        scope: $scope
      }).then(function () {
        benevole.sendMessage($scope.message).then(function () {
          $mdToast.show(
            $mdToast.simple()
            .textContent('Le message à été envoyé.')
          );
        });
      });
    };

    ctrl.deleteBenevole = function ($event, benevole) {

      var confirmDelete = $mdDialog.confirm()
        .title('Êtes-vous certain de vouloir supprimer ' + benevole.toString() + '?')
        .textContent('Cette opération est irréversible.')
        .ariaLabel('Suppression bénévole')
        .targetEvent($event)
        .ok('Oui')
        .cancel('Une autre fois');

      $mdDialog.show(confirmDelete).then(function () {
        benevole.remove().then(function () {
          $mdToast.show(
            $mdToast.simple()
            .textContent(benevole.toString() + ' a été supprimé.')
          );
        });
      });
    };

  }]);
;
'use strict';

angular.module('interventions').controller('BenevolesSectionController',
  ['$rootScope', 'Benevole', '$mdDialog', function ($rootScope, Benevole, $mdDialog) {

    var ctrl = this;

    Benevole.find().then(function (benevoles) {

      ctrl.showProfile = function (benevole) {
        ctrl.currentProfile = undefined;
        Benevole.findById(benevole._id).then(function (benevole) {
          ctrl.currentProfile = benevole;
        });
      };

      ctrl.benevoles = benevoles;
      ctrl.showProfile(_.first(benevoles));

      $rootScope.$on('Toolbar:addBenevole', function ($event, targetEvent) {
        $mdDialog.show({
          templateUrl: 'modules/benevoles/views/benevole.form-dialogue.html',
          parent: angular.element(document.body),
          targetEvent: targetEvent
        });
      });

    });

  }]);
;
'use strict';

angular.module('dashboard').controller('DashboardCardController',
  ['$rootScope', '$mdDialog', function ($rootScope, $mdDialog) {

    var ctrl = this;

    ctrl.expand = function ($event, cardName) {

      var dialog = {
        targetEvent: $event,
        fullscreen: true
      };

      switch (cardName) {
      case 'benevoles':
        _.assign(dialog, {
          controller: 'BenevolesSectionController',
          controllerAs: 'benevolesSectionCtrl',
          templateUrl: 'modules/benevoles/views/benevoles.section.html',
          parent: angular.element(document.body)
        });
      }

      if (cardName) {
        $mdDialog.show(dialog);
      }

      $rootScope.$on('Dialog:close', function () {
        $mdDialog.hide();
      });

    };

  }]);
;
'use strict';

angular.module('dashboard').controller('DashboardController',
  function () {

  });
;
'use strict';

angular.module('interventions').controller('InterventionCardController',
  ['$scope', '$mdDialog', function ($scope, $mdDialog) {

    var ctrl = this;

    ctrl.showDetails = function ($event) {
      $mdDialog.show({
        templateUrl: 'modules/interventions/views/intervention.dialog.html',
        controller: 'InterventionDialogController',
        controllerAs: 'interventionDialogCtrl',
        scope: $scope,
        targetEvent: $event,
        fullscreen: true
      });
    };

  }]);
;
'use strict';

angular.module('interventions').controller('InterventionDialogController',
  function () {

    //   var ctrl = this;

  });
;
'use strict';

angular.module('interventions').controller('InterventionsSectionController',
  ['PlageIntervention', function (PlageIntervention) {

    var ctrl = this;

    PlageIntervention.find().then(function (plages) {
      ctrl.plages = plages;
    });

    ctrl.addPlage = function () {

    };

    //	var carousel = $('.carousel'),
    var seats = $('.carousel-seat');

    function getNext(el) {
      console.log(el.next().length);
      return el.next().length > 0 ? el.next() : seats.first();
    }

    ctrl.next = function () {

      var el = $('.is-ref').removeClass('is-ref');

      var newSeat = getNext(el);

      newSeat.addClass('is-ref');

      for (var i = 2; i < seats.length; i++) {
        newSeat = getNext(newSeat);
        newSeat.css('order', i);
        console.log(newSeat.css());

      }

    };

  }]);
;
'use strict';

angular.module('interventions').controller('PlageInterventionController',
  ['$scope', 'Intervention', function ($scope, Intervention) {

    var ctrl = this;

    Intervention.findByPlageId($scope.plage._id).then(function (interventions) {
      ctrl.interventions = interventions;
    });

    ctrl.addIntervention = function () {
      console.log('Adding intervention');
    };

  }]);
;
'use strict';

angular.module('messages').controller('NouveauMessageController',
  ['$scope', 'Benevole', function ($scope, Benevole) {

    var ctrl = this;

    $scope.message = {
      destinataires: []
    };

    ctrl.searchDestinataires = function(query) {
      return Benevole.search(query).then(function(results) {
        return _.difference(results, $scope.message.destinataires);
      });
    };

    ctrl.send = function (messageForm) {
      messageForm.destinataires.$setValidity('required', $scope.message.destinataires.length > 0);
      console.log(messageForm.destinataires);
      if (messageForm.$valid) {
        console.log('SEND MESSAGE');
      }
    };

  }]);
;
'use strict';

angular.module('navigation').controller('FabSeedDialController',
  ['FabSpeedDialService', '$mdDialog', function (FabSpeedDialService, $mdDialog) {

    var ctrl = this;

    ctrl.items = FabSpeedDialService.getItems();

    ctrl.handleClick = function ($event, item) {

      $mdDialog.show(_.assign(item.dialog, {
        parent: angular.element(document.body),
        targetEvent: $event,
        clickOutsideToClose: true
      }));
    };
  }]);
;
'use strict';

angular.module('interventions').controller('SidenavController',
  ['$rootScope', '$mdSidenav', function ($rootScope, $mdSidenav) {

    var ctrl = this;

    $rootScope.$on('sidenav:toggle', function () {
      $mdSidenav('sidenav').toggle();
    });

    ctrl.closeSidenav = function () {
      if ($mdSidenav('sidenav').isOpen()) {
        $mdSidenav('sidenav').toggle();
      }
    };

  }]);
;
'use strict';

angular.module('interventions').controller('ToolbarController',
  ['SearchService', function (SearchService) {

    var ctrl = this;

    ctrl.search = SearchService.search;

    ctrl.selectSearchResult = function () {

    };

    /* $rootScope.$on('$stateChangeSuccess', function (event, toState) {

       if (toState.toolbar && toState.toolbar.tools) {
         ctrl.tools = toState.toolbar.tools;
         ctrl.handleAction = function ($event, action) {
           $rootScope.$broadcast('Toolbar:' + action, $event);
         };
       } else {
         ctrl.tools = undefined;
       }
     });

     ctrl.showSidenav = function () {
       $rootScope.$broadcast('sidenav:toggle');
     };*/

  }]);
;
angular.module('angularjsapp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('modules/benevoles/views/benevole.fiche.html',
    "<md-card layout=column flex><div layout=column layout-padding class=fiche-header><div layout=row><span flex></span><md-button class=md-icon-button ng-click=\"benevoleFicheCtrl.sendMessage($event, benevole)\"><md-icon md-svg-icon=communication:message></md-icon><md-tooltip>Message</md-tooltip></md-button><md-button class=md-icon-button ng-click=\"benevoleFicheCtrl.deleteBenevole($event, benevole)\"><md-icon md-svg-icon=action:delete></md-icon><md-tooltip>Supprimer</md-tooltip></md-button></div><span flex></span><div layout=row class=benevoles-infos><div layout=row layout-align=\"center start\"><avatar></avatar></div><div layout=column layout-align=\"center start\"><span class=md-title>{{ benevole.toString() }}</span> <span class=md-subhead>{{ benevole.role }}</span></div></div></div><md-content flex style=overflow:visible><md-tabs layout-fill flex class=\"benevole-fiche-tabs md-accent\"><md-tab layout-fill><md-tab-label>Activité</md-tab-label><md-tab-body><md-content layout-padding layout=row flex><div flex=60></div><div class=md-whiteframe-1dp flex=40><md-toolbar><div class=md-toolbar-tools><h2>Récent</h2></div></md-toolbar><md-list><md-list-item class=md-2-line><md-icon md-svg-icon=communication:message></md-icon><div class=md-list-item-text><h3>Qqchose</h3><p>description</p></div><md-divider></md-divider></md-list-item><md-list-item class=md-2-line><md-icon md-svg-icon=content:add></md-icon><div class=md-list-item-text><h3>Qqchose</h3><p>description</p></div><md-divider></md-divider></md-list-item><md-list-item class=md-2-line><md-icon md-svg-icon=communication:message></md-icon><div class=md-list-item-text><h3>Qqchose</h3><p>description</p></div><md-divider></md-divider></md-list-item><md-list-item class=md-2-line><md-icon md-svg-icon=communication:message></md-icon><div class=md-list-item-text><h3>Qqchose</h3><p>description</p></div><md-divider></md-divider></md-list-item><md-list-item class=md-2-line><md-icon md-svg-icon=communication:message></md-icon><div class=md-list-item-text><h3>Qqchose</h3><p>description</p></div><md-divider></md-divider></md-list-item></md-list></div></md-content></md-tab-body></md-tab><md-tab><md-tab-label>Profil</md-tab-label><md-tab-body><md-content layout-padding layout=row flex><form name=userProfileForm ng-submit=profilCtrl.saveProfile(userProfileForm) novalidate><div layout=row><div layout=column flex=40 layout-align=\"center center\"><avatar class=profile user=profilCtrl.user click-to-update></avatar></div><span flex=10></span><div layout=column flex=40><md-input-container flex><label>Prénom</label><input name=prenom required ng-model=profilCtrl.user.firstname><ng-messages for=userProfileForm.prenom.$error role=alert><ng-message when=required>requis.</ng-message></ng-messages></md-input-container><md-input-container flex><label>Nom de famille</label><input name=nom required ng-model=profilCtrl.user.lastname><ng-messages for=userProfileForm.nom.$error role=alert><ng-message when=required>requis.</ng-message></ng-messages></md-input-container></div></div><div layout=row><md-input-container flex=40><label>Rôle</label><input name=titre ng-model=profilCtrl.user.title disabled></md-input-container><span flex=10></span><md-input-container flex=40><label>Date de naissance</label><input name=dateNaissance type=date required ng-model=profilCtrl.user.dateNaissance><ng-messages for=userProfileForm.dateNaissance.$error role=alert><ng-message when=required>requis.</ng-message></ng-messages></md-input-container></div><div layout=row><md-input-container flex=40><label>Pseudo</label><input name=pseudo required ng-model=profilCtrl.user.pseudo><ng-messages for=userProfileForm.pseudo.$error role=alert><ng-message when=required>requis.</ng-message></ng-messages></md-input-container><span flex=10></span><md-input-container flex=40><label>Courriel</label><input name=email required ng-model=profilCtrl.user.email type=email><ng-messages for=userProfileForm.email.$error role=alert><ng-message when=required>requis.</ng-message></ng-messages></md-input-container></div><div layout=row><input style=display:none><md-input-container flex=40><label>Nouveau mot de passe</label><input name=password autocomplete=off ng-model=profilCtrl.user.password type=password></md-input-container><span flex=10></span><md-input-container flex=40><label>Vérification mot de passe</label><input name=passwordMatch ng-disabled=\"profilCtrl.user.password === undefined\" ng-required=profilCtrl.user.password ng-model=profilCtrl.user.passwordMatch type=password><ng-messages for=userProfileForm.passwordMatch.$error role=alert><ng-message when=required>requis.</ng-message></ng-messages></md-input-container></div><div layout=row layout-align=\"end center\"><md-button class=\"md-raised md-primary\" ng-disabled=userProfileForm.$pristine type=submit>Sauvegarder</md-button></div></form></md-content></md-tab-body></md-tab></md-tabs></md-content></md-card>"
  );


  $templateCache.put('modules/benevoles/views/benevole.form-dialogue.html',
    "<md-dialog aria-label=\"Nouveau message\" style=width:800px><form novalidate name=benevoleForm ng-submit=closeModal(benevoleForm)><md-toolbar><div class=md-toolbar-tools><h2>Nouveau bénévole</h2><span flex></span><md-button class=md-icon-button ng-click=cancel()><md-icon md-svg-icon=navigation:close aria-label=\"Close dialog\"></md-icon></md-button></div></md-toolbar><md-dialog-content><div class=md-dialog-content></div></md-dialog-content><md-dialog-actions layout=row><md-button type=button ng-click=cancelModal()>Annuler</md-button><md-button type=submit style=margin-right:20px>Ajouter</md-button></md-dialog-actions></form></md-dialog>"
  );


  $templateCache.put('modules/benevoles/views/benevoles.section.html',
    "<md-dialog aria-label=\"Liste bénévoles\" layout=column><dashboard-fullscreen-header-card></dashboard-fullscreen-header-card><md-subheader class=filter-bar><md-input-container md-no-float class=\"md-block md-icon-right\"><md-icon md-svg-icon=action:search></md-icon><input ng-model=search placeholder=recherche... ng-change=benevolesSectionCtrl.doSearch(search) ng-model-options=\"{ debounce: 1000 }\"><md-icon md-svg-icon=content:clear ng-show=search ng-click=\"search = undefined;benevolesSectionCtrl.clearSearch()\"></md-icon></md-input-container></md-subheader><md-dialog-content layout=row flex ng-if=!benevolesSectionCtrl.emptySearchResults><md-card layout=column flex=30 flex-gt-lg=20 class=card-list><md-content layout=column flex><md-list flex layout=column><md-list-item class=md-2-line ng-class=\"{ active : benevole._id === benevolesSectionCtrl.currentProfile._id }\" ng-repeat=\"benevole in benevolesSectionCtrl.benevoles\" ng-click=benevolesSectionCtrl.showProfile(benevole)><div class=md-list-item-text><h3>{{ benevole.toString() }}</h3><p>{{ benevole.role }}</p></div><md-divider ng-if=!$last></md-divider></md-list-item></md-list></md-content></md-card><div flex=70 flex-gt-lg=80 layout=column><div layout=row flex layout-align=\"center center\" ng-hide=benevolesSectionCtrl.currentProfile><md-progress-circular md-diameter=280 md-mode=indeterminate></md-progress-circular></div><benevole-fiche benevole=benevolesSectionCtrl.currentProfile ng-show=benevolesSectionCtrl.currentProfile layout=column flex></benevole-fiche></div></md-dialog-content><md-dialog-content layout=row flex layout-align=\"center center\" ng-if=benevolesSectionCtrl.emptySearchResults><div layout=column flex layout-align=\"center center\"><md-icon md-svg-icon=social:mood_bad style=height:280px;width:280px></md-icon><h1 class=md-display-1>Aucun résultat</h1><small class=.md-caption>C'est quoi cette recherche?</small></div></md-dialog-content></md-dialog>"
  );


  $templateCache.put('modules/benevoles/views/message.dialogue.html',
    "<md-dialog aria-label=\"Nouveau message\" style=width:800px><form novalidate name=messageForm ng-submit=closeModal(messageForm)><md-toolbar><div class=md-toolbar-tools><h2>Nouveau message</h2><span flex></span><md-button class=md-icon-button ng-click=cancel()><md-icon md-svg-icon=navigation:close aria-label=\"Close dialog\"></md-icon></md-button></div></md-toolbar><md-dialog-content><div class=md-dialog-content><md-input-container class=md-block><label>Sujet</label><input name=subject ng-model=message.subject required><div ng-messages=messageForm.subject.$error><div ng-message=required>requis.</div></div></md-input-container><md-input-container class=md-block><label>Message</label><textarea name=body ng-model=message.body rows=5 required></textarea><div ng-messages=messageForm.body.$error><div ng-message=required>requis.</div></div></md-input-container></div></md-dialog-content><md-dialog-actions layout=row><md-button type=button ng-click=cancelModal()>Annuler</md-button><md-button type=submit style=margin-right:20px>Envoyer</md-button></md-dialog-actions></form></md-dialog>"
  );


  $templateCache.put('modules/dashboard/views/dashboard-fullscreen-header.card.html',
    "<div layout=row><span flex></span><md-button aria-label=FullScreen ng-click=dashboardFullscreenHeaderCtrl.close() class=md-icon-button><md-icon md-svg-icon=navigation:fullscreen_exit></md-icon></md-button></div>"
  );


  $templateCache.put('modules/dashboard/views/dashboard.card.html',
    "<md-card><md-card-header><span flex></span><md-button aria-label=FullScreen ng-click=\"dashboardCardCtrl.expand($event, expandId)\" class=md-icon-button><md-icon md-svg-icon=navigation:fullscreen></md-icon></md-button></md-card-header><md-card-content layout=column flex ng-transclude></md-card-content></md-card>"
  );


  $templateCache.put('modules/dashboard/views/dashboard.html',
    "<md-content flex style=padding:8px class=layout-bg><md-grid-list md-cols-xs=1 md-cols-sm=2 md-cols-md=4 md-cols-gt-md=6 md-row-height-gt-md=1:1 md-row-height=2:2 md-gutter=12px md-gutter-gt-sm=8px><md-grid-tile md-rowspan=3 md-colspan=2 md-colspan-sm=1 md-colspan-xs=1><dashboard-card><dashboard-card-header><md-button aria-label=Avant class=md-icon-button><md-icon md-svg-icon=navigation:chevron_left></md-icon></md-button><h3 class=text-center flex>Aujourd'hui</h3><md-button aria-label=Arpès class=md-icon-button><md-icon md-svg-icon=navigation:chevron_right></md-icon></md-button></dashboard-card-header><dashboard-card-content><md-list><md-list-item><div flex=20 layout=row><div class=md-display-1>15</div><div class=md-subhead>30</div></div><div flex layout=column><div class=md-subhead>École secondaire de Neufchâtel</div><div class=md-caption>intervention</div></div><md-icon md-svg-icon=navigation:check></md-icon></md-list-item><md-list-item><div flex=20 layout=row><div class=md-display-1>16</div><div class=md-subhead>45</div></div><div flex layout=column><div class=md-subhead>École secondaire de Neufchâtel</div><div class=md-caption>intervention</div></div><md-icon md-svg-icon=navigation:check></md-icon></md-list-item></md-list></dashboard-card-content></dashboard-card></md-grid-tile><md-grid-tile><dashboard-card><dashboard-card-content layout-align=\"center center\"><div layout=column class=text-center><div class=md-display-1>3</div><div class=md-title>nouveaux</div><div class=md-title>messages</div></div></dashboard-card-content></dashboard-card></md-grid-tile><md-grid-tile><dashboard-card expand-id=benevoles><dashboard-card-content flex><md-content flex layout=column layout-align=\"center center\" class=text-center><div class=md-display-1>340</div><div class=md-title>bénévoles</div></md-content></dashboard-card-content></dashboard-card></md-grid-tile><md-grid-tile md-rowspan=4></md-grid-tile><md-grid-tile md-rowspan=2 md-colspan=2 md-colspan-sm=1 md-colspan-xs=1><dashboard-card><dashboard-card-header><h3 class=text-center flex>Urgences</h3></dashboard-card-header><dashboard-card-content><md-list><md-list-item><div flex=20 layout=row><div class=md-display-1>15</div><div class=md-subhead>30</div></div><div flex layout=column><div class=md-subhead>École secondaire de Neufchâtel</div><div class=md-caption>intervention</div></div><md-icon md-svg-icon=alert:warning></md-icon></md-list-item><md-list-item><div flex=20 layout=row><div class=md-display-1>16</div><div class=md-subhead>45</div></div><div flex layout=column><div class=md-subhead>École secondaire de Neufchâtel</div><div class=md-caption>intervention</div></div><md-icon md-svg-icon=alert:warning></md-icon></md-list-item></md-list></dashboard-card-content></dashboard-card></md-grid-tile></md-grid-list></md-content>"
  );


  $templateCache.put('modules/interventions/views/intervention.card.html',
    "<md-card md-ink-ripple ng-click=interventionCardCtrl.showDetails($event)><md-card-header layout=column><md-card-header-text layout=column><div layout=row layout-align=\"start center\"><md-icon md-svg-icon=action:event></md-icon><span class=md-title flex>{{ intervention.date.start.format('HH:mm') }} - {{ intervention.date.end.format('HH:mm') }}</span></div><div layout=row><div layout=row layout-wrap><span class=badge ng-repeat=\"tag in intervention.tags\">{{ tag.name }}</span></div></div></md-card-header-text></md-card-header><md-card-content><div ng-show=!intervention.isBooked()><span>Demandes</span><div layout=row layout-wrap><avatar ng-repeat=\"user in intervention.demandes\"></avatar></div></div><div><span>Participants</span><div layout=row layout-wrap><avatar ng-repeat=\"user in intervention.participants\"></avatar></div></div></md-card-content></md-card>"
  );


  $templateCache.put('modules/interventions/views/intervention.dialog.html',
    "<md-dialog aria-label=\"Mango (Fruit)\" layout=column><md-toolbar><div class=md-toolbar-tools><h2>{{ intervention.etablissement.toString() }} ({{ intervention.date.start.format('HH:mm') }} - {{ intervention.date.end.format('HH:mm') }})</h2><span flex></span><md-button class=md-icon-button ng-click=cancel()><md-icon md-svg-src=img/icons/ic_close_24px.svg aria-label=\"Close dialog\"></md-icon></md-button></div></md-toolbar><md-dialog-content layout=column flex><div class=md-dialog-content layout=column flex><div layout=column flex>sdfsdfsdf</div></div></md-dialog-content><md-dialog-actions layout=row><span flex></span><md-button ng-click=\"answer('not useful')\">Not Useful</md-button><md-button ng-click=\"answer('useful')\" style=margin-right:20px>Useful</md-button></md-dialog-actions></md-dialog>"
  );


  $templateCache.put('modules/interventions/views/interventions.section.html',
    "<div layout=column flex class=layout-bg><div flex layout=row><md-subheader class=filter-bar flex=30><md-input-container md-no-float class=\"md-block md-icon-right\"><md-icon md-svg-icon=action:search></md-icon><input ng-model=search placeholder=recherche... ng-change=benevolesSectionCtrl.doSearch(search) ng-model-options=\"{ debounce: 1000 }\"><md-icon md-svg-icon=content:clear ng-show=search ng-click=\"search = undefined;benevolesSectionCtrl.clearSearch()\"></md-icon></md-input-container></md-subheader><div flex=70 layout=row layout-align=\"center center\"><md-tabs layout-fill flex class=md-primary class=\"benevole-fiche-tabs md-accent\"><md-tab><md-tab-label>Cette semaine</md-tab-label></md-tab><md-tab><md-tab-label>Ce mois-ci</md-tab-label></md-tab><md-tab><md-tab-label>Les autres</md-tab-label></md-tab></md-tabs></div></div><md-content layout=row flex layout-margin class=plage-intervention-list><plage-intervention layout-margin style=\"width: 400px;min-width: 400px\" layout=column ng-repeat=\"plage in interventionsSectionCtrl.plages\"></plage-intervention></md-content></div>"
  );


  $templateCache.put('modules/interventions/views/plage-intervention.html',
    "<div layout=column layout-margin class=header><div layout=row flex><div class=md-title>{{ plage.etablissement.toString() }}</div><md-menu md-position-mode=\"target-right target\"><md-button aria-label=\"Open demo menu\" class=md-icon-button ng-click=$mdOpenMenu($event)><md-icon md-menu-origin md-svg-icon=navigation:more_vert></md-icon></md-button><md-menu-content width=4><md-menu-item><md-button ng-click=plageInterventionCtrl.addIntervention($event)><div layout=row flex><p flex>Ajout d'une intervention</p><md-icon md-menu-align-target md-svg-icon=action:event style=\"margin: auto 3px auto 0\"></md-icon></div></md-button></md-menu-item></md-menu-content></md-menu></div><div>{{ plage.date.format('[Le] dddd DD MMMM YYYY') }}</div></div><md-divider></md-divider><md-content layout=column><intervention-card ng-repeat=\"intervention in plageInterventionCtrl.interventions\"></intervention-card><md-card class=conversation><md-card-header layout=column><md-card-header-text layout=row layout-align=\"start center\"><md-icon md-svg-icon=communication:forum></md-icon><span class=md-title flex></span></md-card-header-text></md-card-header></md-card></md-content>"
  );


  $templateCache.put('modules/messages/views/nouveau-message.dialog.html',
    "<md-dialog aria-label=\"Nouveau message\" style=width:800px><form novalidate name=messageForm ng-submit=nouveauMessageCtrl.send(messageForm)><md-toolbar><div class=md-toolbar-tools><h2>Nouveau message</h2><span flex></span><md-button class=md-icon-button ng-click=cancel()><md-icon md-svg-icon=navigation:close aria-label=\"Close dialog\"></md-icon></md-button></div></md-toolbar><md-dialog-content><div class=md-dialog-content><md-contact-chips ng-model=message.destinataires name=destinataires md-contacts=nouveauMessageCtrl.searchDestinataires($query) md-contact-name=fullname md-contact-image=image md-contact-email=role md-require-match=true md-highlight-flags=i placeholder=Destinataire(s)></md-contact-chips><div ng-messages=messageForm.destinataires.$error><div ng-message=required>requis.</div></div><md-input-container class=md-block><label>Sujet</label><input name=subject ng-model=message.subject required><div ng-messages=messageForm.subject.$error><div ng-message=required>requis.</div></div></md-input-container><md-input-container class=md-block><label>Message</label><textarea name=body ng-model=message.body rows=5 required></textarea><div ng-messages=messageForm.body.$error><div ng-message=required>requis.</div></div></md-input-container></div></md-dialog-content><md-dialog-actions layout=row><md-button type=button ng-click=cancelModal()>Annuler</md-button><md-button type=submit style=margin-right:20px>Envoyer</md-button></md-dialog-actions></form></md-dialog>"
  );


  $templateCache.put('modules/navigation/views/fab-speed-dial.html',
    "<md-fab-speed-dial md-direction=up class=md-fling ng-cloak><md-fab-trigger><md-button aria-label=menu class=md-fab><md-icon md-svg-icon=content:add></md-icon></md-button></md-fab-trigger><md-fab-actions><md-button ng-repeat=\"item in fabSeedDialCtrl.items\" ng-click=\"fabSeedDialCtrl.handleClick($event, item)\" aria-label=\"{{ item.tooltip }}\" class=\"md-fab md-raised md-mini\"><md-tooltip md-direction=left>{{ item.tooltip }}</md-tooltip><md-icon md-svg-icon=\"{{ item.icon }}\"></md-icon></md-button></md-fab-actions></md-fab-speed-dial>"
  );


  $templateCache.put('modules/navigation/views/sidenav.html',
    "<md-sidenav flex layout=column class=md-sidenav-left md-component-id=sidenav md-is-locked-open=\"$mdMedia('gt-md')\" md-disable-backdrop md-whiteframe=4><md-toolbar style=\"min-height: 160px\"><div layout=row layout-align=\"start center\"><md-menu><md-button aria-label=Options class=md-icon-button ng-click=$mdOpenMenu($event)><md-icon class=md-accent md-svg-icon=navigation:more_vert></md-icon></md-button><md-menu-content width=4><md-menu-item><md-button ng-click=sideNavCtrl.showNotifications()><div layout=row><p flex>Notifications</p><md-icon md-menu-align-target md-svg-icon=social:notifications></md-icon></div></md-button></md-menu-item><md-menu-item><md-button ng-click=sideNavCtrl.showProfil()><div layout=row><p flex>Profil</p><md-icon md-menu-align-target md-svg-icon=action:account_circle></md-icon></div></md-button></md-menu-item><md-menu-item><md-button ng-click=sideNavCtrl.logout()><div layout=row><p flex>Déconnexion</p><md-icon md-menu-align-target md-svg-icon=action:exit_to_app></md-icon></div></md-button></md-menu-item></md-menu-content></md-menu><h3 flex class=md-subhead>Gestigris - Administration</h3></div><div layout=row layout-align=\"start center\" class=md-padding><avatar user=currentUser></avatar><div flex class=md-padding>{{ currentUser.toString() }}</div></div></md-toolbar><md-content layout=column md-scroll-y flex><md-list><md-list-item ui-sref-active=active ui-sref=benevoles ng-click=sidenavCtrl.closeSidenav()><p>Bénévoles</p></md-list-item><md-divider></md-divider><md-list-item ui-sref-active=active ui-sref=interventions ng-click=sidenavCtrl.closeSidenav()><p>Interventions</p></md-list-item></md-list></md-content></md-sidenav>"
  );


  $templateCache.put('modules/navigation/views/toolbar.html',
    "<md-toolbar md-scroll-shrink ng-style=\"!loadingRoute && { 'padding-top' : '5px' }\" style=\"padding-bottom: 5px\"><div class=md-toolbar-tools ng-init=\"searchToggled = false\"><h2>Gestigris</h2><span flex></span><md-button class=md-icon-button aria-label=Recherche ng-click=\"searchToggled = !searchToggled\"><md-icon md-svg-icon=action:search></md-icon></md-button><md-autocomplete ng-class=\"{ show: searchToggled }\" class=search-box md-delay=500 md-search-text=searchText md-selected-item-change=toolbarCtrl.selectSearchResult(item) md-items=\"item in toolbarCtrl.search(searchText)\" md-item-text=item.description md-min-length=1 placeholder=recherche... md-menu-class=autocomplete-search-template><md-item-template><div class=item-title layout=row layout-align=\"start center\"><span><md-icon md-svg-icon=\"{{ item.icon }}\"></md-icon></span> <span layout=column><div class=md-subhead style=\"line-height: 25px\">{{ item.description }}</div><div style=\"line-height: 20px\">{{ item.type }}</div></span></div></md-item-template></md-autocomplete></div></md-toolbar>"
  );

}]);
