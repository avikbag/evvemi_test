'use strict';

/**
 * @ngdoc function
 * @name evvemiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the evvemiApp
 */
angular.module('evvemiApp')
  .controller('MainCtrl', function ($scope, $http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  $scope.query = function(){
    console.log('Catch');
		var data = 'This is a test data';
		$http.get("/api/query/", data).then(function(data, status) {
        console.log('Data posted successfully');
    });
  }
    
  });
