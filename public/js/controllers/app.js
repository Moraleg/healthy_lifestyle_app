console.log('final_project app.js connected!');

const app = angular.module('MyApp', ['ui.calendar']);

app.controller('mainController', ['$http', '$scope','uiCalendarConfig', function($http, $scope, uiCalendarConfig) {
  // this.test = 'mainController is working!';

  // Variables //
  const ctrl = this;
  this.username = '';
  this.password = '';
  this.confirmPassword = '';
  this.showMsg = false;
  this.msgContent = '';
  this.workouts = [];
  this.session = false;

  this.selectedWorkout = null;
  var selectedWorkout = this.selectedWorkout;
  this.events = [];
  var events = this.events;
  eventSources = this.eventSources;

  var date = new Date();
  var d = date.getDate();
  var m = date.getMonth();
  var y = date.getFullYear();


  // Function to get workout event data on page load, if user is signed in:
  // $http({
  //   method: 'GET',
  //   url: '/workouts'
  // }).then(function(response) {
  //   // console.log(response.data);
  //   for (var i = 0; i < response.data.length; i++) {
  //     this.events.push(response.data[i]);
  //   }
  //   console.log(this.events);
  //   }.bind(this));
  //
  // // So that fullcalendar can display events:
  // this.eventSources = [this.events];
  //
  // var calendar = document.getElementById('calendar');

  //============== ANGULARUI CALENDAR ===========/
    this.uiConfig = {
     calendar: {
      height: 700,
      editable: true,
      selectable: true,
      header: {
        right: 'today prev,next'
      },
      views: {
        month: {
          columnFormat:'dddd'
        }
      },
      dayClick: function(date) {
        var thisDate = date;
      }
      // eventClick: function(selectedWorkout) {
      //   this.selectedWorkout = selectedWorkout;
      //   console.log(selectedWorkout);
      //   // console.log(events.indexOf(selectedWorkout));
      // },
      // eventDrop: function(selectedWorkout, delta, revertFunc, jsEvent, ui, view) {
      //   this.selectedWorkout = selectedWorkout;
      //   console.log(selectedWorkout);
      //   console.log(selectedWorkout.start._d);
      //   var newDate = selectedWorkout.start._d;
        // console.log(delta._days);
        // console.log(selectedWorkout.start.add(delta._days, 'days'));
    //     $http({
    //       method: 'PUT',
    //       url: '/workouts/' + selectedWorkout.id,
    //       data: {
    //         start: newDate
    //       }
    //     }).then(function(response) {
    //       console.log(response.data);
    //       for (var i = 0; i < events.length; i++) {
    //         if (selectedWorkout._id === events[i]._id) {
    //           events.splice(i, 1);
    //         }
    //       }
    //       events.push(response.data[0]);
    //     });
      // }
     }
    };

  //================ USER SIGNUP ================//
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
          ctrl.msgContent = 'Your account has been created! Please log in to continue.';
          ctrl.showMsg = true;
        } else if (response.data.code === 11000){
          ctrl.msgContent = 'Sorry, the username is already taken. Please try again';
          ctrl.showMsg = true;
        } else {
          ctrl.msgContent = 'Sorry, something went wrong. Please try again.';
          ctrl.showMsg = true;
        }
        ctrl.username = '';
        ctrl.password = '';
        ctrl.confirmPassword = '';
      }, function(error) {
        console.log(error);
        ctrl.msgContent = 'Sorry, something went wrong. Please try again.';
        ctrl.displayMessage = true;
        ctrl.username = '';
        ctrl.password = '';
        ctrl.confirmPassword = '';
      });
    } else {
      ctrl.msgContent = 'Sorry, the passwords you entered did not match.';
      ctrl.displayMessage = true;
    }
  }; //End createAccount

  //=============== USER LOGIN ==================//
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
        ctrl.session = true;
        $('#login-modal').hide();
      } else if (response.data.success === false) {
        ctrl.msgContent = 'Sorry the username or password you entered is incorrect. Please try again.';
        ctrl.showMsg = true;
      }
      ctrl.username = '';
      ctrl.password = '';
    }, function(error) {
      console.log(error);
      ctrl.msgContent = 'Sorry, something went wrong. Please try again.';
      ctrl.showMsg = true;
      this.username = '';
      this.password = '';
    });
  };//End submitLogin


  //================== USER LOGOUT ===============//
  this.logoutUser = function() {
    $http({
      method: 'DELETE',
      url: '/sessions'
    }).then(function(response) {
      console.log(response);
      location.reload();
      console.log('You\'ve logged out');
      //I want to change the view back to the splash page

    }, function(error) {
      console.log(error);
    });
  }; //End logoutUser

  // GET WORKOUT //
  // this.getWorkouts = function() {
  //   $http({
  //     method: 'GET',
  //     url: '/workouts'
  //   }).then(function(response) {
  //     ctrl.workouts = response.data;
  //   }, function(error) {
  //     console.log(error);
  //   });
  // }; //End getWorkouts
  // ctrl.getWorkouts();



  // // ADD WORKOUT //
  // this.addWorkout = fuction() {
  //   $http({
  //     method: 'POST',
  //     url: '/workouts/new',
  //     data:
  //   })
  // }; //End addWorkout
  //
  //


  //========= Event Listeners =======

  $('.open-login').on('click', function () {
      $('#login-modal').css('display', 'block');
  });

  $('#open-signup').on('click', function () {
      $('#signup-modal').css('display', 'block');
  });

  $('.close').on('click', function() {
    $('#login-modal').css('display', 'none');
    $('#signup-modal').css('display', 'none');
  });

}]);//End mainController
