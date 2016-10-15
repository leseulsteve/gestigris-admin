'use strict';

angular.module('benevoles').constant('BENEVOLES', {
	ICONS: {
		BENEVOLE: 'action:account_circle'
	}
});

angular.module('benevoles').run(
	function($rootScope, BENEVOLES) {
		$rootScope.BENEVOLES = BENEVOLES;
	});