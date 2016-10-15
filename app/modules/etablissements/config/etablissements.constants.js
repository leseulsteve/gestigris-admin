'use strict';

angular.module('etablissements').constant('ETABLISSEMENTS', {
	ICONS: {
		ETABLISSEMENT: 'social:school'
	}
});

angular.module('etablissements').run(
	function($rootScope, ETABLISSEMENTS) {
		$rootScope.ETABLISSEMENTS = ETABLISSEMENTS;
	});