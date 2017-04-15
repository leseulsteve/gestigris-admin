'use strict';

angular.module('etablissements').config(
  function (ToolbarMenuServiceProvider, SearchServiceProvider, FabSpeedDialServiceProvider, SectionFiltersProvider, ETABLISSEMENTS) {

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

    SectionFiltersProvider.register('etablissements', {
      filters: [{
        title: 'Tous établissements',
        query: {}
      }],
      templateUrl: 'modules/etablissements/views/etablissements.section-filters.html'
    });

  });
