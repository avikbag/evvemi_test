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
    
    $scope.queryData = {
      name_id: null,
      name: ''
    };
    
    var str_test = "select * from student";
    //var insertStudent = 'insert into student (name, id) values ('.concat($scope.queryData.name, ",", $scope.queryData.name_id, ");");
  
    $scope.query = function(){
      var insertStudent = "insert into student (name, id) values ('".concat($scope.queryData.name, "',", $scope.queryData.name_id, ");");
      console.log(insertStudent);
      var data = {
                    //test: 'This is a test run',
                    //body: 'Another piece of data',
                    query: insertStudent
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
  

});
