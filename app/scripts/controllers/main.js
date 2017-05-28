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
      name: '',
      delete_id: null
    };
    
    var str_test = "select * from student";
    //var insertStudent = 'insert into student (name, id) values ('.concat($scope.queryData.name, ",", $scope.queryData.name_id, ");");
    //$scope.type = 1; // This keeps a track of the operation we want to carry out. 

    $scope.query = function(type){
      var q;
      if (type === 1){
        q = "create table student(id integer PRIMARY KEY, name varchar(128));";
      }
      else if (type === 2){
        q = "create table course(courseid integer PRIMARY KEY, name varchar(128), studentID integer, foreign key (studentID) references student(id));";
      }
      else if(type === 3){
        q = "insert into student (name, id) values ('".concat($scope.queryData.name, "',", $scope.queryData.name_id, ");");
      }
      else if(type === 4){
        q = "delete from student where id = ".concat($scope.queryData.delete_id);
      }
      console.log(q);
      var data = {
                    //test: 'This is a test run',
                    //body: 'Another piece of data',
                    query: q
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
