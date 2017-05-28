'use strict';

/**
 * @ngdoc function
 * @name evvemiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the evvemiApp
 */
angular.module('evvemiApp')
  .controller('MainCtrl', function ($scope, $http, $mdDialog) {
    
function DialogController($scope, $mdDialog, output) {
    $scope.output = output;
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }
$scope.showTabDialog = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'views/tabDialog.tmpl.html',
      parent: angular.element(document.querySelector('.main')),
      targetEvent: ev,
      clickOutsideToClose:true, 
      bindToController: true,
      preserveScope: true,
      locals:{
        output: $scope.output,
      }
			//textContent: 'This is a test',
			//ariaLabel: 'Tets'
    })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
  };
    $scope.queryData = {
      name_id: null,
      name: '',
      delete_id: null,
      new_name: null,
      new_id: null,
      get_id: null
    };
    
    //var str_test = "select * from student";
    //var insertStudent = 'insert into student (name, id) values ('.concat($scope.queryData.name, ",", $scope.queryData.name_id, ");");
    //$scope.type = 1; // This keeps a track of the operation we want to carry out. 

    $scope.output = [];
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
        q = "update student set name = '".concat($scope.queryData.new_name, "' where id = ", $scope.queryData.new_id, ";");
      }
      else if(type === 5){
        q = "delete from student where id = ".concat($scope.queryData.delete_id, ";");
      }
      else if(type === 6){
        q = "select name from course where studentid = ".concat($scope.queryData.get_id, ";");
        //$scope.output.push($scope.output.length + 1);
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
          //$scope.output = output.data;
          $scope.output.length = 0;
          for(var i = 0; i< output.data.length; i++)
          {
            $scope.output.push(output.data[i]);
          }
          console.log($scope.output);
          //$scope.$apply();
          //angular.extend($scope.output, output.data);
      });
    };
  

});
