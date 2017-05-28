"use strict";angular.module("evvemiApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ngMaterial","ngMessages"]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl",controllerAs:"main"}).when("/about",{templateUrl:"views/about.html",controller:"AboutCtrl",controllerAs:"about"}).otherwise({redirectTo:"/"})}]),angular.module("evvemiApp").controller("MainCtrl",["$scope","$http","$mdDialog",function(a,b,c){function d(a,b,c){a.output=c,a.hide=function(){b.hide()},a.cancel=function(){b.cancel()},a.answer=function(a){b.hide(a)}}d.$inject=["$scope","$mdDialog","output"],a.showTabDialog=function(b){c.show({controller:d,templateUrl:"views/tabDialog.tmpl.html",parent:angular.element(document.querySelector(".main")),targetEvent:b,clickOutsideToClose:!0,bindToController:!0,locals:{output:a.output}}).then(function(b){a.status='You said the information was "'+b+'".'},function(){a.status="You cancelled the dialog."})},a.queryData={name_id:null,name:"",delete_id:null,new_name:null,new_id:null,get_id:null},a.query=function(c){var d;1===c?d="create table student(id integer PRIMARY KEY, name varchar(128));":2===c?d="create table course(courseid integer PRIMARY KEY, name varchar(128), studentID integer, foreign key (studentID) references student(id));":3===c?d="insert into student (name, id) values ('".concat(a.queryData.name,"',",a.queryData.name_id,");"):4===c?d="update student set name = '".concat(a.queryData.new_name,"' where id = ",a.queryData.new_id,";"):5===c?d="delete from student where id = ".concat(a.queryData.delete_id,";"):6===c&&(d="select name from course where studentid = ".concat(a.queryData.get_id,";")),a.output=[],console.log(d);var e={query:d};b({method:"GET",url:"/api/query",params:e}).then(function(b){console.log("Data posted successfully"),a.output=b.data,console.log(a.output)})}}]),angular.module("evvemiApp").controller("AboutCtrl",function(){this.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}),angular.module("evvemiApp").run(["$templateCache",function(a){a.put("views/about.html","<p>This is the about view.</p>"),a.put("views/main.html",'<div class="jumbotron"> <h1>\'Allo, \'Allo!</h1> <p class="lead"> Basic Implementation of CRUD using Heroku, AWS RDS, PostgreSQL, NodeJS and AngularJS </p> </div> <div layout="column" class="main"> <div flex layout="row" layout-align="center center"> <md-content layout="column" layout-align="center center"> <md-button flex ng-click="query(1)" class="md-raised md-primary">Add Students Table</md-button> </md-content> <md-content layout="column" layout-align="center center"> <md-button flex ng-click="query(2)" class="md-raised md-primary">Add Courses Table</md-button> </md-content> </div> <form name="crud"> <div layout="row" layout-align="center center"> <md-input-container flex="40" class="md-block"> <label>Student ID</label> <input md-maxlength="30" required md-no-asterisk name="name_name" ng-model="queryData.name_id"> <div ng-messages="crud.name_name.$error"> <div ng-message="required">This is required.</div> </div> </md-input-container> <md-input-container flex="40" class="md-block"> <label>Student Name</label> <input md-maxlength="30" required md-no-asterisk name="name_id" ng-model="queryData.name"> <div ng-messages="crud.name_id.$error"> <div ng-message="required">This is required.</div> </div> </md-input-container> <md-content flex="20"> <md-button ng-click="query(3)" class="md-raised md-primary">Insert data</md-button> </md-content> </div> </form> <form name="crud"> <div layout="row" layout-align="center center"> <md-input-container flex="40" class="md-block"> <label>Current Student ID</label> <input md-maxlength="30" required md-no-asterisk name="name_name" ng-model="queryData.new_id"> <div ng-messages="crud.name_name.$error"> <div ng-message="required">This is required.</div> </div> </md-input-container> <md-input-container flex="40" class="md-block"> <label>Updated Student Name</label> <input md-maxlength="30" required md-no-asterisk name="name_id" ng-model="queryData.new_name"> <div ng-messages="crud.name_id.$error"> <div ng-message="required">This is required.</div> </div> </md-input-container> <md-content flex="20"> <md-button ng-click="query(4)" class="md-raised md-primary">Update data</md-button> </md-content> </div> </form> <form name="crud"> <div layout="row" layout-align="center center"> <div flex="40"> <h4>Remove Student Entry</h4> </div> <md-input-container flex="40" class="md-block"> <label>Student ID</label> <input md-maxlength="30" required md-no-asterisk name="name_id" ng-model="queryData.delete_id"> <div ng-messages="crud.name_id.$error"> <div ng-message="required">This is required.</div> </div> </md-input-container> <md-content flex="20"> <md-button ng-click="query(5)" class="md-raised md-warn">Remove data</md-button> </md-content> </div> </form> <form name="crud"> <div layout="row" layout-align="center center"> <div flex="40"> <h4>Get classes for student</h4> </div> <md-input-container flex="40" class="md-block"> <label>Student ID</label> <input md-maxlength="30" required md-no-asterisk name="get_id" ng-model="queryData.get_id"> <div ng-messages="crud.name_id.$error"> <div ng-message="required">This is required.</div> </div> </md-input-container> <md-content flex="20"> <md-button ng-click="query(6); showTabDialog($event)" class="md-raised md-warn">Query Info</md-button> </md-content> </div> </form> </div>'),a.put("views/tabDialog.tmpl.html",'<md-dialog aria-label="Select Query results"> <form ng-cloak> <md-toolbar> <div class="md-toolbar-tools"> <h2>Select Query Results</h2> <span flex></span> <md-button class="md-icon-button" ng-click="cancel()"> <md-icon md-font-library="material-icons"> close </md-icon> </md-button> </div> </md-toolbar> <md-dialog-content> <div class="md-dialog-content"> <md-content> <md-list flex> <md-subheader class="md-no-sticky">3 line item (with hover)</md-subheader> <md-list-item class="md-3-line" ng-model="output" ng-repeat="item in output" ng-click="null"> <div class="md-list-item-text" layout="column"> <h3>{{ item.name }}</h3> </div> </md-list-item> </md-list></md-content></div> </md-dialog-content> </form> </md-dialog>')}]);