'use strict';

angular.module('benevoles').config(
  function (ToolbarMenuServiceProvider, SearchServiceProvider, FabSpeedDialServiceProvider, RightPanelProvider, ConversationServiceProvider, SectionFiltersProvider, BENEVOLES) {

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

    ConversationServiceProvider.register('Benevole');

    SectionFiltersProvider.register('benevoles', {
      filters: [{
        title: 'benevoles actifs',
        query: {
          actif: true
        }
      }],
      templateUrl: 'modules/benevoles/views/benevoles-section.filters.html'
    });

    RightPanelProvider.register({
      panelName: 'benevole',
      template: '<benevole-card benevole="benevole"></benevole-card>',
      itemName: 'benevole'
    });

  });
