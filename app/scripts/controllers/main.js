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
		var data = $.param({"test": 'This is a test run'});
		$http.post("/api/query/", data).success(function(output) {
        console.log('Data posted successfully');
        console.log(output);
    });
  }
    
  });
