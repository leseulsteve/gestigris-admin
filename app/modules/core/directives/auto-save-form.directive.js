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
      controller: function ($element, $rootScope, $scope, $attrs, Toast) {

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
      }
    };
  });
