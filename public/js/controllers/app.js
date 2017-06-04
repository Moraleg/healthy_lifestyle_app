console.log('final_project app.js connected!');

const app = angular.module('MyApp', ['ui.calendar', 'ui.bootstrap.datetimepicker']);

app.controller('mainController', ['$http', '$scope','uiCalendarConfig', function($http, $scope, uiCalendarConfig) {
  // this.test = 'mainController is working!';

  // Variables //
  const ctrl = this;
  this.username = '';
  this.password = '';
  this.confirmPassword = '';
  this.showMsg = false;
  this.msgContent = '';
  this.session = false;

  this.selectedWorkout = null;
  var selectedWorkout = this.selectedWorkout;
  this.events = [];
  const events = this.events;
  eventSources = this.eventSources;
  this.exerciseType = ['Cardio', 'HIIT/Circuit Training', 'Strength Training', 'Flexibility', 'Rest Day'];
  this.equipment = ['Cardio (treadmill, bike, elliptical, stairmaster, etc.)', 'Weights (dumbbells, barbells, medicine ball, etc.)', 'Resistance bands, TRX straps, Yoga mat, Bosu ball', 'Bodyweight'];
  this.duration = ['less than 30 min', '1 hour', '1.5 hours', '2 hours', '2+ hours'];
  this.addEventData = {};


  const date = new Date();
  const d = date.getDate();
  const m = date.getMonth();
  const y = date.getFullYear();


  //=================== CALENDAR =================//
    this.uiConfig = {
     calendar: {
      height: 700,
      editable: true,
      selectable: true,
      selectHelper: true,
      stick: true,
      header: {
        right: 'today prev,next'
      },
      views: {
        month: {
          columnFormat:'dddd'
        },
      },
      dayClick: function(date, event) {
        $('#add-workout-modal').css('display', 'block');
          ctrl.selectedDay = date.format('D');
          ctrl.selectedMonth = date.format('M');
          ctrl.selectedYear = date.format('YYYY');
          ctrl.thisDate = date.format('MMM Do');
          ctrl.eventSources = [ctrl.events];
        console.log(date);
      }
     }
    };


    //================= GET WORKOUTS ==============//
    this.getWorkouts = function () {
      console.log('Inside the getWorkouts function');
    $http({ // http request to get session data
      method: 'GET',
      url: '/sessions'
    }).then(
      function (response) { // in case of success
        // console.log(response); // log response
        if(response.data) {
          $http({ // http request to get workouts based on logged-in user's id
            method: 'GET',
            url: '/workouts',
            // data: ctrl.addEventData,
          }).then(
            function (response) { // in case of success
              console.log(response.data); // log response
              ctrl.eventSources = [ctrl.events];
              console.log(eventSources);

            }, function (error) { // in case of failure
              console.log(error); // log error
            }
          );
        }
      },
      function (error) { // in case of failure
        console.log(error); // log error
      });
    };
    this.getWorkouts();


    ctrl.eventSources = [ctrl.events];
    console.log(eventSources);
    const calendar = document.getElementById('calendar');


  //================ ADD WORKOUT ================//
  this.addEvent = function() {
    console.log('inside addEvent');
    console.log('this is thisDate:', ctrl.thisDate);
    $http({ // http request to get session data
      method: 'GET',
      url: '/sessions'
    }).then(
      function (response) { // in case of success
        console.log(response); // log response
        if(response.data) {
          console.log('logging data: ', this.addEventData, ctrl);
          $http({
            method: 'POST',
            url: '/workouts/new',
            data: ctrl.addEventData
          }).then(function (response) { // in case of success
              console.log('this is the response: ', response); // log response
              console.log('this is the response.data: ', response.data);

              console.log(ctrl.thisDate);
              console.log(ctrl.selectedDay);
              console.log(ctrl.selectedMonth);
              console.log(ctrl.selectedYear);

              events.push({
                title: response.data.exerciseType,
                stick: true,
                start: new Date(y, m, parseInt(ctrl.selectedDay)),
                end: new Date(y, m, parseInt(ctrl.selectedDay))
              });
              eventSources = [events];
              $('#add-workout-modal').hide();
              ctrl.getWorkouts();
            }
          );
        }
      });


  };//End addEvent


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
      // console.log(response);
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

  //================== GET SESSION ===============//

  ctrl.getSession = function() {
    $http({
      method: 'GET',
      url: '/sessions'
    }).then(function(response) {
      ctrl.sessionData = response.data;
    }, function(error) {
      console.log('Error');
    });
  };
  // ctrl.changeView = function(view) {
  //   ctrl.currentView = view;
  // };
  ctrl.getSession();



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
    $('#add-workout-modal').css('display', 'none');

  });

}]);//End mainController
