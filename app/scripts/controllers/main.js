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
    var str_test = "select * from student";
    var insertStudent = "insert into student (name, id) values (".strcat($scope.queryData.name, ",", $scope.queryData.name_id, ");");
  
    $scope.query = function(data, queryStr){
      console.log(insertStudent);
      var data = {
                    //test: 'This is a test run',
                    //body: 'Another piece of data',
                    query: queryStr
                  };
      $http({
              method: 'GET',
              url: '/api/query',
              params: data
      }).then(function(output) {
          console.log('Data posted successfully');
          console.log(output);
      });
    };
  
    $scope.queryData = {
      name_id: null,
      name: ''
    };

});
