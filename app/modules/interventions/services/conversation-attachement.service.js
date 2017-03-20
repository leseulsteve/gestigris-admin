'use strict';

angular.module('interventions').service('ConversationAttachementService',
  function ($q) {

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
  });
