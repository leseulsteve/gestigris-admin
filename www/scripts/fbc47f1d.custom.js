'use strict';

// Init the application configuration module for AngularJS application
var ApplicationConfiguration = (function () {
  // Init module configuration options
  var applicationModuleName = 'angularjsapp';
  var applicationModuleVendorDependencies = [
    'gestigris-common',
    'dndLists',
    'bc.Flickity',
    'ngImgCrop',
    'ui.mask'
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

ApplicationConfiguration.registerModule('benevoles', ['search', 'conversations']);
;
'use strict';

ApplicationConfiguration.registerModule('contacts');
;
'use strict';

ApplicationConfiguration.registerModule('conversations', ['navigation', 'search', 'core', 'sockets']);
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

angular.module('gestigris-common')

.constant('ENV', 'development')

.constant('APP', {name:'Administration',version:'BETA-1'})

.constant('API_URL', 'http://138.197.154.99:90/ws')

;;
'use strict';

angular.module('benevoles').config(
  ['ToolbarMenuServiceProvider', 'SearchServiceProvider', 'FabSpeedDialServiceProvider', 'RightPanelProvider', 'BENEVOLES', function (ToolbarMenuServiceProvider, SearchServiceProvider, FabSpeedDialServiceProvider, RightPanelProvider, BENEVOLES) {

    ToolbarMenuServiceProvider.addItem({
      title: 'Benevoles',
      icon: BENEVOLES.ICONS.BENEVOLE,
      route: 'benevoles'
    });

    SearchServiceProvider.register({
      factory: 'Benevole',
      type: 'Bénévole',
      icon: BENEVOLES.ICONS.BENEVOLE,
      resultState: {
        name: 'benevoles.fiche',
        param: 'benevoleId'
      }
    });

    FabSpeedDialServiceProvider.addItem({
      tooltip: 'bénévole',
      icon: BENEVOLES.ICONS.BENEVOLE,
      dialog: BENEVOLES.DIALOGS.ADD_BENEVOLE
    });

    RightPanelProvider.register({
      panelName: 'benevole',
      template: '<benevole-card benevole="benevole"></benevole-card>',
      itemName: 'benevole'
    });

  }]);
;
'use strict';

angular.module('benevoles').constant('BENEVOLES', {
  ICONS: {
    BENEVOLE: 'action:account_circle',
    OBSERVATEUR: 'action:visibility'
  },
  DIALOGS: {
    ADD_BENEVOLE: {
      templateUrl: 'modules/benevoles/views/nouveau-benevole.dialog.html',
      controller: 'NouveauBenevoleController',
      controllerAs: 'nouveauBenevoleCtrl'
    }
  }
});

angular.module('benevoles').run(
  ['$rootScope', 'BENEVOLES', function ($rootScope, BENEVOLES) {
    $rootScope.BENEVOLES = BENEVOLES;
  }]);
;
'use strict';

angular.module('benevoles').config(
  ['$stateProvider', function ($stateProvider) {

    $stateProvider.

    state('benevoles', {
      url: '/benevoles',
      template: '<ui-view layout="column" flex></ui-view>',
      params: {
        filters: null
      },
      resolve: {
        benevoles: ['$q', '$timeout', 'Benevole', 'PARAMS', '$stateParams', function ($q, $timeout, Benevole, PARAMS, $stateParams) {
          $stateParams.filters = _.assign({
            actif: true
          }, $stateParams.filters);
          return $q.all([
            $timeout(angular.noop, PARAMS.MIN_LOADING_TIME),
            Benevole.search($stateParams.filters)
          ]).then(function (results) {
            return _.last(results);
          });
        }]
      },
      controller: ['$state', '$location', 'benevoles', '$stateParams', function ($state, $location, benevoles, $stateParams) {
        if ($location.path().split('/').length === 2 && benevoles.length) {
          $state.go('benevoles.fiche', {
            benevoleId: _.get(_.first(benevoles), '_id'),
            filters: $stateParams.filters
          });
        }
      }]
    }).

    state('benevoles.fiche', {
      url: '/:benevoleId',
      title: 'Bénévoles',
      params: {
        filters: null
      },
      templateUrl: 'modules/benevoles/views/benevoles.section.html',
      controller: 'BenevolesSectionController',
      controllerAs: 'benevolesSectionCtrl'
    });
  }]);
;
'use strict';

angular.module('conversations').config(
  ['ToolbarMenuServiceProvider', 'CONVERSATIONS', function (ToolbarMenuServiceProvider, CONVERSATIONS) {

    ToolbarMenuServiceProvider.addItem({
      title: 'Conversations',
      icon: CONVERSATIONS.ICONS.CONVERSATION,
      route: 'conversations'
    });

  }]);
;
'use strict';

angular.module('conversations').constant('CONVERSATIONS', {
  ICONS: {
    CONVERSATION: 'communication:message'
  }
});

angular.module('conversations').run(
  ['$rootScope', 'CONVERSATIONS', function ($rootScope, CONVERSATIONS) {
    $rootScope.CONVERSATIONS = CONVERSATIONS;
  }]);
;
'use strict';

angular.module('conversations').config(
  ['$stateProvider', function ($stateProvider) {

    $stateProvider.

    state('conversations', {
      url: '/conversations',
      template: '<ui-view layout="column" flex></ui-view>',
      params: {
        filters: null
      },
      resolve: {
        conversations: ['$q', '$timeout', 'Conversation', 'PARAMS', '$stateParams', function ($q, $timeout, Conversation, PARAMS, $stateParams) {
          $stateParams.filters = _.assign({
            archived: false,
            type: {
              $ne: 'intervention'
            }
          }, $stateParams.filters);
          return $q.all([
            $timeout(angular.noop, PARAMS.MIN_LOADING_TIME),
            Conversation.search($stateParams.filters)
          ]).then(function (results) {
            return _.last(results);
          });
        }]
      },
      controller: ['$state', '$location', '$stateParams', 'conversations', function ($state, $location, $stateParams, conversations) {
        if ($location.path().split('/').length === 2) {
          $state.go('conversations.fiche', {
            conversationId: _.get(_.first(conversations), '_id'),
            filters: $stateParams.filters
          });
        }
      }]
    }).

    state('conversations.fiche', {
      url: '/:conversationId',
      title: 'Conversations',
      params: {
        filters: null
      },
      templateUrl: 'modules/conversations/views/conversations.section.html',
      controller: 'ConversationsSectionController',
      controllerAs: 'conversationsSectionCtrl'
    });

  }]);
;
'use strict';

angular.module('conversations').config(
  ['FabSpeedDialServiceProvider', 'MESSAGES', function (FabSpeedDialServiceProvider, MESSAGES) {

    FabSpeedDialServiceProvider.addItem({
      tooltip: 'message',
      icon: MESSAGES.ICONS.MESSAGE,
      dialog: {
        templateUrl: 'modules/conversations/views/nouveau-message.dialog.html',
        controller: 'NouveauMessageController',
        controllerAs: 'nouveauMessageCtrl'
      }
    });

  }]);
;
'use strict';

angular.module('conversations').constant('MESSAGES', {
  ICONS: {
    MESSAGE: 'communication:message'
  }
});

angular.module('conversations').run(
  ['$rootScope', 'MESSAGES', function ($rootScope, MESSAGES) {
    $rootScope.MESSAGES = MESSAGES;
  }]);
;
'use strict';

angular.module('core').config(
  ['$urlRouterProvider', function ($urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
  }]);
;
'use strict';

angular.module('core').constant('PARAMS', {
  MIN_LOADING_TIME: 700,
  DEBOUNCE_TIME: 700
});

angular.module('core').run(
  ['$rootScope', 'PARAMS', function ($rootScope, PARAMS) {
    $rootScope.PARAMS = PARAMS;
  }]);
;
'use strict';

angular.module('dashboard').config(
  ['$stateProvider', function ($stateProvider) {

    $stateProvider.

    state('home', {
      url: '/',
      title: 'Gestigris',
      templateUrl: 'modules/dashboard/views/dashboard.html'
    });
  }]);
;
'use strict';

/*angular.module('employes').config(
  function (SearchServiceProvider) {

    SearchServiceProvider.register({
      factory: 'Employe',
      type: 'employé',
      icon: 'action:account_circle'
    });

  });*/
;
'use strict';

angular.module('etablissements').config(
  ['ToolbarMenuServiceProvider', 'SearchServiceProvider', 'FabSpeedDialServiceProvider', 'ETABLISSEMENTS', function (ToolbarMenuServiceProvider, SearchServiceProvider, FabSpeedDialServiceProvider, ETABLISSEMENTS) {

    ToolbarMenuServiceProvider.addItem({
      title: 'Établissements',
      icon: ETABLISSEMENTS.ICONS.ETABLISSEMENT,
      route: 'etablissements'
    });

    SearchServiceProvider.register({
      factory: 'Etablissement',
      type: 'établissement',
      icon: ETABLISSEMENTS.ICONS.ETABLISSEMENT,
      resultState: {
        name: 'etablissements.fiche',
        param: 'etablissementId'
      }
    });

    FabSpeedDialServiceProvider.addItem({
      tooltip: 'établissement',
      icon: ETABLISSEMENTS.ICONS.ETABLISSEMENT,
      dialog: ETABLISSEMENTS.DIALOGS.ADD_ETABLISSEMENT
    });

  }]);
;
'use strict';

angular.module('etablissements').constant('ETABLISSEMENTS', {
  ICONS: {
    ETABLISSEMENT: 'social:school'
  },
  MAPZEN_KEY: 'search-v5XrVqS',
  DIALOGS: {
    ADD_ETABLISSEMENT: {
      templateUrl: 'modules/etablissements/views/nouvel-etablissement.dialog.html',
      controller: 'NouvelEtablissementController',
      controllerAs: 'nouvelEtablissementCtrl'
    }
  }
});

angular.module('etablissements').run(
  ['$rootScope', 'ETABLISSEMENTS', function ($rootScope, ETABLISSEMENTS) {
    $rootScope.ETABLISSEMENTS = ETABLISSEMENTS;
  }]);
;
'use strict';

angular.module('etablissements').config(
  ['$stateProvider', function ($stateProvider) {

    $stateProvider.

    state('etablissements', {
      url: '/etablissements',
      template: '<ui-view layout="column" flex></ui-view>',
      resolve: {
        etablissements: ['$q', '$timeout', 'Etablissement', 'PARAMS', function ($q, $timeout, Etablissement, PARAMS) {
          return $q.all([
            $timeout(angular.noop, PARAMS.MIN_LOADING_TIME),
            Etablissement.find()
          ]).then(function (results) {
            return _.last(results);
          });
        }]
      },
      controller: ['$state', '$location', 'etablissements', function ($state, $location, etablissements) {
        if ($location.path().split('/').length === 2) {
          $state.go('etablissements.fiche', {
            etablissementId: _.get(_.first(etablissements), '_id')
          });
        }
      }]
    }).

    state('etablissements.fiche', {
      url: '/:etablissementId',
      title: 'Établissements',
      templateUrl: 'modules/etablissements/views/etablissements.section.html',
      controller: 'EtablissementsSectionController',
      controllerAs: 'etablissementsSectionCtrl'
    });

  }]);
;
'use strict';

angular.module('interventions').config(
  ['ToolbarMenuServiceProvider', 'FabSpeedDialServiceProvider', 'SearchServiceProvider', 'EventServiceProvider', 'ConversationServiceProvider', 'INTERVENTIONS', function (ToolbarMenuServiceProvider, FabSpeedDialServiceProvider, SearchServiceProvider, EventServiceProvider, ConversationServiceProvider, INTERVENTIONS) {

    ToolbarMenuServiceProvider.addItem({
      title: 'Interventions',
      icon: INTERVENTIONS.ICONS.PLAGE,
      route: 'interventions'
    });

    FabSpeedDialServiceProvider.addItem({
      tooltip: 'plage d\'intervention',
      icon: INTERVENTIONS.ICONS.PLAGE,
      dialog: INTERVENTIONS.DIALOGS.ADD_PLAGE
    });

    SearchServiceProvider.register({
      factory: 'PlageIntervention',
      type: 'plage d\'intervention',
      icon: INTERVENTIONS.ICONS.INTERVENTION,
      resultState: {
        name: 'interventions.fiche',
        param: 'plageId'
      }
    });

    EventServiceProvider.register({
      factory: 'Intervention',
      type: 'intervention',
      stateIcon: true,
      route: 'fiche-intervention'
    });

    ConversationServiceProvider.registerAttachement({
      title: 'Intervention',
      icon: INTERVENTIONS.ICONS.INTERVENTION,
      service: 'ConversationAttachementService'
    });

  }]);
;
'use strict';

angular.module('interventions').constant('INTERVENTIONS', {
  ICONS: {
    PLAGE: 'action:event',
    INTERVENTION: 'action:event'
  },
  DIALOGS: {
    ADD_PLAGE: {
      templateUrl: 'modules/interventions/views/nouvelle-plage-intervention.dialog.html',
      controller: 'NouvellePlageInterventionController',
      controllerAs: 'nouvellePlageCtrl'
    }
  }
});

angular.module('interventions').run(
  ['$rootScope', 'INTERVENTIONS', function ($rootScope, INTERVENTIONS) {
    $rootScope.INTERVENTIONS = INTERVENTIONS;
  }]);
;
'use strict';

angular.module('interventions').config(
  ['$stateProvider', function ($stateProvider) {

    $stateProvider.

    state('interventions', {
      url: '/plage-interventions',
      template: '<ui-view layout="column" flex></ui-view>',
      params: {
        filters: null
      },
      resolve: {
        plages: ['$q', '$timeout', 'PlageIntervention', 'PARAMS', '$stateParams', function ($q, $timeout, PlageIntervention, PARAMS, $stateParams) {
          return $q.all([
            $timeout(angular.noop, PARAMS.MIN_LOADING_TIME),
            ($stateParams.filters ? PlageIntervention.formatFilters($stateParams.filters) : $q.when({})).then(function (query) {
              return PlageIntervention.find(query);
            })
          ]).then(function (results) {
            return _.last(results);
          });
        }]
      },
      controller: ['$state', '$location', 'plages', '$stateParams', function ($state, $location, plages, $stateParams) {
        if ($location.path().split('/').length === 2 && plages.length) {
          $state.go('interventions.fiche', {
            plageId: _.get(_.first(plages), '_id'),
            filters: $stateParams.filters
          });
        }
      }]
    }).

    state('interventions.fiche', {
      url: '/:plageId',
      title: 'Plages d\'interventions',
      params: {
        filters: null
      },
      templateUrl: 'modules/interventions/views/plages-interventions.section.html',
      controller: 'PlagesInterventionsSectionController',
      controllerAs: 'plagesInterventionsSectionCtrl'
    });

  }]);
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
    loginStateName: 'login'
  });
}])

.run(['$rootScope', '$mdToast', '$state', '$log', function ($rootScope, $mdToast, $state, $log) {
  $rootScope.$on('UserAuth:signin:success', function ($event, user) {
    $mdToast.show(
      $mdToast.simple()
      .textContent('Bonjour ' + user.toString() + '!')
    );
    $state.go('home');
  });

  $rootScope.$on('UserAuth:signin:fail', function ($event, response) {

    var toast;
    switch (response.code) {
    case 'BadCredentials':
      toast = $mdToast.simple()
        .textContent('Utilisateur inexistant ou mauvais mot de passe');
    }
    if (toast) {
      $mdToast.show(toast);
    } else {
      $log.error('UserAuth:signin:fail', response);
    }
  });
}]);
;
'use strict';

angular.module('benevoles').factory('BenevoleRole',

  ['$q', '$timeout', 'Schema', function ($q, $timeout, Schema) {

    var BenevoleRole = new Schema('benevole-role');

    BenevoleRole.prototype.toString = function () {
      return this.description;
    };

    return BenevoleRole;

  }]);
;
'use strict';

angular.module('benevoles').factory('Benevole',
  ['$rootScope', 'Schema', 'Avatar', 'SearchFieldQueryBuilder', function ($rootScope, Schema, Avatar, SearchFieldQueryBuilder) {

    var Benevole = new Schema('benevole');

    Benevole.post('find', function (next) {
      this.dateNaissance = new Date(this.dateNaissance);
      if (_.isUndefined(this.avatar)) {
        return Avatar.getDefaultAvatar(this).then(function (avatar) {
          this.avatar = avatar;
          next();
        }.bind(this));
      }
      next();
    });

    Benevole.post('create', function (next) {
      $rootScope.$broadcast('Benevole:new', this);
      next();
    });

    Benevole.post('remove', function (next) {
      $rootScope.$broadcast('Benevole:remove', this);
      next();
    });

    Benevole.search = function (params) {
      var query = {};
      if (_.isString(params)) {
        query = SearchFieldQueryBuilder.build(params);
      } else  {
        _.assign(query, params.benevoleName ? SearchFieldQueryBuilder.build(params.benevoleName) : undefined, _.omit(params, 'benevoleName'));
      }
      return Benevole.find(query);
    };

    Benevole.prototype.toString = function () {
      return this.prenom + ' ' + this.nomFamille;
    };

    Benevole.prototype.getRoleDescription = function () {
      return this.role.description;
    };

    Benevole.prototype.toString = function () {
      return this.prenom + ' ' + this.nomFamille;
    };

    Benevole.prototype.getRoleDescription = function () {
      return this.role.description;
    };

    return Benevole;

  }]);
;
'use strict';

angular.module('benevoles').factory('Observateur',
  ['$q', 'Benevole', 'BenevoleRole', function ($q, Benevole, BenevoleRole) {

    var Observateur = Object.create(Benevole);

    var init = BenevoleRole.findOne({
      code: 0
    }).then(function (observateurRole) {
      return {
        role: observateurRole._id
      };
    });

    Observateur.count = function () {
      return $q.when(init).then(function (observateurRoleFilter) {
        return Benevole.count(observateurRoleFilter);
      });
    };

    Observateur.find = function (query) {
      return $q.when(init).then(function (observateurRoleFilter) {
        return Benevole.find(_.assign({}, query, observateurRoleFilter));
      });
    };

    return Observateur;

  }]);
;
'use strict';

angular.module('contacts').service('ContactDialog',
  ['$q', 'Dialog', 'Contact', 'Poste', 'Toast', function ($q, Dialog, Contact, Poste, Toast) {

    var dialog = new Dialog({
      templateUrl: 'modules/contacts/views/contact.dialog.html',
      controllerAs: 'contactDialogCtrl',
      controller: function () {

        var ctrl = this;

        Poste.find().then(function (postes) {
          ctrl.postes = postes;
        });

        ctrl.cancel = dialog.cancel;

        ctrl.remove = dialog.hide;

        ctrl.addingPoste = false;
        ctrl.switchPosteSelection = function (contact) {
          ctrl.addingPoste = !ctrl.addingPoste;
          if (ctrl.addingPoste) {
            contact.poste = undefined;
          } else {
            contact.posteDescription = undefined;
          }
        };

        ctrl.submit = function (contactDialogForm, contact) {
          if (contactDialogForm.$invalid) {
            return dialog.shake();
          }
          dialog.hide(contact);
        };
      }
    });

    function checkForNewPoste(contact) {

      if (contact.posteDescription) {
        return Poste.create({
          description: contact.posteDescription
        }).then(function (poste) {
          contact.poste = poste;
        });
      }

      return $q.when();
    }

    this.new = function ($event, params) {
      return dialog.show($event, {
        locals: {
          contact: {}
        }
      }).then(function (contact) {

        return checkForNewPoste(contact).then(function () {
          return Contact.create(_.assign(contact, {
            etablissements: [params.etablissement._id]
          })).then(function (contact) {
            Toast.show(contact.toString() + ' a été créé.');
            params.contacts.push(contact);
            return contact;
          });
        });
      });
    };

    this.edit = function ($event, params) {
      var clonedContact = _.clone(params.contact);
      return dialog.show($event, {
        locals: {
          contact: clonedContact
        }
      }).then(function (contact) {

        if (_.isUndefined(contact)) {
          return params.contact.remove().then(function () {
            Toast.show(params.contact.toString() + ' a été supprimé.');
            _.pull(params.contacts, params.contact);
          });
        }

        return checkForNewPoste(contact).then(function () {
          return _.assign(params.contact, contact).save().then(function (contact) {
            Toast.show(contact.toString() + ' a été sauvegardé.');
            return contact;
          });
        });

      });
    };
  }]);
;
'use strict';

angular.module('contacts').factory('Contact',
  ['Schema', function (Schema) {

    var Contact = new Schema('contact');

    Contact.findByEtablissement = function (etablissementId) {
      return Contact.find({
        etablissements: etablissementId
      });
    };

    Contact.post('find', function (next) {
      this.fullname = this.toString();
      next();
    });

    Contact.prototype.toString = function () {
      return this.firstname + ' ' + this.lastname;
    };

    return Contact;

  }]);
;
'use strict';

angular.module('contacts').factory('Poste',
  ['Schema', function (Schema) {

    var Poste = new Schema('poste');

    Poste.prototype.toString = function () {
      return this.description;
    };

    return Poste;

  }]);
;
'use strict';

angular.module('conversations').factory('Conversation',
  ['$rootScope', '$q', 'Schema', 'Message', 'User', 'UserAuth', 'Benevole', 'SearchFieldQueryBuilder', function ($rootScope, $q, Schema, Message, User, UserAuth, Benevole, SearchFieldQueryBuilder) {

    var Conversation = new Schema('conversation');

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

  }]);
;
'use strict';

angular.module('conversations').provider('ConversationService',
  function () {

    var attachements = [];

    return {

      registerAttachement: function (attachement) {
        attachements.push(attachement);
      },

      $get: ['$rootScope', 'Conversation', function ($rootScope, Conversation) {
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
          },

          getAttachements: function () {
            return attachements;
          }
        };
      }]
    };
  });
;
'use strict';

angular.module('conversations').service('MessageDialog',
  ['Dialog', function (Dialog) {

    var dialog = new Dialog({
      controller: 'NouveauMessageController',
      controllerAs: 'nouveauMessageCtrl',
      templateUrl: 'modules/conversations/views/nouveau-message.dialog.html'
    });

    this.show = function ($event, params) {
      return dialog.show($event, {
        locals: {
          receivers: params.receivers,
          dialog: dialog
        }
      });
    };
  }]);
;
'use strict';

angular.module('conversations').factory('Message',
  ['Schema', 'UserAuth', 'Moment', function (Schema, UserAuth, Moment) {

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

  }]);
;
'use strict';

var sortedPush = function (collection, item, predicate) {
  if (_.isFunction(predicate)) {
    collection.splice(_.sortedIndexBy(collection, item, predicate), 0, item);
    return collection;
  }
  if (_.isUndefined(predicate)) {
    collection.splice(_.sortedIndex(collection, item), 0, item);
    return collection;
  }
  if (_.isString(predicate)) {
    collection.splice(_.sortedIndexBy(collection, item, function (o) {
      return _.deburr(o[predicate]);
    }), 0, item);
    return collection;
  }
};

_.mixin({
  'sortedPush': sortedPush
});
;
'use strict';

angular.module('core').factory('Dialog',
  ['$mdDialog', '$document', '$animate', function ($mdDialog, $document, $animate) {

    var Dialog = function (params) {
      this.config = _.assign({
        parent: angular.element(document.body),
        bindToController: true,
        locals: _.assign(params.locals, {
          dialog: this
        })
      }, params);
    };

    Dialog.prototype.show = function ($event, params) {
      return $mdDialog.show(_.assign(this.config, {
        targetEvent: $event
      }, params));
    };

    Dialog.prototype.shake = function () {
      var dialog = $document.find('md-dialog');
      $animate.addClass(dialog, 'shake-it').then(function () {
        $animate.removeClass(dialog, 'shake-it');
      });
    };

    Dialog.prototype.hide = function (item) {
      return $mdDialog.hide(item);
    };

    Dialog.prototype.cancel = function () {
      $mdDialog.cancel();
    };

    return Dialog;
  }]);
;
'use strict';

angular.module('core').provider('RightPanel',
  function () {

    var panels = {};

    return {
      register: function (params) {
        panels[params.panelName] = params;
      },

      $get: ['$rootScope', function ($rootScope) {

        return {

          show: function (panelName, item) {
            $rootScope.$broadcast('Right-Panel:show', _.assign(panels[panelName], {
              item: item
            }));
          }
        };
      }]
    };

  });
;
'use strict';

angular.module('core').service('SearchFieldQueryBuilder',
  function () {

    function getRegex(term) {
      return {
        'searchField': {
          $regex: '\\b' + _.deburr(term).toLowerCase() // \\b car l'expression doit représenter le début d'un mot
        }
      };
    }

    this.build = function (expression) {
      var splittedSearchTermsString = expression.split(' ');

      return splittedSearchTermsString.length === 1 ? getRegex(_.first(splittedSearchTermsString)) : {
        $and: _.map(splittedSearchTermsString, getRegex)
      };
    };
  });
;
'use strict';

angular.module('core').service('Toast',
  ['$mdToast', function ($mdToast) {

    this.show = function (message) {
      return $mdToast.show($mdToast.simple().textContent(message));
    };

  }]);
;
'use strict';

angular.module('core').factory('ZenScroll',
  function () {
    return zenscroll; // jshint ignore:line
  });
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

angular.module('etablissements').factory('CommissionScolaire',
  ['Schema', function (Schema) {

    var CommissionScolaire = new Schema('commission-scolaire');

    CommissionScolaire.prototype.toString = function () {
      return this.name;
    };

    return CommissionScolaire;

  }]);
;
'use strict';

angular.module('etablissements').config(
  ['$provide', function ($provide) {

    $provide.decorator('Etablissement', ['$delegate', '$rootScope', 'SearchFieldQueryBuilder', function ($delegate, $rootScope, SearchFieldQueryBuilder) {

      var Etablissement = $delegate;

      Etablissement.search = function (params) {
        var query = {};
        if (_.isString(params)) {
          query = SearchFieldQueryBuilder.build(params);
        } else  {
          _.assign(query, params.etablissementName ? SearchFieldQueryBuilder.build(params.etablissementName) : undefined, _.omit(params, 'etablissementName'));
        }
        return Etablissement.find(query);
      };

      Etablissement.searchByName = function (params) {
        return Etablissement.find(SearchFieldQueryBuilder.build(params));
      };

      Etablissement.post('create', function (next) {
        $rootScope.$broadcast('Etablissement:new', this);
        next();
      });

      Etablissement.post('remove', function (next) {
        $rootScope.$broadcast('Etablissement:remove', this);
        next();
      });

      return Etablissement;
    }]);

  }]);
;
'use strict';

angular.module('core').factory('PlaceAutocompleteFactory',
  function () {

    var maps = {
      cities: {
        'Quebec city': 'Ville de Québec'
      },
      provinces: {
        'Quebec': 'Québec'
      }
    };
    /*jshint camelcase: false */
    return {

      convertResult: function (nominatim, mapzenItem) {
        return {
          description: nominatim.address[nominatim.type] || mapzenItem.properties.label,
          placeType: nominatim.type,
          placeId: nominatim.place_id,
          osmId: nominatim.osm_id,
          osmType: nominatim.osm_type,
          coordinates: {
            lat: nominatim.lat,
            long: nominatim.lon
          },
          address: {
            houseNumber: nominatim.address.house_number,
            street: nominatim.address.road,
            neighbourhood: nominatim.address.neighbourhood,
            suburb: nominatim.address.suburb,
            city: maps.cities[nominatim.address.city] || nominatim.address.city,
            province: maps.provinces[nominatim.address.state] || nominatim.address.state,
            country: nominatim.address.country,
            postalCode: nominatim.address.postcode
          }
        };
      }
    };
  });
;
'use strict';

angular.module('core').factory('PlaceToEtablissementConverter',
  ['Etablissement', function (Etablissement) {

    return {

      convert: function (place, lists) {
        lists = lists;
        return new Etablissement({
          name: place.description,
          address: place.address ? {
            street: (place.address.houseNumber ? place.address.houseNumber + ' ' : '') + place.address.street,
            postalCode: place.address.postalCode
          } : {
            street: '',
            postalCode: ''
          },
          coordinates: {
            lat: parseFloat(place.coordinates.lat),
            long: parseFloat(place.coordinates.long)
          },
          osmId: place.osmId,
          osmType: place.osmType,
          placeId: place.placeId,
          type: place.type
        });
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

      $get: ['$q', '$injector', '$state', 'Dialog', function ($q, $injector, $state, Dialog) {

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

            if (selectedItem.provider.route) {
              $state.go(selectedItem.provider.route, {
                _id: selectedItem.item._id
              });
            } else if (selectedItem.provider.dialog) {
              var dialogConfig = selectedItem.provider.dialog,
                locals = {};

              locals[dialogConfig.itemName] = selectedItem.item;

              var dialog = new Dialog(_.assign(dialogConfig, {
                locals: locals,
                bindToController: true
              }));

              dialog.show($event);
            }

          }
        };

        return EventService;
      }]
    };
  });
;
'use strict';

angular.module('interventions').service('ConversationAttachementService',
  ['$q', function ($q) {

    return {
      getItem: function () {
        return $q.when({
          type: 'message-attachement-intervention',
          data: {
            intervention: '58ce8b832e6b295f2b3d7d49'
          }
        });
      }
    };
  }]);
;
'use strict';

angular.module('interventions').factory('DemandeParticipation',
  ['Schema', function (Schema) {

    var DemandeParticipation = new Schema('demande-participation');

    DemandeParticipation.getByInterventionId = function (interventionId) {
      return DemandeParticipation.find({
        intervention: interventionId
      });
    };

    DemandeParticipation.prototype.acceptAndConfirm = function () {
      return _.assign(this, {
        accepted: true,
        confirmed: true
      }).save();
    };

    DemandeParticipation.prototype.unAccept = function () {
      return _.assign(this, {
        accepted: false,
        confirmed: true
      }).save();
    };

    DemandeParticipation.prototype.isAccepted = function () {
      return this.accepted;
    };

    DemandeParticipation.prototype.isConfirmed = function () {
      return this.confirmed;
    };

    return DemandeParticipation;

  }]);
;
'use strict';

angular.module('interventions').factory('InterventionTag',
  ['Schema', 'SearchFieldQueryBuilder', function (Schema, SearchFieldQueryBuilder) {

    var InterventionTag = new Schema('intervention-tag');

    InterventionTag.searchByName = function (params) {
      return InterventionTag.find(SearchFieldQueryBuilder.build(params));
    };

    InterventionTag.prototype.toString = function () {
      return this.name;
    };

    return InterventionTag;

  }]);
;
'use strict';

angular.module('interventions').factory('Intervention',
  ['$rootScope', '$q', '$mdToast', 'Schema', 'Moment', 'DemandeParticipation', 'Benevole', function ($rootScope, $q, $mdToast, Schema, Moment, DemandeParticipation, Benevole) {

    var Intervention = new Schema('intervention');

    Intervention.post('find', function (next) {

      this.date = {
        start: new Moment(this.date.start),
        end: new Moment(this.date.end)
      };

      DemandeParticipation.getByInterventionId(this._id).then(function (demandes) {

        this.demandesParticipations = demandes;

        $q.all([

          Benevole.find({
            _id: {
              $in: _.map(_.filter(this.demandesParticipations, function (demande) {
                return !demande.isAccepted();
              }), 'benevole')
            }
          }).then(function (benevoles) {
            this.interested = benevoles;
          }.bind(this)),

          Benevole.find({
            _id: {
              $in: _.map(_.filter(this.demandesParticipations, function (demande) {
                return demande.isAccepted();
              }), 'benevole')
            }
          }).then(function (benevoles) {
            this.participants = benevoles;
          }.bind(this))

        ]).then(next);
      }.bind(this));
    });

    Intervention.findByPlageId = function (plageId) {
      return Intervention.find({
        plage: plageId
      });
    };

    Intervention.prototype.getBenevoles = function (type) {
      return $q.when(type === 'interested' ? this.interested : this.participants);
    };

    Intervention.prototype.addParticipant = function (benevole, message) {

      var intervention = this,
        demandeParticipation = intervention.getDemandeParticipation(benevole);

      function add() {

        // Était déjà intéressé.
        if (demandeParticipation) {
          return demandeParticipation.acceptAndConfirm().then(function () {
            return benevole;
          });
        }

        // N'était pas intéressé.
        return DemandeParticipation.create({
          benevole: benevole._id,
          intervention: intervention._id,
          accepted: true,
          message: message
        }).then(function (demandeParticipation) {
          intervention.demandesParticipations.push(demandeParticipation);
          return benevole;
        });
      }

      if (!intervention.isBooked() && demandeParticipation) {
        return add();
      }

      var toast = $mdToast.simple()
        .textContent('Envois de la confirmation à ' + benevole.toString() + '...')
        .action('annuler')
        .highlightAction(true);

      return $mdToast.show(toast).then(function (response) {

        if (response === 'ok') {
          return $q.reject();
        }

        return add();

      });

    };

    Intervention.prototype.removeBenevoleFromParticipants = function (benevole, forGood) {

      var intervention = this;

      function remove() {
        var demandeParticipation = intervention.getDemandeParticipation(benevole);
        return forGood ? demandeParticipation.remove().then(function () {
          _.pull(intervention.demandesParticipations, demandeParticipation);
        }) : demandeParticipation.unAccept();
      }

      if (!intervention.isBooked()) {
        return remove();
      }

      var toast = $mdToast.simple()
        .textContent('Envois de l\'annulation de la partipation à ' + benevole.toString() + '...')
        .action('annuler')
        .highlightAction(true);

      return $mdToast.show(toast).then(function (response) {

        if (response === 'ok') {
          return $q.reject();
        }

        return remove();

      });
    };

    Intervention.prototype.getDemandeParticipation = function (benevole) {
      return _.find(this.demandesParticipations, ['benevole', benevole._id]);
    };

    Intervention.prototype.isConfirmed = function (benevole) {
      var demande = this.getDemandeParticipation(benevole);
      return demande ? demande.isConfirmed() : false;
    };

    Intervention.prototype.getDateRange = function () {
      return this.date;
    };

    Intervention.prototype.isBooked = function () {
      return this.status === 'CLOSE';
    };

    Intervention.prototype.book = function () {

      if (!this.isBooked()) {

        var intervention = this,
          toast = $mdToast.simple()
          .textContent('Envois des notifications aux bénévoles...')
          .action('annuler')
          .highlightAction(true);

        return $mdToast.show(toast).then(function (response) {
          if (response) {
            return $q.reject();
          }
          return _.assign(intervention, {
              status: 'CLOSE'
            })
            .save()
            .catch(function (error) {
              console.error(error);
              intervention.status = 'OPEN';
              $mdToast.show($mdToast.simple().textContent('Impossible de fermer la démystification'));
              return $q.reject('Impossible de fermer la démystification');
            });
        });
      }

      return $q.reject('L\'intervention était déjà fermée');

    };

    ////

    /*  Intervention.getUrgents = function () {
        return Intervention.find({
          'date.start': {
            $gte: new Moment().subtract(1, 'week')
          }
        });
      };

      Intervention.getByDate = function (date) {
        return Intervention.find({
          date: {
            start: date.startOf('day'),
            end: date.endOf('day')
          }
        });
      };

      Intervention.prototype.toString = function () {
        return this.etablissement ? this.etablissement.toString() : undefined;
      };

      Intervention.prototype.getEtablissement = function () {
        return this.etablissement;
      };


      Intervention.prototype.getStateIcon = function () {
        return 'navigation:check';
      };*/

    return Intervention;

  }]);
;
'use strict';

angular.module('interventions').factory('PlageIntervention',
  ['$q', 'Schema', 'Moment', 'UserAuth', 'Conversation', 'Etablissement', 'Intervention', 'Contact', function ($q, Schema, Moment, UserAuth, Conversation, Etablissement, Intervention, Contact) {

    var PlageIntervention = new Schema('plage-intervention');

    PlageIntervention.pre('create', function (next) {
      this.createdBy = UserAuth.getCurrentUser().toString();
      next();
    });

    PlageIntervention.post('find', function (next) {
      this.date = new Moment(this.date);
      this.etablissement = new Etablissement(this.etablissement);
      this.contact = new Contact(this.contact);
      next();
    });

    PlageIntervention.search = function (terms) {
      return Etablissement.search(terms).then(function (etablissements) {
        return PlageIntervention.find({
          etablissement: {
            $in: _.map(etablissements, '_id')
          },
          date: {
            $gte: new Moment().startOf('day')
          }
        });
      });
    };

    PlageIntervention.formatFilters = function (filters) {
      var query = {};
      if (filters.date) {
        _.assign(query, {
          date: {
            $gte: filters.date.start,
            $lte: filters.date.end
          }
        });
      }
      if (filters.etablissementName) {
        return Etablissement.search(filters.etablissementName).then(function (etablissements) {
          return _.assign(query, {
            etablissement: {
              $in: _.map(etablissements, '_id')
            }
          });
        });
      } else {
        return $q.when(query);
      }
    };

    PlageIntervention.prototype.toString = function () {
      return this.date.format('MM-DD-YYYY') + ' - ' + this.etablissement.toString();
    };

    PlageIntervention.prototype.isBooked = function () {
      return this.status === 'CLOSE';
    };

    PlageIntervention.prototype.isUrgent = function () {
      return new Moment().endOf('day').add(2, 'weeks').isAfter(this.date) && this.status === 'OPEN';
    };

    PlageIntervention.prototype.getInterventions = function () {
      return Intervention.findByPlageId(this._id);
    };

    PlageIntervention.prototype.getConversation = function () {
      return Conversation.findById(this.conversation);
    };

    ////

    /*  PlageIntervention.findByIntervention = function (intervention) {
        return PlageIntervention.find().then(function (plages) {
          return _.find(plages, '_id', intervention.plage);
        });
      };



      PlageIntervention.prototype.getDate = function () {
        return this.date;
      };

      PlageIntervention.prototype.isConfirmed = function (benevole) {
        benevole = benevole;
        return true;
      };

      };*/

    return PlageIntervention;

  }]);
;
'use strict';

angular.module('interventions').service('RemoveInterventionDialog',
  ['Dialog', function (Dialog) {

    this.show = function ($event, params) {

      var removeInterventionDialog = new Dialog({
        templateUrl: 'modules/interventions/views/remove-intervention.dialog.html',
        controller: 'RemoveInterventionDialogCtrl',
        controllerAs: 'removeInterventionDialogCtrl',
        locals: {
          intervention: params.intervention
        }
      });

      console.log(params);
      return removeInterventionDialog.show($event).then(function (reason) {
        console.log(reason);
      });
    };

  }]);

angular.module('interventions').controller('RemoveInterventionDialogCtrl',
  function () {

    console.log(this);

    this.remove = function (form, reason) {

      if (form.$valid) {
        console.log(reason);

      }

      this.shake();

    };

  });
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

        return {

          getItems: function () {
            return items;
          }
        };

      }
    };

  });
;
'use strict';

angular.module('navigation').provider('ToolbarMenuService',
  function () {
    var items = [];
    return {
      addItem: function (item) {
        items.push(item);
      },
      $get: function () {
        return {
          getItems: function () {
            return _.sortBy(items, function (item) {
              return _.deburr(item.title);
            });
          }
        };
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

      $get: ['$q', '$injector', '$state', function ($q, $injector, $state) {

        var factories = {};

        _.forEach(providers, function (provider) {
          factories[provider.type] = $injector.get(provider.factory);
        });

        return {

          search: function (term) {
            return $q.all(_.map(providers, function (provider) {
              return factories[provider.type].search(term).then(function (results) {
                return _.map(results, function (result) {
                  return {
                    provider: provider,
                    item: result,
                    type: provider.type,
                    icon: provider.icon,
                    _description: result.toString()
                  };
                });
              });
            })).then(function (results) {
              return _.flatten(results);
            });
          },

          select: function ($event, selectedItem) {
            if (selectedItem) {
              var stateParams = {};
              stateParams[selectedItem.provider.resultState.param] = selectedItem.item._id;
              $state.go(selectedItem.provider.resultState.name, stateParams);
            }
          }

        };
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
  ['Schema', function (Schema) {

    var User = new Schema('user');

    User.prototype.toString = function () {
      return this.prenom + ' ' + this.nomFamille;
    };

    User.prototype.getTitle = function () {
      return this.title;
    };

    /*User.prototype.getLastVisit = function () {
      var lastVisit = $window.localStorage.getItem('lastVisit');
      return lastVisit ? new Date(lastVisit) : undefined;
    };*/

    /*  User.prototype.equals = function (user) {
        return user.pseudo === this.pseudo;
      };*/

    return User;

  }]);
;
'use strict';

angular.module('benevoles').directive('benevoleCard',
  function () {
    return {
      restrict: 'E',
      templateUrl: 'modules/benevoles/views/benevole.card.html',
      controller: 'BenevoleCardController',
      controllerAs: 'benevoleCardCtrl',
      scope: {
        benevole: '='
      }
    };
  });
;
'use strict';

angular.module('benevoles').directive('benevoleForm',
  function () {
    return {
      restrict: 'E',
      scope: {
        benevole: '=',
        autoSave: '='
      },
      templateUrl: 'modules/benevoles/views/benevole.form.html',
      controllerAs: 'benevoleFormCtrl',
      controller: 'BenevoleFromCtrl'
    };
  });
;
'use strict';

angular.module('benevoles').directive('benevolesDashboardCard',
  function () {
    return {
      restrict: 'E',
      templateUrl: 'modules/benevoles/views/benevoles.dashboard-card.html',
      controllerAs: 'benevolesDashboardCardCtrl',
      controller: ['Benevole', '$state', 'Dialog', 'BENEVOLES', function (Benevole, $state, Dialog, BENEVOLES) {

        var ctrl = this;

        ctrl.handleClick = function ($event) {
          if (ctrl.nbBenevoles) {
            return $state.go('benevoles');
          }
          var dialog = new Dialog(BENEVOLES.DIALOGS.ADD_BENEVOLE);
          dialog.show($event).then(function (benevole) {
            ctrl.nbBenevoles++;
            $state.go('benevoles.fiche', {
              benevoleId: benevole._id
            });
          });
        };

        Benevole.count().then(function (count) {
          ctrl.nbBenevoles = count;
        });
      }]
    };
  });
;
'use strict';

angular.module('benevoles').directive('observateursDashboardCard',
  function () {
    return {
      restrict: 'E',
      templateUrl: 'modules/benevoles/views/observateurs.dashboard-card.html',
      controllerAs: 'observateursDashboardCardCtrl',
      link: function (scope, element) {
        scope.$watch('observateursDashboardCardCtrl.nbObservateurs', function (nbObservateurs) {
          if (nbObservateurs === 0) {
            element.remove();
          }
        });
      },
      controller: ['Observateur', 'Dialog', function (Observateur, Dialog) {

        var ctrl = this;

        var dialog = new Dialog({
          controller: 'ObservateurProgressController',
          controllerAs: 'observateurProgressCtrl',
          templateUrl: 'modules/benevoles/views/observateurs-progress.dialog.html'
        });

        ctrl.handleClick = function ($event) {
          Observateur.find().then(function (observateurs) {
            return dialog.show($event, {
              locals: {
                observateurs: observateurs,
                dialog: dialog
              }
            });
          });
        };

        Observateur.count().then(function (count) {
          ctrl.nbObservateurs = count;
        });
      }]
    };
  });
;
'use strict';

angular.module('conversations').directive('attachement',
  ['$compile', function ($compile) {
    return {
      restrict: 'E',
      scope: {
        attachement: '=',
      },
      link: function (scope, element) {
        element.css('padding-left', '56px').css('padding-right', '56px').css('display', 'block');
        element.append($compile('<' + scope.attachement.type + '></' + scope.attachement.type + '>')(scope));
      }
    };
  }]);
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
  ['$rootScope', '$timeout', 'ConversationService', function ($rootScope, $timeout, ConversationService) {
    return {
      restrict: 'E',
      scope: {
        conversation: '='
      },
      templateUrl: 'modules/conversations/views/conversation.html',
      controller: 'ConversationController',
      controllerAs: 'conversationCtrl',
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
            scope.conversation.getMessages().then(function (messages) {
              scope.messages = messages;
            });
            unwatch();
          }
        });

        scope.attachements = _.sortBy(ConversationService.getAttachements(), 'title');

      }
    };
  }]);
;
'use strict';

angular.module('conversations').directive('conversationCard',
  function () {
    return {
      restrict: 'E',
      scope: {
        conversation: '=',
      },
      templateUrl: 'modules/conversations/views/conversation.card.html',
      controller: 'ConversationCardController',
      controllerAs: 'ConversationCardCtrl',
      link: function (scope) {

        scope.$watch('conversation', function (conversation) {
          if (conversation) {
            conversation.getParticipants().then(function (participants) {
              scope.conversationParticipants = participants;
            });
          }
        });

      }
    };
  });
;
'use strict';

angular.module('conversations').directive('messagesDashboardCard',
  function () {
    return {
      restrict: 'E',
      templateUrl: 'modules/conversations/views/messages.dashboard-card.html',
      controllerAs: 'messagesDashboardCardCtrl',
      controller: ['Conversation', '$state', function (Conversation, $state) {

        var ctrl = this;

        ctrl.handleClick = function () {
          $state.go('conversations');
        };

        Conversation.getNbNewMessages().then(function (nb) {
          ctrl.nbNouveauxMessages = nb;
        });

      }]
    };
  });
;
'use strict';

/*angular.module('core').directive('indexedMdTabs',
  function() {
    return {
      restrict: 'A',
      require: 'mdTabs',
      controller: function($element, $timeout) {

        var mdTabsCtrl = $element.controller('mdTabs'),
          tabIndex = {};

        $timeout(function() {
          console.log(mdTabsCtrl);
          _.forEach(mdTabsCtrl.tabs, function(tab) {
            tabIndex[_.deburr(tab.label).toLowerCase()] = tab.index;
          });
        });

        this.selectTabByLabel = function(tabLabel) {
          mdTabsCtrl.select(tabIndex[tabLabel]);
        };
      }
    };
  });*/

function findUpTag(el, tag) {
  while (el.parentNode) {
    el = el.parentNode;
    if (el.tagName === tag) {
      return el;
    }
  }
  return null;
}

angular.module('core').directive('autoSaveForm',
  function () {
    return {
      restrict: 'A',
      require: ['form', '?^mdTabs'],
      controller: ['$element', '$rootScope', '$scope', '$attrs', 'Toast', function ($element, $rootScope, $scope, $attrs, Toast) {

        var listeners = [];

        function stopListening() {
          _.forEach(listeners, function (listener) {
            listener();
          });
        }

        $scope.$watch($attrs.autoSaveForm, function (autoSave) {
          if (autoSave) {

            var formController = $element.controller('form'),
              mdTabsCtrl = $element.controller('mdTabs');

            var tabIndex;
            if (mdTabsCtrl)  {
              _.forEach(angular.element(findUpTag($element[0], 'MD-TABS')).find('MD-TAB-CONTENT'), function (tab, index) {
                if (tab.contains($element[0])) {
                  tabIndex = index;
                }
              });
            }

            listeners.push($rootScope.$on('$stateChangeStart', function (event) {
              if (formController.$invalid) {
                event.preventDefault();
                _.forEach(formController.$error, function (field) {
                  _.forEach(field, function (errorField) {
                    errorField.$setTouched();
                  });
                });
                if (mdTabsCtrl) {
                  mdTabsCtrl.select(tabIndex);
                }
                var firstInvalid = $element[0].querySelector('.ng-invalid');
                if (firstInvalid) {
                  firstInvalid.focus();
                }
                Toast.show('Veuillez corriger les erreurs.');
              }
            }));

            listeners.push($scope.$on('$destroy', function () {
              stopListening();
            }));

          } else {
            stopListening();
          }
        });
      }]
    };
  });
;
'use strict';

angular.module('core').directive('emailValidation',
  function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function (scope, elem, attr, ngModel) {

        function validate(value) {
          return _.isUndefined(value) || value === '' || !_.isNull(value.match(/^.+@.+\..+$/));
        }

        ngModel.$parsers.unshift(function (value) {
          ngModel.$setValidity('emailValidation', validate(value));
          return value;
        });

        ngModel.$formatters.unshift(function (value) {
          ngModel.$setValidity('emailValidation', validate(value));
          return value;
        });
      }
    };
  });
;
'use strict';

angular.module('core').directive('hiddenInput',
  function () {
    return {
      restrict: 'E',
      require: 'ngModel',
      scope: {
        ngModel: '='
      },
      templateUrl: 'modules/core/views/hidden-input.html',
      link: function (scope, element, attrs) {
        scope.inputName = attrs.name || attrs.ariaLabel;
      }
    };
  });
;
'use strict';

angular.module('core').directive('inputClear',
  function () {
    return {
      restrict: 'A',
      require: 'ngModel',
      template: function (tElement) {

        tElement.parent().css('position', 'relative');

        tElement.after(
          '<md-button arial-label="clear" aria-label="Rénitialiser" class="md-icon-button clear-button" ng-show="hasValue" ng-click="clearInput()" style="position: absolute; bottom: 0px; right: -14px;">' +
          '<md-icon md-svg-icon="content:clear"></md-icon>' +
          '</md-button>');
      },

      link(scope, element, attrs, ngModelController) {
        scope.$watch(function () {
          return ngModelController.$viewValue;
        }, function (value) {
          scope.hasValue = value;
        });
        scope.clearInput = function () {
          ngModelController.$setViewValue('');
          ngModelController.$render();
        };
      }

    };
  });
;
'use strict';

angular.module('core').directive('mdTabAction',
  function () {
    return {
      restrict: 'E',
      scope: {
        tooltip: '@',
        icon: '@'
      },
      template: '<md-button class="md-fab md-mini md-primary" aria-label="{{ tooltip }}"' +
        'style="position:absolute;top:-28px;right:16px;">' +
        '<md-icon md-svg-icon="{{ icon }}"></md-icon>' +
        '<md-tooltip>{{ tooltip }}</md-tooltip>' +
        '</md-button>'
    };
  });
;
'use strict';

angular.module('core').directive('onLongTouch',
  ['$timeout', function ($timeout) {
    return {
      restrict: 'EA',
      link: function (scope, element, attrs) {

        var longPress = false,
          method = attrs.onLongTouch;

        element.bind('mousedown touchstart', function () {
          longPress = true;
          $timeout(function () {
            if (longPress) {
              scope.$apply(method);
            }
          }, 600);
        });

        element.bind('mouseup touchend', function () {
          longPress = false;
        });
      }
    };
  }]);
;
'use strict';

angular.module('core').directive('rightPanel',
  ['$rootScope', '$controller', '$mdSidenav', '$templateCache', function ($rootScope, $controller, $mdSidenav, $templateCache) {
    return {
      restrict: 'E',
      templateUrl: 'modules/core/views/right-panel.html',
      link: function (scope) {
        $rootScope.$on('Right-Panel:show', function ($event, panel) {
          if (panel.template) {
            panel.templateUrl = 'right-panel-template.html';
            $templateCache.put(panel.templateUrl, panel.template);
          }

          scope.templateUrl = panel.templateUrl;

          scope[panel.itemName] = panel.item;
          scope.title = panel.item.toString();

          if (panel.controller) {
            scope[panel.controllerAs] = $controller(panel.controller, {
              $scope: scope
            });
          }

          $mdSidenav('right-panel').toggle();

        });

        scope.closeSideNav = function () {
          $mdSidenav('right-panel').toggle();
        };
      }
    };
  }]);
;
'use strict';

angular.module('core').directive('sectionList',
  ['$rootScope', 'ZenScroll', '$timeout', function ($rootScope, ZenScroll, $timeout) {

    var lastStateScollPosition = 0;

    function isScrolledIntoView(scroller, item) {
      if (_.isUndefined(item)) {
        return true;
      }
      var elemTop = item.offsetTop - scroller.scrollTop,
        elemBottom = elemTop + item.offsetHeight;
      return (elemTop >= 0) && (elemBottom <= scroller.offsetHeight);
    }

    return {
      restrict: 'A',
      link: function (scope, element) {

        var scroller = element.parent()[0],
          zenScroller = ZenScroll.createScroller(scroller);

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
          lastStateScollPosition = fromState.name === toState.name ? scroller.scrollTop : 0;
        });

        $rootScope.$$postDigest(function () {
          scroller.scrollTop = lastStateScollPosition;
        });

        $timeout(function () {
          var activeItem = element[0].getElementsByClassName('active')[0];
          if (!isScrolledIntoView(scroller, activeItem)) {
            zenScroller.center(activeItem);
          }
        }, 1500);
      }
    };
  }]);
;
'use strict';

angular.module('core').directive('telephoneInput',
  function () {
    return {
      restrict: 'E',
      scope: {
        telephones: '=ngModel',
        ngChange: '&',
        ngDisabled: '='
      },
      templateUrl: 'modules/core/views/telephones-input.html',
      compile: function (iElement) {
        iElement.css('display', 'block');
      },
      controllerAs: 'telephoneInputCtrl',
      controller: ['$scope', function ($scope) {
        $scope.telephones = $scope.telephones ||  [];
        this.removePhone = function ($index) {
          $scope.telephones.splice($index, 1);
          $scope.ngChange();
        };
      }]
    };
  });
;
'use strict';

angular.module('etablissements').directive('etablissementCard',
  function () {
    return {
      restrict: 'E',
      scope: {
        etablissement: '=',
      },
      templateUrl: 'modules/etablissements/views/etablissement.card.html',
      controller: 'EtablissementCardCtrl',
      controllerAs: 'etablissementCardCtrl',
      compile: function (iElement) {
        iElement.attr('flex', '').attr('layout', 'column');
      }
    };
  });
;
'use strict';

angular.module('etablissements').directive('etablissementForm',
  function () {
    return {
      restrict: 'E',
      scope: {
        etablissement: '=',
        disabledForm: '=ngDisabled',
        autoSave: '='
      },
      templateUrl: 'modules/etablissements/views/etablissement.form.html',
      controllerAs: 'etablissementFormCtrl',
      controller: 'EtablissementFromCtrl'
    };
  });
;
'use strict';

angular.module('etablissements').directive('etablissementsDashboardCard',
  function () {
    return {
      restrict: 'E',
      templateUrl: 'modules/etablissements/views/etablissements.dashboard-card.html',
      controllerAs: 'etablissementsDashboardCardCtrl',
      controller: ['Etablissement', '$state', 'Dialog', 'ETABLISSEMENTS', function (Etablissement, $state, Dialog, ETABLISSEMENTS) {

        var ctrl = this;

        ctrl.handleClick = function ($event) {
          if (ctrl.nbEtablissements) {
            return $state.go('etablissements');
          }
          var dialog = new Dialog(ETABLISSEMENTS.DIALOGS.ADD_ETABLISSEMENT);
          dialog.show($event).then(function (etablissement) {
            ctrl.nbEtablissements++;
            $state.go('etablissements.fiche', {
              etablissementId: etablissement._id
            });
          });
        };

        Etablissement.count().then(function (nb) {
          ctrl.nbEtablissements = nb;
        });
      }]
    };
  });
;
'use strict';

angular.module('etablissements').directive('placeAutocomplete',
  ['$http', 'PlaceAutocompleteFactory', 'ETABLISSEMENTS', function ($http, PlaceAutocompleteFactory, ETABLISSEMENTS) {
    return {
      require: 'ngModel',
      restrict: 'E',
      scope: {},
      templateUrl: 'modules/core/views/place.autocomplete.html',
      compile: function (iElement, iAttrs) {

        if (iAttrs.mdFloatingLabel) {
          iElement.find('md-autocomplete').attr('md-floating-label', iAttrs.mdFloatingLabel);
        }

        return function link(scope, element, attrs, ngModelCtrl) {

          scope.querySearch = function (searchText) {
            var url = 'https://search.mapzen.com/v1/search?text=' + searchText + '&api_key=' + ETABLISSEMENTS.MAPZEN_KEY;
            return $http.get(url).then(function (response) {
              return response.data.features;
            });
          };

          scope.selectedItemChange = function (mapzenItem) {
            if (mapzenItem) {
              $http.get('http://nominatim.openstreetmap.org/lookup?format=json&osm_ids=W' + mapzenItem.properties.id.replace('way:', '')).then(function (response) {

                if (response.status === 200 && response.data.length >  0) {
                  ngModelCtrl.$setViewValue(PlaceAutocompleteFactory.convertResult(_.first(response.data), mapzenItem));
                } else  {
                  ngModelCtrl.$setViewValue({
                    description: mapzenItem.properties.name,
                    coordinates: {
                      lat: _.last(mapzenItem.geometry.coordinates),
                      long: _.first(mapzenItem.geometry.coordinates)
                    }
                  });
                }
                ngModelCtrl.$render();
              });
            } else {
              ngModelCtrl.$setViewValue(undefined);
            }
          };
        };
      }
    };
  }]);
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
      require: '^^plageInterventionFiche',
      restrict: 'E',
      scope: true,
      templateUrl: 'modules/interventions/views/intervention.card.html',
      controller: 'InterventionCardController',
      controllerAs: 'interventionCardCtrl',
      link: function (scope, element) {
        element.toggleClass('booked', scope.intervention.isBooked());
      }
    };
  });
;
'use strict';

angular.module('interventions').directive('interventionsDashboardCard',
  function () {
    return {
      restrict: 'E',
      templateUrl: 'modules/interventions/views/interventions.dashboard-card.html',
      controllerAs: 'interventionsDashboardCardCtrl',
      controller: ['PlageIntervention', 'Moment', '$state', 'Dialog', 'INTERVENTIONS', function (PlageIntervention, Moment, $state, Dialog, INTERVENTIONS) {

        var ctrl = this,
          now = new Moment().startOf('day');

        ctrl.handleClick = function ($event) {
          if (ctrl.nbInterventions) {
            return $state.go('interventions', {
              filters: {
                date: {
                  start: now.toDate()
                }
              }
            });
          }
          var dialog = new Dialog(INTERVENTIONS.DIALOGS.ADD_PLAGE);
          dialog.show($event).then(function () {
            ctrl.nbInterventions++;
          });
        };

        PlageIntervention.count({
          date: {
            $gte: now
          }
        }).then(function (nb) {
          ctrl.nbInterventions = nb;
        });
      }]
    };
  });
;
'use strict';

angular.module('conversations').directive('messageAttachementIntervention',
  ['Intervention', 'PlageIntervention', function (Intervention, PlageIntervention) {
    return {
      restrict: 'E',
      templateUrl: 'modules/interventions/views/intervention.message-attachement.html',
      link: function (scope) {
        return Intervention.findById(scope.attachement.data.intervention)
          .then(function (intervention) {
            PlageIntervention.findById(intervention.plage).then(function (plage) {
              scope.plage = plage;
              scope.etablissement = plage.etablissement;
            });
            console.log(intervention);
            scope.intervention = intervention;
          });
      }
    };
  }]);
;
'use strict';

angular.module('interventions').directive('participantAvatar',
  ['$compile', function ($compile) {

    var icons = {
      'confirmed': 'action:check_circle',
      'waiting': 'action:hourglass_full'
    };

    return {
      restrict: 'E',
      scope: {
        benevole: '=',
        plage: '=',
        intervention: '='
      },
      compile: function (iElement, iAttrs) {

        iElement.append('<avatar user="benevole"></avatar>');

        iElement.find('avatar').attr('click-for-details-avatar', '');

        if (iAttrs.hasOwnProperty('showStatus')) {
          iElement.append('<md-icon class="md-whiteframe-3dp" md-svg-icon="{{ iconName }}"></md-icon>');
        }

        return function (scope, element) {
          if (iAttrs.hasOwnProperty('showStatus')) {
            if (scope.intervention) {
              scope.iconName = scope.intervention.isConfirmed(scope.benevole) ? icons.confirmed : icons.waiting;

            } else if (scope.plage) {
              scope.iconName = scope.plage.isConfirmed(scope.benevole) ? icons.confirmed : icons.waiting;
            }
            $compile(element.find('md-icon'))(scope);
          }
        };
      }
    };
  }]);
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

angular.module('interventions').directive('urgentInterventionsCard',
  function () {
    return {
      restrict: 'E',
      scope: true,
      templateUrl: 'modules/interventions/views/urgent-interventions.card.html',
      controller: 'UrgentInterventionsCardController',
      controllerAs: 'urgentInterventionsCardCtrl'
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

angular.module('users').directive('clickForDetailsAvatar',
  ['RightPanel', function (RightPanel) {

    return {
      require: 'avatar',
      restrict: 'A',
      link: function (scope, element, attrs, avatarCtrl) {

        element.css('cursor', 'pointer');

        element.bind('click', function () {
          RightPanel.show('benevole', avatarCtrl.getUser());
        });
      }
    };
  }]);
;
'use strict';

angular.module('benevoles').controller('BenevoleCardController',
  ['$scope', '$mdDialog', 'Toast', 'MessageDialog', function ($scope, $mdDialog, Toast, MessageDialog) {

    var ctrl = this;

    $scope.benevole = $scope.benevole || ctrl.benevole;

    ctrl.sendMessage = function ($event, benevole) {

      MessageDialog.show($event, {
        receivers: [benevole]
      });
    };

    ctrl.saveBenevole = function (showToast) {
      $scope.benevole.save().then(function () {
        if (showToast) {
          Toast.show('Sauvegardé!');
        }
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
          Toast.show(benevole.toString() + ' a été supprimé.');
        });
      });
    };

  }]);
;
'use strict';

angular.module('benevoles').controller('BenevoleFromCtrl',
  ['BenevoleRole', '$scope', function (BenevoleRole, $scope) {

    var ctrl = this;

    BenevoleRole.find().then(function (benevoleRoles) {
      ctrl.benevoleRoles = benevoleRoles;
    });

    ctrl.isNew = _.isUndefined($scope.benevole._id);

    BenevoleRole.find().then(function (benevoleRoles) {
      ctrl.benevoleRoles = benevoleRoles;
    });

    ctrl.saveBenevole = function (form) {
      if ($scope.autoSave && form.$valid) {
        return $scope.benevole.save();
      }
    };
  }]);
;
'use strict';

angular.module('benevoles').controller('BenevolesSectionController',
  ['$rootScope', '$scope', '$q', '$timeout', 'benevoles', 'Benevole', '$stateParams', '$state', 'PARAMS', function ($rootScope, $scope, $q, $timeout, benevoles, Benevole, $stateParams, $state, PARAMS) {

    var ctrl = this;

    ctrl.benevoles = benevoles;

    $scope.search = _.assign({
      actif: true
    }, $stateParams.filters);

    ctrl.showBenevole = function (benevole) {
      if (_.isUndefined($scope.benevole) || benevole._id !== $scope.benevole._id) {

        $scope.lodadingDone = false;
        $scope.benevole = benevole;

        $state.go('benevoles.fiche', {
          benevoleId: benevole._id
        }, {
          notify: false
        });

        $q.all([
          $timeout(angular.noop, PARAMS.MIN_LOADING_TIME),
          Benevole.findById(benevole._id)
        ]).then(function (results) {
          $scope.benevole = _.last(results);
          $scope.lodadingDone = true;
        });
      }
    };

    ctrl.updateSearch = function (search) {
      Benevole.search(search).then(function (benevoles) {
        ctrl.benevoles = benevoles;
        if (ctrl.benevoles.length) {
          var firstBenevole = _.first(benevoles);
          if (firstBenevole && (_.isUndefined($scope.benevole) || $scope.benevole._id !== firstBenevole._id)) {
            ctrl.showBenevole(firstBenevole);
          }
        } else {
          $scope.benevole = undefined;
        }

      });
    };

    var listeners = [];

    listeners.push($rootScope.$on('Benevole:new', function ($event, benevole) {
      _.sortedPush(ctrl.benevoles, benevole, function (benevole) {
        return benevole.toString();
      });
    }));

    listeners.push($rootScope.$on('Benevole:remove', function ($event, removedBenevole) {
      _.remove(ctrl.benevoles, function (benevole) {
        return removedBenevole._id === benevole._id;
      });
      if (removedBenevole._id === $scope.benevole._id) {
        ctrl.showBenevole(ctrl.benevoles[ctrl.currentIndex - 1]  ||  _.first(ctrl.benevoles));
      }
    }));

    $scope.$on('destroy', function () {
      _.forEach(listeners, function (listener) {
        listener();
      });
    });

    if (ctrl.benevoles.length) {
      ctrl.showBenevole(_.find(ctrl.benevoles, ['_id', $stateParams.benevoleId]) || _.first(ctrl.benevoles));
    } else {
      $scope.lodadingDone = true;
    }

  }]);
;
'use strict';

angular.module('etablissements').controller('NouveauBenevoleController',
  ['$scope', '$mdToast', 'Benevole', '$state', function ($scope, $mdToast, Benevole, $state) {

    var ctrl = this;

    $scope.benevole = new Benevole();

    ctrl.create = function (form, params) {

      if (form.$valid) {
        return Benevole.create(params).then(function (benevole) {
          ctrl.dialog.hide(benevole);
          $mdToast.show(
            $mdToast.simple()
            .action('voir')
            .textContent('Le bénévole ' + benevole.toString() + ' a été créé!')
          ).then(function (response) {
            if (response === 'ok') {
              $state.go('benevoles.fiche', {
                benevoleId: benevole._id
              });
            }
          });
        });
      }

      _.forEach(form.userProfileForm.$error, function (field) {
        _.forEach(field, function (errorField) {
          errorField.$setTouched();
        });
      });

      ctrl.dialog.shake();
    };
  }]);
;
'use strict';

angular.module('benevoles').controller('ObservateurProgressController',
  function () {

  });
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

angular.module('conversations').controller('ConversationCardController',
  ['Toast', function (Toast) {

    var ctrl = this;

    ctrl.archive = function (conversation) {

      conversation.archive().then(function () {
        Toast.show('Conversation archivée!');
      });
    };

  }]);
;
'use strict';

angular.module('conversations').controller('ConversationController',
  ['$scope', 'Benevole', 'Message', '$injector', 'UserAuth', function ($scope, Benevole, Message, $injector, UserAuth) {

    var ctrl = this;

    var unwatch = $scope.$watch('messages', function (messages) {
      if (messages)  {
        messages.push(new Message({
          author: UserAuth.getCurrentUser()._id,
          conversation: $scope.conversation._id
        }));
        Benevole.find({
          _id: {
            $in: _.map(messages, 'author')
          }
        }).then(function (benevoles) {
          ctrl.getAuthor = function (authorId) {
            return _.find(benevoles, ['_id', authorId]);
          };
          unwatch();
        });
      }
    });

    ctrl.addMessage = function (newMessage) {

      Message.create(newMessage).then(function (message) {
        _.assign(newMessage, message);
        $scope.messages.push(new Message({
          author: UserAuth.getCurrentUser()._id,
          conversation: $scope.conversation._id
        }));

        /*  var isParticipating = false,
          participants = $scope.conversation.getParticipants();

        _.forEach(participants, function (participant) {
          isParticipating = participant.equals(message.author);
        });

        if (!isParticipating) {
          participants.push(message.author);
        }
*/
      });
    };

    ctrl.handleAttachementSelection = function (message, attachement) {
      (attachement.serviceInstance || (attachement.serviceInstance = $injector.get(attachement.service)))
      .getItem().then(function (item) {
        message.attachements = message.attachements ||  [];
        message.attachements.push(item);
      });
    };

    ctrl.deleteMessage = function (message) {
      message.remove().then(function () {
        _.pull($scope.messages, message);
      });
    };

  }]);
;
'use strict';

angular.module('conversations').controller('ConversationsSectionController',
  ['$scope', '$q', '$rootScope', 'conversations', '$state', '$stateParams', '$timeout', 'Conversation', 'PARAMS', function ($scope, $q, $rootScope, conversations, $state, $stateParams, $timeout, Conversation, PARAMS) {

    var ctrl = this;

    ctrl.conversations = conversations;

    Conversation.findOne({
      type: {
        $ne: 'intervention'
      },
      archived: true
    }).then(function (conversation) {
      ctrl.noArchives = _.isNull(conversation);
    });

    $scope.search = $stateParams.filters ||  {
      archived: false,
      type: {
        $ne: 'intervention'
      }
    };

    ctrl.showConversation = function (conversation) {
      if (_.isUndefined($scope.conversation) || conversation._id !== $scope.conversation._id) {

        $scope.lodadingDone = false;
        $scope.conversation = conversation;

        $state.go('conversations.fiche', {
          conversationId: conversation._id
        }, {
          notify: false
        });

        $q.all([
          $timeout(angular.noop, PARAMS.MIN_LOADING_TIME),
          Conversation.findById(conversation._id)
        ]).then(function (results) {
          $scope.conversation = _.last(results);
          $scope.lodadingDone = true;
        });
      }
    };

    ctrl.updateSearch = function (search) {
      Conversation.search(search).then(function (conversations) {
        ctrl.conversations = conversations;
        if (ctrl.conversations.length) {
          var firstConversation = _.first(conversations);
          if (firstConversation && (_.isUndefined($scope.conversation) || $scope.conversation._id !== firstConversation._id)) {
            ctrl.showConversation(firstConversation);
          }
        } else {
          $scope.conversation = undefined;
        }
      });
    };

    var listeners = [];

    listeners.push($rootScope.$on('Conversation:new:currentUser', function ($event, newConversation) {
      ctrl.conversations.unshift(newConversation);
      ctrl.showConversation(newConversation);
    }));

    listeners.push($rootScope.$on('Conversation:archived', function ($event, conversation) {

      var convoIndex = _.findIndex(ctrl.conversations, function (currentConvo) {
        return conversation._id === currentConvo._id;
      });
      if ($scope.conversation._id === conversation._id) {
        var conversationToShow = ctrl.conversations[convoIndex - 1] || ctrl.conversations[convoIndex + 1];
        if (conversationToShow) {
          ctrl.showConversation(conversationToShow);
        } else {
          $scope.conversation = undefined;
        }
      }
      _.pullAt(ctrl.conversations, convoIndex);
    }));

    $scope.$on('destroy', function () {
      _.forEach(listeners, function (listener) {
        listener();
      });
    });

    if (ctrl.conversations.length) {
      ctrl.showConversation(_.find(ctrl.conversations, ['_id', $stateParams.conversationId]) ||  _.first(ctrl.conversations));
    } else {
      $scope.lodadingDone = true;
    }

  }]);
;
'use strict';

angular.module('conversations').controller('NouveauMessageController',
  ['Benevole', 'Conversation', '$mdToast', 'UserAuth', function (Benevole, Conversation, $mdToast, UserAuth) {

    var ctrl = this;

    var currentUser = UserAuth.getCurrentUser();

    var toast = $mdToast.simple()
      .action('annuler')
      .textContent('Le message a été envoyé!');

    ctrl.message = {
      destinataires: ctrl.receivers || []
    };

    ctrl.searchDestinataires = function (searchTerm) {
      return Benevole.search({
        _id: {
          $nin: _.map(ctrl.message.destinataires, '_id').concat(currentUser._id)
        },
        benevoleName: searchTerm
      }).then(function (results) {
        return _.map(results, function (destinataire) {
          return _.assign(destinataire, {
            fullname: destinataire.toString()
          });
        });
      });
    };

    ctrl.cancel = ctrl.dialog.cancel;

    ctrl.send = function (messageForm) {

      messageForm.destinataires.$setValidity('required', ctrl.message.destinataires.length > 0);

      if (messageForm.$invalid) {
        return ctrl.dialog.shake();
      }

      ctrl.dialog.hide().then(function () {
        $mdToast.show(toast).then(function (response) {
          if (_.isUndefined(response)) {
            Conversation.create({
              title: ctrl.message.subject,
              participants: _.map(ctrl.message.destinataires, '_id').concat(currentUser._id),
              type: 'private',
              message: ctrl.message.body
            });
          }
        });
      });
    };
  }]);
;
'use strict';

angular.module('etablissements').controller('EtablissementCardCtrl',
  ['$scope', 'Contact', 'MessageDialog', 'ContactDialog', function ($scope, Contact, MessageDialog, ContactDialog) {

    var ctrl = this;

    Contact.findByEtablissement($scope.etablissement._id).then(function (contacts) {
      ctrl.contacts = contacts;
    });

    ctrl.addContact = function ($event, etablissement) {
      ContactDialog.new($event, {
        etablissement: etablissement,
        contacts: ctrl.contacts
      });
    };

    ctrl.detailsContact = function ($event, contact) {
      ContactDialog.edit($event, {
        contact: contact,
        contacts: ctrl.contacts
      });
    };

    ctrl.sendMessageToContact = function ($event, contact) {
      MessageDialog.show($event, {
        receivers: [contact]
      });
    };

    ctrl.saveEtablissement = function (form) {
      if (form.$valid) {
        $scope.etablissement.save().then(function () {
          console.log('etablissement sauvegardé!');
        });
      }
    };
  }]);
;
'use strict';

angular.module('etablissements').controller('EtablissementFromCtrl',
  ['$scope', '$q', 'EtablissementType', 'Ville', 'Province', 'CommissionScolaire', 'PlaceToEtablissementConverter', function ($scope, $q, EtablissementType, Ville, Province, CommissionScolaire, PlaceToEtablissementConverter) {
    var ctrl = this,
      isNew = _.isUndefined($scope.etablissement._id),
      createdEtablissementType,
      oldEtablissementType,
      createdCommissionScolaire,
      oldCommissionScolaire;

    EtablissementType.find().then(function (etablissementTypes) {
      ctrl.etablissementTypes = etablissementTypes;
    });

    CommissionScolaire.find().then(function (commissionsScolaires) {
      ctrl.commissionsScolaires = commissionsScolaires;
    });

    Ville.find().then(function (villes) {
      ctrl.villes = villes;
    });

    Province.find().then(function (provinces) {
      ctrl.provinces = provinces;
    });

    if (isNew) {
      $scope.$watch('place', function (place) {
        _.assign($scope.etablissement, place ? PlaceToEtablissementConverter.convert(place) : {});
      });
    }

    function saveEtablissement() {
      if ($scope.autoSave) {
        return $scope.etablissement.save();
      }
    }

    function createNewEtablissementType() {
      return needToCreateEtablissementType() ? EtablissementType.create({
        name: $scope.etablissement.typeDescription
      }).then(function (newEtablissementType) {
        createdEtablissementType = newEtablissementType;
        oldEtablissementType = $scope.etablissement.type;
        $scope.etablissement.type = newEtablissementType;
      }) : $q.when();
    }

    ctrl.toggleAddingType = function () {
      $scope.addingType = !$scope.addingType;
      if (!$scope.addingType && createdEtablissementType) {
        createdEtablissementType.remove().then(function () {
          createdEtablissementType = undefined;
        });
        $scope.etablissement.type = oldEtablissementType;
        saveEtablissement();
      }
      $scope.etablissement.typeDescription = undefined;
    };

    function needToCreateEtablissementType() {
      return $scope.addingType && (_.isUndefined(createdEtablissementType) || $scope.etablissement.typeDescription.toLowerCase() !== createdEtablissementType.name.toLowerCase());
    }

    function createNewCommissionScolaire() {
      return needToCreateCommissionScolaire() ? CommissionScolaire.create({
        name: $scope.etablissement.commissionDescription
      }).then(function (newCommissionScolaire) {
        createdCommissionScolaire = newCommissionScolaire;
        oldCommissionScolaire = $scope.etablissement.commissionScolaire;
        $scope.etablissement.commissionScolaire = newCommissionScolaire;
      }) : $q.when();
    }

    ctrl.toggleAddingCommission = function () {
      $scope.addingCommission = !$scope.addingCommission;
      if (!$scope.addingCommission && createdCommissionScolaire) {
        createdCommissionScolaire.remove().then(function () {
          createdCommissionScolaire = undefined;
        });
        $scope.etablissement.commissionScolaire = oldCommissionScolaire;
        saveEtablissement();
      }
      $scope.etablissement.commissionDescription = undefined;
    };

    function needToCreateCommissionScolaire() {
      return $scope.addingCommission && (_.isUndefined(createdCommissionScolaire) || $scope.etablissement.commissionDescription.toLowerCase() !== createdCommissionScolaire.name.toLowerCase());
    }

    ctrl.saveEtablissement = function (form) {
      if (form.$valid && !isNew) {
        return $q.all([
          createNewEtablissementType(),
          createNewCommissionScolaire()
        ]).then(saveEtablissement);
      }
    };
  }]);
;
'use strict';

angular.module('etablissements').controller('EtablissementsSectionController',
  ['$rootScope', '$scope', '$q', '$timeout', 'etablissements', 'Etablissement', '$stateParams', '$state', 'PARAMS', function ($rootScope, $scope, $q, $timeout, etablissements, Etablissement, $stateParams, $state, PARAMS) {

    var ctrl = this;

    ctrl.etablissements = etablissements;

    $scope.search = $stateParams.filters;

    ctrl.showEtablissement = function (etablissement) {
      if (_.isUndefined($scope.etablissement) || etablissement._id !== $scope.etablissement._id) {

        $scope.lodadingDone = false;
        $scope.etablissement = etablissement;

        $state.go('etablissements.fiche', {
          etablissementId: etablissement._id
        }, {
          notify: false
        });

        $q.all([
          $timeout(angular.noop, PARAMS.MIN_LOADING_TIME),
          Etablissement.findById(etablissement._id)
        ]).then(function (results) {
          $scope.etablissement = _.last(results);
          $scope.lodadingDone = true;
        });
      }
    };

    ctrl.updateSearch = function (search) {
      Etablissement.search(search).then(function (etablissements) {
        ctrl.etablissements = etablissements;
        var firstEtablissement = _.first(etablissements);
        if (firstEtablissement && (_.isUndefined($scope.etablissement) ||  $scope.etablissement._id !== firstEtablissement._id)) {
          ctrl.showEtablissement(firstEtablissement);
        }
      });
    };

    var listeners = [];

    listeners.push($rootScope.$on('Etablissement:new', function ($event, newEtablissement) {
      _.sortedPush(ctrl.etablissements, newEtablissement, function (etablissement) {
        return etablissement.toString();
      });
    }));

    listeners.push($rootScope.$on('Etablissement:remove', function ($event, removedEtablissement) {
      _.remove(ctrl.etablissements, function (etablissement) {
        return removedEtablissement._id === etablissement._id;
      });
      if (removedEtablissement._id === $scope.etablissement._id) {
        ctrl.showEtablissement(ctrl.etablissements[ctrl.currentIndex - 1]  ||  _.first(ctrl.etablissements));
      }

    }));

    $scope.$on('destroy', function () {
      _.forEach(listeners, function (listener) {
        listener();
      });
    });

    if (ctrl.etablissements.length) {
      ctrl.showEtablissement(_.find(ctrl.etablissements, ['_id', $stateParams.etablissementId]) ||  _.first(ctrl.etablissements));
    } else {
      $scope.lodadingDone = true;
    }

  }]);
;
'use strict';

angular.module('etablissements').controller('NouvelEtablissementController',
  ['$scope', '$mdToast', '$state', 'Etablissement', 'PlaceToEtablissementConverter', function ($scope, $mdToast, $state, Etablissement, PlaceToEtablissementConverter) {

    var ctrl = this;

    $scope.etablissement = new Etablissement();

    $scope.$watch('place', function (place) {
      _.assign($scope.etablissement, place ? PlaceToEtablissementConverter.convert(place) : {});
    });

    ctrl.create = function (form, params) {

      if (form.$valid) {
        return Etablissement.create(params).then(function (etablissement) {
          ctrl.dialog.hide(etablissement);
          $mdToast.show(
            $mdToast.simple()
            .action('voir')
            .textContent('L\'établissement ' + etablissement.toString() + ' a été créé!')
          ).then(function (response) {
            if (response === 'ok') {
              $state.go('etablissements.fiche', {
                etablissementId: etablissement._id
              });
            }
          });
        });
      }

      _.forEach(form.etablissementForm.$error, function (field) {
        _.forEach(field, function (errorField) {
          errorField.$setTouched();
        });
      });

      ctrl.dialog.shake();

    };

  }]);
;
'use strict';

angular.module('events').controller('MiniCalendarController',
  ['$rootScope', '$scope', '$q', 'EventService', 'Moment', 'FlickityService', function ($rootScope, $scope, $q, EventService, Moment, FlickityService) {

    var ctrl = this;

    ctrl.calendarOptions = {
      sameDay: '[Today]',
      nextDay: '[Tomorrow]',
      nextWeek: 'dddd',
      lastDay: '[Yesterday]',
      lastWeek: '[Last] dddd',
      sameElse: 'DD/MM/YYYY'
    };

    ctrl.selectEvent = EventService.select;

    var eventSet = {};

    function loadEvents(date) {
      var timestamp = '' + date.date() + date.month() + date.year();

      var events = eventSet[timestamp];

      if (events) {
        var deffered = $q.defer();
        deffered.resolve(events);
        return deffered.promise;
      } else {
        return EventService.getByDate(date).then(function (events) {
          eventSet[timestamp] = events;
          return events;
        });
      }
    }

    function loadList(index, events) {

      ctrl['list' + (index + 1)] = ctrl['list' + (index + 1)] ||  {};
      ctrl['list' + (index + 1)] = {
        events: events,
        loading: false
      };

    }

    ctrl.list1 =   {
      loading: true
    };
    ctrl.list2 =   {
      loading: true
    };
    ctrl.list3 =   {
      loading: true
    };

    ctrl.date = new Moment();

    function loadLeft(selectedIndex) {
      var listNb = selectedIndex === 0 ? 2 : selectedIndex === 1 ? 0 : 1;
      ctrl['list' + (listNb + 1)].loading = true;
      loadEvents(new Moment(ctrl.date).subtract(1, 'days')).then(function (events) {
        loadList(listNb, events);
      });
      loadEvents(new Moment(ctrl.date).subtract(2, 'days'));
    }

    function loadRight(selectedIndex) {
      var listNb = selectedIndex === 0 ? 1 : selectedIndex === 1 ? 2 : 0;
      ctrl['list' + (listNb + 1)].loading = true;
      loadEvents(new Moment(ctrl.date).add(1, 'days')).then(function (events) {
        loadList(listNb, events);
      });
      loadEvents(new Moment(ctrl.date).add(2, 'days'));
    }

    var currentIndex = 1;

    loadLeft(currentIndex);

    loadEvents(new Moment(ctrl.date)).then(function (events) {
      loadList(1, events);
    });

    loadRight(currentIndex);

    $rootScope.$on('Flickity:calendarList:cellSelect', function (event, data) {

      var wentLeft = false;
      wentLeft = wentLeft || data.instance.selectedIndex === 0 && currentIndex === 1;
      wentLeft = wentLeft || data.instance.selectedIndex === 2 && currentIndex === 0;
      wentLeft = wentLeft || data.instance.selectedIndex === 1 && currentIndex === 2;

      if (wentLeft) {
        ctrl.date.subtract(1, 'days');
        loadLeft(data.instance.selectedIndex);
      } else {
        ctrl.date.add(1, 'days');
        loadRight(data.instance.selectedIndex);
      }
      currentIndex = data.instance.selectedIndex;
    });

    ctrl.previousDay = function () {
      FlickityService.previous('calendarList');
    };

    ctrl.nextDay = function () {
      FlickityService.next('calendarList');
    };

    ctrl.flickityOptions = {
      initialIndex: currentIndex,
      prevNextButtons: false,
      wrapAround: true,
      draggable: false
    };

  }]);
;
'use strict';

angular.module('interventions').controller('AddParticipantController',
  ['$scope', 'Benevole', 'BENEVOLES', function ($scope, Benevole, BENEVOLES) {

    var ctrl = this;

    ctrl.icon = BENEVOLES.ICONS.BENEVOLE;

    $scope.message = {};

    ctrl.selectedItemChange = function (item) {
      $scope.message.destinataire = item;
    };

    ctrl.add = function (addParticipantForm, message) {

      if (addParticipantForm.$valid) {
        ctrl.dialog.hide(message);
      }
    };

    ctrl.search = function (terms) {
      return Benevole.search({
        _id: {
          $nin: ctrl.exclude
        },
        benevoleName: terms
      });
    };
  }]);
;
'use strict';

angular.module('interventions').controller('InterventionCardController',
  ['$scope', '$element', '$mdConstant', '$mdDialog', 'Toast', 'InterventionTag', 'Benevole', 'Moment', 'Dialog', 'RemoveInterventionDialog', function ($scope, $element, $mdConstant, $mdDialog, Toast, InterventionTag, Benevole, Moment, Dialog, RemoveInterventionDialog) {

    var ctrl = this,
      plageInterventionFicheCtrl = $element.controller('plageInterventionFiche');

    // Heures début et fin..

    ctrl.start = new Date($scope.intervention.date.start.seconds(0).milliseconds(0));
    ctrl.setStartDate = function () {
      $scope.intervention.date.start = new Moment(ctrl.start);
      $scope.showStart = false;
    };
    ctrl.end = new Date($scope.intervention.date.end.seconds(0).milliseconds(0));
    ctrl.setEndDate = function () {
      $scope.intervention.date.end = new Moment(ctrl.end);
      $scope.showEnd = false;
    };

    // Set participants et intéressés

    $scope.intervention.getBenevoles('participants').then(function (benevoles) {
      ctrl.participants = benevoles;
    });

    $scope.intervention.getBenevoles('interested').then(function (benevoles) {
      ctrl.interested = benevoles;
    });

    // Tags

    ctrl.chipSeparatorKeys = [$mdConstant.KEY_CODE.ENTER, $mdConstant.KEY_CODE.COMMA, 186];

    InterventionTag.find({
      _id: {
        $in: $scope.intervention.tags
      }
    }).then(function (tags) {
      ctrl.tags = tags;
    });

    ctrl.removeChip = function (chip) {
      _.pull($scope.intervention.tags, chip._id);
    };

    ctrl.transformChip = function (chip) {

      function assignTag(tag) {
        $scope.intervention.tags.push(tag._id);
      }

      if (_.isString(chip)) {
        var tag = new InterventionTag({
          name: chip.toLowerCase()
        });
        tag.save().then(assignTag);
        return tag;
      }

      assignTag(chip);
      return chip;
    };

    ctrl.searchTags = function (params) {
      return InterventionTag.searchByName(params).then(function (results) {
        return _.differenceBy(results, ctrl.tags, '_id');
      });
    };

    // Dragon drop

    ctrl.droppedInInterested = function (item) {
      var benevole = new Benevole(item);

      // Était dans la liste des participants
      if ($scope.intervention.getDemandeParticipation(benevole).isAccepted()) {
        $scope.intervention.removeBenevoleFromParticipants(benevole)
          .then(function () {
            plageInterventionFicheCtrl.updateConversation();
          })
          .catch(function () {
            _.pull(ctrl.interested, benevole);
            ctrl.participants.splice(_.sortedIndexBy(ctrl.participants, benevole, function (benevole) {
              return benevole.toString();
            }), 0, benevole);
          });
      }

      return benevole;
    };

    ctrl.droppedInParticipants = function (item) {

      var benevole = new Benevole(item);

      if (_.isUndefined(_.find(ctrl.participants, ['_id', item._id]))) {

        $scope.intervention.addParticipant(benevole)
          .then(function () {
            plageInterventionFicheCtrl.updateConversation();
          })
          .catch(function () {
            _.pull(ctrl.participants, benevole);
            ctrl.interested.splice(_.sortedIndexBy(ctrl.interested, benevole, function (benevole) {
              return benevole.toString();
            }), 0, benevole);
          });
      }

      return benevole;
    };

    ctrl.droppedInGarbage = function (item) {
      var benevole = new Benevole(item);
      $scope.intervention.removeBenevoleFromParticipants(benevole, true)
        .then(function () {
          plageInterventionFicheCtrl.updateConversation();
        })
        .catch(function () {
          ctrl.participants.push(benevole);
        });
      return true;
    };

    ctrl.toogleGarbage = function (value) {
      $scope.showGarbage = value;
    };

    ctrl.addParticipant = function ($event) {

      var addParticipantDialog = new Dialog({
        templateUrl: 'modules/interventions/views/add-participant.dialog.html',
        controller: 'AddParticipantController',
        controllerAs: 'addParticipantCtrl',
        locals: {
          exclude: _.map(ctrl.participants.concat(ctrl.interested), '_id')
        }
      });

      addParticipantDialog.show($event).then(function (message) {
        var benevole = message.destinataire;
        ctrl.participants.splice(_.sortedIndexBy(ctrl.participants, benevole, function (benevole) {
          return benevole.toString();
        }), 0, benevole);
        $scope.intervention.addParticipant(benevole, message.body)
          .catch(function () {
            _.pull(ctrl.participants, benevole);
          });
      });
    };

    ctrl.saveIntervention = function ($event, interventionForm) {

      function save(intervention) {
        intervention.save().then(function () {
          interventionForm.$setPristine();
          Toast.show('Changements sauvegardé!');
        });
      }

      if ($scope.intervention.isBooked()) {
        return $mdDialog.show($mdDialog.confirm()
            .title('Désirez vous envoyer ces changements aux participants ?')
            .ariaLabel('Envois changements')
            .targetEvent($event)
            .ok('Bonne idée!')
            .cancel('Nope'))
          .then(function () {
            save(_.assign($scope.intervention, {
              notifyChanges: true
            }));
          })
          .catch(function () {
            return save($scope.intervention);
          });
      }

      return save($scope.intervention);
    };

    ctrl.removeIntervention = function ($event, $index, intervention) {
      RemoveInterventionDialog.show($event, {
        intervention: intervention
      }).then(function () {
        plageInterventionFicheCtrl.removeIntervention($index);
      });
    };

    ctrl.bookIntervention = function () {
      return $scope.intervention.book().then(function () {
        plageInterventionFicheCtrl.updateConversation();
        plageInterventionFicheCtrl.updateStatus();
      });
    };

  }]);
;
'use strict';

angular.module('interventions').controller('NouvellePlageInterventionController',
  ['$state', 'Etablissement', 'Contact', 'PlageIntervention', function ($state, Etablissement, Contact, PlageIntervention) {

    var ctrl = this;

    Etablissement.find().then(function (etablissements) {
      ctrl.etablissements = etablissements;
    });

    ctrl.setContacts = function (etablissement) {
      Contact.findByEtablissement(etablissement._id).then(function (contacts) {
        ctrl.contacts = contacts;
      });
    };

    ctrl.cancel = ctrl.dialog.cancel;

    ctrl.create = function (plageForm, plage) {

      if (plageForm.$invalid) {
        return ctrl.dialog.shake();
      }

      ctrl.dialog.hide().then(function () {
        PlageIntervention.create(plage).then(function (newPlage) {
          $state.go('interventions.fiche', {
            plageId: newPlage._id
          }, {
            reload: true
          });
        });
      });
    };
  }]);
;
'use strict';

angular.module('interventions').controller('PlageFicheController',
  ['$rootScope', '$scope', '$q', '$state', 'Moment', 'PlageIntervention', 'Intervention', function ($rootScope, $scope, $q, $state, Moment, PlageIntervention, Intervention) {

    var ctrl = this;

    var unwatch = $scope.$watch('plage', function (plage) {
      if (plage) {
        plage.getInterventions().then(function (interventions) {
          ctrl.interventions = interventions;
        });
        unwatch();
      }
    });

    ctrl.updateConversation = function (plage) {
      (plage || ctrl.plage).getConversation().then(function (conversation) {
        ctrl.conversation = conversation;
      });
    };

    function populatePlage(plage) {
      plage.createdAt = new Moment(plage.createdAt);
      ctrl.updateConversation(plage);

      return Intervention.findByPlageId(plage._id).then(function (interventions) {
        ctrl.interventions = interventions;
      });
    }

    populatePlage($scope.plage).then(function () {
      ctrl.plage = $scope.plage;
    });

    ctrl.addIntervention = function () {
      Intervention.create(_.assign({
        date: {
          start: new Date(),
          end: new Date()
        },
        plage: ctrl.plage._id
      }, _.omit(_.first(ctrl.interventions), ['createdAt', 'updatedAt', '_id', 'status']))).then(function (intervention) {
        ctrl.interventions.unshift(intervention);
        $rootScope.$broadcast('PLAGE:STATUS-CHANGE', _.assign(ctrl.plage, {
          status: 'OPEN'
        }));
      });
    };

    ctrl.removeIntervention = function ($index) {
      ctrl.interventions.splice($index, 1);
    };

    ctrl.updateStatus = function () {
      ctrl.plage.status = _.filter(ctrl.interventions, ['status', 'OPEN']).length ? 'OPEN' : 'CLOSE';
      $rootScope.$broadcast('PLAGE:STATUS-CHANGE', ctrl.plage);
    };

  }]);
;
'use strict';

angular.module('interventions').controller('PlagesInterventionsSectionController',
  ['$rootScope', '$scope', '$q', '$timeout', 'plages', 'PlageIntervention', '$stateParams', '$state', 'PARAMS', function ($rootScope, $scope, $q, $timeout, plages, PlageIntervention, $stateParams, $state, PARAMS) {

    var ctrl = this;

    ctrl.plages = plages;
    $scope.search = $stateParams.filters;

    ctrl.showPlage = function (plage) {
      if (_.isUndefined($scope.plage) || plage._id !== $scope.plage._id) {

        $scope.lodadingDone = false;
        $scope.plage = plage;

        $state.go('interventions.fiche', {
          plageId: plage._id
        }, {
          notify: false
        });

        $q.all([
          $timeout(angular.noop, PARAMS.MIN_LOADING_TIME),
          PlageIntervention.findById(plage._id)
        ]).then(function (results) {
          $scope.plage = _.last(results);
          $scope.lodadingDone = true;
        });
      }
    };

    ctrl.updateSearch = function (search) {
      PlageIntervention.formatFilters(search).then(function (query) {
        PlageIntervention.find(query).then(function (plages) {
          ctrl.plages = plages;
          var firstPlage = _.first(plages);
          if (firstPlage && (_.isUndefined($scope.plage) || $scope.plage._id !== firstPlage._id)) {
            ctrl.showPlage(firstPlage);
          }
        });
      });
    };

    var listeners = [];

    listeners.push($rootScope.$on('PLAGE:STATUS-CHANGE', function ($event, plage) {
      _.find(ctrl.plages, '_id', plage._id).status = plage.status;
    }));

    listeners.push($rootScope.$on('PlageIntervention:new', function ($event, nouvellePlage) {
      _.sortedPush(ctrl.plages, nouvellePlage, function (plage) {
        return plage.toString();
      });
    }));

    listeners.push($rootScope.$on('PlageIntervention:remove', function ($event, removedPlage) {
      _.remove(ctrl.plages, function (plage) {
        return plage._id === removedPlage._id;
      });
      if (removedPlage._id === $scope.plage._id) {
        ctrl.showPlage(ctrl.plages[ctrl.currentIndex - 1]  ||  _.first(ctrl.plages));
      }

    }));

    $scope.$on('destroy', function () {
      _.forEach(listeners, function (listener) {
        listener();
      });
    });

    if (ctrl.plages.length) {
      ctrl.showPlage(_.find(ctrl.plages, ['_id', $stateParams.plageId]) || _.first(ctrl.plages));
    } else {
      $scope.lodadingDone = true;
    }

  }]);
;
'use strict';

angular.module('interventions').controller('UrgentInterventionsCardController',
  ['Intervention', '$state', function (Intervention, $state) {

    var ctrl = this;

    Intervention.getUrgents().then(function (interventions) {

      ctrl.interventions = interventions;

      ctrl.showDetails = function (intervention) {
        $state.go('fiche-intervention', {
          _id: intervention._id
        });
      };
    });

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
  ['ToolbarMenuService', function (ToolbarMenuService) {

    this.menuItems = ToolbarMenuService.getItems();

  }]);
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

  $templateCache.put('modules/benevoles/views/benevole.card.html',
    "<md-card layout=column flex><div layout=column class=card-header><div layout=row class=card-header-tools><span flex></span><md-button class=md-icon-button ng-click=\"benevoleCardCtrl.sendMessage($event, benevole)\"><md-icon md-svg-icon=communication:message></md-icon><md-tooltip>Message</md-tooltip></md-button><md-button class=md-icon-button ng-click=\"benevoleCardCtrl.deleteBenevole($event, benevole)\" ng-disabled=true><md-icon md-svg-icon=action:delete></md-icon><md-tooltip>Supprimer</md-tooltip></md-button></div><span flex></span><div layout=row layout-align=\"start center\" class=\"fiche-title-over-custom-tabs md-padding\"><avatar user=benevole click-to-update></avatar><span class=\"md-title benevole-name\">{{ benevole.toString() }}</span></div></div><div layout=column flex><md-tabs flex class=md-accent><md-tab label=activités layout-fill><md-tab-body><div layout-padding layout=column flex ng-include=\"'modules/benevoles/views/benevole.infos.html'\"></div></md-tab-body></md-tab><md-tab label=profil layout-fill><md-tab-body><div layout-padding layout=column flex><benevole-form benevole=benevole auto-save=true></benevole-form></div></md-tab-body></md-tab></md-tabs></div></md-card>"
  );


  $templateCache.put('modules/benevoles/views/benevole.form.html',
    "<ng-form name=userProfileForm auto-save-form=autoSave novalidate autocomplete=off><div layout=row flex layout-wrap><div layout=column flex=45><md-input-container><label>Prénom</label><input name=prenom ng-model=benevole.prenom ng-model-options=\"{ updateOn: 'blur' }\" ng-change=benevoleFormCtrl.saveBenevole(userProfileForm) required><ng-messages for=userProfileForm.prenom.$error><ng-message when=required>requis.</ng-message></ng-messages></md-input-container><md-input-container><label>Nom de famille</label><input name=nomFamille ng-model=benevole.nomFamille ng-model-options=\"{ updateOn: 'blur' }\" ng-change=benevoleFormCtrl.saveBenevole(userProfileForm) required><ng-messages for=userProfileForm.nomFamille.$error><ng-message when=required>requis.</ng-message></ng-messages></md-input-container><md-input-container><label>Date de naissance</label><input type=date name=dateNaissance ng-model=benevole.dateNaissance ng-model-options=\"{ updateOn: 'blur' }\" ng-change=benevoleFormCtrl.saveBenevole(userProfileForm) required><ng-messages for=userProfileForm.dateNaissance.$error ng-show=\"userProfileForm.dateNaissance.$touched || userProfileForm.dateNaissance.$dirty\"><ng-message when=required>requis.</ng-message><ng-message when=date>date invalide.</ng-message></ng-messages></md-input-container><md-input-container><label>Courriel</label><input type=email name=email ng-model=benevole.email ng-model-options=\"{ updateOn: 'blur' }\" ng-change=benevoleFormCtrl.saveBenevole(userProfileForm) required><ng-messages for=userProfileForm.email.$error ng-show=\"userProfileForm.email.$touched || userProfileForm.email.$dirty\"><ng-message when=required>requis.</ng-message><ng-message when=email>courriel invalide.</ng-message></ng-messages></md-input-container><input style=display:none><md-input-container flex><label>{{ benevoleFormCtrl.isNew ? 'Mot de passe' : 'Nouveau mot de passe' }}</label><input name=password type=password autocomplete=new-password ng-model=benevole.password ng-model-options=\"{ updateOn: 'blur' }\" ng-change=\"benevole.password === benevole.passwordMatch && benevoleFormCtrl.saveBenevole(userProfileForm)\" ng-required=userProfileForm.isNew><ng-messages for=userProfileForm.password.$error><ng-message when=required>requis.</ng-message></ng-messages></md-input-container><md-input-container><label>Vérification mot de passe</label><input name=passwordMatch type=password autocomplete=off ng-model=benevole.passwordMatch ng-model-options=\"{ updateOn: 'default blur', debounce: { default: 500, blur: 0 } }\" ng-change=\"benevole.password === benevole.passwordMatch && benevoleFormCtrl.saveBenevole(userProfileForm)\" ng-disabled=\"benevole.password === undefined\" ng-required=benevole.password password-verify=benevole.password><ng-messages for=userProfileForm.passwordMatch.$error ng-show=\"userProfileForm.passwordMatch.$touched || userProfileForm.passwordMatch.$dirty\"><ng-message when=required>requis.</ng-message><ng-message when=passwordVerify>Ne correspond pas au mot de passe.</ng-message></ng-messages></md-input-container></div><span flex=10></span><div layout=column flex=45><md-input-container><label>Rôle</label><md-select name=role ng-model=benevole.role ng-change=benevoleFormCtrl.saveBenevole(userProfileForm) required><md-option ng-repeat=\"role in benevoleFormCtrl.benevoleRoles\" ng-value=role ng-selected=\"role._id === benevole.role._id\">{{ role.toString() }}</md-option></md-select><ng-messages for=userProfileForm.role.$error><ng-message when=required>requis.</ng-message></ng-messages></md-input-container><telephone-input flex=50 ng-model=benevole.telephones ng-change=benevoleFormCtrl.saveBenevole(userProfileForm)></telephone-input></div></div></ng-form>"
  );


  $templateCache.put('modules/benevoles/views/benevole.infos.html',
    "<div layout=row flex><div flex=60></div><div class=md-whiteframe-1dp flex=40><md-toolbar><div class=md-toolbar-tools><h2>Récent</h2></div></md-toolbar><md-list><md-list-item class=md-2-line><md-icon md-svg-icon=communication:message></md-icon><div class=md-list-item-text><h3>Qqchose</h3><p>description</p></div><md-divider></md-divider></md-list-item><md-list-item class=md-2-line><md-icon md-svg-icon=content:add></md-icon><div class=md-list-item-text><h3>Qqchose</h3><p>description</p></div><md-divider></md-divider></md-list-item><md-list-item class=md-2-line><md-icon md-svg-icon=communication:message></md-icon><div class=md-list-item-text><h3>Qqchose</h3><p>description</p></div><md-divider></md-divider></md-list-item><md-list-item class=md-2-line><md-icon md-svg-icon=communication:message></md-icon><div class=md-list-item-text><h3>Qqchose</h3><p>description</p></div><md-divider></md-divider></md-list-item><md-list-item class=md-2-line><md-icon md-svg-icon=communication:message></md-icon><div class=md-list-item-text><h3>Qqchose</h3><p>description</p></div><md-divider></md-divider></md-list-item></md-list></div></div>"
  );


  $templateCache.put('modules/benevoles/views/benevoles.dashboard-card.html',
    "<md-card ng-click=benevolesDashboardCardCtrl.handleClick($event)><md-card-content flex layout=column layout-align=\"center center\" class=text-center><md-icon flex style=\"height:50; width:50px\" md-svg-icon=\"{{ BENEVOLES.ICONS.BENEVOLE }}\"></md-icon><div flex><div class=md-display-1 ng-if=benevolesDashboardCardCtrl.nbBenevoles>{{ benevolesDashboardCardCtrl.nbBenevoles }}</div><ng-pluralize class=md-title count=benevolesDashboardCardCtrl.nbBenevoles when=\"{'0': 'Ajouter un bénévole',\n" +
    "	                     'one': 'bénévole',\n" +
    "	                     'other': 'bénévoles'}\"></ng-pluralize></div></md-card-content></md-card>"
  );


  $templateCache.put('modules/benevoles/views/benevoles.section.html',
    "<benevole-section layout=row flex><div layout=column flex=30 flex-gt-lg=20><md-card><md-card-content><md-input-container md-no-float class=\"md-icon-float md-block no-errors-spacer\"><md-icon md-svg-icon=action:search></md-icon><input placeholder=recherche... input-clear ng-model=search.benevoleName ng-model-options=\"{ debounce: PARAMS.DEBOUNCE_TIME }\" ng-change=benevolesSectionCtrl.updateSearch(search)></md-input-container><md-switch aria-label=actifs ng-model=search.actif ng-change=benevolesSectionCtrl.updateSearch(search)>actifs</md-switch></md-card-content></md-card><md-card flex><md-content flex><md-list section-list flex layout=column><md-list-item class=md-2-line ng-class=\"{ active:item._id === benevole._id }\" ng-repeat=\"item in benevolesSectionCtrl.benevoles\" ng-click=benevolesSectionCtrl.showBenevole(item)><avatar user=item no-role></avatar><div class=md-list-item-text><h3>{{ item.toString() }}</h3><p>{{ item.getRoleDescription() }}</p></div><md-divider ng-if=!$last></md-divider></md-list-item></md-list></md-content></md-card></div><div flex=70 flex-gt-lg=80 layout=column><div layout=row flex layout-align=\"center center\" ng-hide=lodadingDone><md-progress-circular md-diameter=160 md-mode=indeterminate></md-progress-circular></div><benevole-card ng-if=\"lodadingDone && benevole\" layout=column flex benevole=benevole></benevole-card></div></benevole-section>"
  );


  $templateCache.put('modules/benevoles/views/nouveau-benevole.dialog.html',
    "<md-dialog aria-label=\"Nouveau bénévole\" style=width:800px><form novalidate name=form class=input-no-bottom-margin ng-submit=\"nouveauBenevoleCtrl.create(form, benevole)\"><md-toolbar><div class=md-toolbar-tools><h2>Nouveau bénévole</h2><span flex></span><md-button class=md-icon-button ng-click=nouveauBenevoleCtrl.dialog.cancel()><md-icon md-svg-icon=navigation:close aria-label=\"Close dialog\"></md-icon></md-button></div></md-toolbar><md-dialog-content layout=column flex><div layout=column flex class=md-dialog-content><benevole-form benevole=benevole></benevole-form></div></md-dialog-content><md-dialog-actions layout=row><md-button type=button ng-click=nouveauBenevoleCtrl.dialog.cancel()>Annuler</md-button><md-button type=submit class=\"md-raised md-primary\" style=margin-right:20px>Créer</md-button></md-dialog-actions></form></md-dialog>"
  );


  $templateCache.put('modules/benevoles/views/observateurs-progress.dialog.html',
    "<md-dialog aria-label=Observateurs style=width:800px><md-toolbar><div class=md-toolbar-tools><h2>Observateurs</h2><span flex></span><md-button class=md-icon-button ng-click=observateurProgressCtrl.dialog.cancel()><md-icon md-svg-icon=navigation:close aria-label=\"Close dialog\"></md-icon></md-button></div></md-toolbar><md-dialog-content layout=column flex>AFFICHER PROGRESSION DES OBSERVATEURS<br>{{ observateurProgressCtrl.observateurs}}</md-dialog-content><md-dialog-actions layout=row><md-button class=\"md-raised md-primary\" style=margin-right:20px ng-click=observateurProgressCtrl.dialog.cancel()>Fermer</md-button></md-dialog-actions></md-dialog>"
  );


  $templateCache.put('modules/benevoles/views/observateurs.dashboard-card.html',
    "<md-card ng-click=observateursDashboardCardCtrl.handleClick($event) ng-show=\"observateursDashboardCardCtrl.nbObservateurs !== undefined\"><md-card-content flex layout=column layout-align=\"center center\" class=text-center><md-icon flex style=\"height:50; width:50px\" md-svg-icon=\"{{ BENEVOLES.ICONS.OBSERVATEUR }}\"></md-icon><div flex><div class=md-display-1>{{ observateursDashboardCardCtrl.nbObservateurs }}</div><ng-pluralize class=md-title count=observateursDashboardCardCtrl.nbObservateurs when=\"{'one': 'observateur',\n" +
    "	                     		 'other': 'observateurs'}\"></ng-pluralize></div></md-card-content></md-card>"
  );


  $templateCache.put('modules/contacts/views/contact.dialog.html',
    "<md-dialog aria-label=\"{{ contactDialogCtrl.contact._id ? 'Modification' : 'Nouveau contact' }}\" style=width:800px><form name=contactForm class=input-no-bottom-margin autocomplete=off novalidate ng-submit=\"contactDialogCtrl.submit(contactForm, contactDialogCtrl.contact)\"><md-toolbar><div class=md-toolbar-tools><h2>{{ contactDialogCtrl.contact._id ? 'Modification' : 'Nouveau contact' }}</h2><span flex></span><md-button class=md-icon-button ng-click=contactDialogCtrl.cancel()><md-icon md-svg-icon=navigation:close aria-label=\"Close dialog\"></md-icon></md-button></div></md-toolbar><md-dialog-content><div class=md-dialog-content><div layout=row flex><md-input-container class=md-block flex=45><label>Prénom</label><input name=firstname ng-model=contactDialogCtrl.contact.firstname required><div ng-messages=contactForm.firstname.$error><div ng-message=required>requis.</div></div></md-input-container><div flex=5></div><md-input-container class=md-block flex=50><label>Nom de famille</label><input name=lastname ng-model=contactDialogCtrl.contact.lastname required><div ng-messages=contactForm.lastname.$error><div ng-message=required>requis.</div></div></md-input-container></div><div layout=row flex><md-input-container ng-hide=contactDialogCtrl.addingPoste flex=45><label>Poste</label><md-select name=poste ng-model=contactDialogCtrl.contact.poste ng-model-options=\"{ updateOn: 'blur' }\" ng-required=!contactDialogCtrl.addingPoste><md-option ng-repeat=\"poste in contactDialogCtrl.postes\" ng-value=poste ng-selected=\"poste._id === contactDialogCtrl.contact.poste._id\">{{ poste.toString() }}</md-option></md-select><div ng-messages=contactForm.poste.$error><div ng-message=required>requis.</div></div></md-input-container><md-input-container ng-show=contactDialogCtrl.addingPoste flex=45><label style=margin-left:1px>Nouveau poste</label><input name=posteDescription focus-on=contactDialogCtrl.addingPoste ng-model=contactDialogCtrl.contact.posteDescription ng-required=contactDialogCtrl.addingPoste><div ng-messages=contactForm.posteDescription.$error><div ng-message=required>requis.</div></div></md-input-container><md-button style=\"margin:18px 0px\" flex=5 class=\"md-icon-button md-primary\" aria-label=Ajouter ng-click=contactDialogCtrl.switchPosteSelection(contactDialogCtrl.contact)><md-icon md-svg-icon=\"{{ 'content:' + (contactDialogCtrl.addingPoste ? 'clear' : 'add') }}\"></md-icon><md-tooltip>Ajouter</md-tooltip></md-button><md-input-container class=md-block flex=50 md-is-error=\"contactForm.email.$invalid && contactForm.$submitted\"><label>Courriel</label><input name=email email-validation ng-model=contactDialogCtrl.contact.email required><div ng-messages=contactForm.email.$error md-auto-hide=false><div ng-message=required>requis.</div><div ng-message=emailValidation>courriel invalide.</div></div></md-input-container></div></div></md-dialog-content><md-dialog-actions layout=row><md-button type=button class=md-warn ng-click=contactDialogCtrl.remove() ng-if=contactDialogCtrl.contact._id>Supprimer</md-button><span flex></span><md-button type=button ng-click=contactDialogCtrl.cancel()>Annuler</md-button><md-button type=submit class=\"md-primary md-raised\" style=margin-right:20px>{{ contactDialogCtrl.contact._id ? 'Sauvegarder' : 'Créer' }}</md-button></md-dialog-actions></form></md-dialog>"
  );


  $templateCache.put('modules/conversations/views/_conversation-side-nav.list.html',
    "<md-subheader class=md-no-sticky>{{ title }}</md-subheader><md-list-item class=md-2-line ui-sref-active=active ui-sref=\"conversation({conversationId: conversation._id})\" ng-repeat=\"conversation in conversations | limitTo : chunkSize\"><div class=md-list-item-text><h3>{{ conversation.getTitle() }}</h3></div><md-icon ng-show=conversation.hasNewMessages() class=md-accent md-svg-icon=action:announcement></md-icon><md-divider ng-if=!$last></md-divider></md-list-item><md-list-item ng-show=\"chunkSize < conversations.length\" class=plus><span class=md-caption ng-click=showMore()>plus</span></md-list-item>"
  );


  $templateCache.put('modules/conversations/views/_conversation.fiche.html',
    "<md-toolbar class=md-accent><div class=md-toolbar-tools><h2><span>{{ conversationFicheCtrl.conversation.getTitle() }}</span></h2><span flex></span><md-button class=md-icon-button aria-label=More><md-icon md-svg-icon=content:clear ng-click=conversationFicheCtrl.close()></md-icon></md-button></div></md-toolbar><md-content layout=column><div ng-hide=conversationFicheCtrl.conversation layout=row layout-align=\"center center\" layout-margin><md-progress-circular md-mode=indeterminate></md-progress-circular></div><md-card ng-show=conversationFicheCtrl.conversation layout=column><md-card-title style=\"min-height: 100px;heigth: 100px\"><md-card-title-media flex=30><img style=width:150px;heigth:150px src=http://nilofermerchant.com/wp-content/uploads/2009/09/HiRes-1024x785.jpg></md-card-title-media><md-card-title-text><span class=md-title>Participants</span><div layout=row layout-wrap><avatar user=participant ng-repeat=\"participant in conversationFicheCtrl.conversation.getParticipants()\"></avatar></div></md-card-title-text></md-card-title><md-card-content layout=column><conversation layout=column conversation=conversationFicheCtrl.conversation></conversation></md-card-content></md-card></md-content>"
  );


  $templateCache.put('modules/conversations/views/_conversation.form.html',
    "<md-dialog aria-label=\"Nouvelle conversation\"><form name=conversationForm ng-submit=conversationsSectionCtrl.summitForm(conversationForm) novalidate><md-toolbar><div class=md-toolbar-tools><h2>Nouvelle conversation</h2><span flex></span><md-button class=md-icon-button ng-click=conversationsSectionCtrl.cancel()><md-icon md-svg-icon=navigation:close aria-label=\"Close dialog\"></md-icon></md-button></div></md-toolbar><md-dialog-content><div class=md-dialog-content layout=column style=width:500px><md-input-container flex=60><label>Titre de la conversation</label><input name=title md-maxlength=50 required ng-model=conversation.title><ng-messages for=conversationForm.title.$error role=alert><ng-message when=md-maxlength>un peu trop long!</ng-message><ng-message when=required>requis.</ng-message></ng-messages></md-input-container><md-input-container flex=60><label>Permier message</label><input name=message required ng-model=conversation.message><ng-messages for=conversationForm.message.$error role=alert><ng-message when=required>requis.</ng-message></ng-messages></md-input-container></div></md-dialog-content><md-dialog-actions layout=row><md-button type=submit>Créer</md-button></md-dialog-actions></form></md-dialog>"
  );


  $templateCache.put('modules/conversations/views/conversation.card.html',
    "<md-card class=plage-card layout=column flex><md-card-title layout=column style=max-height:160px;height:160px;padding-bottom:0px><div layout=row layout-align=\"start center\"><div flex class=md-title>{{ conversation.toString() }}</div><md-button class=md-icon-button ng-if=\"conversation.type !== 'intervention'\" ng-click=ConversationCardCtrl.archive(conversation) ng-disabled=conversation.archived><md-icon md-svg-icon=content:archive></md-icon><md-tooltip>archiver</md-tooltip></md-button></div><div layout=row layout-align=\"start center\" layout-wrap layout-margin><avatar user=participant click-for-details-avatar ng-repeat=\"participant in conversationParticipants\"></avatar></div></md-card-title><md-divider style=margin-top:8px></md-divider><md-card-content flex layout=column><conversation conversation=conversation flex layout=column></conversation></md-card-content></md-card>"
  );


  $templateCache.put('modules/conversations/views/conversation.html',
    "<md-list layout=column flex><md-content flex layout=column><div layout=column ng-repeat=\"message in messages | orderBy : 'createdAt'\"><md-list-item class=md-2-line ng-style=\"$odd && {'background-color': 'white'}\" ng-mouseover=\"showOptions = true\" ng-mouseleave=\"showOptions = false\" ng-init=\"$last && scrollDown()\"><avatar user=conversationCtrl.getAuthor(message.author) no-role></avatar><div layout=row flex ng-if=message._id><div class=md-list-item-text layout=column flex><h3>{{ conversationCtrl.getAuthor(message.author).toString() }}</h3><p>{{ message.body }}</p></div><div flex=15><span class=md-caption ng-hide=\"message.currentUserIsAuthor() && showOptions\" style=padding-right:6px;line-height:23px>{{ message.createdAt.fromNow() }}</span><md-button class=md-icon-button aria-label=Supprimer style=margin:0px;padding:0px;min-height:23px;height:18px ng-show=\"message.currentUserIsAuthor() && showOptions\" ng-click=conversationCtrl.deleteMessage(message)><md-icon md-svg-icon=action:delete style=\"height: 16px\"></md-icon></md-button></div></div><form layout=row flex ng-if=\"message._id === undefined\" ng-submit=conversationCtrl.addMessage(message)><md-input-container md-no-float flex style=margin:0><input placeholder=\"Nouveau message\" ng-model=message.body autocomplete=off></md-input-container><div flex=15 layout=row layout-align=\"start center\"><md-menu md-position-mode=\"target-right target\"><md-button aria-label=\"Ajouter un attachement\" class=md-icon-button ng-click=$mdMenu.open($event)><md-icon md-menu-origin md-svg-icon=file:attachment></md-icon></md-button><md-menu-content width=4><md-menu-item ng-repeat=\"attachement in attachements\"><md-button ng-click=\"conversationCtrl.handleAttachementSelection(message, attachement)\"><div layout=row flex><p flex>{{ attachement.title }}</p><md-icon md-menu-align-target md-svg-icon=\"{{ attachement.icon }}\" style=\"margin: auto 3px auto 0\"></md-icon></div></md-button></md-menu-item></md-menu-content></md-menu><md-button class=\"md-icon-button md-primary\" aria-label=Ajouter type=submit ng-disabled=\"message.body === undefined || message.body.length === 0\"><md-icon md-svg-icon=content:send></md-icon></md-button></div></form></md-list-item><div ng-repeat=\"attachement in message.attachements\"><attachement attachement=attachement></attachement></div></div></md-content></md-list>"
  );


  $templateCache.put('modules/conversations/views/conversation.image.html',
    "<div layout-padding><img src=http://nilofermerchant.com/wp-content/uploads/2009/09/HiRes-1024x785.jpg></div>"
  );


  $templateCache.put('modules/conversations/views/conversations.section.html',
    "<div layout=row flex><div layout=column flex=30 flex-gt-lg=20><md-card><md-card-content><md-input-container md-no-float class=\"md-icon-float md-block no-errors-spacer\"><md-icon md-svg-icon=action:search></md-icon><input placeholder=recherche... input-clear ng-model=search.title ng-model-options=\"{ debounce: PARAMS.DEBOUNCE_TIME }\" ng-change=conversationsSectionCtrl.updateSearch(search)></md-input-container><md-switch aria-label=archivés ng-disabled=conversationsSectionCtrl.noArchives ng-model=search.archived ng-change=conversationsSectionCtrl.updateSearch(search)>archivés</md-switch></md-card-content></md-card><md-card flex><md-content flex><md-list section-list flex layout=column><md-list-item class=md-2-line ng-class=\"{ active:item._id === conversation._id }\" ng-repeat=\"item in conversationsSectionCtrl.conversations\" ng-click=conversationsSectionCtrl.showConversation(item)><div class=md-list-item-text style=padding-right:16px><md-truncate flex>{{ item.toString() }}</md-truncate></div><md-icon md-svg-icon=communication:message></md-icon><md-divider ng-if=!$last></md-divider></md-list-item></md-list></md-content></md-card></div><div flex=70 flex-gt-lg=80 layout=column><div layout=row flex layout-align=\"center center\" ng-hide=lodadingDone><md-progress-circular md-diameter=160 md-mode=indeterminate></md-progress-circular></div><conversation-card layout=column flex ng-if=\"lodadingDone && conversation\" conversation=conversation></conversation-card></div></div>"
  );


  $templateCache.put('modules/conversations/views/messages.dashboard-card.html',
    "<md-card ng-click=messagesDashboardCardCtrl.handleClick()><md-card-content flex layout=column layout-align=\"center center\" class=text-center><md-icon flex style=\"height:50; width:50px\" md-svg-icon=\"{{ MESSAGES.ICONS.MESSAGE }}\"></md-icon><div flex><div class=md-display-1 ng-if=messagesDashboardCardCtrl.nbNouveauxMessages>{{ messagesDashboardCardCtrl.nbNouveauxMessages }}</div><ng-pluralize class=md-title count=messagesDashboardCardCtrl.nbNouveauxMessages when=\"{'0': 'Aucun nouveau message',\n" +
    "	                     'one': 'nouveau message',\n" +
    "	                     'other': 'nouveaux messages'}\"></ng-pluralize></div></md-card-content></md-card>"
  );


  $templateCache.put('modules/conversations/views/new-message.toast.html',
    "<md-toast><avatar user=newMessageToastCtl.user></avatar><div layout=column flex><span>{{ newMessageToastCtl.subject }}</span> <span>{{ newMessageToastCtl.message.body }}</span></div><md-button ng-click=newMessageToastCtl.viewMessage(newMessageToastCtl.message)>Voir</md-button></md-toast>"
  );


  $templateCache.put('modules/conversations/views/nouveau-message.dialog.html',
    "<md-dialog aria-label=\"Nouveau message\" style=width:800px><form novalidate name=messageForm ng-submit=nouveauMessageCtrl.send(messageForm)><md-toolbar><div class=md-toolbar-tools><h2>Nouveau message</h2><span flex></span><md-button class=md-icon-button ng-click=nouveauMessageCtrl.cancel()><md-icon md-svg-icon=navigation:close aria-label=\"Close dialog\"></md-icon></md-button></div></md-toolbar><md-dialog-content><div class=md-dialog-content><md-contact-chips ng-model=nouveauMessageCtrl.message.destinataires name=destinataires md-contacts=nouveauMessageCtrl.searchDestinataires($query) md-contact-name=fullname md-contact-image=avatar md-require-match=true md-highlight-flags=i placeholder=Destinataire(s)></md-contact-chips><div ng-messages=messageForm.destinataires.$error><div ng-message=required>requis.</div></div><md-input-container class=md-block><label>Sujet</label><input name=subject ng-model=nouveauMessageCtrl.message.subject required><div ng-messages=messageForm.subject.$error><div ng-message=required>requis.</div></div></md-input-container><md-input-container class=md-block><label>Message</label><textarea name=body ng-model=nouveauMessageCtrl.message.body rows=5 required></textarea><div ng-messages=messageForm.body.$error><div ng-message=required>requis.</div></div></md-input-container></div></md-dialog-content><md-dialog-actions layout=row><md-button type=button ng-click=nouveauMessageCtrl.cancel()>Annuler</md-button><md-button type=submit class=\"md-primary md-raised\" style=margin-right:20px>Envoyer</md-button></md-dialog-actions></form></md-dialog>"
  );


  $templateCache.put('modules/core/views/hidden-input.html',
    "<div ng-init=\"showInput = false\"><div class=value ng-mouseover=\"showInput = !showInput\" ng-hide=showInput style=min-height:31px>{{ ngModel }}</div><md-input-container ng-show=showInput ng-mouseleave=\"showInput = !showInput\" layout=row layout-align=\"start center\"><input ng-model=ngModel name=\"{{ inputName }}\" aria-label=\"{{ inputName }}\"><md-icon md-svg-icon=editor:mode_edit></md-icon></md-input-container></div>"
  );


  $templateCache.put('modules/core/views/place.autocomplete.html',
    "<md-autocomplete ng-model-options=\"{ debounce: 500 }\" md-search-text=searchText md-items=\"item in querySearch(searchText)\" md-selected-item-change=selectedItemChange(item) md-item-text=item.properties.label><md-item-template><span md-highlight-text=searchText md-highlight-flags=^i>{{ item.properties.label }}</span></md-item-template><md-not-found>Aucun résultat n'a été trouvé.</md-not-found></md-autocomplete>"
  );


  $templateCache.put('modules/core/views/right-panel.html',
    "<md-sidenav class=\"md-sidenav-right md-whiteframe-4dp\" md-component-id=right-panel><md-toolbar class=md-theme-light><div class=md-toolbar-tools><md-button class=md-icon-button ng-click=closeSideNav() aria-label=Fermer><md-icon md-svg-icon=navigation:arrow_forward></md-icon></md-button><h1>{{ title }}</h1></div></md-toolbar><div layout=column flex><md-content layout=column flex ng-include=templateUrl></md-content></div></md-sidenav>"
  );


  $templateCache.put('modules/core/views/telephones-input.html',
    "<div layout=column><div layout=row flex layout-align=\"start end\"><label class=md-caption style=\"color: rgba(0,0,0,0.54);padding-bottom:1px\">{{ telephones.length > 1 ? 'Téléphones' : 'Téléphone' }}</label><md-button class=md-icon-button style=padding-bottom:0px;padding-top:18px aria-label=\"Ajout numéro\" ng-click=telephones.push({})><md-icon style=width:16px;height:16px md-svg-icon=content:add></md-icon></md-button></div><div layout=row flex ng-repeat=\"telephone in telephones\" class=no-margin><md-input-container class=md-block flex=60><input name=telephone aria-label=numéro ng-model=telephone.no ng-model-options=\"{ updateOn: 'blur' }\" ng-change=ngChange() ui-mask=999-999-9999 ng-disabled=ngDisabled></md-input-container><span flex=5></span><md-input-container class=md-block flex=20><label>Détails</label><input name=telephone ng-model=telephone.description ng-model-options=\"{ updateOn: 'blur' }\" ng-change=ngChange() ng-disabled=ngDisabled></md-input-container><md-button class=md-icon-button style=padding-top:0px aria-label=\"Suppression numéro\" ng-click=telephoneInputCtrl.removePhone($index)><md-icon style=width:16px;height:16px md-svg-icon=content:remove></md-icon></md-button></div></div>"
  );


  $templateCache.put('modules/dashboard/views/dashboard.html',
    "<md-content flex style=padding:8px class=layout-bg><md-grid-list md-cols-xs=2 md-cols-sm=4 md-cols-md=4 md-cols-gt-md=6 md-row-height=1:1 md-gutter=8px><md-grid-tile><interventions-dashboard-card></interventions-dashboard-card></md-grid-tile><md-grid-tile><messages-dashboard-card></messages-dashboard-card></md-grid-tile><md-grid-tile><benevoles-dashboard-card></benevoles-dashboard-card></md-grid-tile><md-grid-tile md-colspan-xs=2 md-colspan-sm=2><etablissements-dashboard-card></etablissements-dashboard-card></md-grid-tile><md-grid-tile><observateurs-dashboard-card></observateurs-dashboard-card></md-grid-tile></md-grid-list></md-content>"
  );


  $templateCache.put('modules/etablissements/views/etablissement.card.html',
    "<md-card layout=column flex><div class=card-header><div class=card-header-tools flex layout=row layout-align=\"end center\"><md-button class=md-icon-button ng-click=\"benevoleCardCtrl.deleteBenevole($event, benevole)\" ng-disabled=true><md-icon md-svg-icon=action:delete></md-icon><md-tooltip>Supprimer</md-tooltip></md-button></div><etablissement-map height=200px width=100% etablissement=etablissement></etablissement-map></div><div layout=column flex><md-tabs flex class=md-accent><md-tab label=activités layout-fill><div layout-padding layout=column flex ng-include=\"'modules/etablissements/views/etablissement.infos.html'\"></div></md-tab><md-tab label=Informations><div layout-padding layout=column flex><etablissement-form etablissement=etablissement auto-save=true></etablissement-form></div></md-tab><md-tab label=Contacts><div layout=row layout-align=\"end center\"><md-tab-action tooltip=\"Ajouter un contact\" icon=content:add ng-click=\"etablissementCardCtrl.addContact($event, etablissement)\"></md-tab-action></div><div layout-padding layout=column flex><md-list flex><md-list-item class=md-2-line ng-repeat=\"contact in etablissementCardCtrl.contacts\" ng-click=\"etablissementCardCtrl.detailsContact($event, contact)\"><avatar user=contact></avatar><div class=md-list-item-text layout=column><h3>{{ contact.toString() }}</h3><h4>{{ contact.poste.description }}</h4><md-icon md-svg-icon=communication:email class=md-secondary aria-label=\"Envois d'un message\" ng-click=\"etablissementCardCtrl.sendMessageToContact($event, contact)\"></md-icon></div></md-list-item></md-list></div></md-tab><md-tab label=Notes><div layout-padding layout=column flex style=\"margin-top: 16px\"><form name=etablissementNoteForm><md-input-container class=md-block><label>Notes administratives</label><textarea ng-model=etablissement.notes.admin ng-model-options=\"{ updateOn: 'blur' }\" ng-change=etablissementCardCtrl.saveEtablissement(etablissementNoteForm) keep-line-breaks></textarea></md-input-container><md-input-container class=md-block><label>Notes publiques</label><textarea ng-model=etablissement.notes.public ng-model-options=\"{ updateOn: 'blur' }\" ng-change=etablissementCardCtrl.saveEtablissement(etablissementNoteForm) keep-line-breaks></textarea></md-input-container></form></div></md-tab></md-tabs></div></md-card>"
  );


  $templateCache.put('modules/etablissements/views/etablissement.form.html',
    "<ng-form name=etablissementForm auto-save-form=autoSave novalidate><div layout=row flex layout-align=\"start start\" style=\"margin-top: 16px\" ng-init=\"addingType = false\"><md-input-container class=md-block flex><label>Nom</label><input name=name ng-model=etablissement.name ng-model-options=\"{ updateOn: 'blur' }\" ng-change=etablissementFormCtrl.saveEtablissement(etablissementForm) ng-disabled=disabledForm required><div ng-messages=etablissementForm.name.$error><div ng-message=required>requis.</div></div></md-input-container><span flex=5></span><md-input-container ng-hide=addingType flex=45><label>Type d'établissement</label><md-select name=etablissementType ng-model=etablissement.type ng-change=etablissementFormCtrl.saveEtablissement(etablissementForm) ng-disabled=disabledForm ng-required=!addingType><md-option ng-repeat=\"type in etablissementFormCtrl.etablissementTypes\" ng-value=type ng-selected=\"type._id === etablissement.type._id\">{{ type.toString() }}</md-option></md-select><div ng-messages=etablissementForm.etablissementType.$error><div ng-message=required>requis.</div></div></md-input-container><md-input-container ng-show=addingType flex=45><label style=margin-left:1px>Nouveau type d'établissement</label><input name=typeDescription focus-on=addingType ng-model=etablissement.typeDescription ng-model-options=\"{ updateOn: 'blur' }\" ng-change=etablissementFormCtrl.saveEtablissement(etablissementForm) ng-required=addingType><div ng-messages=etablissementForm.typeDescription.$error><div ng-message=required>requis.</div></div></md-input-container><md-button style=\"margin-top:18px; margin-left:0px\" flex=5 class=\"md-icon-button md-primary\" aria-label=Ajouter ng-disabled=disabledForm ng-click=etablissementFormCtrl.toggleAddingType()><md-icon md-svg-icon=\"{{ 'content:' + (addingType ? 'clear' : 'add') }}\"></md-icon><md-tooltip>Ajouter</md-tooltip></md-button></div><div layout=row flex layout-align=\"start start\"><md-input-container class=md-block flex><label>Adresse</label><input name=adresse ng-model=etablissement.address.street ng-model-options=\"{ updateOn: 'blur' }\" ng-change=etablissementFormCtrl.saveEtablissement(etablissementForm) ng-disabled=disabledForm required><div ng-messages=etablissementForm.adresse.$error><div ng-message=required>requis.</div></div></md-input-container><span flex=5></span><md-input-container ng-hide=addingCommission flex=45><label>Commission Scolaire</label><md-select name=commissionScolaire ng-model=etablissement.commissionScolaire ng-change=etablissementFormCtrl.saveEtablissement(etablissementForm) ng-disabled=disabledForm><md-option ng-repeat=\"commissionScolaire in etablissementFormCtrl.commissionsScolaires\" ng-value=commissionScolaire ng-selected=\"commissionScolaire._id === etablissement.commissionScolaire._id\">{{ commissionScolaire.toString() }}</md-option></md-select><div ng-messages=etablissementForm.commissionScolaire.$error><div ng-message=required>requis.</div></div></md-input-container><md-input-container ng-show=addingCommission flex=45><label style=margin-left:1px>Nouvelle commission scolaire</label><input name=typeDescription focus-on=addingCommission ng-model=etablissement.commissionDescription ng-model-options=\"{ updateOn: 'blur' }\" ng-change=etablissementFormCtrl.saveEtablissement(etablissementForm)><div ng-messages=etablissementForm.typeDescription.$error><div ng-message=required>requis.</div></div></md-input-container><md-button style=\"margin-top:18px; margin-left:0px\" flex=5 class=\"md-icon-button md-primary\" aria-label=Ajouter ng-disabled=disabledForm ng-click=etablissementFormCtrl.toggleAddingCommission()><md-icon md-svg-icon=\"{{ 'content:' + (addingCommission ? 'clear' : 'add') }}\"></md-icon><md-tooltip>Ajouter</md-tooltip></md-button></div><div layout=row flex layout-align=\"start start\"><md-input-container flex=45><label>Ville</label><md-select name=ville ng-model=etablissement.address.city ng-change=etablissementFormCtrl.saveEtablissement(etablissementForm) ng-disabled=disabledForm required><md-option ng-repeat=\"ville in etablissementFormCtrl.villes\" ng-value=ville ng-selected=\"ville._id === etablissement.address.city._id\">{{ ville.toString() }}</md-option></md-select><div ng-messages=etablissementForm.ville.$error><div ng-message=required>requis.</div></div></md-input-container><span flex=5></span><md-input-container flex=45><label>Province</label><md-select name=province ng-model=etablissement.address.province ng-change=etablissementFormCtrl.saveEtablissement(etablissementForm) ng-disabled=disabledForm required><md-option ng-repeat=\"province in etablissementFormCtrl.provinces\" ng-value=province ng-selected=\"province._id === etablissement.address.province._id\">{{ province.toString() }}</md-option></md-select><div ng-messages=etablissementForm.province.$error><div ng-message=required>requis.</div></div></md-input-container><span flex=5></span><md-input-container class=md-block flex=15><label>Code Postal</label><input name=postalCode ng-model=etablissement.address.postalCode ng-model-options=\"{ updateOn: 'blur' }\" ng-change=etablissementFormCtrl.saveEtablissement(etablissementForm) ui-mask=\"A9A 9A9\" ng-disabled=disabledForm required><div ng-messages=etablissementForm.postalCode.$error><div ng-message=required>requis.</div></div></md-input-container><span flex=5></span></div><telephone-input flex=50 ng-model=etablissement.telephones ng-disabled=disabledForm ng-change=etablissementFormCtrl.saveEtablissement(etablissementForm)></telephone-input></ng-form>"
  );


  $templateCache.put('modules/etablissements/views/etablissement.infos.html',
    "<div layout=row flex><div flex=60></div><div class=md-whiteframe-1dp flex=40><md-toolbar><div class=md-toolbar-tools><h2>Récent</h2></div></md-toolbar><md-list><md-list-item class=md-2-line><md-icon md-svg-icon=communication:message></md-icon><div class=md-list-item-text><h3>Qqchose</h3><p>description</p></div><md-divider></md-divider></md-list-item><md-list-item class=md-2-line><md-icon md-svg-icon=content:add></md-icon><div class=md-list-item-text><h3>Qqchose</h3><p>description</p></div><md-divider></md-divider></md-list-item><md-list-item class=md-2-line><md-icon md-svg-icon=communication:message></md-icon><div class=md-list-item-text><h3>Qqchose</h3><p>description</p></div><md-divider></md-divider></md-list-item><md-list-item class=md-2-line><md-icon md-svg-icon=communication:message></md-icon><div class=md-list-item-text><h3>Qqchose</h3><p>description</p></div><md-divider></md-divider></md-list-item><md-list-item class=md-2-line><md-icon md-svg-icon=communication:message></md-icon><div class=md-list-item-text><h3>Qqchose</h3><p>description</p></div></md-list-item></md-list></div></div>"
  );


  $templateCache.put('modules/etablissements/views/etablissements.dashboard-card.html',
    "<md-card ng-click=etablissementsDashboardCardCtrl.handleClick($event)><md-card-content flex layout=column layout-align=\"center center\" class=text-center><md-icon flex style=\"height:50; width:50px\" md-svg-icon=\"{{ ETABLISSEMENTS.ICONS.ETABLISSEMENT }}\"></md-icon><div flex><div class=md-display-1 ng-if=etablissementsDashboardCardCtrl.nbEtablissements>{{ etablissementsDashboardCardCtrl.nbEtablissements }}</div><ng-pluralize class=md-title count=etablissementsDashboardCardCtrl.nbEtablissements when=\"{'0': 'Ajouter un établissement',\n" +
    "	                     'one': '1 établissement',\n" +
    "	                     'other': 'établissements'}\"></ng-pluralize></div></md-card-content></md-card>"
  );


  $templateCache.put('modules/etablissements/views/etablissements.section.html',
    "<div layout=row flex><div layout=column flex=30 flex-gt-lg=20><md-card><md-card-content><md-input-container md-no-float class=\"md-icon-float md-block no-errors-spacer\"><md-icon md-svg-icon=action:search></md-icon><input placeholder=recherche... input-clear ng-model=search.etablissementName ng-model-options=\"{ debounce: PARAMS.DEBOUNCE_TIME }\" ng-change=etablissementsSectionCtrl.updateSearch(search)></md-input-container></md-card-content></md-card><md-card flex><md-content flex><md-list section-list flex layout=column><md-list-item class=md-2-line ng-class=\"{ active:item._id === etablissement._id }\" ng-repeat=\"item in etablissementsSectionCtrl.etablissements\" ng-click=etablissementsSectionCtrl.showEtablissement(item)><div class=md-list-item-text><h3>{{ item.toString() }}</h3><p>{{ item.type.name }}</p></div><md-divider ng-if=!$last></md-divider></md-list-item></md-list></md-content></md-card></div><div flex=70 flex-gt-lg=80 layout=column><div layout=row flex layout-align=\"center center\" ng-hide=lodadingDone><md-progress-circular md-diameter=160 md-mode=indeterminate></md-progress-circular></div><etablissement-card ng-if=\"lodadingDone && etablissement\" flex layout=column etablissement=etablissement></etablissement-card></div></div>"
  );


  $templateCache.put('modules/etablissements/views/nouvel-etablissement.dialog.html',
    "<md-dialog aria-label=\"Nouvel établissement\" style=width:800px><form novalidate name=form class=input-no-bottom-margin ng-submit=\"nouvelEtablissementCtrl.create(form, etablissement)\"><md-toolbar><div class=md-toolbar-tools><h2>Nouvel établissement</h2><span flex></span><md-button class=md-icon-button ng-click=nouvelEtablissementCtrl.dialog.cancel()><md-icon md-svg-icon=navigation:close aria-label=\"Close dialog\"></md-icon></md-button></div></md-toolbar><md-dialog-content layout=column flex><div layout=column flex class=md-dialog-content><place-autocomplete class=\"no-margin no-padding\" ng-model=place md-floating-label=Recherche></place-autocomplete><md-tabs layout=column flex md-dynamic-height md-border-bottom><md-tab layout=column flex label=Informations><etablissement-form etablissement=etablissement ng-disabled=\"place === undefined\"></etablissement-form></md-tab><md-tab label=carte><etablissement-map height=400px width=100% etablissement=etablissement></etablissement-map></md-tab></md-tabs></div></md-dialog-content><md-dialog-actions layout=row><md-button type=button ng-click=nouvelEtablissementCtrl.dialog.cancel()>Annuler</md-button><md-button type=submit class=\"md-primary md-raised\" style=margin-right:20px>Créer</md-button></md-dialog-actions></form></md-dialog>"
  );


  $templateCache.put('modules/events/views/mini-calendar.html',
    "<dashboard-card><dashboard-card-header layout=row layout-align=\"start center\"><md-button aria-label=\"Jour précédent\" class=md-icon-button ng-click=miniCalendarCtrl.previousDay()><md-icon md-svg-icon=navigation:chevron_left></md-icon></md-button><span flex><h3 class=text-center>{{ miniCalendarCtrl.date.calendar(null, miniCalendarCtrl.calendarOptions) }}</h3></span><md-button aria-label=\"Jour suivant\" class=md-icon-button ng-click=miniCalendarCtrl.nextDay()><md-icon md-svg-icon=navigation:chevron_right></md-icon></md-button></dashboard-card-header><dashboard-card-content><div bc-flickity=\"{{ miniCalendarCtrl.flickityOptions }}\" id=calendarList><div style=width:470px><md-progress-circular md-mode=indeterminate ng-show=miniCalendarCtrl.list1.loading></md-progress-circular><md-list ng-show=!miniCalendarCtrl.list1.loading><md-list-item ng-repeat=\"event in miniCalendarCtrl.list1.events\" ng-click=\"miniCalendarCtrl.selectEvent($event, event)\"><div flex=20 layout=row><div class=md-display-1>{{ event.date.start.hour() }}</div><div class=md-subhead>{{ event.date.start.format('mm') }}</div></div><div flex layout=column><div class=md-subhead>{{ event.description }}</div><div class=md-caption>{{ event.type }}</div></div><md-icon ng-if=event.stateIcon md-svg-icon=\"{{ event.stateIcon }}\"></md-icon></md-list-item></md-list></div><div style=width:470px><md-progress-circular md-mode=indeterminate ng-show=miniCalendarCtrl.list2.loading></md-progress-circular><md-list ng-show=!miniCalendarCtrl.list2.loading><md-list-item ng-repeat=\"event in miniCalendarCtrl.list2.events\" ng-click=\"miniCalendarCtrl.selectEvent($event, event)\"><div flex=20 layout=row><div class=md-display-1>{{ event.date.start.hour() }}</div><div class=md-subhead>{{ event.date.start.format('mm') }}</div></div><div flex layout=column><div class=md-subhead>{{ event.description }}</div><div class=md-caption>{{ event.type }}</div></div><md-icon ng-if=event.stateIcon md-svg-icon=\"{{ event.stateIcon }}\"></md-icon></md-list-item></md-list></div><div style=width:470px><md-progress-circular md-mode=indeterminate ng-show=miniCalendarCtrl.list3.loading></md-progress-circular><md-list ng-show=!miniCalendarCtrl.list3.loading><md-list-item ng-repeat=\"event in miniCalendarCtrl.list3.events\" ng-click=\"miniCalendarCtrl.selectEvent($event, event)\"><div flex=20 layout=row><div class=md-display-1>{{ event.date.start.hour() }}</div><div class=md-subhead>{{ event.date.start.format('mm') }}</div></div><div flex layout=column><div class=md-subhead>{{ event.description }}</div><div class=md-caption>{{ event.type }}</div></div><md-icon ng-if=event.stateIcon md-svg-icon=\"{{ event.stateIcon }}\"></md-icon></md-list-item></md-list></div></div></dashboard-card-content></dashboard-card>"
  );


  $templateCache.put('modules/interventions/views/add-participant.dialog.html',
    "<md-dialog aria-label=\"Ajout d'un participant\" style=width:500px><form name=addParticipantForm ng-submit=\"addParticipantCtrl.add(addParticipantForm, message)\"><md-dialog-content><div class=md-dialog-content><div style=margin-bottom:30px;padding:2px><md-autocomplete md-delay=500 md-search-text=searchText md-selected-item-change=addParticipantCtrl.selectedItemChange(item) md-items=\"item in addParticipantCtrl.search(searchText)\" md-item-text=item.toString() md-min-length=2 placeholder=recherche... md-menu-class=autocomplete-search-template><md-item-template><div class=item-title layout=row layout-align=\"start center\"><avatar user=item no-role></avatar><span layout=column><div class=md-subhead style=\"line-height: 25px\">{{ item.toString() }}</div></span></div></md-item-template></md-autocomplete></div><md-input-container class=md-block><label>Message</label><textarea ng-model=message.body rows=5></textarea></md-input-container></div></md-dialog-content><md-dialog-actions layout=row><md-button type=button ng-click=addParticipantCtrl.dialog.cancel()>annuler</md-button><md-button type=submit class=\"md-primary md-raised\">ajouter</md-button></md-dialog-actions></form></md-dialog>"
  );


  $templateCache.put('modules/interventions/views/intervention.card.html',
    "<md-card><form name=interventionForm><md-card-title><div class=md-headline layout=row layout-align=\"start center\"><div class=value ng-mouseover=\"showStart = true\" ng-hide=showStart>{{ intervention.getDateRange().start.format('H:mm') }}</div><md-input-container ng-show=showStart layout=row layout-align=\"start center\" ng-mouseleave=interventionCardCtrl.setStartDate()><input type=time step=60 aria-label=start ng-model=interventionCardCtrl.start></md-input-container>&nbsp-&nbsp<div class=value ng-mouseover=\"showEnd = true\" ng-hide=showEnd>{{ intervention.getDateRange().end.format('H:mm') }}</div><md-input-container ng-show=showEnd ng-mouseleave=interventionCardCtrl.setEndDate() layout=row layout-align=\"start center\"><input type=time step=60 aria-label=end name=end ng-model=interventionCardCtrl.end></md-input-container></div><span flex></span><md-button class=md-icon-button ng-click=\"interventionCardCtrl.saveIntervention($event, interventionForm)\" ng-disabled=\"!interventionForm.$dirty || interventionForm.$invalid\"><md-icon md-svg-icon=content:save></md-icon><md-tooltip>Sauvegarde</md-tooltip></md-button><md-button class=md-icon-button ng-class=\"{ 'md-primary': intervention.isBooked() }\" ng-click=interventionCardCtrl.bookIntervention() ng-disabled=\"intervention.isBooked() || interventionCardCtrl.participants.length === 0\"><md-icon md-svg-icon=\"{{ intervention.isBooked() ? 'action:lock' : 'action:lock_open' }}\"></md-icon><md-tooltip>Fermer</md-tooltip></md-button><md-button class=md-icon-button ng-click=\"interventionCardCtrl.removeIntervention($event, $index, intervention)\" ng-disabled=true><md-icon md-svg-icon=action:delete></md-icon><md-tooltip>Supprimer</md-tooltip></md-button></md-card-title><md-chips ng-model=interventionCardCtrl.tags md-autocomplete-snap md-separator-key=interventionCardCtrl.chipSeparatorKeys md-transform-chip=interventionCardCtrl.transformChip($chip) md-on-remove=interventionCardCtrl.removeChip($chip)><md-autocomplete md-selected-item=selectedItem md-search-text=searchText md-items=\"tag in interventionCardCtrl.searchTags(searchText)\" md-item-text=tag.name placeholder=\"Ajout mot clef\"><span md-highlight-text=searchText>{{ tag.toString() }}</span></md-autocomplete><md-chip-template><span><strong>{{ $chip.toString() }}</strong></span></md-chip-template></md-chips><md-card-content layout=column layout-gt-xs=row><div layout=column flex-gt-xs=50><div class=hidden-input-group layout=row><div><div>local:</div><div>responsable:</div><div>lieu de rencontre:</div></div><div><hidden-input ng-model=intervention.local></hidden-input><hidden-input ng-model=intervention.responsableGroupe></hidden-input><hidden-input ng-model=intervention.lieuRencontre></hidden-input></div></div><md-card><md-toolbar><div class=md-toolbar-tools><h2 class=md-subhead><div>Bénévoles participants</div></h2><span flex></span><div class=toolbar-fab-buttons><md-button class=\"md-fab md-mini\" aria-label=\"Suppression bénévole\" ng-show=showGarbage id=garbage ng-mouseover=interventionCardCtrl.removeParticipant()><md-icon md-svg-icon=action:delete dnd-list=[] dnd-drop=interventionCardCtrl.droppedInGarbage(item)></md-icon></md-button><md-button class=\"md-fab md-mini\" aria-label=\"Ajout bénévole\" ng-click=interventionCardCtrl.addParticipant($event)><md-icon md-svg-icon=content:add></md-icon></md-button></div></div></md-toolbar><div class=benevole-list layout=row layout-wrap layout-margin dnd-list=interventionCardCtrl.participants dnd-allowed-types=[intervention._id] dnd-drop=interventionCardCtrl.droppedInParticipants(item)><participant-avatar ng-repeat=\"benevole in interventionCardCtrl.participants\" benevole=benevole intervention=intervention show-status dnd-dragstart=interventionCardCtrl.toogleGarbage(true) dnd-dragend=interventionCardCtrl.toogleGarbage(false) dnd-draggable=benevole dnd-type=intervention._id dnd-moved=\"interventionCardCtrl.participants.splice($index, 1)\" dnd-effect-allowed=move></participant-avatar></div></md-card></div><md-card flex-gt-xs=50><md-toolbar><div class=md-toolbar-tools><h2 class=md-subhead><div>Bénévoles intéressés</div></h2></div></md-toolbar><md-content class=benevole-list layout=row layout-wrap layout-margin dnd-list=interventionCardCtrl.interested dnd-allowed-types=[intervention._id] dnd-drop=interventionCardCtrl.droppedInInterested(item)><participant-avatar ng-repeat=\"benevole in interventionCardCtrl.interested\" benevole=benevole intervention=intervention dnd-draggable=benevole dnd-type=intervention._id dnd-moved=\"interventionCardCtrl.interested.splice($index, 1)\" dnd-effect-allowed=move></participant-avatar></md-content></md-card></md-card-content></form></md-card>"
  );


  $templateCache.put('modules/interventions/views/intervention.message-attachement.html',
    "<md-card><md-card-title><md-card-title-text><span class=md-headline>{{ etablissement.name }}</span> <span class=md-subhead>{{ plage.date.format('[le] dddd DD MMMM YYYY') }}</span> <span class=md-subhead>De {{ intervention.date.start.format('LT') }} à {{ intervention.date.end.format('LT') }}</span></md-card-title-text><md-card-actions layout=row layout-align=\"end center\"><md-button>décliner</md-button><md-button class=md-primary>participer</md-button></md-card-actions></md-card-title></md-card>"
  );


  $templateCache.put('modules/interventions/views/interventions.dashboard-card.html',
    "<md-card ng-click=interventionsDashboardCardCtrl.handleClick($event)><md-card-content flex layout=column layout-align=\"center center\" class=text-center><md-icon flex style=\"height:50; width:50px\" md-svg-icon=\"{{ INTERVENTIONS.ICONS.PLAGE }}\"></md-icon><div flex><div class=md-display-1 style=margin-right:8px ng-if=interventionsDashboardCardCtrl.nbInterventions>{{ interventionsDashboardCardCtrl.nbInterventions }}</div><ng-pluralize class=md-title count=interventionsDashboardCardCtrl.nbInterventions when=\"{'0': 'Ajouter une intervention',\n" +
    "													'one': 'plage d\\'intervention à venir',\n" +
    "													'other': 'plages d\\'intervention à venir'}\"></ng-pluralize></div></md-card-content></md-card>"
  );


  $templateCache.put('modules/interventions/views/nouvelle-plage-intervention.dialog.html',
    "<md-dialog aria-label=\"Nouvelle plage d'intervention\" style=width:800px><form novalidate name=plageForm ng-submit=\"nouvellePlageCtrl.create(plageForm, plage)\"><md-toolbar><div class=md-toolbar-tools><h2>Nouvelle plage d'intervention</h2><span flex></span><md-button class=md-icon-button ng-click=nouvellePlageCtrl.cancel()><md-icon md-svg-icon=navigation:close aria-label=\"Close dialog\"></md-icon></md-button></div></md-toolbar><md-dialog-content><div layout=column class=md-dialog-content><md-datepicker name=date md-placeholder=Date ng-model=plage.date required><div ng-messages=plageForm.date.$error><div ng-message=required>requis.</div></div></md-datepicker><md-input-container flex=40><label>Établissement</label><md-select name=etablissement ng-model=plage.etablissement ng-change=nouvellePlageCtrl.setContacts(plage.etablissement) required><md-option ng-repeat=\"etablissement in nouvellePlageCtrl.etablissements\" ng-value=etablissement._id ng-selected=\"etablissement._id === plage.etablissement\">{{ etablissement.toString() }}</md-option></md-select><ng-messages for=plageForm.etablissement.$error><ng-message when=required>requis.</ng-message></ng-messages></md-input-container><md-input-container flex=40><label>Contact</label><md-select name=contact ng-model=plage.contact><md-option ng-repeat=\"contact in nouvellePlageCtrl.contacts\" ng-value=contact._id ng-selected=\"contact._id === plage.contact\">{{ contact.toString() }}</md-option></md-select></md-input-container></div></md-dialog-content><md-dialog-actions layout=row><md-button type=button ng-click=nouvellePlageCtrl.cancel()>Annuler</md-button><md-button type=submit class=\"md-primary md-raised\" style=margin-right:20px>Créer</md-button></md-dialog-actions></form></md-dialog>"
  );


  $templateCache.put('modules/interventions/views/plage-intervention.fiche.html',
    "<md-card layout=column flex><div layout=column layout-padding class=card-header><div layout=row><span flex></span><md-button class=md-icon-button ng-click=\"benevoleCardCtrl.deleteBenevole($event, benevole)\" ng-disabled=true><md-icon md-svg-icon=action:delete></md-icon><md-tooltip>Supprimer</md-tooltip></md-button></div><span flex></span><div layout=row class=fiche-title-over-custom-tabs><div layout=column layout-align=\"center start\"><span class=md-title>{{ plageFicheCtrl.plage.etablissement.toString() }}</span><div class=md-subhead layout=row layout-align=\"start center\"><md-icon ng-if=plageFicheCtrl.plage.isUrgent() class=md-warn md-svg-icon=alert:warning><md-tooltip>urgence</md-tooltip></md-icon><div layout=row layout-align=\"start center\" style=margin-top:10px><span>{{ plageFicheCtrl.plage.date.fromNow() }}</span><div ng-if=plageFicheCtrl.plage.contactNotified layout=row layout-align=\"start center\">&nbsp<md-icon class=md-primary md-svg-icon=action:check_circle></md-icon>&nbsp <span style=\"color: rgba(0,0,0,0.54)\">Contact nofifié</span></div></div></div></div></div></div><div layout=column flex><md-tabs flex class=md-accent><md-tab label=Interventions layout-fill><md-tab-body><div layout=row layout-align=\"end center\"><md-tab-action tooltip=\"Ajouter une intervention\" icon=content:add ng-click=plageFicheCtrl.addIntervention()></md-tab-action></div><md-content flex style=height:100% class=layout-bg><intervention-card class=plage-card ng-repeat=\"intervention in plageFicheCtrl.interventions\"></intervention-card></md-content></md-tab-body></md-tab><md-tab label=Conversation layout-fill ng-if=plageFicheCtrl.conversation.hasParticipants()><md-tab-body><div class=layout-bg layout=column flex><conversation-card conversation=plageFicheCtrl.conversation></conversation-card></div></md-tab-body></md-tab><md-tab label=Infos layout-fill><md-tab-body><md-content flex class=layout-bg><md-card class=plage-card><md-card-title><div class=md-title>Plage d'intervention</div></md-card-title><md-card-content><div class=hidden-input-group layout=row><div><div>date de création:</div><div>créé par:</div><div>personne contact:</div></div><div><div>{{ plageFicheCtrl.plage.createdAt.format('LL') }}</div><div>{{ plageFicheCtrl.plage.createdBy }}</div><div>{{ plageFicheCtrl.plage.contact.toString() }}</div></div></div></md-card-content></md-card></md-content></md-tab-body></md-tab></md-tabs></div></md-card>"
  );


  $templateCache.put('modules/interventions/views/plages-interventions.section.html',
    "<plage-intervention-section layout=row flex><div layout=column flex=30 flex-gt-lg=20><md-card><md-card-content><div layout=row class=date-filters><div layout=column flex style=position:relative><label class=md-caption>De</label><md-datepicker ng-model=search.date.start ng-change=plagesInterventionsSectionCtrl.updateSearch(search)></md-datepicker></div><div layout=column flex style=position:relative><label class=md-caption>À</label><md-datepicker ng-model=search.date.end ng-change=plagesInterventionsSectionCtrl.updateSearch(search)></md-datepicker></div></div><md-input-container md-no-float class=\"md-icon-float md-block no-errors-spacer\"><md-icon md-svg-icon=action:search></md-icon><input placeholder=recherche... input-clear ng-model=search.etablissementName ng-model-options=\"{ debounce: PARAMS.DEBOUNCE_TIME }\" ng-change=plagesInterventionsSectionCtrl.updateSearch(search)></md-input-container></md-card-content></md-card><md-card flex><md-content flex><md-list section-list flex layout=column><md-list-item class=md-2-line ng-class=\"{ active:item._id === plage._id }\" ng-repeat=\"item in plagesInterventionsSectionCtrl.plages\" ng-click=plagesInterventionsSectionCtrl.showPlage(item)><div class=md-list-item-text><h3>{{ item.etablissement.toString() }}</h3><p>{{ item.date.format('dddd DD MMMM YYYY') }}</p></div><md-icon ng-if=item.isUrgent() class=md-warn md-svg-icon=alert:warning><md-tooltip>urgence</md-tooltip></md-icon><md-icon ng-if=item.contactNotified class=md-primary md-svg-icon=action:check_circle><md-tooltip>contact notifié</md-tooltip></md-icon><md-icon ng-class=\"{ 'md-primary': item.isBooked() }\" md-svg-icon=\"{{ item.isBooked() ? 'action:lock' : 'action:lock_open' }}\"><md-tooltip>{{ item.isBooked() ? 'fermée' : 'ouverte' }}</md-tooltip></md-icon><md-divider ng-if=!$last></md-divider></md-list-item></md-list></md-content></md-card></div><div flex=70 flex-gt-lg=80 layout=column><div layout=row flex layout-align=\"center center\" ng-hide=lodadingDone><md-progress-circular md-diameter=160 md-mode=indeterminate></md-progress-circular></div><plage-intervention-fiche ng-if=\"lodadingDone && plage\" flex layout=column plage=plage></plage-intervention-fiche></div></plage-intervention-section>"
  );


  $templateCache.put('modules/interventions/views/remove-intervention.dialog.html',
    "<md-dialog aria-label=\"Suppression d'une intervention\" style=width:500px><form name=form novalidate ng-submit=\"removeInterventionDialogCtrl.remove(form, reason)\"><md-dialog-content><div class=md-dialog-content><h3>Suppression de {{ removeInterventionDialogCtrl.intervention.toString() }}</h3><md-input-container class=md-block><label>Raison</label><textarea name=reason ng-model=reason rows=5 required></textarea><div class=hint>Sera envoyé aux bénévoles</div><div ng-messages=form.reason.$error ng-if=!showHints><div ng-message=required>Ce champ est requis.</div></div></md-input-container></div></md-dialog-content><md-dialog-actions layout=row><md-button type=button ng-click=removeInterventionDialogCtrl.dialog.cancel()>annuler</md-button><md-button type=submit class=md-primary>ajouter</md-button></md-dialog-actions></form></md-dialog>"
  );


  $templateCache.put('modules/interventions/views/urgent-interventions.card.html',
    "<dashboard-card><dashboard-card-header><h3 class=text-center flex>Urgences</h3></dashboard-card-header><dashboard-card-content><md-list><md-list-item ng-repeat=\"intervention in urgentInterventionsCardCtrl.interventions\" ng-click=urgentInterventionsCardCtrl.showDetails(intervention)><div flex=20 layout=row ng-init=\"dateRange = intervention.getDateRange()\"><div class=md-display-1>{{ dateRange.start.hour() }}</div><div class=md-subhead>{{ dateRange.start.format('mm') }}</div></div><div flex layout=column><div class=md-subhead>{{ intervention.toString() }}</div><div class=md-caption>intervention</div></div><md-icon md-svg-icon=alert:warning></md-icon></md-list-item></md-list></dashboard-card-content></dashboard-card>"
  );


  $templateCache.put('modules/navigation/views/fab-speed-dial.html',
    "<md-fab-speed-dial md-direction=up class=md-fling ng-cloak><md-fab-trigger><md-button aria-label=menu class=md-fab><md-icon md-svg-icon=content:add></md-icon></md-button></md-fab-trigger><md-fab-actions><md-button ng-repeat=\"item in fabSeedDialCtrl.items\" ng-click=\"fabSeedDialCtrl.handleClick($event, item)\" aria-label=\"{{ item.tooltip }}\" class=\"md-fab md-raised md-mini\"><md-tooltip md-direction=left>{{ item.tooltip }}</md-tooltip><md-icon md-svg-icon=\"{{ item.icon }}\"></md-icon></md-button></md-fab-actions></md-fab-speed-dial>"
  );


  $templateCache.put('modules/navigation/views/sidenav.html',
    "<md-sidenav flex layout=column class=md-sidenav-left md-component-id=sidenav md-is-locked-open=\"$mdMedia('gt-md')\" md-disable-backdrop md-whiteframe=4><md-toolbar style=\"min-height: 160px\"><div layout=row layout-align=\"start center\"><md-menu><md-button aria-label=Options class=md-icon-button ng-click=$mdMenu.open($event)><md-icon class=md-accent md-svg-icon=navigation:more_vert></md-icon></md-button><md-menu-content width=4><md-menu-item><md-button ng-click=sideNavCtrl.showNotifications()><div layout=row><p flex>Notifications</p><md-icon md-menu-align-target md-svg-icon=social:notifications></md-icon></div></md-button></md-menu-item><md-menu-item><md-button ng-click=sideNavCtrl.showProfil()><div layout=row><p flex>Profil</p><md-icon md-menu-align-target md-svg-icon=action:account_circle></md-icon></div></md-button></md-menu-item><md-menu-item><md-button ng-click=sideNavCtrl.logout()><div layout=row><p flex>Déconnexion</p><md-icon md-menu-align-target md-svg-icon=action:exit_to_app></md-icon></div></md-button></md-menu-item></md-menu-content></md-menu><h3 flex class=md-subhead>Gestigris - Administration</h3></div><div layout=row layout-align=\"start center\" class=md-padding><avatar user=currentUser></avatar><div flex class=md-padding>{{ currentUser.toString() }}</div></div></md-toolbar><md-content layout=column md-scroll-y flex><md-list><md-list-item ui-sref-active=active ui-sref=benevoles ng-click=sidenavCtrl.closeSidenav()><p>Bénévoles</p></md-list-item><md-divider></md-divider><md-list-item ui-sref-active=active ui-sref=interventions ng-click=sidenavCtrl.closeSidenav()><p>Interventions</p></md-list-item></md-list></md-content></md-sidenav>"
  );


  $templateCache.put('modules/navigation/views/toolbar.html',
    "<md-toolbar md-scroll-shrink ng-style=\"!loadingRoute && { 'padding-top' : '5px' }\" style=\"padding-bottom: 5px\"><div class=md-toolbar-tools style=\"padding-left: 0px\" ng-init=\"searchToggled = false\"><md-menu><md-button aria-label=\"Menu principal\" class=md-icon-button ui-sref=home ng-click=null on-long-touch=$mdMenu.open($event)><md-icon md-menu-origin md-svg-icon=action:view_quilt></md-icon></md-button><md-menu-content width=4><md-menu-item ng-repeat=\"menuItem in toolbarCtrl.menuItems\"><md-button ui-sref=\"{{ menuItem.route }}\"><md-icon md-svg-icon=\"{{ menuItem.icon }}\" md-menu-align-target></md-icon>{{ menuItem.title }}</md-button></md-menu-item><md-menu-divider></md-menu-divider><md-menu-item><md-button><md-icon md-svg-icon=action:account_box></md-icon>Profil d'utilisateur</md-button></md-menu-item></md-menu-content></md-menu><h2>Gestigris</h2><span flex></span><md-button class=md-icon-button aria-label=Recherche ng-click=\"searchToggled = !searchToggled\"><md-icon md-svg-icon=action:search></md-icon></md-button><md-autocomplete search-bar ng-class=\"{ show: searchToggled }\" class=search-bar md-delay=500 md-search-text=searchText md-selected-item-change=\"searchBarCtrl.selectSearchResult($event, item)\" md-items=\"item in searchBarCtrl.search(searchText)\" md-item-text=item._description md-min-length=1 md-dropdown-items=50 placeholder=recherche... md-menu-class=autocomplete-search-template><md-item-template><div class=item-title layout=row layout-align=\"start center\"><span><md-icon md-svg-icon=\"{{ item.icon }}\"></md-icon></span><span layout=column><div class=md-subhead style=\"line-height: 25px\">{{ item._description }}</div><div style=\"line-height: 20px\">{{ item.type }}</div></span></div></md-item-template><md-not-found>Aucun résultat pour {{ searchText }}.</md-not-found></md-autocomplete></div></md-toolbar>"
  );

}]);
