console.log('final_project app.js connected!');

var app = angular.module('MyApp', []);

app.controller('mainController', ['$http', '$scope', function($http, $scope) {

  this.test = 'mainController is working!';
























}]);//End mainController


// VIEWS ngRoute

// app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) { //.config just runs once on load
//     $routeProvider.when("/dashboard", {
//         templateUrl : "/partials/index-partials.html"
//     });
//     $locationProvider.html5Mode({ enabled: true, requireBase: false }); // tell angular to use push state
// }]);
