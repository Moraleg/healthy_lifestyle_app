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
  this.submitLogin = function() {
    this.showMsg = false;
    this.msgContent = '';

    $http({
      method: 'POST',
      url: '/sessions',
      data: {
        username: this.username,
        password: this.password
      }
    }).then(function(response) {
      console.log(response);
      if(response.data.success === true) {
        console.log('You\'ve logged in');
        //I want to change view to dashboard
        //And hide login modal
      } else if (response.data.success === false) {
        controller.msgContent = 'Sorry the username or password you entered is incorrect. Please try again.';
        controller.showMsg = true;
      }
      controller.username = '';
      controller.password = '';
    }, function(error) {
      console.log(error);
      controller.msgContent = 'Sorry, something went wrong. Please try again.';
      controller.showMsg = true;
      this.username = '';
      this.password = '';
    });
  };//End submitLogin














  //========= Event Listeners =======



}]);//End mainController
