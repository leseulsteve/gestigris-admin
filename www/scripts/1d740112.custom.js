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

ApplicationConfiguration.registerModule('interventions');
;
'use strict';

ApplicationConfiguration.registerModule('navigation');
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

angular.module('core').config(
  ['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('/');

    $stateProvider.

    state('home', {
      url: '/',
      title: 'Home',
      template: ''
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
      prenom: 'Steve',
      nomFamille: 'Boisvert',
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
  ['$rootScope', 'Benevole', 'benevoles', '$mdDialog', function ($rootScope, Benevole, benevoles, $mdDialog) {

    var ctrl = this;

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

  }]);
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
  ['$rootScope', function ($rootScope) {

    var ctrl = this;

    $rootScope.$on('$stateChangeSuccess', function (event, toState) {
      ctrl.title = toState.title;
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
    };

  }]);
;
angular.module('angularjsapp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('modules/benevoles/views/benevole.fiche.html',
    "<md-card layout=column flex class=card-list><div layout=column layout-padding style=\"background: url('/img/52283fca.mb-bg-fb-22.png') no-repeat center;height:150px;min-height:150px\"><div layout=row><span flex></span><md-button class=md-icon-button ng-click=\"benevoleFicheCtrl.sendMessage($event, benevole)\"><md-icon md-svg-icon=communication:message></md-icon><md-tooltip>Message</md-tooltip></md-button><md-button class=md-icon-button ng-click=\"benevoleFicheCtrl.deleteBenevole($event, benevole)\"><md-icon md-svg-icon=action:delete></md-icon><md-tooltip>Supprimer</md-tooltip></md-button></div><span flex></span><div layout=row><div layout=row layout-align=\"center start\"><avatar></avatar></div><div layout=column layout-align=\"center start\"><span>{{ benevole.toString() }}</span> <span>{{ benevole.role }}</span></div></div></div><md-tabs class=md-accent flex><md-tab><md-tab-label>Activité</md-tab-label><md-tab-body><md-content layout-margin layout=row><div flex=60></div><div class=md-whiteframe-1dp flex=40><md-toolbar><div class=md-toolbar-tools><h2>Récent</h2></div></md-toolbar><md-list><md-list-item class=md-2-line><md-icon md-svg-icon=communication:message></md-icon><div class=md-list-item-text><h3>Qqchose</h3><p>description</p></div><md-divider></md-divider></md-list-item><md-list-item class=md-2-line><md-icon md-svg-icon=content:add></md-icon><div class=md-list-item-text><h3>Qqchose</h3><p>description</p></div><md-divider></md-divider></md-list-item><md-list-item class=md-2-line><md-icon md-svg-icon=communication:message></md-icon><div class=md-list-item-text><h3>Qqchose</h3><p>description</p></div><md-divider></md-divider></md-list-item><md-list-item class=md-2-line><md-icon md-svg-icon=communication:message></md-icon><div class=md-list-item-text><h3>Qqchose</h3><p>description</p></div><md-divider></md-divider></md-list-item><md-list-item class=md-2-line><md-icon md-svg-icon=communication:message></md-icon><div class=md-list-item-text><h3>Qqchose</h3><p>description</p></div><md-divider></md-divider></md-list-item></md-list></div></md-content></md-tab-body></md-tab><md-tab><md-tab-label>Profil</md-tab-label><md-tab-body><md-content layout-margin><form name=userProfileForm ng-submit=profilCtrl.saveProfile(userProfileForm) novalidate><div layout=row><div layout=column flex=40 layout-align=\"center center\"><avatar class=profile user=profilCtrl.user click-to-update></avatar></div><span flex=10></span><div layout=column flex=40><md-input-container flex><label>Prénom</label><input name=prenom required ng-model=profilCtrl.user.firstname><ng-messages for=userProfileForm.prenom.$error role=alert><ng-message when=required>requis.</ng-message></ng-messages></md-input-container><md-input-container flex><label>Nom de famille</label><input name=nom required ng-model=profilCtrl.user.lastname><ng-messages for=userProfileForm.nom.$error role=alert><ng-message when=required>requis.</ng-message></ng-messages></md-input-container></div></div><div layout=row><md-input-container flex=40><label>Rôle</label><input name=titre ng-model=profilCtrl.user.title disabled></md-input-container><span flex=10></span><md-input-container flex=40><label>Date de naissance</label><input name=dateNaissance type=date required ng-model=profilCtrl.user.dateNaissance><ng-messages for=userProfileForm.dateNaissance.$error role=alert><ng-message when=required>requis.</ng-message></ng-messages></md-input-container></div><div layout=row><md-input-container flex=40><label>Pseudo</label><input name=pseudo required ng-model=profilCtrl.user.pseudo><ng-messages for=userProfileForm.pseudo.$error role=alert><ng-message when=required>requis.</ng-message></ng-messages></md-input-container><span flex=10></span><md-input-container flex=40><label>Courriel</label><input name=email required ng-model=profilCtrl.user.email type=email><ng-messages for=userProfileForm.email.$error role=alert><ng-message when=required>requis.</ng-message></ng-messages></md-input-container></div><div layout=row><input style=display:none><md-input-container flex=40><label>Nouveau mot de passe</label><input name=password autocomplete=off ng-model=profilCtrl.user.password type=password></md-input-container><span flex=10></span><md-input-container flex=40><label>Vérification mot de passe</label><input name=passwordMatch ng-disabled=\"profilCtrl.user.password === undefined\" ng-required=profilCtrl.user.password ng-model=profilCtrl.user.passwordMatch type=password><ng-messages for=userProfileForm.passwordMatch.$error role=alert><ng-message when=required>requis.</ng-message></ng-messages></md-input-container></div><div layout=row layout-align=\"end center\"><md-button class=\"md-raised md-primary\" ng-disabled=userProfileForm.$pristine type=submit>Sauvegarder</md-button></div></form></md-content></md-tab-body></md-tab></md-tabs></md-card>"
  );


  $templateCache.put('modules/benevoles/views/benevole.form-dialogue.html',
    "<md-dialog aria-label=\"Nouveau message\" style=width:800px><form novalidate name=benevoleForm ng-submit=closeModal(benevoleForm)><md-toolbar><div class=md-toolbar-tools><h2>Nouveau bénévole</h2><span flex></span><md-button class=md-icon-button ng-click=cancel()><md-icon md-svg-icon=navigation:close aria-label=\"Close dialog\"></md-icon></md-button></div></md-toolbar><md-dialog-content><div class=md-dialog-content></div></md-dialog-content><md-dialog-actions layout=row><md-button type=button ng-click=cancelModal()>Annuler</md-button><md-button type=submit style=margin-right:20px>Ajouter</md-button></md-dialog-actions></form></md-dialog>"
  );


  $templateCache.put('modules/benevoles/views/benevoles.section.html',
    "<div layout=column flex class=layout-bg><md-subheader class=filter-bar><md-input-container md-no-float class=\"md-block md-icon-right\"><md-icon md-svg-icon=action:search></md-icon><input ng-model=search placeholder=recherche...><md-icon md-svg-icon=content:clear ng-show=search ng-click=\"search = undefined\"></md-icon></md-input-container></md-subheader><div layout=row flex><md-card layout=column flex=30 class=card-list><md-content layout=column flex><md-list flex=30 flex layout=column><md-list-item class=md-2-line ng-class=\"{ active : benevole._id === benevolesSectionCtrl.currentProfile._id }\" ng-repeat=\"benevole in benevolesSectionCtrl.benevoles\" ng-click=benevolesSectionCtrl.showProfile(benevole)><div class=md-list-item-text><h3>{{ benevole.toString() }}</h3><p>{{ benevole.role }}</p></div><md-divider ng-if=!$last></md-divider></md-list-item></md-list></md-content></md-card><div flex=70 layout=column><md-progress-circular ng-hide=benevolesSectionCtrl.currentProfile md-mode=indeterminate></md-progress-circular><benevole-fiche benevole=benevolesSectionCtrl.currentProfile ng-show=benevolesSectionCtrl.currentProfile layout=column flex></benevole-fiche></div></div></div>"
  );


  $templateCache.put('modules/benevoles/views/message.dialogue.html',
    "<md-dialog aria-label=\"Nouveau message\" style=width:800px><form novalidate name=messageForm ng-submit=closeModal(messageForm)><md-toolbar><div class=md-toolbar-tools><h2>Nouveau message</h2><span flex></span><md-button class=md-icon-button ng-click=cancel()><md-icon md-svg-icon=navigation:close aria-label=\"Close dialog\"></md-icon></md-button></div></md-toolbar><md-dialog-content><div class=md-dialog-content><md-input-container class=md-block><label>Sujet</label><input name=subject ng-model=message.subject required><div ng-messages=messageForm.subject.$error><div ng-message=required>requis.</div></div></md-input-container><md-input-container class=md-block><label>Message</label><textarea name=body ng-model=message.body rows=5 required></textarea><div ng-messages=messageForm.body.$error><div ng-message=required>requis.</div></div></md-input-container></div></md-dialog-content><md-dialog-actions layout=row><md-button type=button ng-click=cancelModal()>Annuler</md-button><md-button type=submit style=margin-right:20px>Envoyer</md-button></md-dialog-actions></form></md-dialog>"
  );


  $templateCache.put('modules/interventions/views/intervention.card.html',
    "<md-card md-ink-ripple ng-click=interventionCardCtrl.showDetails($event)><md-card-header layout=column><md-card-header-text layout=column><div layout=row layout-align=\"start center\"><md-icon md-svg-icon=action:event></md-icon><span class=md-title flex>{{ intervention.date.start.format('HH:mm') }} - {{ intervention.date.end.format('HH:mm') }}</span></div><div layout=row><div layout=row layout-wrap><span class=badge ng-repeat=\"tag in intervention.tags\">{{ tag.name }}</span></div></div></md-card-header-text></md-card-header><md-card-content><div ng-show=!intervention.isBooked()><span>Demandes</span><div layout=row layout-wrap><avatar ng-repeat=\"user in intervention.demandes\"></avatar></div></div><div><span>Participants</span><div layout=row layout-wrap><avatar ng-repeat=\"user in intervention.participants\"></avatar></div></div></md-card-content></md-card>"
  );


  $templateCache.put('modules/interventions/views/intervention.dialog.html',
    "<md-dialog aria-label=\"Mango (Fruit)\" layout=column><md-toolbar><div class=md-toolbar-tools><h2>{{ intervention.etablissement.toString() }} ({{ intervention.date.start.format('HH:mm') }} - {{ intervention.date.end.format('HH:mm') }})</h2><span flex></span><md-button class=md-icon-button ng-click=cancel()><md-icon md-svg-src=img/icons/ic_close_24px.svg aria-label=\"Close dialog\"></md-icon></md-button></div></md-toolbar><md-dialog-content layout=column flex><div class=md-dialog-content layout=column flex><div layout=column flex>sdfsdfsdf</div></div></md-dialog-content><md-dialog-actions layout=row><span flex></span><md-button ng-click=\"answer('not useful')\">Not Useful</md-button><md-button ng-click=\"answer('useful')\" style=margin-right:20px>Useful</md-button></md-dialog-actions></md-dialog>"
  );


  $templateCache.put('modules/interventions/views/interventions.section.html',
    "<md-toolbar><div class=md-toolbar-tools><md-button class=md-icon-button aria-label=Menu><md-icon md-svg-icon=navigation:menu></md-icon></md-button><h2>Interventions</h2><span flex></span><md-button class=md-icon-button aria-label=More><md-icon md-svg-icon=content:add ng-click=interventionsSectionCtrl.addPlage()></md-icon></md-button></div></md-toolbar><div layout=column flex><md-content layout=column flex layout-margin class=plage-intervention-list><carousel class=wrap flex layout=row><ul class=carousel><li class=carousel-seat><h2>1</h2></li><li class=carousel-seat><h2>2</h2></li><li class=carousel-seat><h2>3</h2></li><li class=carousel-seat><h2>4</h2></li><li class=carousel-seat><h2>5</h2></li><li class=\"carousel-seat is-ref\"><h2>6</h2></li></ul></carousel><div class=controls><button class=toggle ng-click=interventionsSectionCtrl.next()>Next</button></div></md-content></div>"
  );


  $templateCache.put('modules/interventions/views/plage-intervention.html',
    "<div layout=column layout-margin class=header><div layout=row flex><div class=md-title>{{ plage.etablissement.toString() }}</div><md-menu md-position-mode=\"target-right target\"><md-button aria-label=\"Open demo menu\" class=md-icon-button ng-click=$mdOpenMenu($event)><md-icon md-menu-origin md-svg-icon=navigation:more_vert></md-icon></md-button><md-menu-content width=4><md-menu-item><md-button ng-click=plageInterventionCtrl.addIntervention($event)><div layout=row flex><p flex>Ajout d'une intervention</p><md-icon md-menu-align-target md-svg-icon=action:event style=\"margin: auto 3px auto 0\"></md-icon></div></md-button></md-menu-item></md-menu-content></md-menu></div><div>{{ plage.date.format('[Le] dddd DD MMMM YYYY') }}</div></div><md-divider></md-divider><md-content layout=column><intervention-card ng-repeat=\"intervention in plageInterventionCtrl.interventions\"></intervention-card><md-card class=conversation><md-card-header layout=column><md-card-header-text layout=row layout-align=\"start center\"><md-icon md-svg-icon=communication:forum></md-icon><span class=md-title flex></span></md-card-header-text></md-card-header></md-card></md-content>"
  );


  $templateCache.put('modules/navigation/views/sidenav.html',
    "<md-sidenav flex layout=column class=md-sidenav-left md-component-id=sidenav md-is-locked-open=\"$mdMedia('gt-md')\" md-disable-backdrop md-whiteframe=4><md-toolbar style=\"min-height: 160px\"><div layout=row layout-align=\"start center\"><md-menu><md-button aria-label=Options class=md-icon-button ng-click=$mdOpenMenu($event)><md-icon class=md-accent md-svg-icon=navigation:more_vert></md-icon></md-button><md-menu-content width=4><md-menu-item><md-button ng-click=sideNavCtrl.showNotifications()><div layout=row><p flex>Notifications</p><md-icon md-menu-align-target md-svg-icon=social:notifications></md-icon></div></md-button></md-menu-item><md-menu-item><md-button ng-click=sideNavCtrl.showProfil()><div layout=row><p flex>Profil</p><md-icon md-menu-align-target md-svg-icon=action:account_circle></md-icon></div></md-button></md-menu-item><md-menu-item><md-button ng-click=sideNavCtrl.logout()><div layout=row><p flex>Déconnexion</p><md-icon md-menu-align-target md-svg-icon=action:exit_to_app></md-icon></div></md-button></md-menu-item></md-menu-content></md-menu><h3 flex class=md-subhead>Gestigris - Administration</h3></div><div layout=row layout-align=\"start center\" class=md-padding><avatar user=currentUser></avatar><div flex class=md-padding>{{ currentUser.toString() }}</div></div></md-toolbar><md-content layout=column md-scroll-y flex><md-list><md-list-item ui-sref-active=active ui-sref=benevoles ng-click=sidenavCtrl.closeSidenav()><p>Bénévoles</p></md-list-item><md-divider></md-divider><md-list-item ui-sref-active=active ui-sref=interventions ng-click=sidenavCtrl.closeSidenav()><p>Interventions</p></md-list-item></md-list></md-content></md-sidenav>"
  );


  $templateCache.put('modules/navigation/views/toolbar.html',
    "<md-toolbar md-scroll-shrink><div class=md-toolbar-tools><md-button class=md-icon-button aria-label=Menu ng-hide=\"$mdMedia('gt-md')\" ng-click=toolbarCtrl.showSidenav()><md-icon md-svg-icon=navigation:menu></md-icon></md-button><h2><span>{{ toolbarCtrl.title }}</span></h2><span flex></span><md-button class=md-icon-button aria-label=Menu ng-repeat=\"tool in toolbarCtrl.tools\" ng-click=\"toolbarCtrl.handleAction($event, tool.action)\"><md-icon md-svg-icon=\"{{ tool.icon }}\"></md-icon></md-button></div></md-toolbar>"
  );

}]);
