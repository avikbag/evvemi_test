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
    var str_test = "select * from student";
		var data = {
                  test: 'This is a test run',
                  body: 'Another piece of data',
                  query: str_test
                };
		$http({
            method: 'GET',
            url: '/api/query',
            params: str_test
    }).then(function(output) {
        console.log('Data posted successfully');
        console.log(output);
    });
  };
    
  });
