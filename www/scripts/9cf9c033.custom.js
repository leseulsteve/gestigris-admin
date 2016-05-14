'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function () {
  // Init module configuration options
  var applicationModuleName = 'angularjsapp';
  var applicationModuleVendorDependencies = [
    'gestigris-common',
    'dndLists'
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

ApplicationConfiguration.registerModule('benevoles', ['search', 'messages']);
;
'use strict';

ApplicationConfiguration.registerModule('conversations', ['core', 'sockets']);
;
'use strict';

ApplicationConfiguration.registerModule('core');
;
'use strict';

ApplicationConfiguration.registerModule('dashboard');
;
'use strict';

ApplicationConfiguration.registerModule('employes', ['search']);
;
'use strict';

ApplicationConfiguration.registerModule('etablissements', ['search']);
;
'use strict';

ApplicationConfiguration.registerModule('events');
;
'use strict';

ApplicationConfiguration.registerModule('interventions', ['navigation', 'events']);
;
'use strict';

ApplicationConfiguration.registerModule('messages', ['navigation', 'benevoles']);
;
'use strict';

ApplicationConfiguration.registerModule('navigation');
;
'use strict';

ApplicationConfiguration.registerModule('search', ['core']);
;
'use strict';

ApplicationConfiguration.registerModule('sockets');
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
  ['SearchServiceProvider', function (SearchServiceProvider) {

    SearchServiceProvider.register({
      factory: 'Benevole',
      type: 'Bénévole',
      icon: 'action:account_circle',
      dialog: {
        controller: 'BenevoleFicheController',
        controllerAs: 'benevoleFicheCtrl',
        templateUrl: 'modules/benevoles/views/benevole-fiche.dialog.html',
        itemName: 'benevole'
      }
    });

  }]);
;
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

angular.module('conversations').config(
  ['$stateProvider', function ($stateProvider) {

    $stateProvider.

    state('conversations', {
      url: '/conversations',
      templateUrl: 'modules/conversations/views/conversations.section.html',
      controller: 'ConversationsSectionController',
      controllerAs: 'conversationsSectionCtrl'
    }).

    state('conversation', {
      url: '/conversations/:conversationId',
      templateUrl: 'modules/conversations/views/conversation.fiche.html',
      controller: 'ConversationFicheController',
      controllerAs: 'conversationFicheCtrl'
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

angular.module('employes').config(
  ['SearchServiceProvider', function (SearchServiceProvider) {

    SearchServiceProvider.register({
      factory: 'Employe',
      type: 'employé',
      icon: 'action:account_circle'
    });

  }]);
;
'use strict';

angular.module('etablissements').config(
  ['SearchServiceProvider', function (SearchServiceProvider) {

    SearchServiceProvider.register({
      factory: 'Etablissement',
      type: 'établissement',
      icon: 'social:school'
    });

  }]);
;
'use strict';

angular.module('interventions').config(
  ['FabSpeedDialServiceProvider', 'INTERVENTIONS', 'SearchServiceProvider', 'EventServiceProvider', function (FabSpeedDialServiceProvider, INTERVENTIONS, SearchServiceProvider, EventServiceProvider) {

    FabSpeedDialServiceProvider.addItem({
      tooltip: 'plage d\'intervention',
      icon: INTERVENTIONS.ICONS.PLAGE,
      dialog: {
        templateUrl: 'modules/messages/views/nouveau-message.dialog.html',
        controller: 'NouveauMessageController',
        controllerAs: 'nouveauMessageCtrl'
      }
    });

    SearchServiceProvider.register({
      factory: 'PlageIntervention',
      type: 'plage d\'intervention',
      icon: INTERVENTIONS.ICONS.PLAGE,
    });

    EventServiceProvider.register({
      factory: 'Intervention',
      type: 'intervention',
      stateIcon: true,
      dialog: {
        controller: 'PlageFicheController',
        controllerAs: 'plageFicheCtrl',
        templateUrl: 'modules/interventions/views/plage-intervention-fiche.dialog.html',
        itemName: 'intervention',
        fullscreen: true
      }
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
    }).

    state('fiche', {
      url: '/fiche',
      template: '<plage-intervention-fiche plage="plage" layout="column" flex></plage-intervention-fiche>',
      controller: ['$scope', 'PlageIntervention', function ($scope, PlageIntervention) {
        PlageIntervention.find().then(function (plages) {
          $scope.plage = plages[0];
        });
      }]
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

 angular.module('interventions').run(
   ['$rootScope', '$window', 'SocketFactory', function ($rootScope, $window, SocketFactory) {

     $rootScope.$on('UserAuth:signin:success', function () {
       SocketFactory.initSockets('http://localhost:9001/sockets', $window.localStorage.getItem('token'));
     });

     if ($rootScope.currentUser.isAuthentified()) {
       SocketFactory.initSockets('http://localhost:9001/sockets', $window.localStorage.getItem('token'));
     }
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

    var id = 0;
    var Benevole = function (params) {
      _.assign(this, params);
      this._id = ++id;
      this.fullname = this.toString();
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
      'prenom': 'Gregory',
      'nomFamille': 'Wheeler',
      'avatar': 'https://robohash.org/accusantiumquodsequi.png?size=50x50&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Gloria',
      'nomFamille': 'Jones',
      'avatar': 'https://robohash.org/omnisetconsequatur.png?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Kimberly',
      'nomFamille': 'Medina',
      'avatar': 'https://robohash.org/minusautvoluptatum.jpg?size=50x50&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Bruce',
      'nomFamille': 'Simmons',
      'avatar': 'https://robohash.org/eaquenatusvoluptates.bmp?size=50x50&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Ronald',
      'nomFamille': 'Lewis',
      'avatar': 'https://robohash.org/nonutdoloribus.png?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Roy',
      'nomFamille': 'Moore',
      'avatar': 'https://robohash.org/quoslaudantiumnulla.png?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Angela',
      'nomFamille': 'Young',
      'avatar': 'https://robohash.org/fugiatcorruptiaut.jpg?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Timothy',
      'nomFamille': 'Weaver',
      'avatar': 'https://robohash.org/molestiaecorruptiet.jpg?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Brandon',
      'nomFamille': 'Olson',
      'avatar': 'https://robohash.org/occaecatiatperspiciatis.png?size=50x50&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Bonnie',
      'nomFamille': 'Turner',
      'avatar': 'https://robohash.org/etsintvitae.jpg?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Elizabeth',
      'nomFamille': 'Rivera',
      'avatar': 'https://robohash.org/essevoluptateautem.bmp?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Edward',
      'nomFamille': 'Ray',
      'avatar': 'https://robohash.org/quiassumendaaliquid.bmp?size=50x50&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Joe',
      'nomFamille': 'Lewis',
      'avatar': 'https://robohash.org/optiovoluptateid.bmp?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Juan',
      'nomFamille': 'Fields',
      'avatar': 'https://robohash.org/quinonquod.bmp?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Terry',
      'nomFamille': 'Greene',
      'avatar': 'https://robohash.org/uteaet.png?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Benjamin',
      'nomFamille': 'Bennett',
      'avatar': 'https://robohash.org/errorquosprovident.png?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Ronald',
      'nomFamille': 'Morrison',
      'avatar': 'https://robohash.org/voluptateveritatisomnis.jpg?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Peter',
      'nomFamille': 'Sullivan',
      'avatar': 'https://robohash.org/atestest.bmp?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Paula',
      'nomFamille': 'Spencer',
      'avatar': 'https://robohash.org/sequierrorveritatis.png?size=50x50&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Sandra',
      'nomFamille': 'Chapman',
      'avatar': 'https://robohash.org/eteiusneque.jpg?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Bonnie',
      'nomFamille': 'Rodriguez',
      'avatar': 'https://robohash.org/nisicumdolore.png?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Denise',
      'nomFamille': 'Fernandez',
      'avatar': 'https://robohash.org/voluptatemfugiatreprehenderit.jpg?size=50x50&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Joe',
      'nomFamille': 'Watkins',
      'avatar': 'https://robohash.org/incidunteligendirerum.jpg?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Janice',
      'nomFamille': 'Stephens',
      'avatar': 'https://robohash.org/eaquefaceresuscipit.bmp?size=50x50&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Frank',
      'nomFamille': 'Snyder',
      'avatar': 'https://robohash.org/omnisenimvel.png?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Janice',
      'nomFamille': 'Meyer',
      'avatar': 'https://robohash.org/dolorassumendavero.bmp?size=50x50&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Jerry',
      'nomFamille': 'Boyd',
      'avatar': 'https://robohash.org/suntnecessitatibusipsa.jpg?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Larry',
      'nomFamille': 'Peterson',
      'avatar': 'https://robohash.org/eaquiasapiente.bmp?size=50x50&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Brian',
      'nomFamille': 'Wright',
      'avatar': 'https://robohash.org/nontemporibusid.bmp?size=50x50&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Larry',
      'nomFamille': 'Reed',
      'avatar': 'https://robohash.org/perferendisestreiciendis.bmp?size=50x50&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Ernest',
      'nomFamille': 'Reyes',
      'avatar': 'https://robohash.org/sapientemaioressint.png?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Margaret',
      'nomFamille': 'Owens',
      'avatar': 'https://robohash.org/consequunturaniminam.png?size=50x50&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Martin',
      'nomFamille': 'Wilson',
      'avatar': 'https://robohash.org/numquamvelitquia.bmp?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Philip',
      'nomFamille': 'Hughes',
      'avatar': 'https://robohash.org/animietvoluptas.jpg?size=50x50&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Gloria',
      'nomFamille': 'Romero',
      'avatar': 'https://robohash.org/quisdoloremex.jpg?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Randy',
      'nomFamille': 'Garza',
      'avatar': 'https://robohash.org/quislaboriosamullam.jpg?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Cheryl',
      'nomFamille': 'Ortiz',
      'avatar': 'https://robohash.org/dolormolestiassed.jpg?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Ronald',
      'nomFamille': 'Jordan',
      'avatar': 'https://robohash.org/voluptatemlaborumnumquam.jpg?size=50x50&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Diana',
      'nomFamille': 'Murphy',
      'avatar': 'https://robohash.org/voluptatemeafuga.png?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Matthew',
      'nomFamille': 'Hanson',
      'avatar': 'https://robohash.org/voluptatemfugitaccusantium.png?size=50x50&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Philip',
      'nomFamille': 'Schmidt',
      'avatar': 'https://robohash.org/voluptatemesseomnis.bmp?size=50x50&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Joshua',
      'nomFamille': 'Bryant',
      'avatar': 'https://robohash.org/quipariaturvelit.jpg?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Gregory',
      'nomFamille': 'Martinez',
      'avatar': 'https://robohash.org/laborefugaeum.jpg?size=50x50&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Harry',
      'nomFamille': 'Baker',
      'avatar': 'https://robohash.org/enimutdolorem.png?size=50x50&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'David',
      'nomFamille': 'Gomez',
      'avatar': 'https://robohash.org/rerumutaut.jpg?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Jack',
      'nomFamille': 'Riley',
      'avatar': 'https://robohash.org/natusquiaccusamus.bmp?size=50x50&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Nicholas',
      'nomFamille': 'Henry',
      'avatar': 'https://robohash.org/quidemillodoloribus.jpg?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Paula',
      'nomFamille': 'Boyd',
      'avatar': 'https://robohash.org/sitnecessitatibushic.jpg?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Karen',
      'nomFamille': 'Price',
      'avatar': 'https://robohash.org/quosaccusamusunde.jpg?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Margaret',
      'nomFamille': 'Payne',
      'avatar': 'https://robohash.org/suscipitharumad.jpg?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Karen',
      'nomFamille': 'Jenkins',
      'avatar': 'https://robohash.org/sitquivoluptatem.bmp?size=50x50&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Amanda',
      'nomFamille': 'Carroll',
      'avatar': 'https://robohash.org/nostrummaximeculpa.png?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Philip',
      'nomFamille': 'Kelley',
      'avatar': 'https://robohash.org/temporaenimomnis.bmp?size=50x50&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Ann',
      'nomFamille': 'Hawkins',
      'avatar': 'https://robohash.org/corruptipraesentiumprovident.jpg?size=50x50&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Barbara',
      'nomFamille': 'Cole',
      'avatar': 'https://robohash.org/sitexercitationemdeserunt.jpg?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Alice',
      'nomFamille': 'Morrison',
      'avatar': 'https://robohash.org/velutipsam.bmp?size=50x50&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Amanda',
      'nomFamille': 'Cook',
      'avatar': 'https://robohash.org/quaerationenobis.bmp?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Jeffrey',
      'nomFamille': 'Stephens',
      'avatar': 'https://robohash.org/impediteosquisquam.bmp?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Benjamin',
      'nomFamille': 'Smith',
      'avatar': 'https://robohash.org/abpraesentiumfugiat.png?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Ruth',
      'nomFamille': 'Bailey',
      'avatar': 'https://robohash.org/atcorporisquidem.png?size=50x50&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Robin',
      'nomFamille': 'Harrison',
      'avatar': 'https://robohash.org/doloreestquia.jpg?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Janice',
      'nomFamille': 'Clark',
      'avatar': 'https://robohash.org/nihilasperioresfugiat.png?size=50x50&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Diane',
      'nomFamille': 'Rice',
      'avatar': 'https://robohash.org/laudantiumcorruptivel.png?size=50x50&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Wanda',
      'nomFamille': 'George',
      'avatar': 'https://robohash.org/assumendaaccusantiumquia.bmp?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Victor',
      'nomFamille': 'Mills',
      'avatar': 'https://robohash.org/aspernaturrerumquaerat.png?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Shawn',
      'nomFamille': 'Romero',
      'avatar': 'https://robohash.org/sedreprehenderitporro.png?size=50x50&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Cynthia',
      'nomFamille': 'Olson',
      'avatar': 'https://robohash.org/eaquosest.jpg?size=50x50&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Helen',
      'nomFamille': 'Lewis',
      'avatar': 'https://robohash.org/aspernaturdolorharum.bmp?size=50x50&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Joe',
      'nomFamille': 'Willis',
      'avatar': 'https://robohash.org/mollitiaquimaiores.jpg?size=50x50&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Barbara',
      'nomFamille': 'Ward',
      'avatar': 'https://robohash.org/omnisomnisquam.jpg?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Anthony',
      'nomFamille': 'Hudson',
      'avatar': 'https://robohash.org/harumquipossimus.bmp?size=50x50&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Paula',
      'nomFamille': 'Hayes',
      'avatar': 'https://robohash.org/temporedoloresneque.png?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Jean',
      'nomFamille': 'Day',
      'avatar': 'https://robohash.org/utrerumvoluptas.bmp?size=50x50&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Doris',
      'nomFamille': 'Dean',
      'avatar': 'https://robohash.org/autrepellendusdolorum.png?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Robert',
      'nomFamille': 'Harrison',
      'avatar': 'https://robohash.org/inventorecorruptieos.bmp?size=50x50&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Ronald',
      'nomFamille': 'Rice',
      'avatar': 'https://robohash.org/autcumquecum.jpg?size=50x50&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Albert',
      'nomFamille': 'Rodriguez',
      'avatar': 'https://robohash.org/eosabaccusamus.png?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Deborah',
      'nomFamille': 'Ford',
      'avatar': 'https://robohash.org/evenietnullaexplicabo.png?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'William',
      'nomFamille': 'Fernandez',
      'avatar': 'https://robohash.org/similiquedistinctiocommodi.jpg?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Judy',
      'nomFamille': 'Sanders',
      'avatar': 'https://robohash.org/corporishicaut.jpg?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Maria',
      'nomFamille': 'Wood',
      'avatar': 'https://robohash.org/idrepellendusquia.png?size=50x50&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Clarence',
      'nomFamille': 'Gray',
      'avatar': 'https://robohash.org/quideseruntab.png?size=50x50&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Joshua',
      'nomFamille': 'Sanchez',
      'avatar': 'https://robohash.org/eiusutdolorem.bmp?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Benjamin',
      'nomFamille': 'Morris',
      'avatar': 'https://robohash.org/quisteneturipsam.png?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Amanda',
      'nomFamille': 'Warren',
      'avatar': 'https://robohash.org/utlaboriosamdistinctio.png?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Susan',
      'nomFamille': 'Brown',
      'avatar': 'https://robohash.org/harumquoquod.jpg?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Denise',
      'nomFamille': 'Cole',
      'avatar': 'https://robohash.org/voluptatibusdoloresassumenda.png?size=50x50&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'George',
      'nomFamille': 'Roberts',
      'avatar': 'https://robohash.org/dolorumvitaemollitia.bmp?size=50x50&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Peter',
      'nomFamille': 'Fisher',
      'avatar': 'https://robohash.org/estminusipsa.png?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Richard',
      'nomFamille': 'Hart',
      'avatar': 'https://robohash.org/utnatusaspernatur.png?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Anne',
      'nomFamille': 'Welch',
      'avatar': 'https://robohash.org/vitaequiodio.bmp?size=50x50&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Terry',
      'nomFamille': 'Grant',
      'avatar': 'https://robohash.org/etteneturnihil.png?size=50x50&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Craig',
      'nomFamille': 'Barnes',
      'avatar': 'https://robohash.org/voluptatibuscumquelabore.jpg?size=50x50&set=set1',
      'role': 'Interventant'
    }, {
      'prenom': 'Clarence',
      'nomFamille': 'Wells',
      'avatar': 'https://robohash.org/adipsumconsequatur.jpg?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Henry',
      'nomFamille': 'Coleman',
      'avatar': 'https://robohash.org/quasisimiliqueea.bmp?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Joyce',
      'nomFamille': 'Bishop',
      'avatar': 'https://robohash.org/excepturideleniticonsectetur.bmp?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Jason',
      'nomFamille': 'Gonzales',
      'avatar': 'https://robohash.org/laboriosamasperioressed.png?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Anna',
      'nomFamille': 'Weaver',
      'avatar': 'https://robohash.org/faceredoloribussed.bmp?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Martin',
      'nomFamille': 'Garza',
      'avatar': 'https://robohash.org/autemsedoptio.png?size=50x50&set=set1',
      'role': 'Observateur'
    }, {
      'prenom': 'Cynthia',
      'nomFamille': 'Hughes',
      'avatar': 'https://robohash.org/namaliquamsed.bmp?size=50x50&set=set1',
      'role': 'Interventant'
    }], function (benevole) {
      return new Benevole(benevole);
    });

    Benevole.find = function () {
      var deffered = $q.defer();
      $timeout(function () {
        deffered.resolve(benevoles);
      }, 1000);
      return deffered.promise;
    };
    Benevole.findById = function (id) {
      var deffered = $q.defer();
      $timeout(function () {
        deffered.resolve(_.find(benevoles, '_id', id));
      }, 1000);
      return deffered.promise;
    };
    Benevole.search = function (term) {
      var deffered = $q.defer();
      $timeout(function () {
        deffered.resolve(_.filter(benevoles, function (benevole) {
          return _.includes(benevole.toString().toLowerCase(), term.toLowerCase());
        }));
      }, 1000);
      return deffered.promise;
    };

    return Benevole;

  }]);
;
'use strict';

angular.module('conversations').factory('Conversation',
  ['$q', 'Schema', 'Message', 'User', 'UserAuth', 'Moment', 'Benevole', function ($q, Schema, Message, User, UserAuth, Moment, Benevole) {

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

  }]);
;
'use strict';

angular.module('conversations').factory('ConversationService',
  ['$rootScope', 'Conversation', function ($rootScope, Conversation) {
    return {

      init: function () {
        return Conversation.getFromTeam().then(function (conversations) {
          $rootScope.conversations = {
            equipe: conversations
          };

          $rootScope.$on('UserAuth:signout:success', function () {
            $rootScope.conversations = undefined;
          });
        });
      }

    };
  }]);
;
'use strict';

angular.module('conversations').factory('Message',
  ['Schema', 'User', 'UserAuth', 'Moment', function (Schema, User, UserAuth, Moment) {

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

  }]);
;
'use strict';

angular.module('core').factory('Dialog',
  ['$mdDialog', function ($mdDialog) {

    var lastDialogs = [];

    var Dialog = function (params) {
      this.config = _.assign({
        parent: angular.element(document.body),
        bindToController: true
      }, params);
      this.config.locals = _.assign({
        dialog: this
      }, this.config.locals);

      if (!params.keepLastDialog) {
        lastDialogs.pop();
      }
    };

    Dialog.prototype.show = function ($event) {
      var dialog = _.assign(this.config, {
        targetEvent: $event
      });
      lastDialogs.push(dialog);
      return $mdDialog.show(dialog);
    };

    Dialog.prototype.hide = function () {
      return $mdDialog.hide().then(function () {
        lastDialogs.pop();
        var lastDialog = _.last(lastDialogs);
        if (lastDialog) {
          $mdDialog.show(lastDialog);
        }
      });
    };

    return Dialog;
  }]);
;
'use strict';

angular.module('employes').factory('Employe',
  ['$q', '$timeout', function ($q, $timeout) {

    var Employe = function (params) {
      _.assign(this, params);
      this.fullname = this.toString();
      this.image = 'https://www.govloop.com/wp-content/uploads/avatars/2/3819dcd8c7718dd630a1aaefe12dc925-bpthumb.jpg';
    };

    Employe.prototype.toString = function () {
      return this.prenom + ' ' + this.nomFamille;
    };

    var employes = _.map([{
      _id: 1,
      prenom: 'Vincent',
      nomFamille: 'Chouinard',
      role: 'Super employé'
    }], function (employe) {
      return new Employe(employe);
    });

    return {
      find: function () {
        var deffered = $q.defer();
        $timeout(function () {
          deffered.resolve(employes);
        }, 1000);
        return deffered.promise;
      },
      findById: function (id) {
        var deffered = $q.defer();
        $timeout(function () {
          deffered.resolve(_.find(employes, '_id', id));
        }, 1000);
        return deffered.promise;
      },
      search: function (term) {
        var deffered = $q.defer();
        $timeout(function () {
          deffered.resolve(_.filter(employes, function (employe) {
            return _.includes(employe.toString().toLowerCase(), term.toLowerCase());
          }));
        }, 1000);
        return deffered.promise;
      }
    };

  }]);
;
'use strict';

angular.module('etablissements').factory('Etablissement',
  ['$q', '$timeout', function ($q, $timeout) {

    var Etablissement = function (params) {
      _.assign(this, params);
      this.fullname = this.toString();
      this.image = 'https://www.govloop.com/wp-content/uploads/avatars/2/3819dcd8c7718dd630a1aaefe12dc925-bpthumb.jpg';
    };

    Etablissement.prototype.toString = function () {
      return this.description;
    };

    var etablissements = _.map([{
      _id: 1,
      description: 'École secondaire de Neufchâtel'
    }], function (etablissement) {
      return new Etablissement(etablissement);
    });

    return {
      find: function () {
        var deffered = $q.defer();
        $timeout(function () {
          deffered.resolve(etablissements);
        }, 1000);
        return deffered.promise;
      },
      findById: function (id) {
        var deffered = $q.defer();
        $timeout(function () {
          deffered.resolve(_.find(etablissements, '_id', id));
        }, 1000);
        return deffered.promise;
      },
      search: function (term) {
        console.log(term);
        var deffered = $q.defer();
        $timeout(function () {
          deffered.resolve(_.filter(etablissements, function (etablissement) {
            return _.includes(etablissement.toString().toLowerCase(), term.toLowerCase());
          }));
        }, 1000);
        return deffered.promise;
      }
    };

  }]);
;
'use strict';

angular.module('events').provider('EventService',
  function () {

    var providers = [];

    return {

      register: function (provider) {
        providers.push(provider);
      },

      $get: ['$q', '$injector', 'Dialog', function ($q, $injector, Dialog) {

        var factories = {};

        _.forEach(providers, function (provider) {
          factories[provider.type] = $injector.get(provider.factory);
        });

        var EventService = {};

        EventService.getByDate = function (date) {

          var promises = [];

          _.forEach(providers, function (provider) {
            promises.push(factories[provider.type].getByDate(date).then(function (results) {
              return _.map(results, function (result) {
                return {
                  provider: provider,
                  item: result,
                  date: result.getDate(),
                  type: provider.type,
                  description: result.toString(),
                  stateIcon: provider.stateIcon ? result.getStateIcon() : undefined
                };
              });
            }));
          });

          return $q.all(promises).then(function (results) {
            return _.flatten(results);
          });

        };

        EventService.select = function ($event, selectedItem) {
          if (selectedItem) {

            var dialogConfig = selectedItem.provider.dialog,
              locals = {};

            locals[dialogConfig.itemName] = selectedItem.item;

            var dialog = new Dialog(_.assign(dialogConfig, {
              locals: locals,
              bindToController: true
            }));

            dialog.show($event);
          }
        };

        return EventService;
      }]
    };
  });
;
'use strict';

angular.module('interventions').factory('InterventionTag',
  ['$q', function ($q) {

    var id = 1;
    var InterventionTag = function (params)  {
      _.assign(this, params);
      this._id = params._id || id++;
    };

    var tags = _.map([{
      description: 'secondaire 3'
    }, {
      description: 'anglophones'
    }], function (params) {
      return new InterventionTag(params);
    });

    InterventionTag.prototype.save = function () {
      var deffered = $q.defer();
      tags.push(this);
      this.isNew = false;
      deffered.resolve(this);
      return deffered.promise;
    };

    InterventionTag.find = function () {
      var deffered = $q.defer();
      deffered.resolve(tags);
      return deffered.promise;
    };

    return InterventionTag;

  }]);
;
'use strict';

angular.module('interventions').factory('Intervention',
  ['$q', 'Moment', 'Benevole', 'InterventionTag', function ($q, Moment, Benevole, InterventionTag) {

    var id = 1;
    var Intervention = function (params) {
      _.assign(this, params);
      this._id = id++;
      this.tags = _.map(this.tags, function (tag) {
        return new InterventionTag(tag);
      });
    };

    /*  Intervention.post('find', function(next) {
        this.tags = _.maps(this.tags, function(tag) {
          return new InterventionTag(tag);
        });
        next();
      });*/

    Intervention.prototype.getDateRange = function () {
      return this.date;
    };

    Intervention.prototype.getBenevoles = function (type) {
      return Benevole.find().then(function (benevoles) {
        switch (type) {
        case 'confirmed':
          return _.take(benevoles, Math.floor(Math.random() * 3) + 0);
        case 'interested':
          return _.take(benevoles, Math.floor(Math.random() * 50) + 40);
        }
      });
    };

    Intervention.prototype.getLocal = function () {
      return 1123;
    };

    Intervention.prototype.getResponsable = function () {
      return 'Ginette Larue';
    };

    Intervention.prototype.getMeetingPlace = function () {
      return undefined;
    };

    var interventions = _.map([{
      plage: 1,
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
        _id: 1,
        description: 'secondaire 3'
      }],
      participants: [{}, {}, {}],
      isBooked: function () {
        return true;
      }
    }, {
      plage: 1,
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
        _id: 1,
        description: 'secondaire 3'
      }],
      demandes: [{}, {}, {}],
      participants: [{}, {}, {}],
      isBooked: function () {
        return false;
      }
    }, {
      plage: 1,
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
        _id: 1,
        description: 'secondaire 3'
      }],
      demandes: [{}, {}, {}],
      participants: [{}, {}, {}],
      isBooked: function () {
        return false;
      }
    }, {
      plage: 2,
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
        _id: 1,
        description: 'secondaire 3'
      }],
      demandes: [{}, {}, {}],
      participants: [{}, {}, {}],
      isBooked: function () {
        return false;
      }
    }], function (params) {
      return new Intervention(params);
    });

    Intervention.prototype.toString = function () {
      return this.etablissement.toString();
    };

    Intervention.prototype.getDate = function () {
      return this.date;
    };

    Intervention.prototype.getStateIcon = function () {
      return 'navigation:check';
    };

    Intervention.findByPlageId = function () {
      var deffered = $q.defer();
      deffered.resolve(interventions);
      return deffered.promise;
    };

    Intervention.getByDate = function (date) {
      console.log(date);
      return Intervention.findByPlageId();
    };

    return Intervention;

  }]);
;
'use strict';

angular.module('interventions').factory('PlageIntervention',
  ['$q', 'Moment', 'Intervention', 'Conversation', function ($q, Moment, Intervention, Conversation) {

    var id = 0;
    var PlageIntervention = function (params) {
      _.assign(this, params);
      this._id = ++id;
    };

    PlageIntervention.prototype.toString = function () {
      return this.date.format('MM-DD-YYYY') + ' - ' + this.etablissement.toString();
    };

    PlageIntervention.prototype.getEtablissement = function () {
      return this.etablissement;
    };

    PlageIntervention.prototype.getDate = function () {
      return this.date;
    };

    PlageIntervention.prototype.getCalendarDay = function () {
      return this.getDate().calendar(null, {
        sameDay: '[Today]',
        nextDay: '[Tomorrow]',
        nextWeek: 'dddd',
        lastDay: '[Yesterday]',
        lastWeek: '[Last] dddd'
      });
    };

    var plages = _.map([{
      date: new Moment(),
      etablissement: {
        toString: function () {
          return 'École Secondaire de Neufchâtel';
        }
      },

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
    }], function (data) {
      return new PlageIntervention(data);
    });

    PlageIntervention.find = function () {
      var deffered = $q.defer();
      deffered.resolve(plages);
      return deffered.promise;
    };

    PlageIntervention.findByIntervention = function (intervention) {
      return PlageIntervention.find().then(function (plages) {
        return _.find(plages, '_id', intervention.plage);
      });
    };

    PlageIntervention.search = function (term) {
      var deffered = $q.defer();
      deffered.resolve(_.filter(plages, function (plage) {
        return _.includes(plage.toString().toLowerCase(), term.toLowerCase());
      }));
      return deffered.promise;
    };

    PlageIntervention.prototype.getConversation = function () {
      return Conversation.findById(this.conversation);
    };

    return PlageIntervention;

  }]);
;
'use strict';

angular.module('messages').service('MessageDialog',
  ['Dialog', function (Dialog) {

    return {

      show: function ($event, params) {

        var dialog = new Dialog({
          controller: 'NouveauMessageController',
          controllerAs: 'nouveauMessageCtrl',
          templateUrl: 'modules/messages/views/nouveau-message.dialog.html',
          locals: {
            receivers: params.receivers
          },
          keepLastDialog: params.keepLastDialog
        });

        return dialog.show($event);
      }
    };
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

angular.module('search').provider('SearchService',
  function () {

    var providers = [];

    return {

      register: function (provider) {
        providers.push(provider);
      },

      $get: ['$q', '$injector', 'Dialog', function ($q, $injector, Dialog) {

        var factories = {};

        _.forEach(providers, function (provider) {
          factories[provider.type] = $injector.get(provider.factory);
        });

        var SearchService = {};

        SearchService.search = function (term) {

          var promises = [];

          _.forEach(providers, function (provider) {
            promises.push(factories[provider.type].search(term).then(function (results) {
              return _.map(results, function (result) {
                return {
                  provider: provider,
                  item: result,
                  type: provider.type,
                  icon: provider.icon,
                  _description: result.toString()
                };
              });
            }));
          });

          return $q.all(promises).then(function (results) {
            return _.flatten(results);
          });

        };

        SearchService.select = function ($event, selectedItem) {
          if (selectedItem) {

            var dialogConfig = selectedItem.provider.dialog,
              locals = {};

            locals[dialogConfig.itemName] = selectedItem.item;

            var dialog = new Dialog(_.assign(dialogConfig, {
              locals: locals,
              bindToController: true
            }));

            dialog.show($event);
          }
        };

        return SearchService;
      }]
    };
  });
;
'use strict';

angular.module('sockets').factory('Socket',
  ['$q', 'socketFactory', function ($q, socketFactory) {

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

  }]);
;
'use strict';

angular.module('sockets').provider('SocketFactory',
  function () {

    var routes = [];

    return {

      addRoute: function (route) {
        routes.push(route);
      },

      $get: ['$rootScope', 'Socket', function ($rootScope, Socket) {

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
      }]
    };
  });
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

angular.module('conversations').directive('conversationImage',
  function () {
    return {
      restrict: 'E',
      scope: {
        conversation: '=',
      },
      templateUrl: 'modules/conversations/views/conversation.image.html'
    };
  });
;
'use strict';

angular.module('conversations').directive('conversationSideNavList',
  ['$rootScope', function ($rootScope) {
    return {
      restrict: 'E',
      scope: {
        title: '@',
        type: '@',
        chunkSize: '@'
      },
      templateUrl: 'modules/conversations/views/conversation-side-nav.list.html',
      link: function (scope, element) {

        element.addClass('nav-list');

        $rootScope.$watch('conversations.equipe', function (conversations) {
          if (conversations) {
            scope.conversations = _.sortBy(conversations, function (conversation) {
              var lastMessage = conversation.getLastMessage();
              if (lastMessage) {
                return new Date(lastMessage.created.date);
              }
            }).reverse();
          }
        });

        scope.showMore = function () {
          scope.chunkSize += scope.chunkSize;
        };

      }
    };
  }]);
;
'use strict';

angular.module('conversations').directive('conversation',
  ['$rootScope', '$timeout', 'Message', function ($rootScope, $timeout, Message) {
    return {
      restrict: 'E',
      scope: {
        conversation: '='
      },
      templateUrl: 'modules/conversations/views/conversation.html',
      link: function (scope, element) {

        var messagesContainer = element.find('md-content');

        scope.scrollDown = function () {
          $timeout(function () {
            messagesContainer[0].scrollTop = messagesContainer[0].scrollHeight;
          });
        };

        scope.currentUser = $rootScope.currentUser;

        var unwatch = scope.$watch('conversation', function (conversation) {
          if (conversation) {
            scope.messages = scope.conversation.getMessages();
            unwatch();
          }
        });

        scope.addMessage = function (newMessage) {

          Message.create(_.assign({
            conversation: scope.conversation._id,
          }, newMessage)).then(function (message) {
            scope.newMessage = {};
            scope.conversation.messages.push(message);

            var isParticipating = false,
              participants = scope.conversation.getParticipants();
            _.forEach(participants, function (participant) {
              isParticipating = participant.equals(message.author);
            });
            if (!isParticipating) {
              participants.push(message.author);
            }
          });
        };

        scope.deleteMessage = function (message) {
          message.remove().then(function () {
            _.pull(scope.conversation.messages, message);
          });
        };
      }
    };
  }]);
;
'use strict';

angular.module('conversations').directive('conversationCard',
  ['$timeout', function ($timeout) {
    return {
      restrict: 'E',
      scope: {
        conversation: '=',
      },
      templateUrl: 'modules/conversations/views/conversation.card.html',
      link: function (scope, element) {

        $timeout(function () {
          var imageElement = element.find('img');
          if (imageElement.length === 0) {
            scope.showCard = true;
          } else {
            imageElement.bind('load', function () {
              scope.showCard = true;
              scope.$apply();
            });
          }
        });
      }
    };
  }]);
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

angular.module('events').directive('miniCalendar',
  function () {
    return {
      restrict: 'E',
      templateUrl: 'modules/events/views/mini-calendar.html',
      controller: 'MiniCalendarController',
      controllerAs: 'miniCalendarCtrl'
    };
  });
;
'use strict';

angular.module('interventions').directive('interventionCard',
  function () {
    return {
      restrict: 'E',
      scope: true,
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

angular.module('interventions').directive('plageInterventionFiche',
  function () {
    return {
      restrict: 'E',
      scope: {
        plage: '='
      },
      templateUrl: 'modules/interventions/views/plage-intervention.fiche.html',
      controller: 'PlageFicheController',
      controllerAs: 'plageFicheCtrl'
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

angular.module('search').directive('searchBar',
  ['$timeout', '$window', function ($timeout, $window) {
    return {
      restrict: 'A',
      controller: 'SearchBarController',
      controllerAs: 'searchBarCtrl',
      link: function (scope, element) {

        angular.element($window).bind('keydown', function ($event) {

          var keyCode = ($window.event) ? $event.which : $event.keyCode;

          if (($event.ctrlKey === true ||  $event.metaKey) && keyCode === 70) {
            $event.preventDefault();

            scope.$apply(function () {
              scope.searchToggled = !scope.searchToggled;
            });

            return false;
          }
        });

        var input;

        $timeout(function () {

          input = element.find('input');

          input.bind('keydown keypress', function (event) {
            if (event.which === 27) { // 27 = esc key
              scope.$apply(function () {
                scope.searchToggled = false;
              });

              event.preventDefault();
            }
          });

          input.bind('blur', function () {
            scope.$apply(function () {
              scope.searchToggled = false;
              scope.searchText = undefined;
            });
          });

          scope.$watch('searchToggled', function (searchToggled) {
            if (!searchToggled) {
              scope.searchText = undefined;
            } else {
              if (input) {
                input.focus();
              }
            }
          });
        });
      }
    };
  }]);
;
'use strict';

angular.module('benevoles').controller('BenevoleFicheController',
  ['$scope', '$mdDialog', '$mdToast', 'MessageDialog', function ($scope, $mdDialog, $mdToast, MessageDialog) {

    var ctrl = this;

    $scope.benevole = $scope.benevole || ctrl.benevole;

    ctrl.sendMessage = function ($event, benevole) {

      MessageDialog.show($event, {
        receivers: [benevole],
        keepLastDialog: true
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

angular.module('benevoles').controller('BenevolesSectionController',
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

angular.module('conversations').controller('ConversationFicheController',
  ['Conversation', '$stateParams', '$state', function (Conversation, $stateParams, $state) {

    var ctrl = this;

    ctrl.close = function () {
      $state.go('conversations');
    };

    Conversation.findById($stateParams.conversationId).then(function (conversation) {
      ctrl.conversation = conversation;
    });

  }]);
;
'use strict';

angular.module('conversations').controller('ConversationsSectionController',
  ['$scope', 'Conversation', '$mdDialog', function ($scope, Conversation, $mdDialog) {

    var ctrl = this;

    Conversation.getGeneral().then(function (conversations) {
      ctrl.conversations = conversations;
    });

    ctrl.create = function ($event) {

      $scope.conversation = {
        type: 'general'
      };

      $mdDialog.show({
        templateUrl: 'modules/conversations/views/conversation.form.html',
        parent: angular.element(document.body),
        targetEvent: $event,
        scope: $scope,
        preserveScope: true
      }).then(function () {

        Conversation.create($scope.conversation)
          .then(function (conversation) {
            ctrl.conversations.unshift(conversation);
          });
      });
    };

    ctrl.summitForm = function (form) {
      if (form.$valid) {
        $mdDialog.hide();
      }
    };

    ctrl.cancel = function () {
      $mdDialog.cancel();
    };

  }]);
;
'use strict';

angular.module('dashboard').controller('DashboardCardController',
  ['$rootScope', 'Dialog', function ($rootScope, Dialog) {

    var ctrl = this;

    ctrl.expand = function ($event, cardName) {

      var dialogConfig = {
          targetEvent: $event,
          fullscreen: true
        },
        dialog;

      switch (cardName) {
      case 'benevoles':

        dialog = new Dialog(_.assign({
          controller: 'BenevolesSectionController',
          controllerAs: 'benevolesSectionCtrl',
          templateUrl: 'modules/benevoles/views/benevoles.section.html'
        }, dialogConfig));
      }

      if (cardName) {
        dialog.show($event);
      }

      $rootScope.$on('Dialog:close', function () {
        dialog.hide();
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

angular.module('events').controller('MiniCalendarController',
  ['EventService', function (EventService) {

    var ctrl = this;

    EventService.getByDate(Date.now()).then(function (events) {
      ctrl.events = events;
    });

    ctrl.selectEvent = EventService.select;

  }]);
;
'use strict';

angular.module('interventions').controller('InterventionCardController',
  ['$scope', '$mdConstant', 'InterventionTag', 'Benevole', function ($scope, $mdConstant, InterventionTag, Benevole) {

    var ctrl = this;

    $scope.intervention.getBenevoles('confirmed').then(function (benevoles) {
      ctrl.confirmed = benevoles;
    });

    $scope.intervention.getBenevoles('interested').then(function (benevoles) {
      ctrl.interested = benevoles;
    });

    ctrl.chipSeparatorKeys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA, 186];

    ctrl.transformChip = function (chip) {
      return _.isObject(chip) ? chip : new InterventionTag({
        description: chip,
        isNew: true
      });
    };

    ctrl.searchTags = function (query) {
      return InterventionTag.find(query).then(function (results) {
        return _.differenceBy(results, $scope.intervention.tags, '_id');
      });
    };

    ctrl.dropped = function (item) {
      return new Benevole(item);
    };

    $scope.$on('destroyed', function () {
      console.log('SAVE PLAGE');
    });

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

angular.module('interventions').controller('PlageFicheController',
  ['$scope', '$q', 'PlageIntervention', 'Intervention', function ($scope, $q, PlageIntervention, Intervention) {

    var ctrl = this;

    function populatePlage(plage) {
      plage.getConversation().then(function (conversation) {
        ctrl.conversation = conversation;
      });
      return Intervention.findByPlageId(plage._id).then(function (interventions) {
        ctrl.interventions = interventions;
      });
    }

    if (ctrl.intervention) {
      PlageIntervention.findByIntervention(ctrl.intervention).then(function (plage) {
        populatePlage(plage).then(function () {
          ctrl.plage = plage;
        });
      });
    } else if ($scope.plage) {
      populatePlage($scope.plage).then(function () {
        ctrl.plage = $scope.plage;
      });
    }
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
      destinataires: ctrl.receivers || []
    };

    ctrl.searchDestinataires = function (query) {
      return Benevole.search(query).then(function (results) {
        return _.difference(results, $scope.message.destinataires);
      });
    };

    ctrl.send = function (messageForm) {
      messageForm.destinataires.$setValidity('required', $scope.message.destinataires.length > 0);
      console.log(messageForm.destinataires);
      if (messageForm.$valid) {
        console.log('SEND MESSAGE');
        if (ctrl.dialog) {
          ctrl.dialog.hide();
        }
      }
    };

  }]);
;
'use strict';

angular.module('navigation').controller('FabSeedDialController',
  ['FabSpeedDialService', 'Dialog', function (FabSpeedDialService, Dialog) {

    var ctrl = this;

    ctrl.items = FabSpeedDialService.getItems();

    ctrl.handleClick = function ($event, item) {

      var dialog = new Dialog(item.dialog);

      dialog.show($event);
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
  function () {

    // var ctrl = this;

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

  });
;
'use strict';

angular.module('search').controller('SearchBarController',
  ['$rootScope', 'SearchService', function ($rootScope, SearchService) {

    var ctrl = this;

    ctrl.search = SearchService.search;

    ctrl.selectSearchResult = SearchService.select;

  }]);
;
angular.module('angularjsapp').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('modules/benevoles/views/benevole-fiche.dialog.html',
    "<md-dialog aria-label=Bénévole style=\"width: 1000px; height: 1000px\"><dashboard-fullscreen-header-card></dashboard-fullscreen-header-card><md-dialog-content style=\"height: 100%\"><benevole-fiche benevole=benevole layout=column flex></benevole-fiche></md-dialog-content></md-dialog>"
  );


  $templateCache.put('modules/benevoles/views/benevole.fiche.html',
    "<div layout=column flex><div layout=column layout-padding class=fiche-header><div layout=row><span flex></span><md-button class=md-icon-button ng-click=\"benevoleFicheCtrl.sendMessage($event, benevole)\"><md-icon md-svg-icon=communication:message></md-icon><md-tooltip>Message</md-tooltip></md-button><md-button class=md-icon-button ng-click=\"benevoleFicheCtrl.deleteBenevole($event, benevole)\"><md-icon md-svg-icon=action:delete></md-icon><md-tooltip>Supprimer</md-tooltip></md-button></div><span flex></span><div layout=row class=fiche-title-over-custom-tabs><div layout=row layout-align=\"center start\"><avatar></avatar></div><div layout=column layout-align=\"center start\"><span class=md-title>{{ benevole.toString() }}</span> <span class=md-subhead>{{ benevole.role }}</span></div></div></div><md-content flex style=overflow:visible><md-tabs layout-fill flex class=\"custom-tabs md-accent\"><md-tab layout-fill><md-tab-label>Activité</md-tab-label><md-tab-body><md-content layout-padding layout=row flex><div flex=60></div><div class=md-whiteframe-1dp flex=40><md-toolbar><div class=md-toolbar-tools><h2>Récent</h2></div></md-toolbar><md-list><md-list-item class=md-2-line><md-icon md-svg-icon=communication:message></md-icon><div class=md-list-item-text><h3>Qqchose</h3><p>description</p></div><md-divider></md-divider></md-list-item><md-list-item class=md-2-line><md-icon md-svg-icon=content:add></md-icon><div class=md-list-item-text><h3>Qqchose</h3><p>description</p></div><md-divider></md-divider></md-list-item><md-list-item class=md-2-line><md-icon md-svg-icon=communication:message></md-icon><div class=md-list-item-text><h3>Qqchose</h3><p>description</p></div><md-divider></md-divider></md-list-item><md-list-item class=md-2-line><md-icon md-svg-icon=communication:message></md-icon><div class=md-list-item-text><h3>Qqchose</h3><p>description</p></div><md-divider></md-divider></md-list-item><md-list-item class=md-2-line><md-icon md-svg-icon=communication:message></md-icon><div class=md-list-item-text><h3>Qqchose</h3><p>description</p></div><md-divider></md-divider></md-list-item></md-list></div></md-content></md-tab-body></md-tab><md-tab><md-tab-label>Profil</md-tab-label><md-tab-body><md-content layout-padding layout=row flex><form name=userProfileForm ng-submit=profilCtrl.saveProfile(userProfileForm) novalidate><div layout=row><div layout=column flex=40 layout-align=\"center center\"><avatar class=profile user=profilCtrl.user click-to-update></avatar></div><span flex=10></span><div layout=column flex=40><md-input-container flex><label>Prénom</label><input name=prenom required ng-model=profilCtrl.user.firstname><ng-messages for=userProfileForm.prenom.$error role=alert><ng-message when=required>requis.</ng-message></ng-messages></md-input-container><md-input-container flex><label>Nom de famille</label><input name=nom required ng-model=profilCtrl.user.lastname><ng-messages for=userProfileForm.nom.$error role=alert><ng-message when=required>requis.</ng-message></ng-messages></md-input-container></div></div><div layout=row><md-input-container flex=40><label>Rôle</label><input name=titre ng-model=profilCtrl.user.title disabled></md-input-container><span flex=10></span><md-input-container flex=40><label>Date de naissance</label><input name=dateNaissance type=date required ng-model=profilCtrl.user.dateNaissance><ng-messages for=userProfileForm.dateNaissance.$error role=alert><ng-message when=required>requis.</ng-message></ng-messages></md-input-container></div><div layout=row><md-input-container flex=40><label>Pseudo</label><input name=pseudo required ng-model=profilCtrl.user.pseudo><ng-messages for=userProfileForm.pseudo.$error role=alert><ng-message when=required>requis.</ng-message></ng-messages></md-input-container><span flex=10></span><md-input-container flex=40><label>Courriel</label><input name=email required ng-model=profilCtrl.user.email type=email><ng-messages for=userProfileForm.email.$error role=alert><ng-message when=required>requis.</ng-message></ng-messages></md-input-container></div><div layout=row><input style=display:none><md-input-container flex=40><label>Nouveau mot de passe</label><input name=password autocomplete=off ng-model=profilCtrl.user.password type=password></md-input-container><span flex=10></span><md-input-container flex=40><label>Vérification mot de passe</label><input name=passwordMatch ng-disabled=\"profilCtrl.user.password === undefined\" ng-required=profilCtrl.user.password ng-model=profilCtrl.user.passwordMatch type=password><ng-messages for=userProfileForm.passwordMatch.$error role=alert><ng-message when=required>requis.</ng-message></ng-messages></md-input-container></div><div layout=row layout-align=\"end center\"><md-button class=\"md-raised md-primary\" ng-disabled=userProfileForm.$pristine type=submit>Sauvegarder</md-button></div></form></md-content></md-tab-body></md-tab></md-tabs></md-content></div>"
  );


  $templateCache.put('modules/benevoles/views/benevole.form-dialogue.html',
    "<md-dialog aria-label=\"Nouveau message\" style=width:800px><form novalidate name=benevoleForm ng-submit=closeModal(benevoleForm)><md-toolbar><div class=md-toolbar-tools><h2>Nouveau bénévole</h2><span flex></span><md-button class=md-icon-button ng-click=cancel()><md-icon md-svg-icon=navigation:close aria-label=\"Close dialog\"></md-icon></md-button></div></md-toolbar><md-dialog-content><div class=md-dialog-content></div></md-dialog-content><md-dialog-actions layout=row><md-button type=button ng-click=cancelModal()>Annuler</md-button><md-button type=submit style=margin-right:20px>Ajouter</md-button></md-dialog-actions></form></md-dialog>"
  );


  $templateCache.put('modules/benevoles/views/benevoles.section.html',
    "<md-dialog aria-label=\"Liste bénévoles\" layout=column><dashboard-fullscreen-header-card></dashboard-fullscreen-header-card><md-subheader class=filter-bar><md-input-container md-no-float class=\"md-block md-icon-right\"><md-icon md-svg-icon=action:search></md-icon><input ng-model=search placeholder=recherche... ng-change=benevolesSectionCtrl.doSearch(search) ng-model-options=\"{ debounce: 1000 }\"><md-icon md-svg-icon=content:clear ng-show=search ng-click=\"search = undefined;benevolesSectionCtrl.clearSearch()\"></md-icon></md-input-container></md-subheader><md-dialog-content layout=row flex ng-if=!benevolesSectionCtrl.emptySearchResults><md-card layout=column flex=30 flex-gt-lg=20 class=card-list><md-content layout=column flex><md-list flex layout=column><md-list-item class=md-2-line ng-class=\"{ active : benevole._id === benevolesSectionCtrl.currentProfile._id }\" ng-repeat=\"benevole in benevolesSectionCtrl.benevoles\" ng-click=benevolesSectionCtrl.showProfile(benevole)><div class=md-list-item-text><h3>{{ benevole.toString() }}</h3><p>{{ benevole.role }}</p></div><md-divider ng-if=!$last></md-divider></md-list-item></md-list></md-content></md-card><div flex=70 flex-gt-lg=80 layout=column><div layout=row flex layout-align=\"center center\" ng-hide=benevolesSectionCtrl.currentProfile><md-progress-circular md-diameter=280 md-mode=indeterminate></md-progress-circular></div><benevole-fiche benevole=benevolesSectionCtrl.currentProfile ng-show=benevolesSectionCtrl.currentProfile layout=column flex></benevole-fiche></div></md-dialog-content><md-dialog-content layout=row flex layout-align=\"center center\" ng-if=benevolesSectionCtrl.emptySearchResults><div layout=column flex layout-align=\"center center\"><md-icon md-svg-icon=social:mood_bad style=height:280px;width:280px></md-icon><h1 class=md-display-1>Aucun résultat</h1><small class=.md-caption>C'est quoi cette recherche?</small></div></md-dialog-content></md-dialog>"
  );


  $templateCache.put('modules/conversations/views/conversation-side-nav.list.html',
    "<md-subheader class=md-no-sticky>{{ title }}</md-subheader><md-list-item class=md-2-line ui-sref-active=active ui-sref=\"conversation({conversationId: conversation._id})\" ng-repeat=\"conversation in conversations | limitTo : chunkSize\"><div class=md-list-item-text><h3>{{ conversation.getTitle() }}</h3></div><md-icon ng-show=conversation.hasNewMessages() class=md-accent md-svg-icon=action:announcement></md-icon><md-divider ng-if=!$last></md-divider></md-list-item><md-list-item ng-show=\"chunkSize < conversations.length\" class=plus><span class=md-caption ng-click=showMore()>plus</span></md-list-item>"
  );


  $templateCache.put('modules/conversations/views/conversation.card.html',
    "<md-card md-ink-ripple ui-sref=\"conversation({conversationId: conversation._id})\"><conversation-image conversation=conversation></conversation-image><div layout=row layout-margin style=min-height:70px><div flex layout=row layout-align=\"start center\"><span>{{conversation.title }}<span></span></span></div><div layout=row layout-align=\"start center\"><span>{{ conversation.messages.length }}</span>&nbsp<md-icon ng-class=\"{ 'md-accent' : conversation.hasNewMessages() }\" md-svg-icon=communication:message></md-icon></div></div></md-card>"
  );


  $templateCache.put('modules/conversations/views/conversation.fiche.html',
    "<md-toolbar class=md-accent><div class=md-toolbar-tools><h2><span>{{ conversationFicheCtrl.conversation.getTitle() }}</span></h2><span flex></span><md-button class=md-icon-button aria-label=More><md-icon md-svg-icon=content:clear ng-click=conversationFicheCtrl.close()></md-icon></md-button></div></md-toolbar><md-content layout=column><div ng-hide=conversationFicheCtrl.conversation layout=row layout-align=\"center center\" layout-margin><md-progress-circular md-mode=indeterminate></md-progress-circular></div><md-card ng-show=conversationFicheCtrl.conversation layout=column><md-card-title style=\"min-height: 100px;heigth: 100px\"><md-card-title-media flex=30><img style=width:150px;heigth:150px src=\"http://nilofermerchant.com/wp-content/uploads/2009/09/HiRes-1024x785.jpg\"></md-card-title-media><md-card-title-text><span class=md-title>Participants</span><div layout=row layout-wrap><avatar user=participant ng-repeat=\"participant in conversationFicheCtrl.conversation.getParticipants()\"></avatar></div></md-card-title-text></md-card-title><md-card-content layout=column><conversation layout=column conversation=conversationFicheCtrl.conversation></conversation></md-card-content></md-card></md-content>"
  );


  $templateCache.put('modules/conversations/views/conversation.form.html',
    "<md-dialog aria-label=\"Nouvelle conversation\"><form name=conversationForm ng-submit=conversationsSectionCtrl.summitForm(conversationForm) novalidate><md-toolbar><div class=md-toolbar-tools><h2>Nouvelle conversation</h2><span flex></span><md-button class=md-icon-button ng-click=conversationsSectionCtrl.cancel()><md-icon md-svg-icon=navigation:close aria-label=\"Close dialog\"></md-icon></md-button></div></md-toolbar><md-dialog-content><div class=md-dialog-content layout=column style=width:500px><md-input-container flex=60><label>Titre de la conversation</label><input name=title md-maxlength=50 required ng-model=conversation.title><ng-messages for=conversationForm.title.$error role=alert><ng-message when=md-maxlength>un peu trop long!</ng-message><ng-message when=required>requis.</ng-message></ng-messages></md-input-container><md-input-container flex=60><label>Permier message</label><input name=message required ng-model=conversation.message><ng-messages for=conversationForm.message.$error role=alert><ng-message when=required>requis.</ng-message></ng-messages></md-input-container></div></md-dialog-content><md-dialog-actions layout=row><md-button type=submit>Créer</md-button></md-dialog-actions></form></md-dialog>"
  );


  $templateCache.put('modules/conversations/views/conversation.html',
    "<md-list layout=column><md-content md-scroll-y><md-list-item class=md-2-line ng-repeat=\"message in messages | orderBy : 'date'\" ng-mouseover=\"showOptions = true\" ng-mouseleave=\"showOptions = false\" ng-init=\"$last && scrollDown()\"><avatar user=message.getAuthor()></avatar><div class=md-list-item-text layout=column style=padding-left:5px><div layout=row flex><h3>{{ message.getAuthor().toString() }}</h3><span flex></span> <span class=md-caption ng-hide=\"message.author._id === currentUser._id && showOptions\" style=padding-right:6px;line-height:23px>{{ message.getDate().fromNow() }}</span><md-button class=md-icon-button aria-label=Supprimer style=margin:0px;padding:0px;min-height:23px;height:18px ng-show=\"message.author._id === currentUser._id && showOptions\" ng-click=deleteMessage(message)><md-icon md-svg-icon=action:delete style=\"height: 16px\"></md-icon></md-button></div><p>{{ message.body }}</p></div></md-list-item></md-content><form ng-submit=addMessage(newMessage)><div layout=row style=\"min-height: 60px;height:60px\"><avatar user=currentUser></avatar><md-input-container flex><label>Nouveau message</label><input style=margin-top:10px ng-model=newMessage.body></md-input-container><div layout=row layout-align=\"center center\" style=\"height: 74px\"><md-button type=submit class=\"md-icon-button md-primary\" aria-label=Ajouter ng-disabled=\"newMessage.body === undefined || newMessage.body.length === 0\"><md-icon md-svg-icon=content:send></md-icon></md-button></div></div></form></md-list>"
  );


  $templateCache.put('modules/conversations/views/conversation.image.html',
    "<div layout-padding><img src=\"http://nilofermerchant.com/wp-content/uploads/2009/09/HiRes-1024x785.jpg\"></div>"
  );


  $templateCache.put('modules/conversations/views/conversations.section.html',
    "<md-content layout=column flex><md-subheader><div layout=column layout-gt-sm=row layout-align=\"end center\"><md-button class=md-raised style=margin:0px ng-click=conversationsSectionCtrl.create($event)>nouvelle conversation</md-button></div></md-subheader><md-content layout=column md-scroll-y flex><div ng-hide=conversationsSectionCtrl.conversations layout=row layout-align=\"center center\" layout-margin><md-progress-circular md-mode=indeterminate></md-progress-circular></div><div layout=row layout-wrap ng-show=conversationsSectionCtrl.conversations><conversation-card flex=33 conversation=conversation ng-repeat=\"conversation in conversationsSectionCtrl.conversations\"></conversation-card></div></md-content></md-content>"
  );


  $templateCache.put('modules/conversations/views/new-message.toast.html',
    "<md-toast><avatar user=newMessageToastCtl.user></avatar><div layout=column flex><span>{{ newMessageToastCtl.subject }}</span> <span>{{ newMessageToastCtl.message.body }}</span></div><md-button ng-click=newMessageToastCtl.viewMessage(newMessageToastCtl.message)>Voir</md-button></md-toast>"
  );


  $templateCache.put('modules/dashboard/views/dashboard-fullscreen-header.card.html',
    "<div layout=row><span flex></span><md-button aria-label=FullScreen ng-click=dashboardFullscreenHeaderCtrl.close() class=md-icon-button><md-icon md-svg-icon=navigation:fullscreen_exit></md-icon></md-button></div>"
  );


  $templateCache.put('modules/dashboard/views/dashboard.card.html',
    "<md-card><md-card-header><span flex></span><md-button aria-label=FullScreen ng-click=\"dashboardCardCtrl.expand($event, expandId)\" class=md-icon-button><md-icon md-svg-icon=navigation:fullscreen></md-icon></md-button></md-card-header><md-card-content layout=column flex ng-transclude></md-card-content></md-card>"
  );


  $templateCache.put('modules/dashboard/views/dashboard.html',
    "<md-content flex style=padding:8px class=layout-bg><md-grid-list md-cols-xs=2 md-cols-sm=4 md-cols-md=4 md-cols-gt-md=6 md-row-height=1:1 md-gutter=8px><md-grid-tile md-rowspan=2 sou md-colspan-xs=2 md-colspan-sm=4 md-colspan=2><mini-calendar style=\"width: 100%;height: 100%\"><mini-calendar></mini-calendar></mini-calendar></md-grid-tile><md-grid-tile md-rowspan-xs=2 md-rowspan-sm=2 md-rowspan=2 md-colspan-xs=2 md-colspan-sm=4 md-colspan=2 md-colspan-sm=2><dashboard-card><dashboard-card-header><h3 class=text-center flex>Urgences</h3></dashboard-card-header><dashboard-card-content><md-list><md-list-item><div flex=20 layout=row><div class=md-display-1>15</div><div class=md-subhead>30</div></div><div flex layout=column><div class=md-subhead>École secondaire de Neufchâtel</div><div class=md-caption>intervention</div></div><md-icon md-svg-icon=alert:warning></md-icon></md-list-item><md-list-item><div flex=20 layout=row><div class=md-display-1>16</div><div class=md-subhead>45</div></div><div flex layout=column><div class=md-subhead>École secondaire de Neufchâtel</div><div class=md-caption>intervention</div></div><md-icon md-svg-icon=alert:warning></md-icon></md-list-item></md-list></dashboard-card-content></dashboard-card></md-grid-tile><md-grid-tile><dashboard-card><dashboard-card-content layout-align=\"center center\"><div layout=column class=text-center><div class=md-display-1>3</div><div class=md-title>nouveaux</div><div class=md-title>messages</div></div></dashboard-card-content></dashboard-card></md-grid-tile><md-grid-tile><dashboard-card expand-id=benevoles><dashboard-card-content flex><div flex layout=column layout-align=\"center center\" class=text-center><div class=md-display-1>340</div><div class=md-title>bénévoles</div></div></dashboard-card-content></dashboard-card></md-grid-tile><md-grid-tile md-colspan-xs=2 md-colspan-sm=2><dashboard-card expand-id=benevoles><dashboard-card-content flex><div flex layout=column layout-align=\"center center\" class=text-center><div class=md-display-1>120</div><div class=md-title>établissements</div></div></dashboard-card-content></dashboard-card></md-grid-tile></md-grid-list></md-content>"
  );


  $templateCache.put('modules/events/views/mini-calendar.html',
    "<dashboard-card><dashboard-card-header layout=row layout-align=\"start center\"><md-button aria-label=Avant class=md-icon-button><md-icon md-svg-icon=navigation:chevron_left></md-icon></md-button><span flex><h3 class=text-center flex>Aujourd'hui</h3></span><md-button aria-label=Arpès class=md-icon-button><md-icon md-svg-icon=navigation:chevron_right></md-icon></md-button></dashboard-card-header><dashboard-card-content><md-list><md-list-item ng-repeat=\"event in miniCalendarCtrl.events\" ng-click=\"miniCalendarCtrl.selectEvent($event, event)\"><div flex=20 layout=row><div class=md-display-1>{{ event.date.start.hour() }}</div><div class=md-subhead>{{ event.date.start.format('mm') }}</div></div><div flex layout=column><div class=md-subhead>{{ event.description }}</div><div class=md-caption>{{ event.type }}</div></div><md-icon ng-if=event.stateIcon md-svg-icon=\"{{ event.stateIcon }}\"></md-icon></md-list-item></md-list></dashboard-card-content></dashboard-card>"
  );


  $templateCache.put('modules/interventions/views/intervention.card.html',
    "<md-card><md-card-title layout-align=\"start center\"><div class=md-headline flex=5>{{ intervention.getDateRange().start.format('H:mm') }}</div><md-chips ng-model=intervention.tags md-autocomplete-snap md-separator-key=interventionCardCtrl.chipSeparatorKeys md-transform-chip=interventionCardCtrl.transformChip($chip)><md-autocomplete md-selected-item=selectedItem md-search-text=searchText md-items=\"tag in interventionCardCtrl.searchTags(searchText)\" md-item-text=tag.description placeholder=\"Ajout mot clef\"><span md-highlight-text=searchText>{{ tag.description }}</span></md-autocomplete><md-chip-template><span><strong>{{ $chip.description }}</strong></span></md-chip-template></md-chips></md-card-title><md-card-content layout=row><div layout=column flex=50><div flex class=infos layout=row><div layout=column flex=20 style=margin-right:5px><div>local:</div><div>responsable:</div><div>lieu de rencontre:</div></div><div layout=column flex><div>{{ intervention.getLocal() }}</div><div>{{ intervention.getResponsable() }}</div><div>{{ intervention.getMeetingPlace() }}</div></div></div><div class=benevoles-confimes><div class=md-subhead>Bénévoles confirmés</div><div class=benevole-list layout=row layout-wrap layout-align=\"start center\" dnd-list=interventionCardCtrl.confirmed dnd-allowed-types=[intervention._id] dnd-horizontal-list=true dnd-drop=interventionCardCtrl.dropped(item)><avatar ng-repeat=\"benevole in interventionCardCtrl.confirmed\" user=benevole dnd-draggable=benevole dnd-type=intervention._id dnd-moved=\"interventionCardCtrl.confirmed.splice($index, 1)\" dnd-effect-allowed=move></avatar><md-button class=\"md-fab md-mini\" aria-label=\"Ajout bénévole\"><md-icon md-svg-icon=content:add></md-icon></md-button></div></div></div><div layout=column flex><div class=md-subhead>Bénévoles intéressés</div><md-content class=benevole-list layout=row layout-wrap dnd-list=interventionCardCtrl.interested dnd-allowed-types=[intervention._id] dnd-drop=interventionCardCtrl.dropped(item)><avatar ng-repeat=\"benevole in interventionCardCtrl.interested\" user=benevole dnd-draggable=benevole dnd-type=intervention._id dnd-moved=\"interventionCardCtrl.interested.splice($index, 1)\" dnd-effect-allowed=move></avatar></md-content></div></md-card-content></md-card>"
  );


  $templateCache.put('modules/interventions/views/plage-intervention-fiche.dialog.html',
    "<md-dialog aria-label=\"Plage d'intervention\" style=\"width: 1000px; height: 1000px\" layout=column><dashboard-fullscreen-header-card></dashboard-fullscreen-header-card><md-dialog-content flex layout=column><plage-intervention-fiche plage=plageFicheCtrl.plage layout=column flex></plage-intervention-fiche></md-dialog-content></md-dialog>"
  );


  $templateCache.put('modules/interventions/views/plage-intervention.fiche.html',
    "<div layout=column flex><div layout=column layout-padding class=fiche-header><div layout=row><span flex></span></div><span flex></span><div layout=row class=fiche-title-over-custom-tabs><div layout=column layout-align=\"center start\"><span class=md-title>{{ plageFicheCtrl.plage.getEtablissement().toString() }}</span> <span class=md-subhead>{{ plageFicheCtrl.plage.getCalendarDay() }}</span></div></div></div><md-content layout=column flex style=overflow:visible><md-tabs layout-fill layout=column flex class=\"custom-tabs md-accent\"><md-tab layout-fill><md-tab-label>Interventions</md-tab-label><md-tab-body><md-content flex class=layout-bg><intervention-card ng-repeat=\"intervention in plageFicheCtrl.interventions\"></intervention-card></md-content></md-tab-body></md-tab><md-tab><md-tab-label>Conversation</md-tab-label><md-tab-body><md-content flex class=layout-bg><md-card><md-card-title layout=column><div class=md-title>Participants</div><div layout=row layout-align=\"start center\" layout-wrap><avatar ng-repeat=\"benevole in plageFicheCtrl.conversation.getParticipants()\" user=benevole></avatar></div></md-card-title><md-card-content><conversation conversation=plageFicheCtrl.conversation></conversation></md-card-content></md-card></md-content></md-tab-body></md-tab><md-tab><md-tab-label>Infos</md-tab-label><md-tab-body><md-content flex class=layout-bg><md-card><md-card-title layout=column><div class=md-title>Plage d'intervention</div></md-card-title><md-card-content>DATE CRÉATION<br>CRÉÉ PAR<br>PERSONNE RESSOURCE<br></md-card-content></md-card><md-card><md-card-title layout=column><div class=md-title>Établissement</div></md-card-title><md-card-content>ADRESSE<br>STATIONNEMENT<br>NOTES<br></md-card-content></md-card></md-content></md-tab-body></md-tab></md-tabs></md-content></div>"
  );


  $templateCache.put('modules/messages/views/nouveau-message.dialog.html',
    "<md-dialog aria-label=\"Nouveau message\" style=width:800px><form novalidate name=messageForm ng-submit=nouveauMessageCtrl.send(messageForm)><md-toolbar><div class=md-toolbar-tools><h2>Nouveau message</h2><span flex></span><md-button class=md-icon-button ng-click=nouveauMessageCtrl.dialog.hide()><md-icon md-svg-icon=navigation:close aria-label=\"Close dialog\"></md-icon></md-button></div></md-toolbar><md-dialog-content><div class=md-dialog-content><md-contact-chips ng-model=message.destinataires name=destinataires md-contacts=nouveauMessageCtrl.searchDestinataires($query) md-contact-name=fullname md-contact-image=avatar md-contact-email=role md-require-match=true md-highlight-flags=i placeholder=Destinataire(s)></md-contact-chips><div ng-messages=messageForm.destinataires.$error><div ng-message=required>requis.</div></div><md-input-container class=md-block><label>Sujet</label><input name=subject ng-model=message.subject required><div ng-messages=messageForm.subject.$error><div ng-message=required>requis.</div></div></md-input-container><md-input-container class=md-block><label>Message</label><textarea name=body ng-model=message.body rows=5 required></textarea><div ng-messages=messageForm.body.$error><div ng-message=required>requis.</div></div></md-input-container></div></md-dialog-content><md-dialog-actions layout=row><md-button type=button ng-click=nouveauMessageCtrl.dialog.hide()>Annuler</md-button><md-button type=submit style=margin-right:20px>Envoyer</md-button></md-dialog-actions></form></md-dialog>"
  );


  $templateCache.put('modules/navigation/views/fab-speed-dial.html',
    "<md-fab-speed-dial md-direction=up class=md-fling ng-cloak><md-fab-trigger><md-button aria-label=menu class=md-fab><md-icon md-svg-icon=content:add></md-icon></md-button></md-fab-trigger><md-fab-actions><md-button ng-repeat=\"item in fabSeedDialCtrl.items\" ng-click=\"fabSeedDialCtrl.handleClick($event, item)\" aria-label=\"{{ item.tooltip }}\" class=\"md-fab md-raised md-mini\"><md-tooltip md-direction=left>{{ item.tooltip }}</md-tooltip><md-icon md-svg-icon=\"{{ item.icon }}\"></md-icon></md-button></md-fab-actions></md-fab-speed-dial>"
  );


  $templateCache.put('modules/navigation/views/sidenav.html',
    "<md-sidenav flex layout=column class=md-sidenav-left md-component-id=sidenav md-is-locked-open=\"$mdMedia('gt-md')\" md-disable-backdrop md-whiteframe=4><md-toolbar style=\"min-height: 160px\"><div layout=row layout-align=\"start center\"><md-menu><md-button aria-label=Options class=md-icon-button ng-click=$mdOpenMenu($event)><md-icon class=md-accent md-svg-icon=navigation:more_vert></md-icon></md-button><md-menu-content width=4><md-menu-item><md-button ng-click=sideNavCtrl.showNotifications()><div layout=row><p flex>Notifications</p><md-icon md-menu-align-target md-svg-icon=social:notifications></md-icon></div></md-button></md-menu-item><md-menu-item><md-button ng-click=sideNavCtrl.showProfil()><div layout=row><p flex>Profil</p><md-icon md-menu-align-target md-svg-icon=action:account_circle></md-icon></div></md-button></md-menu-item><md-menu-item><md-button ng-click=sideNavCtrl.logout()><div layout=row><p flex>Déconnexion</p><md-icon md-menu-align-target md-svg-icon=action:exit_to_app></md-icon></div></md-button></md-menu-item></md-menu-content></md-menu><h3 flex class=md-subhead>Gestigris - Administration</h3></div><div layout=row layout-align=\"start center\" class=md-padding><avatar user=currentUser></avatar><div flex class=md-padding>{{ currentUser.toString() }}</div></div></md-toolbar><md-content layout=column md-scroll-y flex><md-list><md-list-item ui-sref-active=active ui-sref=benevoles ng-click=sidenavCtrl.closeSidenav()><p>Bénévoles</p></md-list-item><md-divider></md-divider><md-list-item ui-sref-active=active ui-sref=interventions ng-click=sidenavCtrl.closeSidenav()><p>Interventions</p></md-list-item></md-list></md-content></md-sidenav>"
  );


  $templateCache.put('modules/navigation/views/toolbar.html',
    "<md-toolbar md-scroll-shrink ng-style=\"!loadingRoute && { 'padding-top' : '5px' }\" style=\"padding-bottom: 5px\"><div class=md-toolbar-tools ng-init=\"searchToggled = false\"><h2>Gestigris</h2><span flex></span><md-button class=md-icon-button aria-label=Recherche ng-click=\"searchToggled = !searchToggled\"><md-icon md-svg-icon=action:search></md-icon></md-button><md-autocomplete search-bar ng-class=\"{ show: searchToggled }\" class=search-bar md-delay=500 md-search-text=searchText md-selected-item-change=\"searchBarCtrl.selectSearchResult($event, item)\" md-items=\"item in searchBarCtrl.search(searchText)\" md-item-text=item._description md-min-length=1 placeholder=recherche... md-menu-class=autocomplete-search-template><md-item-template><div class=item-title layout=row layout-align=\"start center\"><span><md-icon md-svg-icon=\"{{ item.icon }}\"></md-icon></span> <span layout=column><div class=md-subhead style=\"line-height: 25px\">{{ item._description }}</div><div style=\"line-height: 20px\">{{ item.type }}</div></span></div></md-item-template><md-not-found>Aucun résultat pour {{ searchText }}.</md-not-found></md-autocomplete></div></md-toolbar>"
  );

}]);
