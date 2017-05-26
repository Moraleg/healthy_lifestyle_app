console.log('final_project app.js connected!');

var app = angular.module('MyApp', []);

app.controller('mainController', ['$http', '$scope', function($http, $scope) {
  // this.test = 'mainController is working!';

  // Variables //
  const controller = this;
  this.username = '';
  this.password = '';
  this.confirmPassword = '';
  this.showMsg = false;
  this.msgContent = '';

  // this.submitLogin = function() {
  //   this.showMsg = false;
  //   this.msgContent = '';
  // };

  // USER SIGNUP //
  this.createAccount = function() {
    if (this.password === this.confirmPassword) {
      $http({
        method: 'POST',
        url: '/users',
        data: {
          username: this.username,
          password: this.password
        }
      }).then(function(response) {
        console.log(response);
        if(!response.data.errmsg) {
          console.log('account successfully created!');
          controller.msgContent = 'Your account has been created! Please log in to continue.';
          controller.showMsg = true;
        } else if (response.data.code === 11000){
          controller.msgContent = 'Sorry, the username is already taken. Please try again';
          controller.showMsg = true;
        } else {
          controller.msgContent = 'Sorry, something went wrong. Please try again.';
          controller.showMsg = true;
        }
        controller.username = '';
        controller.password = '';
        controller.confirmPassword = '';
      }, function(error) {
        console.log(error);
        controller.msgContent = 'Sorry, something went wrong. Please try again.';
        controller.displayMessage = true;
        controller.username = '';
        controller.password = '';
        controller.confirmPassword = '';
      });
    } else {
      ctrl.msgContent = 'Sorry, the passwords you entered did not match.';
      ctrl.displayMessage = true;
    }
  }; //End createAccount

  // USER LOGIN //

  $http({

  })

















}]);//End mainController


// VIEWS ngRoute

// app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) { //.config just runs once on load
//     $routeProvider.when("/dashboard", {
//         templateUrl : "/partials/index-partials.html"
//     });
//     $locationProvider.html5Mode({ enabled: true, requireBase: false }); // tell angular to use push state
// }]);
